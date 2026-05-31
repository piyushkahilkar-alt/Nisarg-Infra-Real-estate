import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Navbar() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
            <Link to="/reviews" className={`text-[14px] font-medium transition-colors ${isActive('/reviews') ? 'text-[#137A35]' : 'text-[#64748B] hover:text-[#137A35]'}`}>Reviews</Link>
            <Link to="/contact" className={`text-[14px] font-medium transition-colors ${isActive('/contact') ? 'text-[#137A35]' : 'text-[#64748B] hover:text-[#137A35]'}`}>Contact</Link>
          </div>
          <div className="hidden md:flex items-center">
            <a href="tel:7020785308" className="bg-[#E85B10] text-white px-6 py-3 rounded-md font-semibold text-[14px] cursor-pointer transition-colors hover:bg-opacity-90">
              Call Now
            </a>
          </div>
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-[#1E293B] hover:text-[#137A35] focus:outline-none p-2"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden bg-white border-b border-[#E2E8F0]"
          >
            <div className="px-4 pt-2 pb-4 space-y-1 flex flex-col">
              <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/') ? 'text-[#137A35] bg-[#E8F5E9]' : 'text-[#1E293B] hover:bg-gray-50'}`}>Home</Link>
              <Link to="/projects" onClick={() => setIsMobileMenuOpen(false)} className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/projects') ? 'text-[#137A35] bg-[#E8F5E9]' : 'text-[#1E293B] hover:bg-gray-50'}`}>Projects</Link>
              <Link to="/about" onClick={() => setIsMobileMenuOpen(false)} className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/about') ? 'text-[#137A35] bg-[#E8F5E9]' : 'text-[#1E293B] hover:bg-gray-50'}`}>About Us</Link>
              <Link to="/reviews" onClick={() => setIsMobileMenuOpen(false)} className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/reviews') ? 'text-[#137A35] bg-[#E8F5E9]' : 'text-[#1E293B] hover:bg-gray-50'}`}>Reviews</Link>
              <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)} className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/contact') ? 'text-[#137A35] bg-[#E8F5E9]' : 'text-[#1E293B] hover:bg-gray-50'}`}>Contact</Link>
              <a href="tel:7020785308" className="mt-4 block w-full text-center bg-[#E85B10] text-white px-6 py-3 rounded-md font-bold text-base cursor-pointer hover:bg-opacity-90">
                Call Now
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
