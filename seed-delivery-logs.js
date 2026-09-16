const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/lapadia';

async function seedDeliveryLogs() {
  try {
    await mongoose.connect(uri);
    console.log('Connected to DB');

    const db = mongoose.connection.db;

    // Get some user subscriptions
    const subscriptions = await db.collection('subscriptions').find({}).toArray();

    if (subscriptions.length === 0) {
      console.log('No subscriptions found. Please seed subscriptions first.');
      process.exit(0);
    }

    let updatedCount = 0;

    for (const sub of subscriptions) {
      // Add 2-3 sample delivery logs
      const sampleLogs = [
        {
          date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
          status: 'Delivered',
          notes: 'Package left at front door.'
        },
        {
          date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), // 14 days ago
          status: 'Delivered',
          notes: 'Handed directly to customer.'
        },
        {
          date: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000), // 21 days ago
          status: 'Delivered',
          notes: 'Customer was not home, left with security.'
        }
      ];

      // Add a pending one for the next delivery if active
      if (sub.status === 'active') {
        sampleLogs.unshift({
          date: new Date(),
          status: 'Processing',
          notes: 'Preparing the fresh items for delivery.'
        });
      }

      await db.collection('subscriptions').updateOne(
        { _id: sub._id },
        { $set: { deliveryLogs: sampleLogs } }
      );
      
      updatedCount++;
    }

    console.log(`Successfully seeded delivery logs for ${updatedCount} subscriptions.`);
    process.exit(0);
  } catch (error) {
    console.error('Error seeding delivery logs:', error);
    process.exit(1);
  }
}

seedDeliveryLogs();
