const mongoose = require('mongoose');

const uri = "mongodb+srv://abahmarquis_db_user:UJclLglS3QlQhb3Y@lapadia.sc5l7jp.mongodb.net/?appName=lapadia";

async function fix() {
  await mongoose.connect(uri);
  const db = mongoose.connection.db;
  
  // Make Melon a subscription product
  await db.collection('products').updateMany(
    { name: 'Melon' },
    { $set: { productType: 'subscription' } }
  );

  // Make Fruit Bowl and Parfait regular products
  await db.collection('products').updateMany(
    { name: { $in: ['Fruit Bowl', 'Fruit & Granola Parfait'] } },
    { $set: { productType: 'regular' } }
  );
  
  console.log("Fixed product types.");
  process.exit(0);
}

fix().catch(console.error);
