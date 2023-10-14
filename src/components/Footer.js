import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-slate-200 text-gray-700 py-6 md:py-16">
      <div className="container mx-auto px-4 md:px-8 lg:px-20 xl:px-32 flex flex-col md:flex-row justify-between border-t border-gray-200">
        <div className="flex items-center mb-4 md:mb-0">
          <p className="font-bold text-2xl text-slate-700">
            Camplia<span className="text-slate-500">Details</span>
          </p>
        </div>

        <div className="mb-4 md:mb-0">
          <p className="text-lg font-semibold mb-2">QUICK LINKS</p>

          <div className="flex flex-col space-y-2">
            <a href="/" className="text-gray-500 hover:text-gray-700">
              Home
            </a>
            <a href="/about" className="text-gray-500 hover:text-gray-700">
              About
            </a>
            <a href="/services" className="text-gray-500 hover:text-gray-700">
              Services
            </a>
          </div>
        </div>

        <div>
          <p className="text-lg font-semibold mb-2">SOCIAL MEDIA</p>

          <div className="flex space-x-4">
            <a href="#">
              <FaFacebook size={18} className="text-gray-700" />
            </a>

            <a href="#">
              <FaInstagram size={18} className="text-gray-700" />
            </a>

            <a href="#">
              <FaTwitter size={18} className="text-gray-700" />
            </a>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center py-2 md:py-4">
        <span className="text-gray-500 text-sm md:text-base">
          &copy; {new Date().getFullYear()} Camplia Details
        </span>
      </div>
    </footer>
  );
};

export default Footer;
