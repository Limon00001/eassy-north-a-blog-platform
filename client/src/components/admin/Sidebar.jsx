/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 10 Jun, 2025
 * @copyright 2025 monayem_hossain_limon
 */

// External Imports
import { NavLink } from 'react-router-dom';
import { assets } from '../../assets/assets';

const Sidebar = () => {
  return (
    <div className="flex flex-col border-r border-gray-200 min-h-full pt-6">
      <NavLink
        end={true}
        to="/admin"
        className={({ isActive }) =>
          `flex items-center gap-3 px-3 py-3.5 md:px-9 md:min-w-64 cursor-pointer ${
            isActive ? 'bg-primary/10 border-r-4 border-primary' : ''
          }`
        }
      >
        <img src={assets.home_icon} alt="" className="w-5 min-w-4" />
        <p className="hidden md:inline-block">Dashboard</p>
      </NavLink>
      <NavLink
        to="/admin/addblog"
        className={({ isActive }) =>
          `flex items-center gap-3 px-3 py-3.5 md:px-9 md:min-w-64 cursor-pointer ${
            isActive ? 'bg-primary/10 border-r-4 border-primary' : ''
          }`
        }
      >
        <img src={assets.add_icon} alt="" className="w-5 min-w-4" />
        <p className="hidden md:inline-block">Add Blogs</p>
      </NavLink>
      <NavLink
        to="/admin/listblog"
        className={({ isActive }) =>
          `flex items-center gap-3 px-3 py-3.5 md:px-9 md:min-w-64 cursor-pointer ${
            isActive ? 'bg-primary/10 border-r-4 border-primary' : ''
          }`
        }
      >
        <img src={assets.list_icon} alt="" className="w-5 min-w-4" />
        <p className="hidden md:inline-block">Blog List</p>
      </NavLink>
      <NavLink
        to="/admin/comments"
        className={({ isActive }) =>
          `flex items-center gap-3 px-3 py-3.5 md:px-9 md:min-w-64 cursor-pointer ${
            isActive ? 'bg-primary/10 border-r-4 border-primary' : ''
          }`
        }
      >
        <img src={assets.comment_icon} alt="" className="w-5 min-w-4" />
        <p className="hidden md:inline-block">Comments</p>
      </NavLink>
    </div>
  );
};

export default Sidebar;
