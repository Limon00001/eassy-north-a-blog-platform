/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 11 Jun, 2025
 * @copyright 2025 monayem_hossain_limon
 */

// External Imports
import express from 'express';

// Internal Imports
import { addBlog } from '../controllers/blogController.js';
import upload from '../middlewares/multer.js';

// Router
const router = express.Router();

// Routes
router.post('/add', upload.single('image'), addBlog);

// Export
export default router;
