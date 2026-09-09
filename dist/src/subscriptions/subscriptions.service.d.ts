import { Model } from 'mongoose';
import { Subscription, SubscriptionDocument } from './schemas/subscription.schema';
import { SubscriptionPlan, SubscriptionPlanDocument } from './schemas/subscription-plan.schema';
import { PaymentsService } from '../payments/payments.service';
import { EmailService } from '../email/email.service';
export declare class SubscriptionsService {
    private subscriptionModel;
    private subscriptionPlanModel;
    private paymentsService;
    private emailService;
    private readonly logger;
    constructor(subscriptionModel: Model<SubscriptionDocument>, subscriptionPlanModel: Model<SubscriptionPlanDocument>, paymentsService: PaymentsService, emailService: EmailService);
    getUserSubscriptions(userId: string): Promise<(import("mongoose").Document<unknown, {}, SubscriptionDocument, {}, import("mongoose").DefaultSchemaOptions> & Subscription & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    cancelSubscription(id: string, userId: string): Promise<import("mongoose").Document<unknown, {}, SubscriptionDocument, {}, import("mongoose").DefaultSchemaOptions> & Subscription & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    getPlans(): Promise<(import("mongoose").Document<unknown, {}, SubscriptionPlanDocument, {}, import("mongoose").DefaultSchemaOptions> & SubscriptionPlan & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    createPlan(data: any): Promise<import("mongoose").Document<unknown, {}, SubscriptionPlanDocument, {}, import("mongoose").DefaultSchemaOptions> & SubscriptionPlan & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    updatePlan(id: string, data: any): Promise<(import("mongoose").Document<unknown, {}, SubscriptionPlanDocument, {}, import("mongoose").DefaultSchemaOptions> & SubscriptionPlan & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    deletePlan(id: string): Promise<(import("mongoose").Document<unknown, {}, SubscriptionPlanDocument, {}, import("mongoose").DefaultSchemaOptions> & SubscriptionPlan & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    handleSubscriptionCharges(): Promise<void>;
}
