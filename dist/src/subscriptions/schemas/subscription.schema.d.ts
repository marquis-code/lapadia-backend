import { Document, Types } from 'mongoose';
export type SubscriptionDocument = Subscription & Document;
declare class SubscriptionItem {
    productId: Types.ObjectId;
    quantity: number;
    priceAtPurchase: number;
}
export declare class Subscription {
    userId: Types.ObjectId;
    planId?: Types.ObjectId;
    items: SubscriptionItem[];
    totalAmount: number;
    quantity: number;
    frequency: string;
    nextBillingDate: Date;
    status: string;
    deliveryAddress: string;
}
export declare const SubscriptionSchema: import("mongoose").Schema<Subscription, import("mongoose").Model<Subscription, any, any, any, any, any, Subscription>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Subscription, Document<unknown, {}, Subscription, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Subscription & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & import("mongoose").HydratedDocumentOverrides<{
    id: string;
}>, {
    userId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, Subscription, Document<unknown, {}, Subscription, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Subscription & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    planId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId | undefined, Subscription, Document<unknown, {}, Subscription, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Subscription & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    items?: import("mongoose").SchemaDefinitionProperty<SubscriptionItem[], Subscription, Document<unknown, {}, Subscription, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Subscription & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    totalAmount?: import("mongoose").SchemaDefinitionProperty<number, Subscription, Document<unknown, {}, Subscription, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Subscription & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    quantity?: import("mongoose").SchemaDefinitionProperty<number, Subscription, Document<unknown, {}, Subscription, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Subscription & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    frequency?: import("mongoose").SchemaDefinitionProperty<string, Subscription, Document<unknown, {}, Subscription, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Subscription & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    nextBillingDate?: import("mongoose").SchemaDefinitionProperty<Date, Subscription, Document<unknown, {}, Subscription, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Subscription & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    status?: import("mongoose").SchemaDefinitionProperty<string, Subscription, Document<unknown, {}, Subscription, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Subscription & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    deliveryAddress?: import("mongoose").SchemaDefinitionProperty<string, Subscription, Document<unknown, {}, Subscription, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Subscription & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
}, Subscription>;
export {};
