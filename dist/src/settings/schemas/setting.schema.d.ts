import { Document } from 'mongoose';
export type SettingDocument = Setting & Document;
export declare class Setting {
    expressDeliveryFee: number;
}
export declare const SettingSchema: import("mongoose").Schema<Setting, import("mongoose").Model<Setting, any, any, any, any, any, Setting>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Setting, Document<unknown, {}, Setting, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Setting & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & import("mongoose").HydratedDocumentOverrides<{
    id: string;
}>, {
    expressDeliveryFee?: import("mongoose").SchemaDefinitionProperty<number, Setting, Document<unknown, {}, Setting, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Setting & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
}, Setting>;
