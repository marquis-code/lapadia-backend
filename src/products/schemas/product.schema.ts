import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import mongoose from 'mongoose';

export type ProductDocument = Product & Document;

@Schema({ timestamps: true })
export class Product {
  @Prop({ required: true })
  name: string;

  @Prop({ type: String, enum: ['regular', 'subscription'], default: 'regular' })
  productType: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  imageUrl: string;

  @Prop({ type: [String], default: [] })
  images: string[];

  @Prop({ required: true })
  category: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: false, default: null })
  categoryId: string;

  @Prop({ default: 0 })
  stock: number;
  
  @Prop({ default: true })
  isAvailable: boolean;

  @Prop({ type: Object, default: null })
  nutritionalInfo: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
    sugar: number;
    servingSize: string;
  };

  @Prop({ type: [String], default: [] })
  allergens: string[];

  @Prop({ type: [String], default: [] })
  ingredients: string[];

  @Prop({
    type: [{
      measurement: { type: String, required: true },
      price: { type: Number, required: true },
      stock: { type: Number, default: 0 }
    }],
    default: []
  })
  variants: { measurement: string; price: number; stock: number }[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'AddonCategory' }], default: [] })
  availableAddonCategories: string[];

  @Prop({ type: [String], default: [] })
  purchaseFrequencies: string[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
