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
  addBlog,
  addComment,
  deleteBlogById,
  generateContent,
  getAllBlogs,
  getBlogById,
  getBlogComment,
  togglePublish,
} from '../controllers/blogController.js';
import auth from '../middlewares/auth.js';
import upload from '../middlewares/multer.js';

// Router
const router = express.Router();

// Routes
router.post('/add', upload.single('image'), auth, addBlog);
router.get('/all', getAllBlogs);
router.get('/:blogId', getBlogById);
router.post('/delete', auth, deleteBlogById);
router.post('/toggle-publish', auth, togglePublish);
router.post('/add-comment', addComment);
router.post('/comments', getBlogComment);
router.post('/generate', auth, generateContent);

// Export
export default router;
