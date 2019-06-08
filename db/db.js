const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://cluster0-w46tm.mongodb.net/test', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  user:'zi',
  pass:'zi', 
});

mongoose.connection.on('connected', () => {
  console.log('Mongoose is connected')
});

mongoose.connection.on('error', (err) => {
  console.log(err, ' mongoose failed to connect')
});

mongoose.connection.on('disconncted', () => {
  console.log('Mongoose is disconnected')
});