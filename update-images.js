const mongoose = require('mongoose');
require('dotenv').config();

const Product = mongoose.model('Product', new mongoose.Schema({}, { strict: false }));

const updates = [
  { name: "Nuts, Fruits and Granola Parfait 16oz", url: "/img/product4.jpg" },
  { name: "Apple and pineapple parfait 16oz", url: "/img/product5.jpg" },
  { name: "Berry bliss (50cl)", url: "/img/product8.jpg" },
  { name: "Avocado delight (50cl)", url: "/img/product6.avif" }
];

const run = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  for (const item of updates) {
    await Product.updateOne({ name: item.name }, { $set: { images: [item.url], imageUrl: item.url } });
  }
  console.log('Updated DB images');
  process.exit(0);
};

run();
