"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var SubscriptionsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const schedule_1 = require("@nestjs/schedule");
const subscription_schema_1 = require("./schemas/subscription.schema");
const subscription_plan_schema_1 = require("./schemas/subscription-plan.schema");
const payments_service_1 = require("../payments/payments.service");
const email_service_1 = require("../email/email.service");
let SubscriptionsService = SubscriptionsService_1 = class SubscriptionsService {
    subscriptionModel;
    subscriptionPlanModel;
    paymentsService;
    emailService;
    logger = new common_1.Logger(SubscriptionsService_1.name);
    constructor(subscriptionModel, subscriptionPlanModel, paymentsService, emailService) {
        this.subscriptionModel = subscriptionModel;
        this.subscriptionPlanModel = subscriptionPlanModel;
        this.paymentsService = paymentsService;
        this.emailService = emailService;
    }
    async getUserSubscriptions(userId) {
        return this.subscriptionModel.find({ userId }).populate('planId').populate('items.productId').sort({ createdAt: -1 }).exec();
    }
    async cancelSubscription(id, userId) {
        const sub = await this.subscriptionModel.findOne({ _id: id, userId });
        if (!sub)
            throw new Error('Subscription not found or not owned by user');
        sub.status = 'cancelled';
        return sub.save();
    }
    async getPlans() {
        return this.subscriptionPlanModel.find().exec();
    }
    async createPlan(data) {
        const newPlan = new this.subscriptionPlanModel(data);
        return newPlan.save();
    }
    async updatePlan(id, data) {
        return this.subscriptionPlanModel.findByIdAndUpdate(id, data, { new: true }).exec();
    }
    async deletePlan(id) {
        return this.subscriptionPlanModel.findByIdAndDelete(id).exec();
    }
    async handleSubscriptionCharges() {
        this.logger.log('Starting daily subscription billing processing...');
        const now = new Date();
        const dueSubscriptions = await this.subscriptionModel.find({
            status: 'active',
            nextBillingDate: { $lte: now }
        }).populate('userId').populate('planId');
        for (const sub of dueSubscriptions) {
            try {
                const user = sub.userId;
                const plan = sub.planId;
                if (user.paystackAuthCode) {
                    const totalAmount = sub.totalAmount || (plan ? plan.price * sub.quantity : 0);
                    this.logger.log(`Attempting to charge ${user.email} for subscription ${sub._id}`);
                    const chargeResult = await this.paymentsService.chargeAuthorization(user.paystackAuthCode, user.email, totalAmount);
                    if (chargeResult.status && chargeResult.data.status === 'success') {
                        this.logger.log(`Successfully charged user ${user.email}`);
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
                        const nextDate = new Date();
                        if (sub.frequency === 'daily')
                            nextDate.setDate(nextDate.getDate() + 1);
                        if (sub.frequency === 'weekly')
                            nextDate.setDate(nextDate.getDate() + 7);
                        if (sub.frequency === 'monthly')
                            nextDate.setMonth(nextDate.getMonth() + 1);
                        sub.nextBillingDate = nextDate;
                        await sub.save();
                    }
                    else {
                        this.logger.warn(`Payment failed for subscription ${sub._id}: ${chargeResult.message}`);
                    }
                }
            }
            catch (error) {
                this.logger.error(`Error processing subscription ${sub._id}: ${error.message}`, error.stack);
            }
        }
    }
};
exports.SubscriptionsService = SubscriptionsService;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_DAY_AT_MIDNIGHT),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SubscriptionsService.prototype, "handleSubscriptionCharges", null);
exports.SubscriptionsService = SubscriptionsService = SubscriptionsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(subscription_schema_1.Subscription.name)),
    __param(1, (0, mongoose_1.InjectModel)(subscription_plan_schema_1.SubscriptionPlan.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        payments_service_1.PaymentsService,
        email_service_1.EmailService])
], SubscriptionsService);
//# sourceMappingURL=subscriptions.service.js.map