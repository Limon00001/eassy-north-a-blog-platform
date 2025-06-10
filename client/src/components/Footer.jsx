/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 10 Jun, 2025
 * @copyright 2025 monayem_hossain_limon
 */

import { assets, footer_data } from '../assets/assets';

const Footer = () => {
  return (
    <footer className="px-6 md:px-16 lg:px-24 xl:px-32 bg-primary/3">
      <div className="flex flex-col md:flex-row justify-between items-center gap-10 py-10 border-b border-gray-500/30 text-gray-500">
        {/* Company Info */}
        <div className="flex flex-col items-center md:items-start">
          <div className="flex items-center gap-2">
            <img src={assets.logo} alt="Logo" className="w-9 md:w-10" />
            <p className="text-xl md:text-2xl font-semibold">EssayNorth</p>
          </div>
          <p className="text-center md:text-left md:max-w-[410px] mt-6">
            Unleash the power of AI-generated content with our cutting-edge
            platform — effortless blog creation starts here. Focus on your ideas
            while AI handles the writing, empowering every blogger to thrive.
          </p>
        </div>

        {/* Quick Links & Other Links */}
        <div className="flex flex-wrap justify-between w-full md:w-[45%] gap-5">
          {footer_data.map((section, index) => (
            <div key={index}>
              <h3 className="font-semibold text-base text-gray-900 md:mb-5 mb-2">
                {section.title}
              </h3>
              <ul className="text-sm space-y-1">
                {section.links.map((link, index) => (
                  <li key={index}>
                    <a href="#" className="hover:underline transition">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Copyright Text */}
      </div>
      <p className="p-4 text-center text-sm md:text-base text-gray-500/80">
        Copyright 2025 &copy; Monayem Hossain Limon - All Rights Reserved.
      </p>
    </footer>
  );
};

// Export
export default Footer;
