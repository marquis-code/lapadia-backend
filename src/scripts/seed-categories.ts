import { connect } from 'mongoose';
import { config } from 'dotenv';
import { resolve } from 'path';

config({ path: resolve(__dirname, '../../.env') });

const CategorySchema = new (require('mongoose').Schema)({
  name: String,
  slug: String,
  description: String,
  icon: String,
  color: String,
  isActive: { type: Boolean, default: true },
  sortOrder: { type: Number, default: 0 },
}, { timestamps: true });

async function seed() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('MONGODB_URI not found in .env');
    process.exit(1);
  }
  
  await connect(uri);
  console.log('Connected to MongoDB');

  const Category = require('mongoose').model('Category', CategorySchema);
  
  const existingCount = await Category.countDocuments();
  if (existingCount > 0) {
    console.log(`Already have ${existingCount} categories. Skipping seed.`);
    process.exit(0);
  }

  const categories = [
    {
      name: 'Fresh Smoothies',
      slug: 'fresh-smoothies',
      description: 'Delicious blended smoothies made from fresh fruits and vegetables',
      icon: '🥤',
      color: '#10b981',
      sortOrder: 1,
    },
    {
      name: 'Cold-Pressed Juices',
      slug: 'cold-pressed-juices',
      description: 'Nutrient-rich cold-pressed juices for maximum health benefits',
      icon: '🧃',
      color: '#f59e0b',
      sortOrder: 2,
    },
    {
      name: 'Detox & Cleanse',
      slug: 'detox-cleanse',
      description: 'Cleansing drinks and detox programs for a fresh start',
      icon: '🌿',
      color: '#22c55e',
      sortOrder: 3,
    },
    {
      name: 'Protein Shakes',
      slug: 'protein-shakes',
      description: 'High-protein shakes for fitness and muscle recovery',
      icon: '💪',
      color: '#8b5cf6',
      sortOrder: 4,
    },
    {
      name: 'Fruit Bowls',
      slug: 'fruit-bowls',
      description: 'Beautiful acai bowls and fresh fruit bowls',
      icon: '🍓',
      color: '#ec4899',
      sortOrder: 5,
    },
    {
      name: 'Wellness Shots',
      slug: 'wellness-shots',
      description: 'Concentrated ginger, turmeric, and immunity-boosting shots',
      icon: '⚡',
      color: '#f97316',
      sortOrder: 6,
    },
    {
      name: 'Seasonal Specials',
      slug: 'seasonal-specials',
      description: 'Limited-time offerings featuring seasonal fruits and flavors',
      icon: '🌟',
      color: '#06b6d4',
      sortOrder: 7,
    },
    {
      name: 'Kids Menu',
      slug: 'kids-menu',
      description: 'Fun and nutritious drinks specially crafted for children',
      icon: '🧒',
      color: '#a855f7',
      sortOrder: 8,
    },
  ];

  await Category.insertMany(categories);
  console.log(`✅ Seeded ${categories.length} categories successfully!`);
  process.exit(0);
}

seed().catch(err => {
  console.error('Seed failed:', err);
  process.exit(1);
});
