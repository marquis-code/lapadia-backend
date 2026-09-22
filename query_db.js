require('dotenv').config();
const mongoose = require('mongoose');

async function run() {
  await mongoose.connect(process.env.MONGODB_URI);
  const db = mongoose.connection.db;
  const settings = await db.collection('settings').find({}).toArray();
  console.log(JSON.stringify(settings, null, 2));
  mongoose.disconnect();
}
run();
