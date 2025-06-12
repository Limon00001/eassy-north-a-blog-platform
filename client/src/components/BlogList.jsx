/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 10 Jun, 2025
 * @copyright 2025 monayem_hossain_limon
 */

// External Imports
import { motion } from 'motion/react';
import { useState } from 'react';

// Internal Imports
import { blogCategories } from '../assets/assets';
import useAppContext from '../context/useAppContext';
import BlogCard from './BlogCard';
import NotFoundBlog from './NotFoundBlog';

const BlogList = () => {
  const [menu, setMenu] = useState('All');
  const { blog, input } = useAppContext();

  const filteredBlogs = () => {
    // Check if blog is undefined or null or empty
    if (!blog) return [];

    // If no input, return all blogs
    if (input === '') {
      return blog;
    }

    // Return filtered blogs
    return blog.filter((item) => {
      return (
        item.title.toLowerCase().includes(input.toLowerCase()) ||
        item.category.toLowerCase().includes(input.toLowerCase())
      );
    });
  };

  // Get filtered blogs
  const blogs = filteredBlogs();

  return (
    <div className="py-12 px-4 md:px-8 lg:px-16 mx-auto">
      {blogs.length === 0 ? (
        <NotFoundBlog />
      ) : (
        <>
          {/* Enhanced Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 md:gap-6 mb-16">
            {blogCategories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setMenu(category)}
                className={`px-6 py-2 text-sm md:text-base rounded-full transition-all duration-300 cursor-pointer
                  ${
                    menu === category
                      ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-105'
                      : 'text-gray-600 hover:bg-gray-100 border border-gray-200'
                  }`}
                whileHover={{ scale: menu === category ? 1.05 : 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {category}
              </motion.button>
            ))}
          </div>

          {/* Enhanced Blog Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {filteredBlogs()
              .filter((blog) =>
                menu === 'All' ? true : blog.category === menu,
              )
              .map((blog, index) => (
                <motion.div
                  key={blog._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <BlogCard blog={blog} />
                </motion.div>
              ))}
          </motion.div>
        </>
      )}
    </div>
  );
};

// Export
export default BlogList;
