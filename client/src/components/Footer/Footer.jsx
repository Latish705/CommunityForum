import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 px-4">
      <div className="container mx-auto flex justify-between items-center">
        <p className="text-sm">© 2023 Your Company. All rights reserved.</p>
        <div className="flex space-x-4">
          <a
            href="#"
            className="hover:text-gray-400 transition-colors duration-300"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="hover:text-gray-400 transition-colors duration-300"
          >
            Terms of Service
          </a>
          <a
            href="#"
            className="hover:text-gray-400 transition-colors duration-300"
          >
            Contact Us
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
