import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type SubscriptionDocument = Subscription & Document;

@Schema({ _id: false })
class SubscriptionItem {
  @Prop({ type: Types.ObjectId, ref: 'Product', required: true })
  productId: Types.ObjectId;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true })
  priceAtPurchase: number;
}

@Schema({ timestamps: true })
export class Subscription {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'SubscriptionPlan', required: false, default: null })
  planId?: Types.ObjectId;

  @Prop({ type: [SubscriptionItem], required: false, default: [] })
  items: SubscriptionItem[];

  @Prop({ required: false, default: 0 })
  totalAmount: number;
  
  @Prop({ required: false, default: 1 })
  quantity: number;

  @Prop({ required: true, enum: ['daily', 'weekly', 'monthly'] })
  frequency: string;
  
  @Prop({ required: true })
  nextBillingDate: Date;

  @Prop({ default: 'active', enum: ['active', 'paused', 'cancelled'] })
  status: string;

  @Prop({ required: false })
  cancellationReason: string;
  
  @Prop({ required: true })
  deliveryAddress: string;

  @Prop({ type: [{ date: Date, status: String, notes: String }], default: [] })
  deliveryLogs: { date: Date, status: string, notes: string }[];
}

export const SubscriptionSchema = SchemaFactory.createForClass(Subscription);
