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

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setInput(inputRef?.current?.value);
  };

  const handleClear = () => {
    setInput('');
    inputRef.current.value = '';
  };

  return (
    <div className="mx-8 md:mx-16 relative">
      <div className="text-center mt-20 mb-8">
        <div className="inline-flex items-center justify-center gap-4 px-6 py-1.5 mb-4 border border-primary/40 bg-primary/10 rounded-full text-sm text-primary">
          <p>New: AI feature integrated</p>
          <img src={assets.star_icon} alt="star" className="w-2.5" />
        </div>
        <h1 className="text-3xl md:text-5xl font-semibold md:leading-16 text-gray-700">
          Your own <span className="text-primary">AI powered</span> blogging{' '}
          <br /> platform.
        </h1>
        <p className="my-6 md:my-8 max-w-2xl mx-auto max-md:text-xs text-gray-500">
          Unleash the power of AI-generated content with our cutting-edge
          platform — effortless blog creation starts here. Focus on your ideas
          while AI handles the writing, empowering every blogger to thrive.
        </p>
        <form
          onSubmit={handleFormSubmit}
          className="flex items-center justify-between max-w-lg max-md:scale-75 mx-auto border border-gray-300 rounded-full bg-white overflow-hidden"
        >
          <input
            ref={inputRef}
            type="text"
            name="search"
            id="search"
            placeholder="Search for blogs"
            required
            className="w-full pl-4 outline-none"
          />
          <button
            type="submit"
            className="px-8 py-2 m-1.5 bg-primary text-white rounded-full hover:scale-105 transition-all cursor-pointer"
          >
            Search
          </button>
        </form>
      </div>

      <div className="flex items-center justify-center gap-2 mb-4">
        {input && <p className="text-sm text-primary">Search: "{input}"</p>}
      </div>

      <div className="text-center">
        {input && (
          <button
            onClick={handleClear}
            className="border font-light text-xs py-1 px-3 rounded-sm shadow-custom-sm cursor-pointer"
          >
            Clear Search
          </button>
        )}
      </div>

      <img
        src={assets.gradientBackground}
        alt="background"
        className="absolute -top-50 -z-1 opacity-50"
      />
    </div>
  );
};

// Export
export default Header;
