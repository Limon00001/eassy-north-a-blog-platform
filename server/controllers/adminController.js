/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 11 Jun, 2025
 * @copyright 2025 monayem_hossain_limon
 */

// External Imports
import jwt from 'jsonwebtoken';

// Internal Imports
import Blog from '../models/Blog.js';
import Comment from '../models/Comment.js';

// Login Functionality for Admin
const adminLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (
      email !== process.env.ADMIN_EMAIL ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
    });
  } catch (error) {
    next(error);
  }
};

const getAllBlogsAdmin = async (req, res, next) => {
  try {
    const blogs = await Blog.find({}).sort({ createdAt: -1 });

    if (!blogs) {
      return res.status(404).json({
        success: false,
        message: 'No blogs found',
      });
    }

    // Response
    res.status(200).json({
      success: true,
      message: 'Blogs fetched successfully by admin',
      blogs,
    });
  } catch (error) {
    next(error);
  }
};

const getAllComments = async (req, res, next) => {
  try {
    const comments = await Comment.find({})
      .populate('blog')
      .sort({ createdAt: -1 });

    if (!comments) {
      return res.status(404).json({
        success: false,
        message: 'No comments are found',
      });
    }

    // Response
    res.status(200).json({
      success: true,
      message: 'Comments fetched successfully by admin',
      comments,
    });
  } catch (error) {
    next(error);
  }
};

const getDashboard = async (req, res, next) => {
  try {
    // Fetch dashboard data from database with limit
    const recentBlogs = await Blog.find({}).sort({ createdAt: -1 }).limit(5);

    // Count total number of documents
    const blogs = await Blog.countDocuments();

    // Count total number of comments
    const comments = await Comment.countDocuments();

    // Count total number of drafts
    const drafts = await Blog.countDocuments({ isPublished: false });

    // Create dashboard data
    const dashboardData = {
      recentBlogs,
      blogs,
      comments,
      drafts,
    };

    // If dashboard data is not found
    if (!dashboardData) {
      return res.status(404).json({
        success: false,
        message: 'No dashboard data found',
      });
    }

    // Response
    res.status(200).json({
      success: true,
      message: 'Dashboard fetched successfully by admin',
      blogs,
      comments,
    });
  } catch (error) {
    next(error);
  }
};

const deleteCommentById = async (req, res, next) => {
  const { id } = req.body;

  try {
    // Fetch comment
    const comment = await Comment.findById(id);

    // Check if comment exists
    if (!comment) {
      return res.status(404).json({
        success: false,
        message: 'Comment not found',
      });
    }

    // Delete comment
    await Comment.findByIdAndDelete(id);

    // Response
    res.status(200).json({
      success: true,
      message: 'Comment deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

const approvedCommentById = async (req, res, next) => {
  const { id } = req.body;

  try {
    // Fetch comment
    const comment = await Comment.findByIdAndUpdate(id);

    // Check if comment exists
    if (!comment) {
      return res.status(404).json({
        success: false,
        message: 'Comment not found',
      });
    }

    // Approve comment
    await Comment.findByIdAndUpdate(id, { isApproved: true });

    // Response
    res.status(200).json({
      success: true,
      message: 'Comment approved successfully',
    });
  } catch (error) {
    next(error);
  }
};

export {
  adminLogin,
  approvedCommentById,
  deleteCommentById,
  getAllBlogsAdmin,
  getAllComments,
  getDashboard,
};
