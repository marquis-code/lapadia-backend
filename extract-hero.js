const mongoose = require('mongoose');
require('dotenv').config();
const fs = require('fs');
const path = require('path');

const ProductSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  category: String,
  images: [String]
}, { strict: false });

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

const extract = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to DB');
    
    // Fetch 4 specific products or just 4 random products
    // Based on previous JSON: Nuts, Fruits and Granola Parfait 16oz, Apple and pineapple parfait 16oz, Berry bliss (50cl), Avocado delight (50cl)
    const names = [
      "Nuts, Fruits and Granola Parfait 16oz",
      "Apple and pineapple parfait 16oz",
      "Berry bliss (50cl)",
      "Avocado delight (50cl)"
    ];
    
    const products = await Product.find({ name: { $in: names } }).lean();
    
    // If not all 4 found, just get any 4
    let finalProducts = products;
    if (finalProducts.length < 4) {
      const more = await Product.find({ _id: { $nin: products.map(p => p._id) } }).limit(4 - finalProducts.length).lean();
      finalProducts = [...finalProducts, ...more];
    }
    
    // map to required fields
    const heroData = finalProducts.map(p => ({
      _id: p._id.toString(),
      id: p._id.toString(),
      name: p.name,
      description: p.description,
      price: p.price,
      category: p.category,
      imageUrl: p.images && p.images.length > 0 ? p.images[0] : ''
    }));
    
    const outPath = path.join(__dirname, '../website/data/hero-products.json');
    fs.writeFileSync(outPath, JSON.stringify(heroData, null, 2));
    
    console.log('Wrote hero-products.json with actual DB data');
    
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

extract();
