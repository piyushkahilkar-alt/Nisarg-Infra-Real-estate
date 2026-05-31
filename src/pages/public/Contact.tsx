import React, { useState } from 'react';
import { Phone, Mail, MapPin, Map, Share2, Loader2, Facebook, Instagram, Linkedin, MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';
import toast from 'react-hot-toast';

export default function Contact() {
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setSubmitting(false);
      (window as any).gtag?.('event', 'contact_submit', { form_type: 'contact_page' });
      toast.success("Message sent successfully. We will get back to you shortly.");
      const form = e.target as HTMLFormElement;
      form.reset();
    }, 1500);
  };

  return (
    <div className="bg-[#F8FAFC] min-h-[calc(100vh-80px)] pb-24">
      {/* Header */}
      <div className="bg-[#1E293B] py-24 relative overflow-hidden">
         <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">Get in Touch</h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">Take the first step towards your dream property. Our real estate experts are here to guide you.</p>
         </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
           
           {/* Contact Info Sidebar */}
           <motion.div 
             initial={{ opacity: 0, x: -20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.5 }}
             className="lg:col-span-4 flex flex-col gap-6"
           >
              <div className="bg-white p-8 rounded-3xl border border-[#E2E8F0] shadow-[0_8px_30px_rgb(0,0,0,0.04)] text-center group hover:border-[#137A35] transition-colors">
                 <div className="mx-auto w-16 h-16 bg-[#F1F5F9] group-hover:bg-[#EBF5ED] rounded-2xl flex items-center justify-center mb-6 transition-colors">
                    <Phone className="w-8 h-8 text-[#1E293B] group-hover:text-[#137A35] transition-colors" />
                 </div>
                 <h3 className="text-lg font-bold text-[#1E293B] mb-2 uppercase tracking-wide">Call Center</h3>
                 <a href="tel:7020785308" onClick={() => (window as any).gtag?.('event', 'call_click', { location: 'contact_cards' })} className="text-xl font-extrabold text-[#137A35] hover:text-[#E85B10] transition-colors">+91 7020785308</a>
                 <p className="text-sm text-[#94A3B8] mt-2">Mon-Sat, 10am to 7pm</p>
              </div>

              <div className="bg-white p-8 rounded-3xl border border-[#E2E8F0] shadow-[0_8px_30px_rgb(0,0,0,0.04)] text-center group hover:border-[#137A35] transition-colors">
                 <div className="mx-auto w-16 h-16 bg-[#F1F5F9] group-hover:bg-[#EBF5ED] rounded-2xl flex items-center justify-center mb-6 transition-colors">
                    <Mail className="w-8 h-8 text-[#1E293B] group-hover:text-[#137A35] transition-colors" />
                 </div>
                 <h3 className="text-lg font-bold text-[#1E293B] mb-2 uppercase tracking-wide">Email Enquiries</h3>
                 <a href="mailto:pravinnagdive@gmail.com" className="text-lg font-bold text-[#137A35] hover:text-[#E85B10] transition-colors">pravinnagdive@gmail.com</a>
                 <p className="text-sm text-[#94A3B8] mt-2">24/7 Support Team</p>
              </div>

              <div className="bg-white p-8 rounded-3xl border border-[#E2E8F0] shadow-[0_8px_30px_rgb(0,0,0,0.04)] text-center group hover:border-[#137A35] transition-colors">
                 <div className="mx-auto w-16 h-16 bg-[#F1F5F9] group-hover:bg-[#EBF5ED] rounded-2xl flex items-center justify-center mb-6 transition-colors">
                    <MapPin className="w-8 h-8 text-[#1E293B] group-hover:text-[#137A35] transition-colors" />
                 </div>
                 <h3 className="text-lg font-bold text-[#1E293B] mb-2 uppercase tracking-wide">Corporate Office</h3>
                 <p className="text-[15px] font-bold text-[#64748B] leading-relaxed max-w-xs mx-auto">Civil Lines, Nagpur,<br />Maharashtra, India - 440001</p>
              </div>

              <div className="bg-[#1E293B] p-8 rounded-3xl shadow-lg border border-[#334155] text-center">
                 <h3 className="text-sm font-bold text-white mb-6 uppercase tracking-widest opacity-80">Connect With Us</h3>
                 <div className="flex justify-center gap-4">
                    <a href="https://www.facebook.com/Nagp2?rdid=2dtCj9OEo2HTRqfX&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F18eE4bU8Ew%2F#" target="_blank" rel="noreferrer" className="w-12 h-12 bg-[#334155] rounded-full flex items-center justify-center text-white hover:bg-[#137A35] hover:scale-110 transition-all"><Facebook className="w-5 h-5" /></a>
                    <a href="https://www.instagram.com/np_infra?igsh=MTJod3Vwd3drd3Rpdg%3D%3D" target="_blank" rel="noreferrer" className="w-12 h-12 bg-[#334155] rounded-full flex items-center justify-center text-white hover:bg-[#E85B10] hover:scale-110 transition-all"><Instagram className="w-5 h-5" /></a>
                    <a href="#" className="w-12 h-12 bg-[#334155] rounded-full flex items-center justify-center text-white hover:bg-[#29A53A] hover:scale-110 transition-all"><Linkedin className="w-5 h-5" /></a>
                    <a href="https://wa.me/917020785308" onClick={() => (window as any).gtag?.('event', 'whatsapp_click', { location: 'contact_socials' })} target="_blank" rel="noreferrer" className="w-12 h-12 bg-[#334155] rounded-full flex items-center justify-center text-white hover:bg-[#25D366] hover:scale-110 transition-all"><MessageCircle className="w-5 h-5" /></a>
                 </div>
              </div>
           </motion.div>

           {/* Contact Form & Map */}
           <motion.div 
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.5, delay: 0.2 }}
             className="lg:col-span-8 flex flex-col gap-8"
           >
              <div className="bg-white p-8 md:p-12 rounded-3xl border border-[#E2E8F0] shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                 <div className="mb-10">
                    <h2 className="text-3xl font-extrabold text-[#1E293B] mb-4">Send us a message</h2>
                    <p className="text-[#64748B]">Fill out the form below and one of our dedicated property advisors will reach out to you within 24 hours.</p>
                 </div>

                 <form onSubmit={handleSubmit} className="space-y-6">
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div className="group relative">
                          <label className="block text-[11px] font-bold text-[#94A3B8] uppercase mb-2">First Name *</label>
                          <input type="text" placeholder="John" className="w-full px-5 py-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#137A35] focus:bg-white focus:border-transparent outline-none transition-all duration-300 font-medium text-[#1E293B]" required />
                       </div>
                       <div className="group relative">
                          <label className="block text-[11px] font-bold text-[#94A3B8] uppercase mb-2">Last Name</label>
                          <input type="text" placeholder="Doe" className="w-full px-5 py-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#137A35] focus:bg-white focus:border-transparent outline-none transition-all duration-300 font-medium text-[#1E293B]" />
                       </div>
                    </motion.div>
                    
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div className="group relative">
                          <label className="block text-[11px] font-bold text-[#94A3B8] uppercase mb-2">Email Address *</label>
                          <input type="email" placeholder="john@example.com" className="w-full px-5 py-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#137A35] focus:bg-white focus:border-transparent outline-none transition-all duration-300 font-medium text-[#1E293B]" required />
                       </div>
                       <div className="group relative">
                          <label className="block text-[11px] font-bold text-[#94A3B8] uppercase mb-2">Phone Number *</label>
                          <input type="tel" placeholder="+91" className="w-full px-5 py-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#137A35] focus:bg-white focus:border-transparent outline-none transition-all duration-300 font-medium text-[#1E293B]" required />
                       </div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                       <label className="block text-[11px] font-bold text-[#94A3B8] uppercase mb-2">I am interested in</label>
                       <select className="w-full px-5 py-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#137A35] focus:bg-white focus:border-transparent outline-none transition-all duration-300 font-medium text-[#1E293B] appearance-none cursor-pointer" style={{ backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%2394A3B8%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem top 50%', backgroundSize: '.65rem auto' }} required>
                          <option value="">Select Property Type</option>
                          <option value="Residential Plot">Residential Plot</option>
                          <option value="Commercial Plot">Commercial Plot</option>
                          <option value="Farmhouse">Farmhouse</option>
                          <option value="General Inquiry">General Inquiry</option>
                       </select>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
                       <label className="block text-[11px] font-bold text-[#94A3B8] uppercase mb-2">Message</label>
                       <textarea placeholder="Tell us more about your requirements..." rows={5} className="w-full px-5 py-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#137A35] focus:bg-white focus:border-transparent outline-none transition-all duration-300 font-medium text-[#1E293B] resize-none" required></textarea>
                    </motion.div>

                    <motion.button 
                      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
                      type="submit" 
                      disabled={submitting}
                      className="w-full md:w-auto px-10 bg-[#E85B10] text-white font-extrabold py-4 rounded-xl hover:bg-[#1E293B] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 disabled:opacity-70 disabled:hover:transform-none flex justify-center items-center group text-[15px]"
                    >
                      {submitting ? <Loader2 className="animate-spin h-5 w-5" /> : (
                        <>
                          Submit Inquiry
                          <Share2 className="w-4 h-4 ml-2 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                        </>
                      )}
                    </motion.button>
                 </form>
              </div>

              {/* Map Component */}
              <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.5, delay: 0.4 }}
                 className="bg-white p-2 md:p-3 rounded-3xl border border-[#E2E8F0] shadow-[0_8px_30px_rgb(0,0,0,0.04)] h-[400px] relative overflow-hidden group"
              >
                 <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d119066.41709462722!2d78.979040974868!3d21.161085906371714!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd4c0a5a31faf13%3A0x19b37d06d0bb3e2b!2sNagpur%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1709123456789!5m2!1sen!2sin" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0, borderRadius: '1rem' }} 
                    allowFullScreen 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    className="grayscale hover:grayscale-0 transition-all duration-700"
                    title="Nisarg Infra Location"
                 ></iframe>
                 <div className="absolute top-6 left-6 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg border border-[#E2E8F0] flex items-center gap-2">
                       <MapPin className="w-4 h-4 text-[#E85B10]" />
                       <span className="font-bold text-[#1E293B] text-sm">Our Location</span>
                    </div>
                 </div>
              </motion.div>
           </motion.div>

        </div>
      </div>
    </div>
  );
}
