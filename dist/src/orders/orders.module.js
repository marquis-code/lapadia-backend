"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const orders_service_1 = require("./orders.service");
const orders_controller_1 = require("./orders.controller");
const order_schema_1 = require("./schemas/order.schema");
const subscription_schema_1 = require("../subscriptions/schemas/subscription.schema");
const payments_module_1 = require("../payments/payments.module");
const users_module_1 = require("../users/users.module");
const email_module_1 = require("../email/email.module");
let OrdersModule = class OrdersModule {
};
exports.OrdersModule = OrdersModule;
exports.OrdersModule = OrdersModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: order_schema_1.Order.name, schema: order_schema_1.OrderSchema },
                { name: subscription_schema_1.Subscription.name, schema: subscription_schema_1.SubscriptionSchema }
            ]),
            payments_module_1.PaymentsModule,
            users_module_1.UsersModule,
            email_module_1.EmailModule
        ],
        providers: [orders_service_1.OrdersService],
        controllers: [orders_controller_1.OrdersController],
    })
], OrdersModule);
//# sourceMappingURL=orders.module.js.map