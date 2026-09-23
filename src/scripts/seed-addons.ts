import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config();

async function seedAddons() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/lapadia_fresh');
    console.log('Connected to MongoDB');

    const AddonCategory = mongoose.connection.collection('addoncategories');
    const Addon = mongoose.connection.collection('addons');
    const Product = mongoose.connection.collection('products');

    // Create an Addon Category
    const categoryResult = await AddonCategory.insertOne({
      name: 'Extra Toppings',
      createdAt: new Date(),
      updatedAt: new Date()
    });
    const categoryId = categoryResult.insertedId;
    console.log(`Created AddonCategory with ID: ${categoryId}`);

    // Create Addons
    await Addon.insertMany([
      {
        name: 'Extra Honey',
        price: 500,
        categoryId: categoryId,
        isAvailable: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Chia Seeds',
        price: 800,
        categoryId: categoryId,
        isAvailable: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
    console.log('Created Addons');

    // Find a product and add this category
    const product = await Product.findOne({});
    if (product) {
      await Product.updateOne(
        { _id: product._id },
        { $push: { availableAddonCategories: categoryId } as any }
      );
      console.log(`Updated Product '${product.name}' with the AddonCategory`);
    } else {
      console.log('No products found to attach addons to.');
    }

  } catch(e) {
    console.error('Error seeding addons:', e);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
    process.exit(0);
  }
}

seedAddons();
