const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://abahmarquis_db_user:UJclLglS3QlQhb3Y@lapadia.sc5l7jp.mongodb.net/?appName=lapadia')
  .then(async () => {
    const db = mongoose.connection.db;
    const users = await db.collection('users').find({ email: /marquis/i }).toArray();
    console.log("Is ObjectId?", users[0]._id instanceof mongoose.Types.ObjectId);
    console.log("Type of _id:", typeof users[0]._id);
    console.log("_id:", users[0]._id);
    process.exit(0);
  });
