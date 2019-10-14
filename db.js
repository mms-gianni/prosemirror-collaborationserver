var config = require('./config.js')

if (config.mongodb_uri != false) {
  //Set up mongoose connection
  var mongoose = require('mongoose');
  mongoose.connect(config.mongodb_uri, { useNewUrlParser: true });
  var mongodb = mongoose.connection;
  mongodb.on('error', console.error.bind(console, 'MongoDB connection error:'));
}

module.exports = mongodb;