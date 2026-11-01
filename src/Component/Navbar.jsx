import React from "react";

const Navbar = () => {
  return (
    <nav className="w-full bg-white shadow-md px-8 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* Logo */}
        <h1 className="text-2xl font-bold text-blue-700">
          VeyraPass
        </h1>

        {/* Navigation Links */}
        <div className="flex items-center gap-8">
          <a href="/" className="text-gray-700 hover:text-blue-600 font-medium">
            Home
          </a>

          <a href="/about" className="text-gray-700 hover:text-blue-600 font-medium">
            About
          </a>

          <a href="/services" className="text-gray-700 hover:text-blue-600 font-medium">
            Services
          </a>

          <a href="/contact" className="text-gray-700 hover:text-blue-600 font-medium">
            Contact
          </a>
        </div>

        {/* Login Button */}
        <button className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700">
          Login
        </button>

      </div>
    </nav>
  );
};

export default Navbar;