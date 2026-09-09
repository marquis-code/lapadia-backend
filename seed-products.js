const mongoose = require('mongoose');
require('dotenv').config();

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  imageUrl: String,
  category: String,
  stock: Number,
  isAvailable: Boolean,
  icon: String,
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

const products = [
  { name: 'Organic Red Apples', description: 'Fresh, sweet, and crisp.', price: 4.99, imageUrl: 'default', category: 'Fruits', stock: 50, icon: '🍎' },
  { name: 'Fresh Bananas', description: 'Yellow and ripe.', price: 2.99, imageUrl: 'default', category: 'Fruits', stock: 100, icon: '🍌' },
  { name: 'Whole Milk', description: '1 Gallon of whole milk.', price: 3.49, imageUrl: 'default', category: 'Dairy', stock: 30, icon: '🥛' },
  { name: 'Sourdough Bread', description: 'Freshly baked.', price: 5.99, imageUrl: 'default', category: 'Pantry', stock: 20, icon: '🍞' },
  { name: 'Free Range Eggs', description: '1 Dozen large eggs.', price: 4.50, imageUrl: 'default', category: 'Dairy', stock: 40, icon: '🥚' },
  { name: 'Avocado', description: 'Perfectly ripe avocado.', price: 1.99, imageUrl: 'default', category: 'Produce', stock: 60, icon: '🥑' },
  { name: 'Carrots', description: 'Crunchy organic carrots.', price: 2.49, imageUrl: 'default', category: 'Produce', stock: 80, icon: '🥕' },
  { name: 'Chicken Breast', description: 'Boneless, skinless chicken.', price: 8.99, imageUrl: 'default', category: 'Meat', stock: 25, icon: '🥩' },
  { name: 'Fresh Strawberries', description: 'Sweet and juicy strawberries.', price: 4.99, imageUrl: 'default', category: 'Fruits', stock: 40, icon: '🍓' },
  { name: 'Broccoli', description: 'Fresh green broccoli.', price: 2.29, imageUrl: 'default', category: 'Produce', stock: 50, icon: '🥦' },
  { name: 'Salmon Fillet', description: 'Fresh Atlantic Salmon.', price: 12.99, imageUrl: 'default', category: 'Meat', stock: 15, icon: '🐟' },
  { name: 'Cheddar Cheese', description: 'Sharp cheddar cheese block.', price: 4.99, imageUrl: 'default', category: 'Dairy', stock: 35, icon: '🧀' },
  { name: 'Orange Juice', description: '100% natural orange juice.', price: 3.99, imageUrl: 'default', category: 'Beverages', stock: 45, icon: '🧃' },
  { name: 'Ground Beef', description: 'Lean ground beef.', price: 6.99, imageUrl: 'default', category: 'Meat', stock: 30, icon: '🥩' },
  { name: 'Potatoes', description: 'Bag of russet potatoes.', price: 3.49, imageUrl: 'default', category: 'Produce', stock: 70, icon: '🥔' },
  { name: 'Onions', description: 'Yellow onions.', price: 1.99, imageUrl: 'default', category: 'Produce', stock: 90, icon: '🧅' },
  { name: 'Tomatoes', description: 'Ripe vine tomatoes.', price: 2.99, imageUrl: 'default', category: 'Produce', stock: 60, icon: '🍅' },
  { name: 'Coffee Beans', description: 'Dark roast coffee beans.', price: 9.99, imageUrl: 'default', category: 'Pantry', stock: 25, icon: '☕' },
  { name: 'Green Tea', description: 'Organic green tea bags.', price: 4.49, imageUrl: 'default', category: 'Pantry', stock: 40, icon: '🍵' },
  { name: 'Honey', description: 'Raw organic honey.', price: 6.49, imageUrl: 'default', category: 'Pantry', stock: 20, icon: '🍯' },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    
    await Product.deleteMany({});
    console.log('Cleared existing products');
    
    await Product.insertMany(products);
    console.log(`Seeded ${products.length} products successfully!`);
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
}

seed();
