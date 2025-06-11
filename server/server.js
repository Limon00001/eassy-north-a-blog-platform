/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 11 Jun, 2025
 * @copyright 2025 monayem_hossain_limon
 */

// External Imports
import dotenv from 'dotenv';

// Internal Imports
import app from './app.js';
import connectDB from './configs/db.js';

// Environment Configuration
dotenv.config();

// Port
const port = process.env.PORT || 5001;

// Start Server
app.listen(port, async () => {
  await connectDB();
  console.log(`Server is running on port ${port}`);
});
