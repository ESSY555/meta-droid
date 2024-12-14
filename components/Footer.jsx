'use client';

import { motion } from 'framer-motion';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

import styles from '../styles';
import { footerVariants } from '../utils/motion';

const Footer = () => (
  <motion.footer
    variants={footerVariants}
    initial="hidden"
    whileInView="show"
    className={`${styles.xPaddings} py-8 relative`}
  >
    <div className="" >
      <footer className="bg-gray-900 text-gray-200 py-10">
        <div className="container mx-auto px-6 lg:px-8 flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
          {/* Logo and About Section */}
          <div className='flex gap-3'>
            <img src="/community logo.jpg" className="h-14 rounded-full" alt="Flowbite Logo" />
            <div className="text-center lg:text-left">
              <h2 className="text-3xl font-extrabold text-white">HelpHub</h2>
              <p className="mt-2 text-gray-400 max-w-xs">
                HelpHub is a community-driven platform for support, resources, and
                connections. Empowering individuals to help one another.
              </p>
            </div>
          </div>

          {/* New Navigation Section */}
          <div className="text-center lg:text-left space-y-4">
            <div className="flex justify-center lg:justify-start gap-8">
              <a href="#" className="text-lg text-gray-400 hover:text-white transition duration-300">Home</a>
              <a href="#" className="text-lg text-gray-400 hover:text-white transition duration-300">About Us</a>
              <a href="#" className="text-lg text-gray-400 hover:text-white transition duration-300">Services</a>
            </div>
            <div className="flex justify-center lg:justify-start gap-8 mt-4">
              <a href="#" className="text-lg text-gray-400 hover:text-white transition duration-300">Contact</a>
              <a href="#" className="text-lg text-gray-400 hover:text-white transition duration-300">FAQs</a>
              <a href="#" className="text-lg text-gray-400 hover:text-white transition duration-300">Blog</a>
            </div>
          </div>

          {/* Social Media Icons */}
          <div className="flex gap-6 mt-6">
            <a href="#" className="text-gray-400 hover:text-white transition duration-300">
              <FaFacebookF size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition duration-300">
              <FaTwitter size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition duration-300">
              <FaInstagram size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition duration-300">
              <FaLinkedinIn size={20} />
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-6"></div>

        {/* Copyright Section */}
        <div className="text-center text-gray-400 text-sm">
          © {new Date().getFullYear()} HelpHub. All rights reserved.
        </div>
      </footer>

    </div>
  </motion.footer>
);

export default Footer;
