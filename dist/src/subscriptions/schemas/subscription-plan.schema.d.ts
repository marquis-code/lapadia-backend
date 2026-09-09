import { Document } from 'mongoose';
export type SubscriptionPlanDocument = SubscriptionPlan & Document;
export declare class SubscriptionPlan {
    name: string;
    price: number;
    frequency: string;
    description: string;
    features: string[];
    isPopular: boolean;
}
export declare const SubscriptionPlanSchema: import("mongoose").Schema<SubscriptionPlan, import("mongoose").Model<SubscriptionPlan, any, any, any, any, any, SubscriptionPlan>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, SubscriptionPlan, Document<unknown, {}, SubscriptionPlan, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<SubscriptionPlan & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & import("mongoose").HydratedDocumentOverrides<{
    id: string;
}>, {
    name?: import("mongoose").SchemaDefinitionProperty<string, SubscriptionPlan, Document<unknown, {}, SubscriptionPlan, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<SubscriptionPlan & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    price?: import("mongoose").SchemaDefinitionProperty<number, SubscriptionPlan, Document<unknown, {}, SubscriptionPlan, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<SubscriptionPlan & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    frequency?: import("mongoose").SchemaDefinitionProperty<string, SubscriptionPlan, Document<unknown, {}, SubscriptionPlan, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<SubscriptionPlan & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    description?: import("mongoose").SchemaDefinitionProperty<string, SubscriptionPlan, Document<unknown, {}, SubscriptionPlan, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<SubscriptionPlan & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    features?: import("mongoose").SchemaDefinitionProperty<string[], SubscriptionPlan, Document<unknown, {}, SubscriptionPlan, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<SubscriptionPlan & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    isPopular?: import("mongoose").SchemaDefinitionProperty<boolean, SubscriptionPlan, Document<unknown, {}, SubscriptionPlan, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<SubscriptionPlan & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
}, SubscriptionPlan>;
