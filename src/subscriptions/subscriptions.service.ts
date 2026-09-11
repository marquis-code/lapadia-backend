import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Subscription, SubscriptionDocument } from './schemas/subscription.schema';
import { SubscriptionPlan, SubscriptionPlanDocument } from './schemas/subscription-plan.schema';
import { PaymentsService } from '../payments/payments.service';
import { EmailService } from '../email/email.service';

@Injectable()
export class SubscriptionsService {
  private readonly logger = new Logger(SubscriptionsService.name);

  constructor(
    @InjectModel(Subscription.name) private subscriptionModel: Model<SubscriptionDocument>,
    @InjectModel(SubscriptionPlan.name) private subscriptionPlanModel: Model<SubscriptionPlanDocument>,
    private paymentsService: PaymentsService,
    private emailService: EmailService,
  ) {}

  async getUserSubscriptions(userId: string) {
    return this.subscriptionModel.find({ userId })
      .populate({
        path: 'planId',
        populate: [
          { path: 'productIds' },
          { path: 'swappableProductIds' }
        ]
      })
      .populate('items.productId')
      .sort({ createdAt: -1 })
      .exec();
  }

  async cancelSubscription(id: string, userId: string, reason?: string) {
    const sub = await this.subscriptionModel.findOne({ _id: id, userId });
    if (!sub) throw new Error('Subscription not found or not owned by user');
    sub.status = 'cancelled';
    if (reason) sub.cancellationReason = reason;
    return sub.save();
  }

  async swapSubscriptionItems(id: string, userId: string, newItems: any[]) {
    const sub = await this.subscriptionModel.findOne({ _id: id, userId }).populate('planId');
    if (!sub) throw new Error('Subscription not found or not owned by user');
    
    const plan: any = sub.planId;
    if (plan && !plan.allowSwaps) {
      throw new Error('This subscription plan does not allow product swapping.');
    }

    sub.items = newItems;
    // We could recalculate totalAmount here if it's a dynamic box, but for fixed plans it stays the same.
    return sub.save();
  }

  async getPlans() {
    return this.subscriptionPlanModel.find().populate('productId').populate('productIds').populate('swappableProductIds').exec();
  }

  async createPlan(data: any) {
    const newPlan = new this.subscriptionPlanModel(data);
    return newPlan.save();
  }

  async updatePlan(id: string, data: any) {
    return this.subscriptionPlanModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async deletePlan(id: string) {
    return this.subscriptionPlanModel.findByIdAndDelete(id).exec();
  }

  async getAdminUserSubscriptions() {
    return this.subscriptionModel
      .find()
      .populate('userId', 'name email')
      .populate('planId')
      .populate('items.productId')
      .sort({ createdAt: -1 })
      .exec();
  }

  async updateSubscriptionStatus(id: string, status: string) {
    return this.subscriptionModel.findByIdAndUpdate(id, { status }, { new: true }).exec();
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async handleSubscriptionCharges() {
    this.logger.log('Starting daily subscription billing processing...');
    const now = new Date();
    
    // Find active subscriptions due for billing today or earlier
    const dueSubscriptions = await this.subscriptionModel.find({
      status: 'active',
      nextBillingDate: { $lte: now }
    }).populate('userId').populate('planId');

    for (const sub of dueSubscriptions) {
      try {
        const user: any = sub.userId;
        const plan: any = sub.planId;

        if (user.paystackAuthCode) {
          const totalAmount = sub.totalAmount || (plan ? plan.price * sub.quantity : 0);
          
          this.logger.log(`Attempting to charge ${user.email} for subscription ${sub._id}`);
          const chargeResult = await this.paymentsService.chargeAuthorization(
            user.paystackAuthCode,
            user.email,
            totalAmount
          );

          if (chargeResult.status && chargeResult.data.status === 'success') {
            this.logger.log(`Successfully charged user ${user.email}`);
            
            // Generate Email Receipt
            const emailHtml = `
              <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; padding: 20px; border-radius: 8px; border: 1px solid #eee;">
                <h1 style="color: #059669; text-align: center;">Thank You For Your Renewal!</h1>
                <p>Hi ${user.name || 'Customer'},</p>
                <p>Your subscription renewal was successful.</p>
                <p><strong>Amount Billed:</strong> ₦${totalAmount.toLocaleString()}</p>
                <p>Your next recurring delivery is being prepared. Thank you for continuing to choose Lapadia Fresh!</p>
              </div>
            `;
            this.emailService.sendEmail(user.email, 'Subscription Renewed - Receipt', emailHtml).catch(e => console.error(e));
            
            // Calculate next billing date
            const nextDate = new Date();
            if (sub.frequency === 'daily') nextDate.setDate(nextDate.getDate() + 1);
            if (sub.frequency === 'weekly') nextDate.setDate(nextDate.getDate() + 7);
            if (sub.frequency === 'monthly') nextDate.setMonth(nextDate.getMonth() + 1);

            sub.nextBillingDate = nextDate;
            await sub.save();
          } else {
             this.logger.warn(`Payment failed for subscription ${sub._id}: ${chargeResult.message}`);
          }
        }
      } catch (err: any) {
        this.logger.error(`Failed to renew subscription ${sub._id}: ${err.message}`);
        // Here we could implement retry logic or suspend the subscription
      }
    }
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async handleSubscriptionExpiryReminders() {
    this.logger.log('Checking for subscriptions expiring in 3 days...');
    
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 3);
    targetDate.setHours(0, 0, 0, 0);

    const endTargetDate = new Date(targetDate);
    endTargetDate.setHours(23, 59, 59, 999);

    const expiringSubscriptions = await this.subscriptionModel.find({
      status: 'active',
      nextBillingDate: {
        $gte: targetDate,
        $lte: endTargetDate
      }
    }).populate('userId', 'name email').exec();

    for (const sub of expiringSubscriptions) {
      if (sub.userId && (sub.userId as any).email) {
        await this.emailService.sendEmail(
          (sub.userId as any).email,
          'Your Subscription is Expiring Soon',
          `Hello ${(sub.userId as any).name},\n\nYour subscription is set to renew or expire on ${sub.nextBillingDate.toDateString()}. Please ensure your payment method is up to date.`
        );
      }
    }
  }
}
