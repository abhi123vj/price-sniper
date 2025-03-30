"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-gray-900">
          Price Snipe
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6">

          <Link href="/login" className="hover:text-blue-500 transition">Login Check</Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden focus:outline-none"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="flex flex-col p-4 space-y-3">
            <Link href="/" className="hover:text-blue-500 transition">Home</Link>
            <Link href="/about" className="hover:text-blue-500 transition">About</Link>
            <Link href="/services" className="hover:text-blue-500 transition">Services</Link>
            <Link href="/contact" className="hover:text-blue-500 transition">Contact</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;