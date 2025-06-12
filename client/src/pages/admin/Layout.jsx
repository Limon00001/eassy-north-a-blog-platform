/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 10 Jun, 2025
 * @copyright 2025 monayem_hossain_limon
 */

// External Imports
import { Outlet } from 'react-router-dom';

// Internal Imports
import { assets } from '../../assets/assets';
import Sidebar from '../../components/admin/Sidebar';
import useAppContext from '../../context/useAppContext';

const Layout = () => {
  const { axios, setToken, navigate } = useAppContext();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    axios.defaults.headers.common['Authorization'] = null;
    navigate('/');
  };

  return (
    <>
      {/* Navbar */}
      <div className="flex justify-between items-center py-2 h-[70px] px-4 md:px-12 border-b border-gray-200">
        <div
          onClick={() => navigate('/')}
          className="flex items-center gap-2 cursor-pointer"
        >
          <img src={assets.logo} alt="Logo" className="w-8 md:w-12" />
          <p className="text-xl md:text-2xl font-semibold">EssayNorth</p>
        </div>
        <button
          onClick={handleLogout}
          className="text-sm px-8 py-2.5 rounded-full bg-primary text-white cursor-pointer"
        >
          Logout
        </button>
      </div>

      <div className="flex h-[calc(100vh-70px)]">
        <Sidebar />
        <Outlet />
      </div>
    </>
  );
};

// Export
export default Layout;
