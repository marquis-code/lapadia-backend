import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PromoCodeDocument = PromoCode & Document;

@Schema({ timestamps: true })
export class PromoCode {
  @Prop({ required: true, unique: true, uppercase: true })
  code: string; // e.g. SMOOTHIE10

  @Prop({ required: true, enum: ['percentage', 'fixed'] })
  discountType: string;

  @Prop({ required: true })
  discountValue: number; // e.g. 10 (for 10% or NGN 1000)

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ default: 0 })
  usageCount: number;

  @Prop({ default: null })
  maxUses: number; // null means unlimited

  @Prop({ default: null })
  expiresAt: Date; // null means never expires
}

export const PromoCodeSchema = SchemaFactory.createForClass(PromoCode);
