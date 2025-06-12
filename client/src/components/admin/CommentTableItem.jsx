/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 11 Jun, 2025
 * @copyright 2025 monayem_hossain_limon
 */

// External Imports
import { useState } from 'react';
import { createPortal } from 'react-dom';
import toast from 'react-hot-toast';

// Internal Imports
import { assets } from '../../assets/assets';
import useAppContext from '../../context/useAppContext';

// Component
const CommentTableItem = ({ comment, fetchComments }) => {
  const { axios } = useAppContext();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const { blog, createdAt, _id } = comment;
  const Blogdate = new Date(createdAt);

  const handleApproveComment = async () => {
    try {
      const { data } = await axios.post(`/api/admin/approve-comment`, {
        id: _id,
      });

      if (data?.success) {
        toast.success(data?.message);
        fetchComments();
      } else {
        toast.error(data?.message || 'Failed to approve the comment');
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Something went wrong');
    }
  };

  const handleDeleteComment = async () => {
    try {
      const { data } = await axios.post(`/api/admin/delete-comment`, {
        id: _id,
      });

      if (data?.success) {
        toast.success(data?.message);
        fetchComments();
      } else {
        toast.error(data?.message || 'Failed to approve the comment');
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Something went wrong');
    }
  };

  const renderDeleteDialog = () => {
    if (!showDeleteDialog) return null;

    return createPortal(
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Delete Comment
          </h3>
          <p className="text-gray-600 mb-6">
            Are you sure you want to delete this comment? This action cannot be
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
              onClick={handleDeleteComment}
              className="px-4 py-2 text-sm text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      </div>,
      document.body,
    );
  };

  return (
    <>
      <tr className="border-y border-gray-300">
        <td className="px-6 py-4">
          <b className="font-medium text-gray-600">Blog</b> : {blog.title}
          <br />
          <br />
          <b className="font-medium text-gray-600">Name</b> : {comment.name}
          <br />
          <b className="font-medium text-gray-600">Comment</b> :{' '}
          {comment.content}
        </td>
        <td className="px-6 py-4 max-sm:hidden">
          {Blogdate.toLocaleDateString()}
        </td>
        <td className="px-6 py-4">
          <div className="inline-flex items-center gap-4">
            {!comment.isApproved ? (
              <img
                src={assets.tick_icon}
                onClick={handleApproveComment}
                alt="Approve"
                className="w-5 hover:scale-110 transition-all cursor-pointer"
              />
            ) : (
              <p className="text-xs border border-green-600 bg-green-100 text-green-600 rounded-full px-3 py-1">
                Approved
              </p>
            )}
            <img
              onClick={() => setShowDeleteDialog(true)}
              src={assets.bin_icon}
              alt="Delete"
              className="w-5 hover:scale-110 transition-all cursor-pointer"
            />
          </div>
        </td>
      </tr>
      {renderDeleteDialog()}
    </>
  );
};

// Export
export default CommentTableItem;
