import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SettingDocument = Setting & Document;

@Schema({ timestamps: true })
export class Setting {
  @Prop({
    type: [{
      name: { type: String, required: true },
      phone: { type: String, required: true },
      initials: { type: String, required: true }
    }],
    default: [
      { name: 'Support', phone: '2348099431789', initials: 'S' }
    ]
  })
  supportContacts: { name: string; phone: string; initials: string }[];

  @Prop({ type: [String], default: ['Daily', 'Weekly', 'Monthly'] })
  subscriptionFrequencies: string[];

  @Prop({ default: '' })
  pickupLocation: string;

  @Prop({ type: [String], default: ['250CL', '500CL', '1 Litre'] })
  possibleMeasurements: string[];

  @Prop({ default: '30 - 45 Minutes' })
  deliveryDuration: string;

  @Prop({ default: '' })
  businessNotificationEmail: string;

  @Prop({
    type: Object,
    default: {
      title: 'Welcome to LapadiaFresh',
      subtitle: 'Elevate your healthy lifestyle with our premium fruit subscriptions. Freshness delivered exactly when you need it.',
      carouselTitle: 'Explore Our Subscriptions',
      carouselSubtitle: 'Swipe to see what\'s trending',
      featuredItems: []
    }
  })
  welcomeModalConfig: {
    title: string;
    subtitle: string;
    carouselTitle: string;
    carouselSubtitle: string;
    featuredItems: string[];
  };
}

export const SettingSchema = SchemaFactory.createForClass(Setting);
