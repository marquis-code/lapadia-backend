const mongoose = require('mongoose');

const uri = "mongodb+srv://abahmarquis_db_user:UJclLglS3QlQhb3Y@lapadia.sc5l7jp.mongodb.net/?appName=lapadia";

async function fix() {
  await mongoose.connect(uri);
  const db = mongoose.connection.db;
  
  const products = await db.collection('products').find({}).toArray();
  
  const groups = {};
  const toDelete = [];
  
  for (const p of products) {
    if (p.name.includes(' (Cup)') || p.name.includes(' (Litre)')) {
      const baseName = p.name.replace(' (Cup)', '').replace(' (Litre)', '');
      if (!groups[baseName]) {
        groups[baseName] = {
          ...p,
          _id: new mongoose.Types.ObjectId(), // new id
          name: baseName,
          variants: []
        };
      }
      
      const measurement = p.name.includes(' (Cup)') ? 'Cup' : 'Litre';
      groups[baseName].variants.push({
        measurement,
        price: p.price,
        stock: p.stock || 100
      });
      
      toDelete.push(p._id);
    }
  }
  
  const newProducts = Object.values(groups);
  for (const p of newProducts) {
    // sort variants so Cup is first
    p.variants.sort((a, b) => a.measurement === 'Cup' ? -1 : 1);
    p.price = p.variants[0].price; // set base price to lowest/first variant
  }
  
  if (newProducts.length > 0) {
    await db.collection('products').insertMany(newProducts);
    console.log(`Inserted ${newProducts.length} combined products`);
  }
  
  if (toDelete.length > 0) {
    await db.collection('products').deleteMany({ _id: { $in: toDelete } });
    console.log(`Deleted ${toDelete.length} old products`);
  }
  
  process.exit(0);
}

fix().catch(console.error);
