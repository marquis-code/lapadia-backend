const mongoose = require('mongoose');

const uri = "mongodb+srv://abahmarquis_db_user:UJclLglS3QlQhb3Y@lapadia.sc5l7jp.mongodb.net/?appName=lapadia";

async function check() {
  await mongoose.connect(uri);
  const db = mongoose.connection.db;
  
  const products = await db.collection('products').find({ productType: 'subscription' }).toArray();
  console.log("Subscription Products count:", products.length);
  for (const p of products) {
    if (p.name.includes("Beet")) {
      console.log("FOUND BEET IN SUBSCRIPTION QUERY!?", p.name, p.productType);
    }
  }
  
  process.exit(0);
}

check().catch(console.error);
