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
import { assets } from '../../assets/assets';
import BlogTableItem from '../../components/admin/BlogTableItem';
import useAppContext from '../../context/useAppContext';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    blogs: 0,
    comments: 0,
    drafts: 0,
    recentBlogs: [],
  });
  const [loading, setLoading] = useState(false);

  const { axios } = useAppContext();

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('/api/admin/dashboard');

      if (data?.success) {
        const {
          totalBlogs = 0,
          totalComments = 0,
          draftBlogs = 0,
          recentBlogs = [],
        } = data.dashboardData;

        setDashboardData({
          blogs: totalBlogs,
          comments: totalComments,
          drafts: draftBlogs,
          recentBlogs,
        });
      } else {
        toast.error(data?.message || 'Failed to load dashboard data');
      }
    } catch (error) {
      console.error('Dashboard error:', error);
      toast.error(error?.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex-1 p-4 md:p-10 bg-blue-50/50">
        <div className="flex justify-center items-center h-[60vh]">
          <div className="animate-pulse text-gray-500">
            Loading dashboard...
          </div>
        </div>
      </div>
    );
  }

  // Stats cards data
  const statsCards = [
    {
      icon: assets.dashboard_icon_1,
      value: dashboardData.blogs,
      label: 'Total Blogs',
      color: 'text-blue-600',
    },
    {
      icon: assets.dashboard_icon_2,
      value: dashboardData.comments,
      label: 'Total Comments',
      color: 'text-green-600',
    },
    {
      icon: assets.dashboard_icon_3,
      value: dashboardData.drafts,
      label: 'Draft Blogs',
      color: 'text-orange-600',
    },
  ];

  return (
    <div className="flex-1 p-4 md:p-10 bg-blue-50/50">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {statsCards.map((card, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <img src={card.icon} alt={card.label} className="w-12 h-12" />
                <div>
                  <h3 className={`text-2xl font-semibold ${card.color}`}>
                    {card.value}
                  </h3>
                  <p className="text-gray-500 text-sm">{card.label}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div>
        <div className="flex items-center gap-3 m-4 mt-6 text-gray-600">
          <img src={assets.dashboard_icon_4} alt="Latest Blogs" />
          <p>Latest Blogs</p>
        </div>

        {dashboardData.recentBlogs.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No blogs available yet
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-4 py-3">
                    #
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Title
                  </th>
                  <th scope="col" className="px-4 py-3 max-sm:hidden">
                    Date
                  </th>
                  <th scope="col" className="px-4 py-3 max-sm:hidden">
                    Status
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {dashboardData.recentBlogs.map((blog, index) => (
                  <BlogTableItem
                    key={blog._id}
                    blog={blog}
                    fetchBlogs={fetchDashboardData}
                    index={index + 1}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

// Export
export default Dashboard;
