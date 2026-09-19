const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://abahmarquis_db_user:UJclLglS3QlQhb3Y@lapadia.sc5l7jp.mongodb.net/?appName=lapadia')
  .then(async () => {
    const db = mongoose.connection.db;
    const users = await db.collection('users').find({}).toArray();
    console.log("Total users:", users.length);
    console.log(users.map(u => ({ id: u._id, email: u.email })));
    process.exit(0);
  });
