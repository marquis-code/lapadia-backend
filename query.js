const mongoose = require('mongoose');
const { Schema } = mongoose;

mongoose.connect('mongodb+srv://abahmarquis_db_user:UJclLglS3QlQhb3Y@lapadia.sc5l7jp.mongodb.net/?appName=lapadia')
  .then(async () => {
    const db = mongoose.connection.db;
    const users = await db.collection('users').find({ email: /marquis/i }).toArray();
    console.log(JSON.stringify(users, null, 2));
    process.exit(0);
  });
