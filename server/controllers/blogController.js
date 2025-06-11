/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 11 Jun, 2025
 * @copyright 2025 monayem_hossain_limon
 */

// External Imports
import fs from 'fs';

// Internal Imports
import imagekit from '../configs/imageKit';
import Blog from '../models/Blog';

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

// Export
export { addBlog };
