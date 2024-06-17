const mongoose = require('mongoose');
const mongoURI = "mongodb+srv://proshantosaha1999:W0ZsFvmK5dmk5ayU@cluster0.hwzdkym.mongodb.net/employees?retryWrites=true&w=majority";
const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log('Connected to MongoDB');
  } catch (error) {
    throw new Error(`Failed to connect to MongoDB: ${error.message}`);
  }
};

module.exports = connectDB;
