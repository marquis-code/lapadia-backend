import { OrdersService } from './orders.service';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    create(body: any): Promise<{
        order: import("mongoose").Document<unknown, {}, import("./schemas/order.schema").OrderDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/order.schema").Order & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: import("mongoose").Types.ObjectId;
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
    getStats(): Promise<{
        totalOrders: number;
        revenue: number;
    }>;
    findAll(limit: string): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/order.schema").OrderDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/order.schema").Order & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    payPendingOrder(id: string): Promise<{
        order: import("mongoose").Document<unknown, {}, import("./schemas/order.schema").OrderDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/order.schema").Order & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        } & {
            id: string;
        };
        authorization_url: any;
        reference: string;
    }>;
}
