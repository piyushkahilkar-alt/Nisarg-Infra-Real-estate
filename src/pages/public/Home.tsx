import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Building2, Trees, Leaf, Star, PhoneCall, MessageCircle, MapPin, Loader2, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import toast from 'react-hot-toast';

import { AnimatedCounter } from '../../components/ui/AnimatedCounter';

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
      (window as any).gtag?.('event', 'contact_submit', { form_type: 'home_enquiry' });
      toast.success("Enquiry submitted successfully! We will contact you soon.");
      setFormData({ name: '', phone: '', email: '', budget: '', location: '' });
    } catch(err) {
      toast.error("Failed to submit enquiry.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-[#FAFAF7] min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full min-h-[calc(100vh-80px)] xl:min-h-[850px] flex items-center justify-center py-12 lg:py-0 overflow-hidden">
        {/* Premium Background Image Layer */}
        <div 
          className="absolute inset-0 z-0 bg-black/60 pointer-events-none"
        >
          <img 
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=2000" 
            alt="Premium Real Estate"
            className="w-full h-full object-cover opacity-60 mix-blend-overlay"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7"
          >
            <div className="inline-block px-4 py-2 bg-[#137A35] text-white rounded-full text-xs font-bold mb-6 uppercase tracking-widest shadow-[0_0_15px_rgba(19,122,53,0.5)]">
              Premium plotted development • RERA Approved
            </div>
            <h1 className="text-5xl lg:text-[72px] leading-[1.1] font-extrabold text-white mb-6 tracking-tight drop-shadow-lg">
              Invest In Your <br/> 
              <span className="text-[#29A53A]">Future Legacy.</span>
            </h1>
            <p className="text-xl leading-relaxed text-gray-200 mb-10 max-w-[540px] drop-shadow-md">
              Discover exclusive, highly-appreciating lands and luxury farmhouses in prime locations. Build your dream or secure a wealth-generating asset.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link to="/projects" onClick={() => (window as any).gtag?.('event', 'view_project', { location: 'home_hero' })} className="bg-[#137A35] text-white border-2 border-[#137A35] px-8 py-4 rounded-xl font-bold text-[15px] flex items-center justify-center hover:bg-[#29A53A] transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
                View Projects
              </Link>
              <a href="tel:7020785308" onClick={() => (window as any).gtag?.('event', 'call_click', { action: 'book_site_visit', location: 'home_hero' })} className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-xl font-bold text-[15px] flex items-center justify-center hover:bg-white/20 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
                <Calendar className="h-5 w-5 mr-2" />
                Book Site Visit
              </a>
              <a href="https://wa.me/917020785308?text=Hello Nisarg Infra Realties, I would like to book a site visit." onClick={() => (window as any).gtag?.('event', 'whatsapp_click', { location: 'home_hero' })} target="_blank" rel="noreferrer" className="bg-[#25D366] text-white px-8 py-4 rounded-xl font-bold text-[15px] flex items-center justify-center hover:bg-[#128C7E] transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
                <MessageCircle className="h-5 w-5 mr-2" />
                WhatsApp Now
              </a>
            </div>
          </motion.div>

          {/* Right Form Column */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5"
          >
             <div className="bg-white/95 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/40">
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
                        <option value="Under 10 Lakh">Under 10 Lakh</option>
                        <option value="10-20 Lakh">10–20 Lakh</option>
                        <option value="20-50 Lakh">20–50 Lakh</option>
                        <option value="Above 50 Lakh">Above 50 Lakh</option>
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

      {/* Market Highlights Stats */}
      <section className="bg-white py-16 border-b border-[#E2E8F0]">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-[#E2E8F0]">
               <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="p-6">
                  <div className="text-4xl md:text-5xl font-black text-[#137A35] mb-2 tracking-tight">
                    <AnimatedCounter value={500} suffix="+" />
                  </div>
                  <h3 className="text-[#1E293B] font-extrabold text-lg">Happy Customers</h3>
                  <p className="text-[#64748B] text-sm mt-2 font-medium">Trusted by families & investors</p>
               </motion.div>
               
               <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="p-6">
                  <div className="text-4xl md:text-5xl font-black text-[#E85B10] mb-2 tracking-tight">
                    <AnimatedCounter value={25} suffix="+" />
                  </div>
                  <h3 className="text-[#1E293B] font-extrabold text-lg">Completed Projects</h3>
                  <p className="text-[#64748B] text-sm mt-2 font-medium">Delivered with premium quality</p>
               </motion.div>
               
               <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="p-6">
                  <div className="text-4xl md:text-5xl font-black text-[#29A53A] mb-2 tracking-tight">
                    <AnimatedCounter value={15} suffix="+" />
                  </div>
                  <h3 className="text-[#1E293B] font-extrabold text-lg">Years Experience</h3>
                  <p className="text-[#64748B] text-sm mt-2 font-medium">In luxury real estate</p>
               </motion.div>
            </div>
         </div>
      </section>

      {/* Featured Investment Opportunities */}
      <section className="bg-[#F8FAFC] py-24 border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-extrabold text-[#1E293B] mb-4">Featured Investment Opportunities</h2>
              <div className="h-1 w-20 bg-[#137A35] mb-6"></div>
              <p className="text-[#64748B] text-lg">Handpicked projects with strong growth potential and premium locations. Secure your asset in high ROI zones.</p>
            </div>
            <Link to="/projects" className="shrink-0 bg-white border border-[#E2E8F0] text-[#1E293B] px-6 py-3 rounded-xl font-bold text-[15px] hover:border-[#137A35] hover:text-[#137A35] transition-all shadow-sm">
              View All Projects
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                id: '1',
                title: "Nisarg Green Valley",
                location: "Wardha Road, Nagpur",
                price: "₹ 15.5 Lakhs Onwards",
                area: "1500 - 3000 sq.ft",
                status: "High ROI",
                image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800"
              },
              {
                id: '2',
                title: "The Eco Habitat",
                location: "Hingna, Nagpur",
                price: "₹ 24 Lakhs Onwards",
                area: "2000 - 5000 sq.ft",
                status: "Fast Selling",
                image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800"
              },
              {
                id: '3',
                title: "Urban Orchard Farms",
                location: "Umred Road, Nagpur",
                price: "₹ 45 Lakhs Onwards",
                area: "5000 - 10000 sq.ft",
                status: "New Launch",
                image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=800"
              }
            ].map((project, i) => (
              <Link 
                key={project.id} 
                to={`/projects`} 
                className="bg-white rounded-3xl overflow-hidden border border-[#E2E8F0] shadow-sm hover:shadow-2xl transition-all duration-500 group block relative"
              >
                <div className="h-64 overflow-hidden relative">
                  <div className="absolute top-4 left-4 z-20">
                    <span className="bg-[#E85B10] text-white px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider shadow-lg">
                      {project.status}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                </div>
                <div className="p-8 relative bg-white">
                  <h3 className="text-2xl font-extrabold text-[#1E293B] mb-2 group-hover:text-[#137A35] transition-colors">{project.title}</h3>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-[#64748B] text-[15px] font-medium">
                      <MapPin className="h-4 w-4 mr-2 text-[#E85B10]" />
                      {project.location}
                    </div>
                  </div>
                  <div className="pt-6 border-t border-[#E2E8F0] flex justify-between items-end">
                    <div>
                      <p className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider mb-1">Starting Price</p>
                      <p className="text-[#137A35] font-black text-xl">{project.price}</p>
                    </div>
                    <div className="text-right">
                       <p className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider mb-1">Area Size</p>
                       <p className="text-[#1E293B] font-bold text-[15px]">{project.area}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-[#FAFAF7] border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#1E293B] mb-4">Why Invest With Nisarg Infra?</h2>
            <div className="h-1 w-20 bg-[#137A35] mx-auto mb-6"></div>
            <p className="text-[#64748B] text-lg">We don't just sell land; we build sustainable communities that appreciate in value while protecting the environment.</p>
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
                title: "High ROI Potential",
                desc: "Strategic locations that guarantee excellent appreciation and rental yield for investors."
              }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: i * 0.2, duration: 0.6 }}
                className="bg-white p-8 rounded-2xl border border-[#E2E8F0] shadow-sm hover:shadow-xl transition-all duration-300 group"
              >
                <div className="h-16 w-16 bg-[#EBF5ED] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#137A35] transition-all duration-300">
                  <feature.icon className="h-8 w-8 text-[#137A35] group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-[#1E293B] mb-3">{feature.title}</h3>
                <p className="text-[#64748B] leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Short CTA Section */}
      <section className="py-20 bg-[#1E293B]">
         <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6">Ready to secure your premium plot?</h2>
            <p className="text-xl text-gray-300 mb-10">Join hundreds of happy families who have invested in their future with Nisarg Infra Realties.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contact" className="bg-[#137A35] text-white px-8 py-4 rounded-xl font-bold text-[15px] hover:bg-[#29A53A] transition-all shadow-lg hover:-translate-y-1">
                Contact Us Today
              </Link>
            </div>
         </div>
      </section>

    </div>
  );
}

