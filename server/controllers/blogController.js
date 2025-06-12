/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 11 Jun, 2025
 * @copyright 2025 monayem_hossain_limon
 */

// External Imports
import fs from 'fs';

// Internal Imports
import main from '../configs/gemini.js';
import imagekit from '../configs/imageKit.js';
import Blog from '../models/Blog.js';
import Comment from '../models/Comment.js';
import getImageKitId from '../utils/getImageKitId.js';

// Add Blog
const addBlog = async (req, res, next) => {
  try {
    const { title, subTitle, description, category, isPublished } = JSON.parse(
      req.body.blog,
    );
    const imageFile = req.file;

    // Check if all required fields are present
    if (!title || !description || !category || !imageFile) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields',
      });
    }

    // Read image file
    const fileBuffer = fs.readFileSync(imageFile.path);

    // Upload image to ImageKit
    const response = await imagekit.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
      folder: '/blogs',
    });

    // Optimize image
    const optimizedImageUrl = await imagekit.url({
      path: response.filePath,
      transformation: [
        { quality: 'auto' }, // Optimize image quality
        { format: 'webp' }, // Convert image to WebP
        { width: '1280' }, // Optimize image width
      ],
    });

    const image = optimizedImageUrl;

    // Save blog to database
    const newBlog = await Blog.create({
      title,
      subTitle,
      description,
      category,
      image,
      isPublished,
    });

    // Response
    res
      .status(201)
      .json({ success: true, message: 'Blog created', blog: newBlog });
  } catch (error) {
    next(error);
  }
};

// Get All Blogs
const getAllBlogs = async (req, res, next) => {
  try {
    // Fetch all blogs
    const blogs = await Blog.find({ isPublished: true });

    // Response
    res
      .status(200)
      .json({ success: true, message: 'All blogs fetched', blogs });
  } catch (error) {
    next(error);
  }
};

// Get Individual Blog By Id
const getBlogById = async (req, res, next) => {
  const { blogId } = req.params;

  try {
    // Fetch blog
    const blog = await Blog.findById(blogId);

    // Check if blog exists
    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: 'Blog not found' });
    }

    // Response
    res.status(200).json({ success: true, message: 'Blog fetched', blog });
  } catch (error) {
    next(error);
  }
};

// Delete a Single Blog
const deleteBlogById = async (req, res, next) => {
  const { id } = req.body;

  try {
    // Fetch blog
    const blog = await Blog.findById(id);

    // Check if blog exists
    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: 'Blog not found' });
    }

    // Delete image from ImageKit
    if (blog.image) {
      try {
        const fileId = getImageKitId(blog.image);

        if (!fileId) {
          return;
        } else {
          try {
            await imagekit.deleteFile(fileId);
          } catch (deleteError) {
            console.error('Error in image deletion process:', deleteError);
          }
        }
      } catch (error) {
        console.error('Error in image deletion process:', error);
      }
    }

    // Delete blog
    await Blog.findByIdAndDelete(id);

    // Delete comments associated with the blog
    await Comment.deleteMany({ blog: id });

    // Response
    res
      .status(200)
      .json({ success: true, message: 'Blog deleted successfully' });
  } catch (error) {
    next(error);
  }
};

// Toggle Publish Status
const togglePublish = async (req, res, next) => {
  const { id } = req.body;

  try {
    // Fetch blog
    const blog = await Blog.findById(id);

    // toggle publish status
    blog.isPublished = !blog.isPublished;

    // Save the blog
    await blog.save();

    // Response
    res.status(200).json({ success: true, message: 'Blog status is updated' });
  } catch (error) {
    next(error);
  }
};

// Add Comment
const addComment = async (req, res, next) => {
  const { blog, name, content } = req.body;

  try {
    // Create comment data
    await Comment.create({
      blog,
      name,
      content,
    });

    // Response
    res
      .status(200)
      .json({ success: true, message: 'Comment added for review' });
  } catch (error) {
    next(error);
  }
};

// Get Individual Blog Comments
const getBlogComment = async (req, res, next) => {
  const { blogId } = req.body;

  try {
    const comments = await Comment.find({
      blog: blogId,
      isApproved: true,
    }).sort({
      createdAt: -1,
    });

    // Response
    res
      .status(200)
      .json({ success: true, message: 'Comments fetched', comments });
  } catch (error) {
    next(error);
  }
};

const generateContent = async (req, res, next) => {
  const { prompt } = req.body;

  // Check if prompt is provided
  if (!prompt) {
    return res.status(400).json({
      success: false,
      message: 'Please provide a prompt',
    });
  }

  try {
    // Generate content
    const content = await main(
      prompt + ' Generate Content for this topic in simple text format',
    );

    if (!content) {
      return res.status(500).json({
        success: false,
        message: 'Failed to generate content',
      });
    }

    // Response
    res.status(200).json({
      success: true,
      message: 'Content generated successfully',
      content,
    });
  } catch (error) {
    next(error);
  }
};

// Export
export {
  addBlog,
  addComment,
  deleteBlogById,
  generateContent,
  getAllBlogs,
  getBlogById,
  getBlogComment,
  togglePublish,
};
