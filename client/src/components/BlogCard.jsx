/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 10 Jun, 2025
 * @copyright 2025 monayem_hossain_limon
 */

// External Imports
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';

// BlogCard Component
const BlogCard = ({ blog }) => {
  const { title, description, category, image, _id } = blog;
  const navigate = useNavigate();

  return (
    <motion.div
      onClick={() => navigate(`/blog/${_id}`)}
      className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
      whileHover={{ y: -5 }}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full aspect-[16/10] object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <span className="px-4 py-1.5 bg-primary/10 rounded-full text-primary text-xs font-medium">
            {category}
          </span>
          <motion.div className="text-primary" whileHover={{ scale: 1.2 }}>
            →
          </motion.div>
        </div>

        <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {title}
        </h3>

        <div
          className="text-sm text-gray-600 line-clamp-2"
          dangerouslySetInnerHTML={{
            __html: description.slice(0, 150) + '...',
          }}
        />
      </div>
    </motion.div>
  );
};

// Export
export default BlogCard;
