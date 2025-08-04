const mongoose = require("mongoose");

const connectDB = async () => {
  // connect to mongoose cluster
  await mongoose.connect(
    "mongodb+srv://kavyachirukuri:oGwB5EkSSI5nNxhy@namastenode.yqqyobt.mongodb.net/devTinder"
  );
};

module.exports = connectDB;
