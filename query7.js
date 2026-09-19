const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://abahmarquis_db_user:UJclLglS3QlQhb3Y@lapadia.sc5l7jp.mongodb.net/?appName=lapadia')
  .then(async () => {
    const userSchema = new mongoose.Schema({ name: String });
    const User = mongoose.model('UserTemp', userSchema, 'users');
    try {
      const res = await User.findByIdAndUpdate("BAhCDMkHbmev9odNnffCv3ysb5p2", { $set: { name: 'test' } });
      console.log('Result:', res);
    } catch(e) {
      console.log('Error:', e.name, e.message);
    }
    process.exit(0);
  });
