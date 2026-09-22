require('dotenv').config();
const mongoose = require('mongoose');

async function run() {
  await mongoose.connect(process.env.MONGODB_URI);
  const db = mongoose.connection.db;
  await db.collection('settings').deleteMany({});
  console.log("Settings cleared.");
  mongoose.disconnect();
}
run();
