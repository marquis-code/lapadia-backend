const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://abahmarquis_db_user:UJclLglS3QlQhb3Y@lapadia.sc5l7jp.mongodb.net/?appName=lapadia')
  .then(async () => {
    const userSchema = new mongoose.Schema({ name: String });
    const User = mongoose.model('UserTemp', userSchema);
    try {
      const res = await User.findByIdAndUpdate(null, { $set: { name: 'test' } });
      console.log('Result for null:', res);
    } catch(e) {
      console.log('Error for null:', e.name);
    }
    try {
      const res2 = await User.findByIdAndUpdate(undefined, { $set: { name: 'test' } });
      console.log('Result for undefined:', res2);
    } catch(e) {
      console.log('Error for undefined:', e.name);
    }
    process.exit(0);
  });
