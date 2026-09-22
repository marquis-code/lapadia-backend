const mongoose = require('mongoose');

const uri = "mongodb+srv://abahmarquis_db_user:UJclLglS3QlQhb3Y@lapadia.sc5l7jp.mongodb.net/?appName=lapadia";

async function check() {
  await mongoose.connect(uri);
  const db = mongoose.connection.db;
  
  const products = await db.collection('products').find({ name: "Fruit & Granola Parfait" }).toArray();
  console.log("Fruit Parfait:", products.map(p => ({ name: p.name, type: p.productType })));
  
  process.exit(0);
}

check().catch(console.error);
