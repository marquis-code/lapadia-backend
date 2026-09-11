import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EventDocument = Event & Document;

@Schema({ timestamps: true })
export class Event {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true, unique: true })
  slug: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  date: string; // YYYY-MM-DD

  @Prop({ required: true })
  time: string; // HH:mm

  @Prop({ required: true })
  location: string;

  @Prop()
  image: string;

  @Prop({ default: 'upcoming', enum: ['upcoming', 'ongoing', 'past'] })
  status: string;
}

export const EventSchema = SchemaFactory.createForClass(Event);
