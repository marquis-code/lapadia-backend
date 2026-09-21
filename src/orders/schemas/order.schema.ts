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

  @Prop({ type: Object, default: null })
  selectedVariant: any;

  @Prop({ type: [Object], default: [] })
  selectedAddons: any[];

  @Prop({ type: String, default: null })
  frequency: string;
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

  @Prop({ type: String, required: false })
  subscriptionFrequency?: string;

  @Prop({ type: Boolean, default: false })
  deliverAllAtOnce: boolean;

  @Prop({ type: Types.ObjectId, ref: 'SubscriptionPlan', default: null })
  planId: Types.ObjectId;

  @Prop({ type: String, default: null })
  guestName: string;

  @Prop({ type: String, default: null })
  guestEmail: string;

  @Prop({ type: String, default: null })
  guestPhone: string;

  @Prop({ type: Date, default: null })
  scheduledTime: Date;

  @Prop({ type: String, default: null })
  promoCode: string;

  @Prop({ type: Number, default: 0 })
  discountAmount: number;

  @Prop({ type: String, default: null })
  orderNotes: string;

  @Prop({ type: String, enum: ['delivery', 'pickup'], default: 'delivery' })
  deliveryMethod: string;

  createdAt: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
