import { Model, Types } from 'mongoose';
import { Order, OrderDocument } from './schemas/order.schema';
import { SubscriptionDocument } from '../subscriptions/schemas/subscription.schema';
import { PaymentsService } from '../payments/payments.service';
import { UsersService } from '../users/users.service';
import { EmailService } from '../email/email.service';
export declare class OrdersService {
    private orderModel;
    private subscriptionModel;
    private paymentsService;
    private usersService;
    private emailService;
    constructor(orderModel: Model<OrderDocument>, subscriptionModel: Model<SubscriptionDocument>, paymentsService: PaymentsService, usersService: UsersService, emailService: EmailService);
    createOrder(orderData: any, userId?: string): Promise<{
        order: import("mongoose").Document<unknown, {}, OrderDocument, {}, import("mongoose").DefaultSchemaOptions> & Order & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: Types.ObjectId;
        }> & {
            __v: number;
        } & {
            id: string;
        };
        authorization_url: any;
        reference: string;
    }>;
    verifyPayment(reference: string): Promise<{
        success: boolean;
        message: string;
    }>;
    findAll(limit?: number): Promise<(import("mongoose").Document<unknown, {}, OrderDocument, {}, import("mongoose").DefaultSchemaOptions> & Order & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    getStats(): Promise<{
        totalOrders: number;
        revenue: number;
    }>;
    payPendingOrder(orderId: string): Promise<{
        order: import("mongoose").Document<unknown, {}, OrderDocument, {}, import("mongoose").DefaultSchemaOptions> & Order & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: Types.ObjectId;
        }> & {
            __v: number;
        } & {
            id: string;
        };
        authorization_url: any;
        reference: string;
    }>;
}
