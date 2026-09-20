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
  // JUICY CATEGORY
  {
    name: 'Orange/Watermelon/Cucumber Juice (Cup)',
    description: 'Refreshing blend of orange, watermelon, and cucumber in a cup size.',
    price: 7000,
    imageUrl: 'https://res.cloudinary.com/zkrczwxc/image/upload/v1725895782/samples/food/dessert.jpg',
    category: 'Juicy',
    stock: 100,
    isAvailable: true,
    ingredients: ['Orange', 'Watermelon', 'Cucumber'],
  },
  {
    name: 'Orange/Watermelon/Cucumber Juice (Litre)',
    description: 'Refreshing blend of orange, watermelon, and cucumber in a litre size.',
    price: 14000,
    imageUrl: 'https://res.cloudinary.com/zkrczwxc/image/upload/v1725895782/samples/food/dessert.jpg',
    category: 'Juicy',
    stock: 50,
    isAvailable: true,
    ingredients: ['Orange', 'Watermelon', 'Cucumber'],
  },
  {
    name: 'Pineapple Juice (Cup)',
    description: 'Fresh pineapple juice in a cup size.',
    price: 7500,
    imageUrl: 'https://res.cloudinary.com/zkrczwxc/image/upload/v1725895782/samples/food/dessert.jpg',
    category: 'Juicy',
    stock: 100,
    isAvailable: true,
    ingredients: ['Pineapple'],
  },
  {
    name: 'Pineapple Juice (Litre)',
    description: 'Fresh pineapple juice in a litre size.',
    price: 15000,
    imageUrl: 'https://res.cloudinary.com/zkrczwxc/image/upload/v1725895782/samples/food/dessert.jpg',
    category: 'Juicy',
    stock: 50,
    isAvailable: true,
    ingredients: ['Pineapple'],
  },
  {
    name: 'Tigernut Drink (Cup)',
    description: 'Nourishing tigernut drink in a cup size.',
    price: 7500,
    imageUrl: 'https://res.cloudinary.com/zkrczwxc/image/upload/v1725895782/samples/food/dessert.jpg',
    category: 'Juicy',
    stock: 100,
    isAvailable: true,
    ingredients: ['Tigernut'],
  },
  {
    name: 'Tigernut Drink (Litre)',
    description: 'Nourishing tigernut drink in a litre size.',
    price: 15000,
    imageUrl: 'https://res.cloudinary.com/zkrczwxc/image/upload/v1725895782/samples/food/dessert.jpg',
    category: 'Juicy',
    stock: 50,
    isAvailable: true,
    ingredients: ['Tigernut'],
  },
  {
    name: 'Cool Refresh (Cup)',
    description: 'A cool mix of Apple, Watermelon, and Cucumber in a cup size.',
    price: 7000,
    imageUrl: 'https://res.cloudinary.com/zkrczwxc/image/upload/v1725895782/samples/food/dessert.jpg',
    category: 'Juicy',
    stock: 100,
    isAvailable: true,
    ingredients: ['Apple', 'Watermelon', 'Cucumber'],
  },
  {
    name: 'Cool Refresh (Litre)',
    description: 'A cool mix of Apple, Watermelon, and Cucumber in a litre size.',
    price: 14000,
    imageUrl: 'https://res.cloudinary.com/zkrczwxc/image/upload/v1725895782/samples/food/dessert.jpg',
    category: 'Juicy',
    stock: 50,
    isAvailable: true,
    ingredients: ['Apple', 'Watermelon', 'Cucumber'],
  },
  {
    name: 'Apple Juice (Cup)',
    description: 'Pure apple juice in a cup size.',
    price: 12000,
    imageUrl: 'https://res.cloudinary.com/zkrczwxc/image/upload/v1725895782/samples/food/dessert.jpg',
    category: 'Juicy',
    stock: 100,
    isAvailable: true,
    ingredients: ['Apple'],
  },
  {
    name: 'Apple Juice (Litre)',
    description: 'Pure apple juice in a litre size.',
    price: 24500,
    imageUrl: 'https://res.cloudinary.com/zkrczwxc/image/upload/v1725895782/samples/food/dessert.jpg',
    category: 'Juicy',
    stock: 50,
    isAvailable: true,
    ingredients: ['Apple'],
  },
  {
    name: 'Immunity & Beauty Shots',
    description: 'Concentrated shots for immunity and beauty.',
    price: 5000,
    imageUrl: 'https://res.cloudinary.com/zkrczwxc/image/upload/v1725895782/samples/food/dessert.jpg',
    category: 'Juicy',
    stock: 200,
    isAvailable: true,
    ingredients: [],
  },

  // VEGGIE DRINKS CATEGORY
  {
    name: 'Greens (Cup)',
    description: 'Healthy green blend in a cup size.',
    price: 7500,
    imageUrl: 'https://res.cloudinary.com/zkrczwxc/image/upload/v1725895782/samples/food/dessert.jpg',
    category: 'Veggie Drinks',
    stock: 100,
    isAvailable: true,
    ingredients: ['Cucumber', 'Celery', 'Parsley/Spinach', 'Apple', 'Lemon/Lime', 'Banana'],
  },
  {
    name: 'Greens (Litre)',
    description: 'Healthy green blend in a litre size.',
    price: 15000,
    imageUrl: 'https://res.cloudinary.com/zkrczwxc/image/upload/v1725895782/samples/food/dessert.jpg',
    category: 'Veggie Drinks',
    stock: 50,
    isAvailable: true,
    ingredients: ['Cucumber', 'Celery', 'Parsley/Spinach', 'Apple', 'Lemon/Lime', 'Banana'],
  },
  {
    name: 'Detox Combo (Cup)',
    description: 'Ultimate detox mix in a cup size.',
    price: 7500,
    imageUrl: 'https://res.cloudinary.com/zkrczwxc/image/upload/v1725895782/samples/food/dessert.jpg',
    category: 'Veggie Drinks',
    stock: 100,
    isAvailable: true,
    ingredients: ['Cucumber', 'Carrot', 'Celery', 'Spinach', 'Beetroot', 'Ginger(Lemon)', 'Apple'],
  },
  {
    name: 'Detox Combo (Litre)',
    description: 'Ultimate detox mix in a litre size.',
    price: 15000,
    imageUrl: 'https://res.cloudinary.com/zkrczwxc/image/upload/v1725895782/samples/food/dessert.jpg',
    category: 'Veggie Drinks',
    stock: 50,
    isAvailable: true,
    ingredients: ['Cucumber', 'Carrot', 'Celery', 'Spinach', 'Beetroot', 'Ginger(Lemon)', 'Apple'],
  },
  {
    name: 'Cleanse (Cup)',
    description: 'Purifying cleanse drink in a cup size.',
    price: 7500,
    imageUrl: 'https://res.cloudinary.com/zkrczwxc/image/upload/v1725895782/samples/food/dessert.jpg',
    category: 'Veggie Drinks',
    stock: 100,
    isAvailable: true,
    ingredients: ['Cucumber', 'Carrot', 'Celery', 'Beetroot', 'Lemon/Lime'],
  },
  {
    name: 'Cleanse (Litre)',
    description: 'Purifying cleanse drink in a litre size.',
    price: 15000,
    imageUrl: 'https://res.cloudinary.com/zkrczwxc/image/upload/v1725895782/samples/food/dessert.jpg',
    category: 'Veggie Drinks',
    stock: 50,
    isAvailable: true,
    ingredients: ['Cucumber', 'Carrot', 'Celery', 'Beetroot', 'Lemon/Lime'],
  },
  {
    name: 'Skin Glow (Cup)',
    description: 'Glowing skin formula in a cup size.',
    price: 7500,
    imageUrl: 'https://res.cloudinary.com/zkrczwxc/image/upload/v1725895782/samples/food/dessert.jpg',
    category: 'Veggie Drinks',
    stock: 100,
    isAvailable: true,
    ingredients: ['Carrot', 'Turmeric', 'Cucumber', 'Ginger', 'Lemon'],
  },
  {
    name: 'Skin Glow (Litre)',
    description: 'Glowing skin formula in a litre size.',
    price: 15000,
    imageUrl: 'https://res.cloudinary.com/zkrczwxc/image/upload/v1725895782/samples/food/dessert.jpg',
    category: 'Veggie Drinks',
    stock: 50,
    isAvailable: true,
    ingredients: ['Carrot', 'Turmeric', 'Cucumber', 'Ginger', 'Lemon'],
  },

  // SMOOTHIES CATEGORY
  {
    name: 'Pina Colada (Cup)',
    description: 'Tropical classic smoothie in a cup size.',
    price: 7500,
    imageUrl: 'https://res.cloudinary.com/zkrczwxc/image/upload/v1725895782/samples/food/dessert.jpg',
    category: 'Smoothies',
    stock: 100,
    isAvailable: true,
    ingredients: ['Coconut Milk', 'Banana', 'Pineapple'],
  },
  {
    name: 'Pina Colada (Litre)',
    description: 'Tropical classic smoothie in a litre size.',
    price: 15000,
    imageUrl: 'https://res.cloudinary.com/zkrczwxc/image/upload/v1725895782/samples/food/dessert.jpg',
    category: 'Smoothies',
    stock: 50,
    isAvailable: true,
    ingredients: ['Coconut Milk', 'Banana', 'Pineapple'],
  },
  {
    name: 'Avocado Delight (Cup)',
    description: 'Creamy avocado and apple smoothie in a cup size.',
    price: 7500,
    imageUrl: 'https://res.cloudinary.com/zkrczwxc/image/upload/v1725895782/samples/food/dessert.jpg',
    category: 'Smoothies',
    stock: 100,
    isAvailable: true,
    ingredients: ['Avocado', 'Apple'],
  },
  {
    name: 'Avocado Delight (Litre)',
    description: 'Creamy avocado and apple smoothie in a litre size.',
    price: 15000,
    imageUrl: 'https://res.cloudinary.com/zkrczwxc/image/upload/v1725895782/samples/food/dessert.jpg',
    category: 'Smoothies',
    stock: 50,
    isAvailable: true,
    ingredients: ['Avocado', 'Apple'],
  },
  {
    name: 'Berry Bliss',
    description: 'Sweet berry smoothie full of antioxidants.',
    price: 8000,
    imageUrl: 'https://res.cloudinary.com/zkrczwxc/image/upload/v1725895782/samples/food/dessert.jpg',
    category: 'Smoothies',
    stock: 100,
    isAvailable: true,
    ingredients: ['Strawberries', 'Blueberries', 'Apple', 'Banana/Pineapple'],
  },
  {
    name: 'Just Beet It (Cup)',
    description: 'Rich beet smoothie in a cup size.',
    price: 7500,
    imageUrl: 'https://res.cloudinary.com/zkrczwxc/image/upload/v1725895782/samples/food/dessert.jpg',
    category: 'Smoothies',
    stock: 100,
    isAvailable: true,
    ingredients: ['Beetroot', 'Banana', 'Apple', 'Lemon/Lime', 'Carrot'],
  },
  {
    name: 'Just Beet It (Litre)',
    description: 'Rich beet smoothie in a litre size.',
    price: 15000,
    imageUrl: 'https://res.cloudinary.com/zkrczwxc/image/upload/v1725895782/samples/food/dessert.jpg',
    category: 'Smoothies',
    stock: 50,
    isAvailable: true,
    ingredients: ['Beetroot', 'Banana', 'Apple', 'Lemon/Lime', 'Carrot'],
  },

  // SUBSCRIPTION PACKS CATEGORY
  {
    name: '6 Bottles (250mls) of Any 3 Juices',
    description: 'Any 3 juices (e.g. Watermelon, Pineapple, Cool Refresh). Drinks are made from fruits and vegetables, refrigerate and drink within 3 days.',
    price: 23500,
    imageUrl: 'https://res.cloudinary.com/zkrczwxc/image/upload/v1725895782/samples/food/dessert.jpg',
    category: 'Subscription Packs',
    stock: 200,
    isAvailable: true,
    ingredients: [],
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
