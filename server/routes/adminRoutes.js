/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 11 Jun, 2025
 * @copyright 2025 monayem_hossain_limon
 */

// External Imports
import express from 'express';

// Internal Imports
import {
  adminLogin,
  approvedCommentById,
  deleteCommentById,
  getAllBlogsAdmin,
  getAllComments,
  getDashboard,
} from '../controllers/adminController.js';
import auth from '../middlewares/auth.js';

// Router
const router = express.Router();

// Routes
router.post('/login', adminLogin);
router.get('/comments', auth, getAllComments);
router.get('/blogs', auth, getAllBlogsAdmin);
router.post('/delete-comment', auth, deleteCommentById);
router.post('/approve-comment', auth, approvedCommentById);
router.get('/dashboard', auth, getDashboard);

// Export
export default router;
