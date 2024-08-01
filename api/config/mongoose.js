import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    console.log(typeof "mongodb+srv://devvatsads25:sFfznA71YRXWqTHc@cluster0.klbb03u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    await mongoose.connect("mongodb+srv://devvatsads25:sFfznA71YRXWqTHc@cluster0.klbb03u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");

    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

export default connectDB;
