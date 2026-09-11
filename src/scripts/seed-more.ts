import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config();

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    const Product = mongoose.connection.collection('products');
    const prod = await Product.findOne({});
    if (prod) {
      const Plan = mongoose.connection.collection('subscriptionplans');
      await Plan.updateMany({}, { $set: { productIds: [prod._id] } });
      console.log('Updated plans with a product!');
    }
  } catch(e) {
    console.error(e);
  }
  process.exit(0);
}
seed();
