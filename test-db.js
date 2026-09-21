const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/lapadia-fresh').then(async () => {
  const db = mongoose.connection.db;
  const products = await db.collection('products').find({}).toArray();
  console.log(products.map(p => ({ name: p.name, type: p.productType })));
  process.exit(0);
});
