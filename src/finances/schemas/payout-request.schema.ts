import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PayoutRequestDocument = PayoutRequest & Document;

@Schema({ timestamps: true })
export class PayoutRequest {
  @Prop({ required: true })
  amount: number;

  @Prop({ default: 'pending', enum: ['pending', 'processing', 'completed', 'failed'] })
  status: string;

  @Prop({ required: false })
  adminNote: string;
}

export const PayoutRequestSchema = SchemaFactory.createForClass(PayoutRequest);
