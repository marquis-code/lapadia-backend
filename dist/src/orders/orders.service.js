"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const order_schema_1 = require("./schemas/order.schema");
const subscription_schema_1 = require("../subscriptions/schemas/subscription.schema");
const payments_service_1 = require("../payments/payments.service");
const users_service_1 = require("../users/users.service");
const email_service_1 = require("../email/email.service");
const crypto = __importStar(require("crypto"));
let OrdersService = class OrdersService {
    orderModel;
    subscriptionModel;
    paymentsService;
    usersService;
    emailService;
    constructor(orderModel, subscriptionModel, paymentsService, usersService, emailService) {
        this.orderModel = orderModel;
        this.subscriptionModel = subscriptionModel;
        this.paymentsService = paymentsService;
        this.usersService = usersService;
        this.emailService = emailService;
    }
    async createOrder(orderData, userId) {
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
        }
        else if (!finalUserId) {
            finalUserId = '64c8f5b8e4b0e5d9f0a2c1b2';
        }
        const newOrder = new this.orderModel({
            userId: new mongoose_2.Types.ObjectId(finalUserId),
            items: orderData.items || [],
            totalAmount: orderData.totalAmount || 0,
            deliveryAddress: orderData.deliveryAddress || 'Pending',
            deliveryTime: orderData.deliveryTime || 'standard',
            guestName: orderData.fullName,
            guestEmail: email,
            guestPhone: orderData.phone,
            isSubscription: orderData.isSubscription || false,
            subscriptionFrequency: orderData.subscriptionFrequency || null,
            planId: orderData.planId ? new mongoose_2.Types.ObjectId(orderData.planId) : null,
        });
        const savedOrder = await newOrder.save();
        const amount = savedOrder.totalAmount;
        const reference = `ORD_${savedOrder._id.toString()}`;
        try {
            const paystackRes = await this.paymentsService.initializeTransaction(email, amount, reference);
            savedOrder.paystackReference = reference;
            await savedOrder.save();
            return {
                order: savedOrder,
                authorization_url: paystackRes.data.authorization_url,
                reference
            };
        }
        catch (error) {
            console.error('Paystack initialization failed', error);
            throw new common_1.BadRequestException('Payment initialization failed');
        }
    }
    async verifyPayment(reference) {
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
                    if (order.isSubscription) {
                        let freq = order.subscriptionFrequency || 'weekly';
                        let planName = 'Custom Subscription Box';
                        let planIdVal = null;
                        if (order.planId) {
                            const plan = order.planId;
                            freq = plan.frequency;
                            planName = plan.name;
                            planIdVal = plan._id;
                        }
                        const nextDate = new Date();
                        if (freq === 'daily')
                            nextDate.setDate(nextDate.getDate() + 1);
                        else if (freq === 'weekly')
                            nextDate.setDate(nextDate.getDate() + 7);
                        else if (freq === 'monthly')
                            nextDate.setMonth(nextDate.getMonth() + 1);
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
                        const itemsHtml = order.items.map((item) => `<tr>
                 <td style="padding: 8px; border-bottom: 1px solid #eee;">${item.productId?.name || 'Product'}</td>
                 <td style="padding: 8px; border-bottom: 1px solid #eee;">x${item.quantity}</td>
                 <td style="padding: 8px; border-bottom: 1px solid #eee;">₦${(item.priceAtPurchase || 0).toLocaleString()}</td>
               </tr>`).join('');
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
                    }
                    else {
                        const itemsHtml = order.items.map((item) => `<tr>
                 <td style="padding: 8px; border-bottom: 1px solid #eee;">${item.productId?.name || 'Product'}</td>
                 <td style="padding: 8px; border-bottom: 1px solid #eee;">x${item.quantity}</td>
                 <td style="padding: 8px; border-bottom: 1px solid #eee;">₦${(item.priceAtPurchase || 0).toLocaleString()}</td>
               </tr>`).join('');
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
                        this.emailService.sendEmail(recipientEmail, `Order Confirmation - ${reference}`, emailHtml).catch(e => console.error('Failed to send receipt:', e));
                    }
                }
                return { success: true, message: 'Payment verified successfully' };
            }
            return { success: false, message: 'Payment verification failed' };
        }
        catch (error) {
            console.error('Payment verification failed', error);
            return { success: false, message: 'Payment verification failed' };
        }
    }
    async findAll(limit) {
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
    async payPendingOrder(orderId) {
        const order = await this.orderModel.findById(orderId);
        if (!order) {
            throw new common_1.BadRequestException('Order not found');
        }
        if (order.paymentStatus !== 'pending') {
            throw new common_1.BadRequestException('Order is not in a pending state');
        }
        const amount = order.totalAmount;
        const newReference = `ORD_${order._id.toString()}_${Date.now()}`;
        try {
            const email = order.guestEmail || 'customer@lapadia.com';
            const paystackRes = await this.paymentsService.initializeTransaction(email, amount, newReference);
            order.paystackReference = newReference;
            await order.save();
            return {
                order,
                authorization_url: paystackRes.data.authorization_url,
                reference: newReference
            };
        }
        catch (error) {
            console.error('Paystack initialization failed', error);
            throw new common_1.BadRequestException('Payment initialization failed');
        }
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(order_schema_1.Order.name)),
    __param(1, (0, mongoose_1.InjectModel)(subscription_schema_1.Subscription.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        payments_service_1.PaymentsService,
        users_service_1.UsersService,
        email_service_1.EmailService])
], OrdersService);
//# sourceMappingURL=orders.service.js.map