/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 11 Jun, 2025
 * @copyright 2025 monayem_hossain_limon
 */

// External Imports
import cors from 'cors';
import express from 'express';

// Internal Imports
import adminRouter from './routes/adminRoutes.js';
import testRouter from './routes/testRoutes.js';

// Express App
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/', testRouter);
app.use('/admin', adminRouter);

// Export
export default app;
