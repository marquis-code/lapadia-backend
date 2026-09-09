import { SubscriptionsService } from './subscriptions.service';
export declare class SubscriptionsController {
    private readonly subscriptionsService;
    constructor(subscriptionsService: SubscriptionsService);
    getUserSubscriptions(req: any): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/subscription.schema").SubscriptionDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/subscription.schema").Subscription & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    cancelSubscription(id: string, req: any): Promise<import("mongoose").Document<unknown, {}, import("./schemas/subscription.schema").SubscriptionDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/subscription.schema").Subscription & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    getPlans(): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/subscription-plan.schema").SubscriptionPlanDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/subscription-plan.schema").SubscriptionPlan & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    createPlan(body: any): Promise<import("mongoose").Document<unknown, {}, import("./schemas/subscription-plan.schema").SubscriptionPlanDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/subscription-plan.schema").SubscriptionPlan & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    updatePlan(id: string, body: any): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/subscription-plan.schema").SubscriptionPlanDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/subscription-plan.schema").SubscriptionPlan & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    deletePlan(id: string): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/subscription-plan.schema").SubscriptionPlanDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/subscription-plan.schema").SubscriptionPlan & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
}
