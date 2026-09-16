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

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

const products = [
  { name: 'Nuts, Fruits and Granola Parfait 16oz', description: 'Delicious blend of nuts, fruits, and granola.', price: 8500, imageUrl: 'default', category: 'Parfaits', stock: 50, icon: '🍨' },
  { name: 'Apple and pineapple parfait 16oz', description: 'Fresh apple and pineapple parfait.', price: 6500, imageUrl: 'default', category: 'Parfaits', stock: 50, icon: '🍨' },
  { name: 'Berry bliss (50cl)', description: 'Refreshing berry smoothie.', price: 7000, imageUrl: 'default', category: 'Smoothies', stock: 50, icon: '🥤' },
  { name: 'Avocado delight (50cl)', description: 'Creamy avocado smoothie.', price: 6500, imageUrl: 'default', category: 'Smoothies', stock: 50, icon: '🥤' },
  { name: 'Pina colada smoothie (50cl)', description: 'Tropical pina colada smoothie.', price: 6500, imageUrl: 'default', category: 'Smoothies', stock: 50, icon: '🥤' },
  { name: 'Pineapple Juice (50cl)', description: 'Freshly squeezed pineapple juice.', price: 6000, imageUrl: 'default', category: 'Juices', stock: 50, icon: '🧃' },
  { name: 'Orange Juice (50cl)', description: 'Freshly squeezed orange juice.', price: 6000, imageUrl: 'default', category: 'Juices', stock: 50, icon: '🧃' },
  { name: 'Watermelon Juice (50cl)', description: 'Refreshing watermelon juice.', price: 5500, imageUrl: 'default', category: 'Juices', stock: 50, icon: '🧃' },
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
