/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 10 Jun, 2025
 * @copyright 2025 monayem_hossain_limon
 */

// External Imports
import { useRef } from 'react';

// Internal Imports
import { assets } from '../assets/assets';
import useAppContext from '../context/useAppContext';

const Header = () => {
  const { input, setInput } = useAppContext();
  const inputRef = useRef();

  // Handle form submit
  const handleFormSubmit = (e) => {
    e.preventDefault();
    setInput(inputRef?.current?.value);
  };

  // Clear input
  const handleClear = () => {
    setInput('');
    inputRef.current.value = '';
  };

  return (
    <div className="mx-8 md:mx-16 relative">
      <div className="text-center mt-24 mb-12">
        {/* Enhanced badge design */}
        <div className="inline-flex items-center justify-center gap-3 px-6 py-2 mb-6 border-2 border-primary/30 bg-primary/5 rounded-full text-sm font-medium text-primary shadow-lg shadow-primary/10 hover:scale-105 transition-all">
          <p>New: AI-Powered Blog Generation</p>
          <img
            src={assets.star_icon}
            alt="star"
            className="w-3 animate-pulse"
          />
        </div>

        {/* Enhanced heading with gradient */}
        <h1 className="text-4xl md:text-6xl font-bold md:leading-tight text-gray-800 mb-6">
          Your own{' '}
          <span className="bg-gradient-to-r from-primary to-blue-500 text-transparent bg-clip-text">
            AI powered
          </span>{' '}
          <br className="hidden md:block" />
          blogging platform
        </h1>

        {/* Enhanced subheading */}
        <p className="my-8 max-w-2xl mx-auto text-base md:text-lg text-gray-600 leading-relaxed">
          Unleash the power of AI-generated content with our cutting-edge
          platform. Focus on your ideas while AI handles the writing,
          <span className="text-primary font-medium">
            {' '}
            empowering every blogger to thrive
          </span>
          .
        </p>

        {/* Enhanced search form */}
        <form
          onSubmit={handleFormSubmit}
          className="flex flex-col items-center justify-center gap-4 max-w-2xl mx-auto"
        >
          <div className="relative w-full group">
            <input
              ref={inputRef}
              type="text"
              name="search"
              id="search"
              placeholder="Search blogs by title or category..."
              required
              className="w-full px-6 py-4 bg-white/80 backdrop-blur-sm border-2 border-gray-200 
      rounded-full outline-none shadow-lg shadow-primary/5
      focus:border-primary/30 focus:shadow-primary/10 
      transition-all duration-300 peer placeholder:text-gray-400"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 px-8 py-2.5
      bg-gradient-to-r from-primary to-primary/90 text-white font-medium
      rounded-full transform transition-all duration-300
      hover:shadow-lg hover:shadow-primary/20 hover:scale-[1.02]
      active:scale-[0.98] cursor-pointer"
            >
              Search
              <div
                className="absolute inset-0 rounded-full bg-white/20 opacity-0 
      group-hover:opacity-100 transition-opacity duration-300"
              ></div>
            </button>
          </div>

          {/* Enhanced search results display */}
          {input && (
            <div className="flex flex-col items-center gap-3 animate-fadeIn mt-4">
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-500">Showing results for:</span>
                <span className="font-semibold text-primary">"{input}"</span>
              </div>
              <button
                onClick={handleClear}
                className="px-4 py-1.5 text-xs font-medium text-gray-600 
        border border-gray-300/50 rounded-full bg-white/80
        hover:bg-gray-50 hover:border-primary/20 hover:text-primary
        hover:shadow-sm transition-all duration-300
        active:scale-95 cursor-pointer"
              >
                Clear Search
              </button>
            </div>
          )}
        </form>
      </div>

      {/* Enhanced background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <img
          src={assets.gradientBackground}
          alt="background"
          className="w-full h-full object-cover opacity-40 blur-3xl"
        />
      </div>
    </div>
  );
};

// Export
export default Header;
