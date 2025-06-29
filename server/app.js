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
import errorHandler from './middlewares/error.js';
import adminRouter from './routes/adminRoutes.js';
import blogRouter from './routes/blogRoutes.js';
import testRouter from './routes/testRoutes.js';

// Express App
const app = express();

// Middlewares
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/', testRouter);
app.use('/api/admin', adminRouter);
app.use('/api/blog', blogRouter);

// Error Handler
app.use(errorHandler);

// Export
export default app;
