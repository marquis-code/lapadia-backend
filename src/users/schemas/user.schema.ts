import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ type: String, default: '' })
  phone: string;

  @Prop({ required: true })
  passwordHash: string;

  @Prop({ default: 'user', enum: ['user', 'admin'] })
  role: string;

  @Prop({ default: [] })
  savedAddresses: string[];

  // Tokenization for subscriptions via Paystack
  @Prop({ type: String, default: null })
  paystackCustomerCode: string;

  @Prop({ type: String, default: null })
  paystackAuthCode: string;

  @Prop({ type: [Types.ObjectId], ref: 'Product', default: [] })
  favorites: Types.ObjectId[];

  @Prop({ type: String, default: null })
  firebaseUid: string;

  @Prop({ type: Boolean, default: false })
  isGuest: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
