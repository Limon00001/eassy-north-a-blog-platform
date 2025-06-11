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
    <div>
      {blogs.length === 0 ? (
        <NotFoundBlog />
      ) : (
        <div className="flex justify-center gap-4 md:gap-8 my-10 relative">
          {blogCategories.map((category) => (
            <div key={category} className="relative">
              <button
                onClick={() => setMenu(category)}
                className={`cursor-pointer to-gray-500 ${
                  menu === category ? 'text-white px-4 pt-0.5' : ''
                }`}
              >
                {category}
                {menu === category && (
                  <motion.div
                    layoutId="underline"
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    className="absolute top-0 left-0 right-0 h-7 -z-1 bg-primary rounded-full"
                  ></motion.div>
                )}
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-24 mx-8 md:mx-16 xl:mx-36">
        {filteredBlogs()
          .filter((blog) => (menu === 'All' ? true : blog.category === menu))
          .map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
      </div>
    </div>
  );
};

// Export
export default BlogList;
