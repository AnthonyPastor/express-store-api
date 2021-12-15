const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    console.log("Connecting to database");

    await mongoose.connect(process.env.MONGO_CNN);

    console.log("Database online!");
  } catch (error) {
    throw new Error(`Error starting data base: ${error}`);
  }
};

module.exports = dbConnection;
