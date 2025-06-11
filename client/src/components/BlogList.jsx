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

const BlogList = () => {
  const [menu, setMenu] = useState('All');
  const { blog, input } = useAppContext();

  const filteredBlogs = () => {
    if (input === '') {
      return blog;
    }

    blog.filter((item) => {
      return (
        item.title.toLowerCase().includes(input.toLowerCase()) ||
        item.category.toLowerCase().includes(input.toLowerCase())
      );
    });
  };

  return (
    <div>
      {filteredBlogs().length === 0 ? (
        <div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center min-h-[20vh] px-4"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">
            No Blogs Found
          </h2>
          <p className="text-gray-600 text-center max-w-md mb-6">
            We couldn't find any blogs matching your search criteria. Try
            adjusting your filters or search terms.
          </p>
        </div>
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
