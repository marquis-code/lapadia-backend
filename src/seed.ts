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
    name: 'Organic Red Apples',
    description: 'Crisp, sweet, and locally sourced organic red apples. Perfect for a healthy snack or baking.',
    price: 4500,
    imageUrl: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6fd6c?auto=format&fit=crop&w=600&q=80',
    category: 'Produce',
    stock: 150,
    isAvailable: true
  },
  {
    name: 'Fresh Bananas (Bunch)',
    description: 'A bunch of naturally ripened yellow bananas. Rich in potassium and great for smoothies.',
    price: 1500,
    imageUrl: 'https://images.unsplash.com/photo-1603833665858-e61d17a86224?auto=format&fit=crop&w=600&q=80',
    category: 'Produce',
    stock: 80,
    isAvailable: true
  },
  {
    name: 'Farm Fresh Eggs (1 Crate)',
    description: '30 large, farm-fresh eggs from free-range hens.',
    price: 4200,
    imageUrl: 'https://images.unsplash.com/photo-1587486913049-53fc88980cfc?auto=format&fit=crop&w=600&q=80',
    category: 'Dairy & Eggs',
    stock: 45,
    isAvailable: true
  },
  {
    name: 'Whole Milk (1L)',
    description: 'Rich and creamy whole milk, pasteurized and homogenized.',
    price: 1200,
    imageUrl: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=600&q=80',
    category: 'Dairy & Eggs',
    stock: 100,
    isAvailable: true
  },
  {
    name: 'Avocado (3-Pack)',
    description: 'Perfectly ripe Hass avocados, ready for your morning toast or guacamole.',
    price: 3500,
    imageUrl: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=600&q=80',
    category: 'Produce',
    stock: 60,
    isAvailable: true
  },
  {
    name: 'Fresh Strawberries (500g)',
    description: 'Sweet and juicy strawberries, hand-picked at peak ripeness.',
    price: 6500,
    imageUrl: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=600&q=80',
    category: 'Produce',
    stock: 30,
    isAvailable: true
  },
  {
    name: 'Premium Sliced Bread',
    description: 'Soft, freshly baked premium white sliced bread.',
    price: 900,
    imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80',
    category: 'Bakery',
    stock: 120,
    isAvailable: true
  },
  {
    name: 'Atlantic Salmon Fillet (1kg)',
    description: 'Fresh, premium quality Atlantic salmon, rich in Omega-3.',
    price: 15000,
    imageUrl: 'https://images.unsplash.com/photo-1485921325833-c519f76c4927?auto=format&fit=crop&w=600&q=80',
    category: 'Meat & Seafood',
    stock: 25,
    isAvailable: true
  },
  {
    name: 'Chicken Breast (1kg)',
    description: 'Lean, boneless, and skinless chicken breasts.',
    price: 4800,
    imageUrl: 'https://images.unsplash.com/photo-1604503468506-a8da13d12791?auto=format&fit=crop&w=600&q=80',
    category: 'Meat & Seafood',
    stock: 55,
    isAvailable: true
  },
  {
    name: 'Organic Carrots (1kg)',
    description: 'Crunchy, sweet organic carrots great for snacking or stews.',
    price: 1200,
    imageUrl: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=600&q=80',
    category: 'Produce',
    stock: 90,
    isAvailable: true
  },
  {
    name: 'Tomatoes (Basket)',
    description: 'Freshly harvested, vine-ripened red tomatoes.',
    price: 3000,
    imageUrl: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80',
    category: 'Produce',
    stock: 40,
    isAvailable: true
  },
  {
    name: 'Red Onions (1kg)',
    description: 'Pungent and flavorful red onions, essential for everyday cooking.',
    price: 1800,
    imageUrl: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=600&q=80',
    category: 'Produce',
    stock: 75,
    isAvailable: true
  },
  {
    name: 'Long Grain Rice (5kg)',
    description: 'Premium quality parboiled long grain rice, non-sticky and fluffy.',
    price: 7500,
    imageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e8ac?auto=format&fit=crop&w=600&q=80',
    category: 'Pantry',
    stock: 200,
    isAvailable: true
  },
  {
    name: 'Vegetable Oil (3L)',
    description: 'Pure and healthy vegetable cooking oil, cholesterol-free.',
    price: 8500,
    imageUrl: 'https://images.unsplash.com/photo-1620706857370-e1b9770e8bb1?auto=format&fit=crop&w=600&q=80',
    category: 'Pantry',
    stock: 85,
    isAvailable: true
  },
  {
    name: 'Irish Potatoes (2kg)',
    description: 'Fresh and versatile Irish potatoes for boiling, frying, or mashing.',
    price: 2500,
    imageUrl: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=600&q=80',
    category: 'Produce',
    stock: 65,
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
