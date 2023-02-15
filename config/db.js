const mongoose = require('mongoose');
require('dotenv').config();

const db = process.env.mongoURI;

const connectDB = async () => {
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(db, {
      useNewUrlParser: true,
    });

    console.log('Mongo DB Connected...');
  } catch (err) {
    console.error(err.message);

    process.exit(1);
  }
};

module.exports = connectDB;
