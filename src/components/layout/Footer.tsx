import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-[#E2E8F0] pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
             <Link to="/" className="flex items-center gap-3 mb-6">
                <img src="/logo.jpg" alt="Nisarg Infra Realties" className="h-16 object-contain" />
              </Link>
            <p className="text-[#64748B] text-sm mb-6 leading-relaxed">
              Pioneering sustainable and eco-friendly real estate developments that blend luxury with nature.
            </p>
          </div>
          <div>
            <h3 className="text-[15px] font-bold mb-6 text-[#1E293B]">Quick Links</h3>
            <ul className="space-y-4">
              <li><Link to="/about" className="text-sm text-[#64748B] hover:text-[#137A35] transition-colors">About Us</Link></li>
              <li><Link to="/projects" className="text-sm text-[#64748B] hover:text-[#137A35] transition-colors">Our Projects</Link></li>
              <li><Link to="/gallery" className="text-sm text-[#64748B] hover:text-[#137A35] transition-colors">Gallery</Link></li>
              <li><Link to="/blog" className="text-sm text-[#64748B] hover:text-[#137A35] transition-colors">Blog</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-[15px] font-bold mb-6 text-[#1E293B]">Legal</h3>
            <ul className="space-y-4">
              <li><Link to="/privacy-policy" className="text-sm text-[#64748B] hover:text-[#137A35] transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-sm text-[#64748B] hover:text-[#137A35] transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-[15px] font-bold mb-6 text-[#1E293B]">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-[#64748B]">
                <MapPin className="h-5 w-5 text-[#E85B10] shrink-0" />
                <span>Nagpur, Maharashtra, India</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-[#64748B]">
                <Phone className="h-5 w-5 text-[#E85B10] shrink-0" />
                <a href="tel:+910000000000" className="hover:text-[#137A35] transition-colors">+91 00000 00000</a>
              </li>
              <li className="flex items-center gap-3 text-sm text-[#64748B]">
                <Mail className="h-5 w-5 text-[#E85B10] shrink-0" />
                <a href="mailto:info@nisarginfra.com" className="hover:text-[#137A35] transition-colors">info@nisarginfra.com</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-[#E2E8F0] pt-8 text-center text-[#94A3B8] text-sm">
          <p>&copy; {new Date().getFullYear()} Nisarg Infra Realties. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
