import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AddonCategoryDocument = AddonCategory & Document;

@Schema({ timestamps: true })
export class AddonCategory {
  @Prop({ required: true })
  name: string;
}

export const AddonCategorySchema = SchemaFactory.createForClass(AddonCategory);
