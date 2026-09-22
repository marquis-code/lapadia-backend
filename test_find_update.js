require('dotenv').config();
const mongoose = require('mongoose');

async function run() {
  await mongoose.connect(process.env.MONGODB_URI);
  const SettingSchema = new mongoose.Schema({}, { strict: false });
  const SettingModel = mongoose.model('Setting', SettingSchema);
  
  const count = await SettingModel.countDocuments();
  console.log("Count:", count);
  
  const doc = await SettingModel.findOneAndUpdate({}, { $set: { test: true } }, { new: true, upsert: true }).exec();
  console.log("Updated Doc:", doc);
  
  mongoose.disconnect();
}
run();
