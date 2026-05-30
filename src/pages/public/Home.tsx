import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Building2, Trees, Leaf, Star, PhoneCall, MessageCircle, MapPin, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import toast from 'react-hot-toast';

export default function Home() {
  const [formData, setFormData] = useState({
    name: '', phone: '', email: '', budget: '', location: ''
  });
  const [submitting, setSubmitting] = useState(false);

  const handleEnquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await addDoc(collection(db, 'leads'), {
        ...formData,
        projectInterested: 'General Enquiry',
        status: 'New Lead',
        createdAt: new Date().toISOString()
      });
      toast.success("Enquiry submitted successfully! We will contact you soon.");
      setFormData({ name: '', phone: '', email: '', budget: '', location: '' });
    } catch(err) {
      toast.error("Failed to submit enquiry.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-[#FAFAF7] w-full min-h-[calc(100vh-80px)] xl:min-h-[800px] flex items-center justify-center py-12 lg:py-0 overflow-hidden">
        {/* Background Image Layer */}
        <div 
          className="absolute inset-0 z-0 bg-gray-300 pointer-events-none"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=2000')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.15
          }}
        ></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7"
          >
            <div className="inline-block px-4 py-2 bg-[#137A35] text-white rounded-full text-xs font-bold mb-6 uppercase tracking-widest shadow-md">
              RERA Approved • Premium Layouts
            </div>
            <h1 className="text-5xl lg:text-[64px] leading-[1.1] font-extrabold text-[#1E293B] mb-6 tracking-tight">
              Crafting <span className="text-[#137A35]">Sustainable</span> <br/> 
              Real Estate Legacies.
            </h1>
            <p className="text-xl leading-relaxed text-[#64748B] mb-10 max-w-[540px]">
              Explore premium plotting and residential projects in Nagpur. We blend urban luxury with natural serenity to provide a lifestyle you deserve.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <a href="tel:7020785308" className="bg-[#1E293B] text-white px-8 py-4 rounded-xl font-bold text-[15px] flex items-center justify-center hover:bg-[#0F172A] transition-all shadow-lg hover:shadow-xl">
                <PhoneCall className="h-5 w-5 mr-2" />
                Call Now
              </a>
              <a href="https://wa.me/917020785308?text=Hello Nisarg Infra Realties, I am interested in your real estate projects. Please share more details." target="_blank" rel="noreferrer" className="bg-[#25D366] text-white px-8 py-4 rounded-xl font-bold text-[15px] flex items-center justify-center hover:bg-[#128C7E] transition-all shadow-lg hover:shadow-xl">
                <MessageCircle className="h-5 w-5 mr-2" />
                WhatsApp
              </a>
              <Link to="/projects" className="bg-white text-[#137A35] border-2 border-[#137A35] px-8 py-4 rounded-xl font-bold text-[15px] flex items-center justify-center hover:bg-[#FAFAF7] transition-all shadow-md">
                Browse Projects
              </Link>
            </div>
          </motion.div>

          {/* Right Form Column */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5"
          >
             <div className="bg-white p-8 rounded-3xl shadow-2xl border border-[#E2E8F0]">
                <div className="mb-6 text-center">
                  <h3 className="text-2xl font-extrabold text-[#1E293B]">Register Your Interest</h3>
                  <p className="text-sm text-[#64748B] mt-1">Get exclusive details and priority site visits.</p>
                </div>
                
                <form onSubmit={handleEnquiry} className="space-y-4">
                  <div>
                    <label className="block text-[11px] font-bold text-[#94A3B8] uppercase mb-1">Full Name</label>
                    <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 bg-[#FAFAF7] border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#137A35] focus:border-transparent outline-none text-[14px] font-medium" placeholder="Enter full name" />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-[#94A3B8] uppercase mb-1">Email Address</label>
                    <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-3 bg-[#FAFAF7] border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#137A35] focus:border-transparent outline-none text-[14px] font-medium" placeholder="your@email.com" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold text-[#94A3B8] uppercase mb-1">Phone Number</label>
                      <input required type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full px-4 py-3 bg-[#FAFAF7] border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#137A35] focus:border-transparent outline-none text-[14px] font-medium" placeholder="+91" />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-[#94A3B8] uppercase mb-1">Budget</label>
                      <select required value={formData.budget} onChange={e => setFormData({...formData, budget: e.target.value})} className="w-full px-4 py-3 bg-[#FAFAF7] border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#137A35] focus:border-transparent outline-none text-[14px] font-medium">
                        <option value="">Select Range</option>
                        <option value="10L-25L">₹10L - ₹25L</option>
                        <option value="25L-50L">₹25L - ₹50L</option>
                        <option value="50L-1Cr">₹50L - ₹1Cr</option>
                        <option value="1Cr+">₹1Cr+</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-[#94A3B8] uppercase mb-1">Preferred Location</label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#94A3B8]" />
                      <input required type="text" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} className="w-full pl-10 pr-4 py-3 bg-[#FAFAF7] border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#137A35] focus:border-transparent outline-none text-[14px] font-medium" placeholder="E.g. Wardha Road" />
                    </div>
                  </div>
                  <button disabled={submitting} type="submit" className="w-full bg-[#E85B10] text-white font-bold py-3.5 rounded-xl hover:bg-[#d45410] transition-colors mt-2 shadow-lg hover:shadow-xl flex justify-center items-center">
                    {submitting ? <Loader2 className="animate-spin h-5 w-5" /> : 'Get Callback Now'}
                  </button>
                  <p className="text-center text-[#94A3B8] text-xs mt-3">We respect your privacy. No spam.</p>
                </form>
             </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Developments Strip */}
      <section className="bg-[#F1F5F9] px-4 py-8 md:py-0 md:px-10 flex flex-col md:flex-row items-center gap-6 md:gap-10 md:h-[160px]">
        <div className="md:w-[200px] text-center md:text-left">
          <h3 className="m-0 text-[18px] font-bold text-[#137A35]">Featured Developments</h3>
          <p className="m-0 mt-1 text-[12px] text-[#64748B]">Handpicked for high ROI</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 flex-1 w-full">
          <div className="bg-white rounded-xl flex items-center p-4 gap-4 border border-[#E2E8F0] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)] transition-transform hover:-translate-y-1">
            <div className="w-[68px] h-[68px] rounded-lg bg-[#CBD5E1] shrink-0" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1500382017468-9049fee74a62?auto=format&fit=crop&q=80&w=200')", backgroundSize: 'cover' }}></div>
            <div className="flex-1">
              <h4 className="m-0 text-[15px] font-bold text-[#1E293B]">Nisarg Green Valley</h4>
              <p className="m-0 mt-1 text-[12px] text-[#64748B] flex items-center gap-2">Wagholi &bull; <span className="bg-[#FEF3C7] text-[#D97706] px-1.5 py-0.5 rounded text-[10px] font-bold uppercase">Fast Selling</span></p>
            </div>
          </div>
          <div className="bg-white rounded-xl flex items-center p-4 gap-4 border border-[#E2E8F0] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)] transition-transform hover:-translate-y-1">
             <div className="w-[68px] h-[68px] rounded-lg bg-[#CBD5E1] shrink-0" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&q=80&w=200')", backgroundSize: 'cover' }}></div>
             <div className="flex-1">
               <h4 className="m-0 text-[15px] font-bold text-[#1E293B]">The Eco Habitat</h4>
               <p className="m-0 mt-1 text-[12px] text-[#64748B] flex items-center gap-2">Hinjewadi &bull; <span className="bg-[#FEF3C7] text-[#D97706] px-1.5 py-0.5 rounded text-[10px] font-bold uppercase">Limited Units</span></p>
             </div>
          </div>
          <div className="bg-white rounded-xl flex items-center p-4 gap-4 border border-[#E2E8F0] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)] transition-transform hover:-translate-y-1">
             <div className="w-[68px] h-[68px] rounded-lg bg-[#CBD5E1] shrink-0" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=200')", backgroundSize: 'cover' }}></div>
             <div className="flex-1">
               <h4 className="m-0 text-[15px] font-bold text-[#1E293B]">Urban Orchard</h4>
               <p className="m-0 mt-1 text-[12px] text-[#64748B] flex items-center gap-2">Mulshi &bull; <span className="bg-[#FEF3C7] text-[#D97706] px-1.5 py-0.5 rounded text-[10px] font-bold uppercase">Sustainable</span></p>
             </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-white border-y border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#1E293B] mb-4">Why Choose Nisarg Infra Realties?</h2>
            <div className="h-1 w-20 bg-[#137A35] mx-auto mb-6"></div>
            <p className="text-[#64748B]">We don't just build homes; we build sustainable communities that appreciate in value while protecting the environment.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: Trees,
                title: "Sustainable Development",
                desc: "Every project is designed with ecological balance in mind, ensuring a greener tomorrow."
              },
              {
                icon: Building2,
                title: "Premium Infrastructure",
                desc: "World-class amenities and structural integrity that promise lifelong durability and comfort."
              },
              {
                icon: Leaf,
                title: "High ROI",
                desc: "Strategic locations that guarantee excellent appreciation and rental yield for investors."
              }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="bg-white p-8 rounded-2xl border border-[#E2E8F0] shadow-sm hover:shadow-lg transition-all duration-300 group"
              >
                <div className="h-14 w-14 bg-[#EBF5ED] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="h-7 w-7 text-[#137A35]" />
                </div>
                <h3 className="text-xl font-bold text-[#1E293B] mb-3">{feature.title}</h3>
                <p className="text-[#64748B] leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-24 bg-[#FAFAF7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#1E293B] mb-4">What Our Clients Say</h2>
            <div className="h-1 w-20 bg-[#137A35] mx-auto mb-6 rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Rahul Sharma",
                role: "Investor",
                text: "Investing in Nisarg Infra was the best decision for our family. The balance of nature and modern amenities is unmatched, and the team is incredibly professional.",
                image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=200"
              },
              {
                 name: "Priya Patel",
                 role: "Homeowner",
                 text: "The buying process was incredibly smooth. They delivered exactly what they promised—a beautiful eco-friendly plot in a prime location. Highly recommended!",
                 image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200"
              },
              {
                 name: "Vikram Singh",
                 role: "Real Estate Analyst",
                 text: "I've seen many developments, but Nisarg Infra's commitment to sustainable infrastructure stands out. The ROI on these properties is exceptionally strong.",
                 image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&q=80&w=200"
              }
            ].map((testimonial, i) => (
               <div key={i} className="bg-white p-8 rounded-2xl shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)] border border-[#E2E8F0]">
                 <div className="flex text-[#D97706] mb-4">
                   {[...Array(5)].map((_, j) => <Star key={j} className="h-5 w-5 fill-current" />)}
                 </div>
                 <p className="text-[#64748B] italic mb-6">"{testimonial.text}"</p>
                 <div className="flex items-center gap-4 border-t border-[#E2E8F0] pt-4">
                   <div 
                     className="h-10 w-10 bg-[#CBD5E1] rounded-full"
                     style={{ backgroundImage: `url(${testimonial.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                   ></div>
                   <div>
                     <h4 className="font-bold text-[#1E293B] text-sm">{testimonial.name}</h4>
                     <p className="text-xs text-[#64748B]">{testimonial.role}</p>
                   </div>
                 </div>
               </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
