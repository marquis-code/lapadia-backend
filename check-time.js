const mongoose = require('mongoose');

const uri = "mongodb+srv://abahmarquis_db_user:UJclLglS3QlQhb3Y@lapadia.sc5l7jp.mongodb.net/?appName=lapadia";

async function check() {
  await mongoose.connect(uri);
  const db = mongoose.connection.db;
  
  const products = await db.collection('products').find().sort({createdAt: -1}).limit(5).toArray();
  for (const p of products) {
    console.log(`Name: ${p.name}, Type: ${p.productType}, Created: ${p.createdAt}`);
  }
  
  process.exit(0);
}

check().catch(console.error);
