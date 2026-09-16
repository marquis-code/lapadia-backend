const mongoose = require('mongoose');
require('dotenv').config();

const CategorySchema = new mongoose.Schema({
  name: String,
  slug: String,
  description: String,
  icon: String,
  color: String,
  isActive: { type: Boolean, default: true },
  sortOrder: { type: Number, default: 0 },
}, { timestamps: true });

const Category = mongoose.models.Category || mongoose.model('Category', CategorySchema);

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to DB');
    
    await Category.deleteMany({});
    console.log('Cleared existing categories');
    
    const categories = [
      {
        name: 'Smoothies',
        slug: 'smoothies',
        description: 'Delicious blended smoothies made from fresh fruits and vegetables',
        icon: '🥤',
        color: '#10b981',
        sortOrder: 1,
      },
      {
        name: 'Juices',
        slug: 'juices',
        description: 'Nutrient-rich juices for maximum health benefits',
        icon: '🧃',
        color: '#f59e0b',
        sortOrder: 2,
      },
      {
        name: 'Parfaits',
        slug: 'parfaits',
        description: 'Healthy and tasty fruit and yogurt parfaits',
        icon: '🍨',
        color: '#8b5cf6',
        sortOrder: 3,
      },
      {
        name: 'Fruit Bowls',
        slug: 'fruit-bowls',
        description: 'Beautiful fresh fruit bowls',
        icon: '🍓',
        color: '#ec4899',
        sortOrder: 4,
      },
      {
        name: 'Detox',
        slug: 'detox',
        description: 'Cleansing drinks for a fresh start',
        icon: '🌿',
        color: '#22c55e',
        sortOrder: 5,
      },
      {
        name: 'Meals',
        slug: 'meals',
        description: 'Healthy meal options',
        icon: '🥗',
        color: '#f97316',
        sortOrder: 6,
      }
    ];

    await Category.insertMany(categories);
    console.log(`✅ Seeded ${categories.length} categories successfully!`);
    
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('Seed failed:', error);
    process.exit(1);
  }
};

seed();
