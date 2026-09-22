const mongoose = require('mongoose');
const uri = "mongodb+srv://abahmarquis_db_user:UJclLglS3QlQhb3Y@lapadia.sc5l7jp.mongodb.net/?appName=lapadia";
async function check() {
  await mongoose.connect(uri);
  const products = await mongoose.connection.db.collection('products').find({ name: /Just Beet It/ }).toArray();
  console.log("Just Beet It:", products.map(p => ({ name: p.name, type: p.productType })));
  process.exit(0);
}
check().catch(console.error);
