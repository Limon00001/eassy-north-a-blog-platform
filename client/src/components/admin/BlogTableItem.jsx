/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 10 Jun, 2025
 * @copyright 2025 monayem_hossain_limon
 */

// External Imports
import { useState } from 'react';
import { toast } from 'react-hot-toast';

// Internal Imports
import { assets } from '../../assets/assets';
import useAppContext from '../../context/useAppContext';

const BlogTableItem = ({ blog, fetchBlogs, index }) => {
  const { axios } = useAppContext();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const { title, createdAt } = blog;
  const blogDate = new Date(createdAt);

  const handleDeleteBlog = async () => {
    try {
      const { data } = await axios.post(`/api/blog/delete`, { id: blog._id });

      if (data?.success) {
        await fetchBlogs();
        toast.success(data?.message);
      } else {
        toast.error(data?.message || 'Something went wrong');
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Something went wrong');
    }
  };

  const handlePublishBlog = async () => {
    try {
      const { data } = await axios.post(`/api/blog/toggle-publish`, {
        id: blog._id,
      });

      if (data?.success) {
        await fetchBlogs();
        toast.success(data?.message);
      } else {
        toast.error(data?.message || 'Something went wrong');
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <>
      <tr className="border-y border-gray-300">
        <th className="px-2 py-4">{index}</th>
        <td className="px-2 py-4">{title}</td>
        <td className="px-2 py-4 max-sm:hidden">{blogDate.toDateString()}</td>
        <td className="px-2 py-4 max-sm:hidden">
          <p
            className={`${
              blog.isPublished ? 'text-green-800' : 'text-orange-700'
            }`}
          >
            {blog.isPublished ? 'Published' : 'Unpublished'}
          </p>
        </td>
        <td className="px-2 py-4 flex text-xs gap-3">
          <button
            onClick={handlePublishBlog}
            className="border px-2 py-0.5 mt-1 rounded cursor-pointer"
          >
            {blog.isPublished ? 'Unpublish' : 'Publish'}
          </button>
          <img
            src={assets.cross_icon}
            onClick={() => setShowDeleteDialog(true)}
            alt="Delete"
            className="w-8 hover:scale-110 transition-all cursor-pointer"
          />
        </td>
      </tr>

      {/* Delete Confirmation Dialog */}
      {showDeleteDialog && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Delete Blog
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete "{title}"? This action cannot be
              undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteDialog(false)}
                className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteBlog}
                className="px-4 py-2 text-sm text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// Export
export default BlogTableItem;
