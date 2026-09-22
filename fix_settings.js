require('dotenv').config();
const mongoose = require('mongoose');

async function run() {
  await mongoose.connect(process.env.MONGODB_URI);
  const db = mongoose.connection.db;
  await db.collection('settings').deleteMany({});
  
  const singleton = {
    _id: "singleton",
    subscriptionFrequencies: ["Daily", "Weekly", "Monthly"],
    pickupLocation: "15, Awolowo road",
    possibleMeasurements: ["250CL", "500CL", "1 Litre"],
    deliveryDuration: "30 - 45 Minutes",
    businessNotificationEmail: "",
    supportContacts: [
      {
        name: "Support",
        phone: "2348099431789",
        initials: "S"
      }
    ],
    welcomeModalConfig: {
      title: "Welcome to LapadiaFresh",
      subtitle: "Elevate your healthy lifestyle...",
      carouselTitle: "Explore Our Subscriptions",
      carouselSubtitle: "Swipe to see what's trending",
      featuredItems: []
    }
  };
  
  await db.collection('settings').insertOne(singleton);
  console.log("Settings cleared and singleton inserted.");
  mongoose.disconnect();
}
run();
