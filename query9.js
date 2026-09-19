const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://abahmarquis_db_user:UJclLglS3QlQhb3Y@lapadia.sc5l7jp.mongodb.net/?appName=lapadia')
  .then(async () => {
    const userSchema = new mongoose.Schema({ name: String, savedAddresses: [String] }, { strict: false });
    const User = mongoose.model('UserTemp', userSchema, 'users');
    try {
      const res = await User.findByIdAndUpdate("6aa0a9bcc8a117ec56713801", { $set: { savedAddresses: ['Test Address'] } }, { new: true });
      console.log('Result for update:', res);
    } catch(e) {
      console.log('Error:', e.name, e.message);
    }
    process.exit(0);
  });
