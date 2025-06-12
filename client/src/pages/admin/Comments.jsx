/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 10 Jun, 2025
 * @copyright 2025 monayem_hossain_limon
 */

// External Imports
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

// Internal Imports
import CommentTableItem from '../../components/admin/CommentTableItem';
import useAppContext from '../../context/useAppContext';

// Component
const Comments = () => {
  const [comments, setComments] = useState([]);
  const [filter, setFilter] = useState('Not Approved');

  const { axios } = useAppContext();

  const fetchComments = async () => {
    try {
      const { data } = await axios.get('/api/admin/comments');

      if (!data?.success) {
        toast.error(data?.message || 'Failed to load comments');
        return;
      }

      setComments(data?.comments);
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Something went wrong');
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <div className="flex-1 pt-5 px-5 md:pt-12 md:pl-16 bg-blue-50/50">
      <div className="flex justify-between items-center max-w-3xl">
        <h1>Comments</h1>

        {/* Filter Buttons */}
        <div className="flex gap-4">
          <button
            onClick={() => setFilter('Approved')}
            className={`shadow-custom-sm border rounded-full px-4 py-1 cursor-pointer text-xs ${
              filter === 'Approved' ? 'text-primary' : 'text-gray-700'
            }`}
          >
            Approved
          </button>
          <button
            onClick={() => setFilter('Not Approved')}
            className={`shadow-custom-sm border rounded-full px-4 py-1 cursor-pointer text-xs ${
              filter === 'Not Approved' ? 'text-primary' : 'text-gray-700'
            }`}
          >
            Not Approved
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="relative h-4/5 max-w-4xl overflow-x-auto mt-4 shadow rounded-lg scrollbar-hide bg-white">
        <table className="w-full text-sm text-gray-500">
          <thead className="text-xs text-gray-700 text-left uppercase">
            <tr>
              <th scope="col" className="px-6 py-3">
                Blog title & comment
              </th>
              <th scope="col" className="px-6 py-3 max-sm:hidden">
                Date
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>

          {/* Table Body with filtered comments */}
          <tbody>
            {comments
              .filter((comment) => {
                if (filter === 'Approved') return comment.isApproved === true;
                return comment.isApproved == false;
              })
              .map((comment, index) => (
                <CommentTableItem
                  key={comment._id}
                  comment={comment}
                  index={index + 1}
                  fetchComments={fetchComments}
                />
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Export
export default Comments;
