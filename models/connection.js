const mongoose = require('mongoose');

const connectionString = 'mongodb+srv://aymericsimao:fXc5n1kKQ87U2LDE@cluster0.wjnmekf.mongodb.net/locapic4';

mongoose.connect(connectionString, { connectTimeoutMS: 2000 })
  .then(() => console.log('Database connected'))
  .catch(error => console.error(error));
