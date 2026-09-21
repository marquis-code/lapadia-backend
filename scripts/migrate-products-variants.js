const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: '../.env' });

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/lapadia-fresh';

async function run() {
  await mongoose.connect(MONGO_URI);
  console.log('Connected to MongoDB');

  const db = mongoose.connection.db;
  const products = await db.collection('products').find({}).toArray();

  let updatedCount = 0;
  for (const product of products) {
    // Check if variants array already exists and has items
    if (!product.variants || product.variants.length === 0) {
      const price = product.price || 0;
      const stock = product.stock || 0;

      await db.collection('products').updateOne(
        { _id: product._id },
        { 
          $set: { 
            variants: [{
              measurement: '50CL', // Default fallback measurement
              price: price,
              stock: stock
            }],
            availableAddonCategories: []
          } 
        }
      );
      updatedCount++;
    }
  }

  console.log(`Successfully migrated ${updatedCount} products.`);
  await mongoose.disconnect();
}

run().catch(console.dir);
