import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Order, OrderDocument } from './schemas/order.schema';
import { Subscription, SubscriptionDocument } from '../subscriptions/schemas/subscription.schema';
import { PaymentsService } from '../payments/payments.service';
import { UsersService } from '../users/users.service';
import { EmailService } from '../email/email.service';
import { SheetsService } from '../export/sheets.service';
import * as crypto from 'crypto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
    @InjectModel(Subscription.name) private subscriptionModel: Model<SubscriptionDocument>,
    private paymentsService: PaymentsService,
    private usersService: UsersService,
    private emailService: EmailService,
    private sheetsService: SheetsService
  ) {}

  async createOrder(orderData: any, userId?: string) {
    const email = orderData.email || 'customer@lapadia.com';
    let finalUserId = userId;

    if (!finalUserId && email !== 'customer@lapadia.com') {
      let existingUser = await this.usersService.findByEmail(email);
      if (!existingUser) {
        const randomPassword = crypto.randomBytes(16).toString('hex');
        existingUser = await this.usersService.create({
          name: orderData.fullName || 'Guest User',
          email,
          password: randomPassword
        });
        existingUser.isGuest = true;
        await existingUser.save();
      }
      finalUserId = existingUser._id.toString();
    } else if (!finalUserId) {
      finalUserId = '64c8f5b8e4b0e5d9f0a2c1b2'; // fallback mock
    }

    const newOrder = new this.orderModel({
      userId: new Types.ObjectId(finalUserId),
      items: orderData.items || [],
      totalAmount: orderData.totalAmount || 0,
      deliveryAddress: orderData.deliveryAddress || 'Pending',
      deliveryTime: orderData.deliveryTime || 'standard',
      guestName: orderData.fullName,
      guestEmail: email,
      guestPhone: orderData.phone,
      isSubscription: orderData.isSubscription || false,
      subscriptionFrequency: orderData.subscriptionFrequency || null,
      planId: orderData.planId ? new Types.ObjectId(orderData.planId) : null,
    });

    const savedOrder = await newOrder.save();
    
    // Initialize Paystack transaction
    const amount = savedOrder.totalAmount;
    const reference = `ORD_${savedOrder._id.toString()}`;

    try {
      const channels = savedOrder.isSubscription ? ['card'] : undefined;
      const paystackRes = await this.paymentsService.initializeTransaction(email, amount, reference, channels, orderData.callbackUrl);
      
      savedOrder.paystackReference = reference;
      await savedOrder.save();

      return {
        order: savedOrder,
        authorization_url: paystackRes.data.authorization_url,
        reference
      };
    } catch (error) {
      console.error('Paystack initialization failed', error);
      throw new BadRequestException('Payment initialization failed');
    }
  }

  async verifyPayment(reference: string) {
    try {
      const response = await this.paymentsService.verifyTransaction(reference);
      if (response.data.status === 'success') {
        const orderIdStr = reference.replace('ORD_', '');
        const order = await this.orderModel.findById(orderIdStr).populate('items.productId').populate('planId');
        
        if (!order) {
          return { success: false, message: 'Order not found' };
        }

        if (order.paymentStatus !== 'paid') {
          order.paymentStatus = 'paid';
          order.orderStatus = 'processing';
          await order.save();

          let emailHtml = '';

          // Save the Paystack authorization code for future recurring billing
          if (response.data.authorization && response.data.authorization.authorization_code) {
            await this.usersService.updatePaystackCustomer(
              order.userId.toString(),
              response.data.customer?.customer_code || '',
              response.data.authorization.authorization_code
            );
          }

          if (order.isSubscription) {
            // Support both old fixed plans and new custom subscriptions
            let freq = order.subscriptionFrequency || 'weekly';
            let planName = 'Custom Subscription Box';
            let planIdVal = null;
            
            if (order.planId) {
              const plan: any = order.planId;
              freq = plan.frequency;
              planName = plan.name;
              planIdVal = plan._id;
            }

            // Create active subscription
            const nextDate = new Date();
            if (freq === 'daily') nextDate.setDate(nextDate.getDate() + 1);
            else if (freq === 'weekly') nextDate.setDate(nextDate.getDate() + 7);
            else if (freq === 'monthly') nextDate.setMonth(nextDate.getMonth() + 1);
            
            const newSub = new this.subscriptionModel({
              userId: order.userId,
              planId: planIdVal,
              items: order.items,
              totalAmount: order.totalAmount,
              quantity: 1,
              frequency: freq,
              nextBillingDate: nextDate,
              status: 'active',
              deliveryAddress: order.deliveryAddress
            });
            await newSub.save();
            
            const itemsHtml = order.items.map((item: any) => 
              `<tr>
                 <td style="padding: 8px; border-bottom: 1px solid #eee;">${item.productId?.name || 'Product'}</td>
                 <td style="padding: 8px; border-bottom: 1px solid #eee;">x${item.quantity}</td>
                 <td style="padding: 8px; border-bottom: 1px solid #eee;">₦${(item.priceAtPurchase || 0).toLocaleString()}</td>
               </tr>`
            ).join('');

            emailHtml = `
              <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; padding: 20px; border-radius: 8px; border: 1px solid #eee;">
                <h1 style="color: #059669; text-align: center;">Subscription Confirmed</h1>
                <p>Hi ${order.guestName || 'Customer'},</p>
                <p>Your subscription to <strong>${planName}</strong> was successful!</p>
                
                <table style="width: 100%; border-collapse: collapse; text-align: left; margin-bottom: 20px; margin-top: 20px;">
                  <thead>
                    <tr>
                      <th style="padding: 8px; border-bottom: 2px solid #eee; color: #475569;">Item</th>
                      <th style="padding: 8px; border-bottom: 2px solid #eee; color: #475569;">Qty</th>
                      <th style="padding: 8px; border-bottom: 2px solid #eee; color: #475569;">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${itemsHtml}
                  </tbody>
                </table>
                <p><strong>Recurring Amount Billed:</strong> ₦${order.totalAmount.toLocaleString()} (${freq})</p>
                <p><strong>Next Billing Date:</strong> ${nextDate.toLocaleDateString()}</p>
                <p>Your recurring delivery is being prepared. Thank you for choosing Lapadia Fresh!</p>
              </div>
            `;
          } else {
            // Construct regular receipt
            const itemsHtml = order.items.map((item: any) => 
              `<tr>
                 <td style="padding: 8px; border-bottom: 1px solid #eee;">${item.productId?.name || 'Product'}</td>
                 <td style="padding: 8px; border-bottom: 1px solid #eee;">x${item.quantity}</td>
                 <td style="padding: 8px; border-bottom: 1px solid #eee;">₦${(item.priceAtPurchase || 0).toLocaleString()}</td>
               </tr>`
            ).join('');

            emailHtml = `
              <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; padding: 20px; border-radius: 8px; border: 1px solid #eee;">
                <div style="text-align: center; margin-bottom: 20px;">
                  <h1 style="color: #059669; margin: 0;">Lapadia Fresh</h1>
                  <p style="color: #64748b; margin-top: 5px;">Your Order Receipt</p>
                </div>
                
                <div style="background: #f8fafc; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                  <p style="margin: 0; color: #334155;"><strong>Order Ref:</strong> ${reference}</p>
                  <p style="margin: 5px 0 0 0; color: #334155;"><strong>Date:</strong> ${new Date().toLocaleString()}</p>
                </div>

                <table style="width: 100%; border-collapse: collapse; text-align: left; margin-bottom: 20px;">
                  <thead>
                    <tr>
                      <th style="padding: 8px; border-bottom: 2px solid #eee; color: #475569;">Item</th>
                      <th style="padding: 8px; border-bottom: 2px solid #eee; color: #475569;">Qty</th>
                      <th style="padding: 8px; border-bottom: 2px solid #eee; color: #475569;">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${itemsHtml}
                  </tbody>
                </table>

                <div style="text-align: right; padding-top: 10px; border-top: 2px solid #eee;">
                  <p style="font-size: 18px; color: #0f172a; margin: 0;"><strong>Total: ₦${order.totalAmount.toLocaleString()}</strong></p>
                </div>

                <p style="text-align: center; color: #64748b; margin-top: 30px; font-size: 14px;">
                  Thank you for shopping with Lapadia Fresh! Your order is now being processed.
                </p>
              </div>
            `;
          }

          let recipientEmail = order.guestEmail;
          if (recipientEmail) {
            this.emailService.sendEmail(
              recipientEmail,
              `Order Confirmation - ${reference}`,
              emailHtml
            ).catch(e => console.error('Failed to send receipt:', e));
          }

          // Append to real-time Google Sheet
          this.sheetsService.appendOrderRow(order).catch(e => console.error('Failed to append to sheets:', e));
        }
        return { success: true, message: 'Payment verified successfully' };
      }
      return { success: false, message: 'Payment verification failed' };
    } catch (error) {
      console.error('Payment verification failed', error);
      return { success: false, message: 'Payment verification failed' };
    }
  }

  async findAll(limit?: number) {
    let query = this.orderModel.find().populate('userId', 'name email').populate('items.productId').sort({ createdAt: -1 });
    if (limit) {
      query = query.limit(limit);
    }
    return query.exec();
  }

  async getStats() {
    const orders = await this.orderModel.find().exec();
    const totalOrders = orders.length;
    const revenue = orders.filter(o => o.paymentStatus === 'paid').reduce((sum, o) => sum + o.totalAmount, 0);
    return {
      totalOrders,
      revenue
    };
  }

  async payPendingOrder(orderId: string) {
    const order = await this.orderModel.findById(orderId);
    if (!order) {
      throw new BadRequestException('Order not found');
    }
    if (order.paymentStatus !== 'pending') {
      throw new BadRequestException('Order is not in a pending state');
    }

    const amount = order.totalAmount;
    // Generate a new reference since Paystack references must be unique for each transaction attempt
    const newReference = `ORD_${order._id.toString()}_${Date.now()}`;

    try {
      // Use guestEmail which was saved during order creation
      const email = order.guestEmail || 'customer@lapadia.com';
      
      const paystackRes = await this.paymentsService.initializeTransaction(email, amount, newReference);
      
      order.paystackReference = newReference;
      await order.save();

      return {
        order,
        authorization_url: paystackRes.data.authorization_url,
        reference: newReference
      };
    } catch (error) {
      console.error('Paystack initialization failed', error);
      throw new BadRequestException('Payment initialization failed');
    }
  }

  async updateOrderStatus(orderId: string, orderStatus: string) {
    const order = await this.orderModel.findById(orderId);
    if (!order) {
      throw new BadRequestException('Order not found');
    }
    
    order.orderStatus = orderStatus;
    await order.save();
    return order;
  }
}
