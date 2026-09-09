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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionSchema = exports.Subscription = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let SubscriptionItem = class SubscriptionItem {
    productId;
    quantity;
    priceAtPurchase;
};
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Product', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], SubscriptionItem.prototype, "productId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], SubscriptionItem.prototype, "quantity", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], SubscriptionItem.prototype, "priceAtPurchase", void 0);
SubscriptionItem = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], SubscriptionItem);
let Subscription = class Subscription {
    userId;
    planId;
    items;
    totalAmount;
    quantity;
    frequency;
    nextBillingDate;
    status;
    deliveryAddress;
};
exports.Subscription = Subscription;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Subscription.prototype, "userId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'SubscriptionPlan', required: false, default: null }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Subscription.prototype, "planId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [SubscriptionItem], required: false, default: [] }),
    __metadata("design:type", Array)
], Subscription.prototype, "items", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, default: 0 }),
    __metadata("design:type", Number)
], Subscription.prototype, "totalAmount", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, default: 1 }),
    __metadata("design:type", Number)
], Subscription.prototype, "quantity", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: ['daily', 'weekly', 'monthly'] }),
    __metadata("design:type", String)
], Subscription.prototype, "frequency", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Date)
], Subscription.prototype, "nextBillingDate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 'active', enum: ['active', 'paused', 'cancelled'] }),
    __metadata("design:type", String)
], Subscription.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Subscription.prototype, "deliveryAddress", void 0);
exports.Subscription = Subscription = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Subscription);
exports.SubscriptionSchema = mongoose_1.SchemaFactory.createForClass(Subscription);
//# sourceMappingURL=subscription.schema.js.map