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
  nutritionalInfo: { type: Object, default: null },
  allergens: { type: [String], default: [] },
  ingredients: { type: [String], default: [] },
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
    isAvailable: true,
    ingredients: ['Mango', 'Pineapple', 'Turmeric', 'Coconut Milk', 'Honey'],
    allergens: ['Tree Nuts (coconut)'],
    nutritionalInfo: { calories: 220, protein: 3, carbs: 48, fat: 4, fiber: 3, sugar: 38, servingSize: '450ml' }
  },
  {
    name: 'Green Machine',
    description: 'Fuel your day with our signature powerhouse juice: organic kale, spinach, cucumber, green apple, and ginger.',
    price: 4000,
    imageUrl: 'https://res.cloudinary.com/zkrczwxc/image/upload/v1725895782/samples/food/dessert.jpg',
    category: 'Smoothies',
    stock: 50,
    isAvailable: true,
    ingredients: ['Kale', 'Spinach', 'Cucumber', 'Green Apple', 'Ginger', 'Lemon'],
    allergens: [],
    nutritionalInfo: { calories: 150, protein: 5, carbs: 30, fat: 1, fiber: 6, sugar: 18, servingSize: '450ml' }
  },
  {
    name: 'Berry Blast',
    description: 'Antioxidant-rich fusion of fresh strawberries, blueberries, and raspberries with a smooth creamy base.',
    price: 3800,
    imageUrl: 'https://res.cloudinary.com/zkrczwxc/image/upload/v1725895782/samples/food/dessert.jpg',
    category: 'Smoothies',
    stock: 50,
    isAvailable: true,
    ingredients: ['Strawberries', 'Blueberries', 'Raspberries', 'Greek Yogurt', 'Honey'],
    allergens: ['Milk'],
    nutritionalInfo: { calories: 260, protein: 8, carbs: 45, fat: 5, fiber: 7, sugar: 32, servingSize: '450ml' }
  },
  {
    name: 'Pineapple Punch',
    description: 'Sweet pineapple mixed with orange and a hint of mint. Refreshing and perfect for a hot day.',
    price: 3000,
    imageUrl: 'https://res.cloudinary.com/zkrczwxc/image/upload/v1725895782/samples/food/dessert.jpg',
    category: 'Smoothies',
    stock: 50,
    isAvailable: true,
    ingredients: ['Pineapple', 'Orange', 'Fresh Mint', 'Ice', 'Agave Syrup'],
    allergens: [],
    nutritionalInfo: { calories: 180, protein: 2, carbs: 42, fat: 0.5, fiber: 3, sugar: 35, servingSize: '450ml' }
  },
  {
    name: 'Strawberry Banana',
    description: 'A classic blend of sweet strawberries and creamy banana, perfect for all ages.',
    price: 3200,
    imageUrl: 'https://res.cloudinary.com/zkrczwxc/image/upload/v1725895782/samples/food/dessert.jpg',
    category: 'Smoothies',
    stock: 50,
    isAvailable: true,
    ingredients: ['Strawberries', 'Banana', 'Oat Milk', 'Vanilla Extract'],
    allergens: ['Gluten (oat milk)'],
    nutritionalInfo: { calories: 240, protein: 4, carbs: 52, fat: 3, fiber: 5, sugar: 36, servingSize: '450ml' }
  },
  {
    name: 'Mango Tango',
    description: 'Rich, luscious mango blended with a splash of coconut water.',
    price: 3600,
    imageUrl: 'https://res.cloudinary.com/zkrczwxc/image/upload/v1725895782/samples/food/dessert.jpg',
    category: 'Smoothies',
    stock: 50,
    isAvailable: true,
    ingredients: ['Mango', 'Coconut Water', 'Lime Juice', 'Chia Seeds'],
    allergens: [],
    nutritionalInfo: { calories: 200, protein: 3, carbs: 44, fat: 2, fiber: 5, sugar: 34, servingSize: '450ml' }
  },
  {
    name: 'Citrus Surge',
    description: 'A vibrant mix of orange, grapefruit, and lemon for a powerful Vitamin C boost.',
    price: 3300,
    imageUrl: 'https://res.cloudinary.com/zkrczwxc/image/upload/v1725895782/samples/food/dessert.jpg',
    category: 'Juices',
    stock: 50,
    isAvailable: true,
    ingredients: ['Orange', 'Grapefruit', 'Lemon', 'Ginger', 'Raw Honey'],
    allergens: [],
    nutritionalInfo: { calories: 160, protein: 2, carbs: 38, fat: 0.5, fiber: 2, sugar: 30, servingSize: '450ml' }
  },
  {
    name: 'Acai Power Bowl Smoothie',
    description: 'Rich acai blended with mixed berries, topped with a sprinkle of chia seeds.',
    price: 4500,
    imageUrl: 'https://res.cloudinary.com/zkrczwxc/image/upload/v1725895782/samples/food/dessert.jpg',
    category: 'Smoothies',
    stock: 50,
    isAvailable: true,
    ingredients: ['Acai Berry', 'Blueberries', 'Strawberries', 'Banana', 'Almond Milk', 'Chia Seeds', 'Granola'],
    allergens: ['Tree Nuts (almond)', 'Gluten (granola)'],
    nutritionalInfo: { calories: 320, protein: 7, carbs: 55, fat: 9, fiber: 10, sugar: 28, servingSize: '500ml' }
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
