import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin, Youtube, MessageCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#1E293B] border-t border-[#334155] pt-16 pb-8 text-[#94A3B8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
             <Link to="/" className="flex items-center gap-3 mb-6 bg-white p-2 rounded-xl inline-block w-fit">
                <img src="/logo.jpg" alt="Nisarg Infra Realties" className="h-16 object-contain" />
              </Link>
            <p className="text-sm mb-6 leading-relaxed text-[#CBD5E1]">
              Pioneering sustainable and eco-friendly real estate developments that blend luxury with nature. Invest in your ultimate sanctuary.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/Nagp2?rdid=2dtCj9OEo2HTRqfX&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F18eE4bU8Ew%2F#" target="_blank" rel="noreferrer" className="text-[#94A3B8] hover:text-white transition-colors bg-[#334155] p-2 rounded-full"><Facebook className="h-5 w-5" /></a>
              <a href="https://www.instagram.com/np_infra?igsh=MTJod3Vwd3drd3Rpdg%3D%3D" target="_blank" rel="noreferrer" className="text-[#94A3B8] hover:text-white transition-colors bg-[#334155] p-2 rounded-full"><Instagram className="h-5 w-5" /></a>
              <a href="#" className="text-[#94A3B8] hover:text-white transition-colors bg-[#334155] p-2 rounded-full"><Linkedin className="h-5 w-5" /></a>
              <a href="#" className="text-[#94A3B8] hover:text-white transition-colors bg-[#334155] p-2 rounded-full"><Youtube className="h-5 w-5" /></a>
            </div>
          </div>
          <div>
            <h3 className="text-[17px] font-bold mb-6 text-white uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-4">
              <li><Link to="/about" className="text-sm hover:text-[#29A53A] transition-colors">About Us</Link></li>
              <li><Link to="/projects" className="text-sm hover:text-[#29A53A] transition-colors">Our Projects</Link></li>
              <li><Link to="/reviews" className="text-sm hover:text-[#29A53A] transition-colors">Customer Reviews</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-[17px] font-bold mb-6 text-white uppercase tracking-wider">Legal</h3>
            <ul className="space-y-4">
              <li><Link to="/privacy-policy" className="text-sm hover:text-[#29A53A] transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-sm hover:text-[#29A53A] transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-[17px] font-bold mb-6 text-white uppercase tracking-wider">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm">
                <MapPin className="h-5 w-5 text-[#E85B10] shrink-0 mt-0.5" />
                <span className="text-[#CBD5E1]">Office Address, Civil Lines, Nagpur, Maharashtra, India</span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Phone className="h-5 w-5 text-[#29A53A] shrink-0" />
                <a href="tel:7020785308" onClick={() => (window as any).gtag?.('event', 'call_click', { location: 'footer' })} className="hover:text-white transition-colors text-[#CBD5E1]">+91 7020785308</a>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <MessageCircle className="h-5 w-5 text-[#25D366] shrink-0" />
                <a href="https://wa.me/917020785308" onClick={() => (window as any).gtag?.('event', 'whatsapp_click', { location: 'footer' })} className="hover:text-white transition-colors text-[#CBD5E1]">WhatsApp Us</a>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Mail className="h-5 w-5 text-[#E85B10] shrink-0" />
                <a href="mailto:pravinnagdive@gmail.com" className="hover:text-white transition-colors text-[#CBD5E1]">pravinnagdive@gmail.com</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-[#334155] pt-8 flex flex-col md:flex-row justify-between items-center text-sm">
          <p>&copy; {new Date().getFullYear()} Nisarg Infra Realties. All rights reserved.</p>
          <p className="mt-2 md:mt-0">Premium Real Estate Developments</p>
        </div>
      </div>
    </footer>
  );
}
