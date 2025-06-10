/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 10 Jun, 2025
 * @copyright 2025 monayem_hossain_limon
 */

// External Imports
import { useNavigate } from 'react-router-dom';

// Internal Imports
import { assets } from '../assets/assets';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center py-5 mx-8 md:mx-20 xl:mx-32">
      <div
        onClick={() => navigate('/')}
        className="flex items-center gap-2 cursor-pointer"
      >
        <img src={assets.logo} alt="Logo" className="w-8 md:w-12" />
        <p className="text-xl md:text-2xl font-semibold">EssayNorth</p>
      </div>
      <button
        onClick={() => navigate('/admin')}
        className="flex items-center gap-2 rounded-full text-sm cursor-pointer py-2.5 px-10 bg-primary text-white"
      >
        Login
        <img src={assets.arrow} alt="arrow" className={'w-3'} />
      </button>
    </div>
  );
};

// Export
export default Navbar;
