import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/lapadia_fresh';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  imageUrl: { type: String, required: true },
  category: { type: String, required: true },
  stock: { type: Number, default: 0 },
  isAvailable: { type: Boolean, default: true },
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

const seedProducts = [
  {
    name: 'Tropical Glow',
    description: 'A sunny blend of sun-ripened mango, pineapple, and a touch of golden turmeric for anti-inflammatory benefits.',
    price: 3500,
    imageUrl: 'https://res.cloudinary.com/zkrczwxc/image/upload/v1725895782/samples/food/dessert.jpg',
    category: 'Smoothies',
    stock: 50,
    isAvailable: true
  },
  {
    name: 'Green Machine',
    description: 'Fuel your day with our signature powerhouse juice: organic kale, spinach, cucumber, green apple, and ginger.',
    price: 4000,
    imageUrl: 'https://res.cloudinary.com/zkrczwxc/image/upload/v1725895782/samples/food/dessert.jpg',
    category: 'Smoothies',
    stock: 50,
    isAvailable: true
  },
  {
    name: 'Berry Blast',
    description: 'Antioxidant-rich fusion of fresh strawberries, blueberries, and raspberries with a smooth creamy base.',
    price: 3800,
    imageUrl: 'https://res.cloudinary.com/zkrczwxc/image/upload/v1725895782/samples/food/dessert.jpg',
    category: 'Smoothies',
    stock: 50,
    isAvailable: true
  },
  {
    name: 'Pineapple Punch',
    description: 'Sweet pineapple mixed with orange and a hint of mint. Refreshing and perfect for a hot day.',
    price: 3000,
    imageUrl: 'https://res.cloudinary.com/zkrczwxc/image/upload/v1725895782/samples/food/dessert.jpg',
    category: 'Smoothies',
    stock: 50,
    isAvailable: true
  },
  {
    name: 'Strawberry Banana',
    description: 'A classic blend of sweet strawberries and creamy banana, perfect for all ages.',
    price: 3200,
    imageUrl: 'https://res.cloudinary.com/zkrczwxc/image/upload/v1725895782/samples/food/dessert.jpg',
    category: 'Smoothies',
    stock: 50,
    isAvailable: true
  },
  {
    name: 'Mango Tango',
    description: 'Rich, luscious mango blended with a splash of coconut water.',
    price: 3600,
    imageUrl: 'https://res.cloudinary.com/zkrczwxc/image/upload/v1725895782/samples/food/dessert.jpg',
    category: 'Smoothies',
    stock: 50,
    isAvailable: true
  },
  {
    name: 'Citrus Surge',
    description: 'A vibrant mix of orange, grapefruit, and lemon for a powerful Vitamin C boost.',
    price: 3300,
    imageUrl: 'https://res.cloudinary.com/zkrczwxc/image/upload/v1725895782/samples/food/dessert.jpg',
    category: 'Juices',
    stock: 50,
    isAvailable: true
  },
  {
    name: 'Acai Power Bowl Smoothie',
    description: 'Rich acai blended with mixed berries, topped with a sprinkle of chia seeds.',
    price: 4500,
    imageUrl: 'https://res.cloudinary.com/zkrczwxc/image/upload/v1725895782/samples/food/dessert.jpg',
    category: 'Smoothies',
    stock: 50,
    isAvailable: true
  }
];

async function seed() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    
    console.log('Clearing existing products...');
    await Product.deleteMany({});
    
    console.log(`Inserting ${seedProducts.length} products...`);
    await Product.insertMany(seedProducts);
    
    console.log('Seed completed successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB.');
  }
}

seed();
