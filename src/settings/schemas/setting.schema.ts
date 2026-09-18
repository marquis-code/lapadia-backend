import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SettingDocument = Setting & Document;

@Schema({ timestamps: true })
export class Setting {
  @Prop({ default: 1500 })
  expressDeliveryFee: number;

  @Prop({ default: '2348099431789' })
  whatsappNumber1: string;

  @Prop({ default: '2348099431789' })
  whatsappNumber2: string;
}

export const SettingSchema = SchemaFactory.createForClass(Setting);
