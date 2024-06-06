const mongoose = require("mongoose");
const mongoURI =
  "mongodb+srv://rupalbohra4:2Pd$2Ob&@cluster0.gymj3o2.mongodb.net/";

const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("Connected");
  } catch (error) {
    console.log("MongoDB is not connected!");
  }
};

module.exports = mongoDB;
