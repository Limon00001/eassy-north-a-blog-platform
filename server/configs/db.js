/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 11 Jun, 2025
 * @copyright 2025 monayem_hossain_limon
 */

// External Imports
import mongoose from 'mongoose';

// Database Connection
const connectDB = async () => {
  try {
    mongoose.connection.on('connected', () => {
      console.log('Database is connected');
    });
    await mongoose.connect(process.env.MONGODB_URI);
    mongoose.connection.on('error', () => {
      console.log('Database connection error');
    });
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

// Export
export default connectDB;
