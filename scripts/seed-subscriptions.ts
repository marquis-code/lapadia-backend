import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config();

const uri = process.env.MONGODB_URI || 'mongodb+srv://abahmarquis_db_user:UJclLglS3QlQhb3Y@lapadia.sc5l7jp.mongodb.net/?appName=lapadia';

const subscriptionPlanSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  frequency: { type: String, required: true, enum: ['daily', 'weekly', 'monthly'] },
  description: { type: String, required: true },
  features: { type: [String], default: [] },
  isPopular: { type: Boolean, default: false },
}, { timestamps: true });

const SubscriptionPlan = mongoose.models.SubscriptionPlan || mongoose.model('SubscriptionPlan', subscriptionPlanSchema);

const plans = [
  {
    name: 'Weekly Essentials',
    price: 15000,
    frequency: 'weekly',
    description: 'Perfect for small households. Get fresh staples delivered every week.',
    features: ['10-15 Fresh items', 'Free Delivery', 'Cancel anytime'],
    isPopular: false
  },
  {
    name: 'Family Fresh',
    price: 45000,
    frequency: 'weekly',
    description: 'Our most popular plan! Everything a medium family needs for the week.',
    features: ['25-30 Fresh items', 'Priority Free Delivery', 'Cancel anytime', 'Dedicated Support'],
    isPopular: true
  },
  {
    name: 'Monthly Bulk',
    price: 120000,
    frequency: 'monthly',
    description: 'Stock up your pantry once a month with bulk fresh produce.',
    features: ['Bulk Fresh items', 'Free Delivery', 'Customizable Box'],
    isPopular: false
  }
];

async function seed() {
  try {
    await mongoose.connect(uri);
    console.log('Connected to MongoDB.');
    
    // Clear existing plans
    await SubscriptionPlan.deleteMany({});
    console.log('Cleared existing plans.');

    // Insert new plans
    await SubscriptionPlan.insertMany(plans);
    console.log('Successfully seeded subscription plans.');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB.');
  }
}

seed();
