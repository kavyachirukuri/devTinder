const mongoose = require('mongoose');

const connectDB = async () => {
  // connect to mongoose cluster
  console.log(process.env.DB_CONNECTION_SECRET);
  await mongoose.connect(process.env.DB_CONNECTION_SECRET);
};

module.exports = connectDB;
