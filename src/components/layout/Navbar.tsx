import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-[#E2E8F0] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          <Link to="/" className="flex items-center">
            <img src="/logo.jpg" alt="Nisarg Infra Realties" className="h-20 object-contain" />
          </Link>
          <div className="hidden md:flex space-x-8 items-center cursor-pointer">
            <Link to="/" className={`text-[14px] font-medium transition-colors ${isActive('/') ? 'text-[#137A35]' : 'text-[#64748B] hover:text-[#137A35]'}`}>Home</Link>
            <Link to="/projects" className={`text-[14px] font-medium transition-colors ${isActive('/projects') ? 'text-[#137A35]' : 'text-[#64748B] hover:text-[#137A35]'}`}>Projects</Link>
            <Link to="/about" className={`text-[14px] font-medium transition-colors ${isActive('/about') ? 'text-[#137A35]' : 'text-[#64748B] hover:text-[#137A35]'}`}>About Us</Link>
            <Link to="/gallery" className={`text-[14px] font-medium transition-colors ${isActive('/gallery') ? 'text-[#137A35]' : 'text-[#64748B] hover:text-[#137A35]'}`}>Gallery</Link>
            <Link to="/blog" className={`text-[14px] font-medium transition-colors ${isActive('/blog') ? 'text-[#137A35]' : 'text-[#64748B] hover:text-[#137A35]'}`}>Blog</Link>
          </div>
          <div className="hidden md:flex items-center">
            <a href="tel:+910000000000" className="bg-[#E85B10] text-white px-6 py-3 rounded-md font-semibold text-[14px] cursor-pointer transition-colors hover:bg-opacity-90">
              Call Now
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
