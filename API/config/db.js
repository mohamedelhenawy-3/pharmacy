const mongoose = require("mongoose");

//  wait data from database async
module.exports = connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost/Pharmacy");
    console.log("Connected to MongoDB...");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
