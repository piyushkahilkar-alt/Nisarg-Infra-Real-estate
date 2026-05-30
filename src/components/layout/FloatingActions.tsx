import React, { useState } from 'react';
import { MessageCircle, PhoneCall, MailPlus } from 'lucide-react';
import QuickEnquiryModal from './QuickEnquiryModal';

export default function FloatingActions() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="fixed bottom-6 right-6 flex flex-col gap-4 z-50">
        
        {/* Quick Enquiry Button */}
        <button 
          onClick={() => setIsModalOpen(true)}
          className="group flex items-center justify-center w-14 h-14 bg-[#1E293B] hover:bg-[#334155] text-white rounded-full shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 relative"
          title="Quick Enquiry"
        >
          <MailPlus className="h-6 w-6" />
          <span className="absolute right-16 bg-white text-[#1E293B] px-3 py-1.5 rounded-lg font-bold text-xs shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-[#E2E8F0]">
            Quick Enquiry
          </span>
        </button>

        {/* Call Now Button */}
        <a 
          href="tel:+910000000000"
          className="group flex items-center justify-center w-14 h-14 bg-[#137A35] hover:bg-[#29A53A] text-white rounded-full shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 relative"
          title="Call Now"
        >
          <PhoneCall className="h-6 w-6" />
          <span className="absolute right-16 bg-white text-[#1E293B] px-3 py-1.5 rounded-lg font-bold text-xs shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-[#E2E8F0]">
            Call Us
          </span>
        </a>

        {/* WhatsApp Button */}
        <a 
          href="https://wa.me/910000000000?text=Hi, I would like to know more about your projects."
          target="_blank"
          rel="noreferrer"
          className="group flex items-center justify-center w-14 h-14 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-full shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 relative"
          title="WhatsApp Us"
        >
          <MessageCircle className="h-6 w-6" />
          <span className="absolute right-16 bg-white text-[#1E293B] px-3 py-1.5 rounded-lg font-bold text-xs shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-[#E2E8F0]">
            WhatsApp
          </span>
        </a>

      </div>

      <QuickEnquiryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
