import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-blue-600 text-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="text-xl font-bold">
            🛍️ MyStore
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            <Link to="/" className="hover:text-gray-200">Home</Link>
            <Link to="/admin" className="hover:text-gray-200">Admin</Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden focus:outline-none"
          >
            {isOpen ? "✖" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-blue-500 px-4 py-2 space-y-2">
          <Link to="/" className="block hover:text-gray-200" onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/products" className="block hover:text-gray-200" onClick={() => setIsOpen(false)}>Products</Link>
          <Link to="/admin" className="block hover:text-gray-200" onClick={() => setIsOpen(false)}>Admin</Link>
          <Link to="/guest" className="block hover:text-gray-200" onClick={() => setIsOpen(false)}>Guest</Link>
        </div>
      )}
    </nav>
  );
}
