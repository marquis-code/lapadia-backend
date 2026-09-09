import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type OrderDocument = Order & Document;

@Schema({ _id: false })
class OrderItem {
  @Prop({ type: Types.ObjectId, ref: 'Product', required: true })
  productId: Types.ObjectId;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true })
  priceAtPurchase: number;
}

@Schema({ timestamps: true })
export class Order {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ type: [OrderItem], required: true })
  items: OrderItem[];

  @Prop({ required: true })
  totalAmount: number;

  @Prop({ required: true })
  deliveryAddress: string;

  @Prop({ required: true })
  deliveryTime: string;

  @Prop({ default: 'pending', enum: ['pending', 'paid', 'failed'] })
  paymentStatus: string;

  @Prop({ default: 'processing', enum: ['processing', 'dispatched', 'delivered', 'cancelled'] })
  orderStatus: string;
  
  @Prop({ type: String, default: null })
  paystackReference: string;

  @Prop({ type: Boolean, default: false })
  isSubscription: boolean;

  @Prop({ type: String, enum: ['weekly', 'monthly', 'daily'], required: false })
  subscriptionFrequency?: string;

  @Prop({ type: Types.ObjectId, ref: 'SubscriptionPlan', default: null })
  planId: Types.ObjectId;

  @Prop({ type: String, default: null })
  guestName: string;

  @Prop({ type: String, default: null })
  guestEmail: string;

  @Prop({ type: String, default: null })
  guestPhone: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
