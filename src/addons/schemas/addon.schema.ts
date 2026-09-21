import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export type AddonDocument = Addon & Document;

@Schema({ timestamps: true })
export class Addon {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  price: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'AddonCategory', required: true })
  categoryId: string;

  @Prop({ default: true })
  isAvailable: boolean;
}

export const AddonSchema = SchemaFactory.createForClass(Addon);
