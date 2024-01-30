const mongoose = require('mongoose');

// Connect to MongoDB
const connectDB = async () => {
  try {
    mongoose.set('strictQuery', false); // To address DeprecationWarning: Mongoose: the `strictQuery` option will be switched back to `false` by default in Mongoose 7...
    await mongoose.connect(process.env.DATABASE_URI)
  } catch (err) {
    console.log(err);
  }
}

module.exports = connectDB
