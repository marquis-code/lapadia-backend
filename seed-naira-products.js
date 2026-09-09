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
  // Fruits
  { name: 'Organic Red Apples', description: 'Fresh, sweet, and crisp.', price: 4500, imageUrl: 'default', category: 'Fruits', stock: 50, icon: '🍎' },
  { name: 'Fresh Bananas', description: 'Yellow and ripe.', price: 1500, imageUrl: 'default', category: 'Fruits', stock: 100, icon: '🍌' },
  { name: 'Fresh Strawberries', description: 'Sweet and juicy strawberries.', price: 6500, imageUrl: 'default', category: 'Fruits', stock: 40, icon: '🍓' },
  { name: 'Pineapple', description: 'Tropical and sweet.', price: 3000, imageUrl: 'default', category: 'Fruits', stock: 35, icon: '🍍' },
  { name: 'Watermelon', description: 'Refreshing whole watermelon.', price: 4000, imageUrl: 'default', category: 'Fruits', stock: 20, icon: '🍉' },
  { name: 'Grapes', description: 'Seedless green grapes.', price: 5500, imageUrl: 'default', category: 'Fruits', stock: 45, icon: '🍇' },
  { name: 'Mangoes', description: 'Sweet seasonal mangoes.', price: 2500, imageUrl: 'default', category: 'Fruits', stock: 60, icon: '🥭' },
  { name: 'Oranges', description: 'Juicy citrus oranges.', price: 2000, imageUrl: 'default', category: 'Fruits', stock: 80, icon: '🍊' },

  // Vegetables (Produce)
  { name: 'Avocado', description: 'Perfectly ripe avocado.', price: 2500, imageUrl: 'default', category: 'Produce', stock: 60, icon: '🥑' },
  { name: 'Carrots', description: 'Crunchy organic carrots.', price: 1800, imageUrl: 'default', category: 'Produce', stock: 80, icon: '🥕' },
  { name: 'Broccoli', description: 'Fresh green broccoli.', price: 3500, imageUrl: 'default', category: 'Produce', stock: 50, icon: '🥦' },
  { name: 'Potatoes', description: 'Bag of russet potatoes.', price: 4500, imageUrl: 'default', category: 'Produce', stock: 70, icon: '🥔' },
  { name: 'Onions', description: 'Yellow onions.', price: 2000, imageUrl: 'default', category: 'Produce', stock: 90, icon: '🧅' },
  { name: 'Tomatoes', description: 'Ripe vine tomatoes.', price: 3000, imageUrl: 'default', category: 'Produce', stock: 60, icon: '🍅' },
  { name: 'Bell Peppers', description: 'Mixed color bell peppers.', price: 2500, imageUrl: 'default', category: 'Produce', stock: 40, icon: '🫑' },
  { name: 'Cucumbers', description: 'Crisp green cucumbers.', price: 1500, imageUrl: 'default', category: 'Produce', stock: 55, icon: '🥒' },
  { name: 'Spinach', description: 'Fresh leafy spinach.', price: 1200, imageUrl: 'default', category: 'Produce', stock: 65, icon: '🥬' },

  // Dairy
  { name: 'Whole Milk', description: '1 Gallon of whole milk.', price: 3500, imageUrl: 'default', category: 'Dairy', stock: 30, icon: '🥛' },
  { name: 'Free Range Eggs', description: '1 Dozen large eggs.', price: 4200, imageUrl: 'default', category: 'Dairy', stock: 40, icon: '🥚' },
  { name: 'Cheddar Cheese', description: 'Sharp cheddar cheese block.', price: 5500, imageUrl: 'default', category: 'Dairy', stock: 35, icon: '🧀' },
  { name: 'Greek Yogurt', description: 'Plain unsweetened greek yogurt.', price: 3000, imageUrl: 'default', category: 'Dairy', stock: 25, icon: '🍦' },
  { name: 'Butter', description: 'Salted butter blocks.', price: 4500, imageUrl: 'default', category: 'Dairy', stock: 45, icon: '🧈' },

  // Meat
  { name: 'Chicken Breast', description: 'Boneless, skinless chicken.', price: 8500, imageUrl: 'default', category: 'Meat', stock: 25, icon: '🥩' },
  { name: 'Salmon Fillet', description: 'Fresh Atlantic Salmon.', price: 15000, imageUrl: 'default', category: 'Meat', stock: 15, icon: '🐟' },
  { name: 'Ground Beef', description: 'Lean ground beef.', price: 9000, imageUrl: 'default', category: 'Meat', stock: 30, icon: '🥩' },
  { name: 'Pork Chops', description: 'Thick cut pork chops.', price: 7500, imageUrl: 'default', category: 'Meat', stock: 20, icon: '🍖' },
  { name: 'Turkey Breast', description: 'Sliced deli turkey breast.', price: 6000, imageUrl: 'default', category: 'Meat', stock: 35, icon: '🦃' },

  // Pantry
  { name: 'Sourdough Bread', description: 'Freshly baked.', price: 3500, imageUrl: 'default', category: 'Pantry', stock: 20, icon: '🍞' },
  { name: 'Coffee Beans', description: 'Dark roast coffee beans.', price: 8500, imageUrl: 'default', category: 'Pantry', stock: 25, icon: '☕' },
  { name: 'Green Tea', description: 'Organic green tea bags.', price: 4000, imageUrl: 'default', category: 'Pantry', stock: 40, icon: '🍵' },
  { name: 'Honey', description: 'Raw organic honey.', price: 6500, imageUrl: 'default', category: 'Pantry', stock: 20, icon: '🍯' },
  { name: 'Olive Oil', description: 'Extra virgin olive oil.', price: 12000, imageUrl: 'default', category: 'Pantry', stock: 30, icon: '🫒' },
  { name: 'Pasta', description: 'Italian spaghetti pasta.', price: 2500, imageUrl: 'default', category: 'Pantry', stock: 60, icon: '🍝' },
  { name: 'White Rice', description: 'Long grain white rice (5kg).', price: 9500, imageUrl: 'default', category: 'Pantry', stock: 15, icon: '🍚' },
  { name: 'Oats', description: 'Rolled oats for breakfast.', price: 3000, imageUrl: 'default', category: 'Pantry', stock: 45, icon: '🥣' },

  // Beverages
  { name: 'Orange Juice', description: '100% natural orange juice.', price: 4500, imageUrl: 'default', category: 'Beverages', stock: 45, icon: '🧃' },
  { name: 'Spring Water', description: 'Pack of 12 bottled water.', price: 3500, imageUrl: 'default', category: 'Beverages', stock: 100, icon: '💧' },
  { name: 'Apple Juice', description: 'Fresh apple juice.', price: 4000, imageUrl: 'default', category: 'Beverages', stock: 40, icon: '🧃' },
  { name: 'Sparkling Water', description: 'Carbonated sparkling water.', price: 2500, imageUrl: 'default', category: 'Beverages', stock: 50, icon: '🍾' },

  // Snacks
  { name: 'Potato Chips', description: 'Salted potato chips.', price: 1500, imageUrl: 'default', category: 'Snacks', stock: 70, icon: '🥔' },
  { name: 'Mixed Nuts', description: 'Roasted mixed nuts.', price: 6000, imageUrl: 'default', category: 'Snacks', stock: 30, icon: '🥜' },
  { name: 'Dark Chocolate', description: '70% cocoa dark chocolate.', price: 3500, imageUrl: 'default', category: 'Snacks', stock: 40, icon: '🍫' }
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    
    await Product.deleteMany({});
    console.log('Cleared existing products');
    
    await Product.insertMany(products);
    console.log(`Seeded ${products.length} products successfully with Naira pricing!`);
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
}

seed();
