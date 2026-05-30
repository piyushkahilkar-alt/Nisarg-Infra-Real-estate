import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';

export default function Contact() {
  return (
    <div className="py-20 bg-white min-h-[calc(100vh-80px)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#1E293B] mb-4">Contact Us</h1>
          <div className="h-1 w-20 bg-[#137A35] mx-auto mb-6"></div>
          <p className="text-lg text-[#64748B]">Get in touch with our real estate experts today.</p>
        </div>
        
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
           <div className="p-8 bg-[#FAFAF7] rounded-2xl border border-[#E2E8F0] shadow-sm flex flex-col items-center text-center">
             <div className="h-12 w-12 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm border border-[#E2E8F0]">
               <Phone className="h-6 w-6 text-[#137A35]" />
             </div>
             <h3 className="font-bold text-[#1E293B] mb-2">Call Us</h3>
             <a href="tel:+910000000000" className="text-[#64748B] hover:text-[#137A35]">+91 00000 00000</a>
           </div>

           <div className="p-8 bg-[#FAFAF7] rounded-2xl border border-[#E2E8F0] shadow-sm flex flex-col items-center text-center">
             <div className="h-12 w-12 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm border border-[#E2E8F0]">
               <Mail className="h-6 w-6 text-[#137A35]" />
             </div>
             <h3 className="font-bold text-[#1E293B] mb-2">Email Us</h3>
             <a href="mailto:info@nisarginfra.com" className="text-[#64748B] hover:text-[#137A35]">info@nisarginfra.com</a>
           </div>

           <div className="p-8 bg-[#FAFAF7] rounded-2xl border border-[#E2E8F0] shadow-sm flex flex-col items-center text-center">
             <div className="h-12 w-12 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm border border-[#E2E8F0]">
               <MapPin className="h-6 w-6 text-[#137A35]" />
             </div>
             <h3 className="font-bold text-[#1E293B] mb-2">Visit Us</h3>
             <p className="text-[#64748B]">Nagpur,<br/>Maharashtra, India</p>
           </div>
        </div>

        <div className="max-w-2xl mx-auto bg-white p-10 rounded-3xl border border-[#E2E8F0] shadow-lg">
           <h3 className="text-2xl font-bold text-[#1E293B] mb-6 text-center">Send us a message</h3>
           <form className="space-y-4">
              <input type="text" placeholder="Your Name" className="w-full px-4 py-3 bg-[#FAFAF7] border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#137A35] outline-none" required />
              <input type="email" placeholder="Your Email" className="w-full px-4 py-3 bg-[#FAFAF7] border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#137A35] outline-none" required />
              <input type="tel" placeholder="Your Phone" className="w-full px-4 py-3 bg-[#FAFAF7] border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#137A35] outline-none" required />
              <textarea placeholder="Message" rows={4} className="w-full px-4 py-3 bg-[#FAFAF7] border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#137A35] outline-none resize-none" required></textarea>
              <button type="submit" className="w-full bg-[#137A35] text-white font-bold py-3.5 rounded-xl hover:bg-[#29A53A] transition-colors">Submit Inquiry</button>
           </form>
        </div>
      </div>
    </div>
  );
}
