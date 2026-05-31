import React from 'react';
import { Leaf, ShieldCheck, Target, Users, MapPin, Building, Activity, Trophy } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

export default function About() {
  const stats = [
    { value: "15+", label: "Years Experience" },
    { value: "25+", label: "Projects Delivered" },
    { value: "10,000+", label: "Happy Customers" },
    { value: "5M+", label: "Sq.Ft Developed" }
  ];

  const team = [
    {
      name: "Mayur Nagdive",
      role: "Managing Director",
      image: "/image2.jpg",
      bio: "Visionary leader with a decade of expertise in identifying premium land parcels and developing sustainable townships."
    },
    {
      name: "Pravin Nagdive",
      role: "Head of Operations",
      image: "/image1.jpg",
      bio: "Mastermind behind flawless execution of projects ensuring timely delivery and uncompromising build quality."
    },
    {
      name: "Pooja Sharma",
      role: "Chief Architect",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300",
      bio: "Award-winning architect weaving nature seamlessly into modern living infrastructure."
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[60vh] bg-[#1E293B] overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000" 
          alt="Corporate Office" 
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1E293B] to-transparent"></div>
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 max-w-5xl mx-auto text-center mt-10">
           <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
             <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight">Crafting Legacies in <span className="text-[#29A53A]">Real Estate</span></h1>
             <p className="text-xl md:text-2xl text-gray-300 font-medium max-w-3xl mx-auto leading-relaxed text-balance">
               Nisarg Infra is central India's premier development firm, transforming raw ambition into world-class residential and commercial ecosystems.
             </p>
           </motion.div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-[#137A35] border-y border-[#29A53A]/30 relative z-20">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-white/20">
               {stats.map((stat, idx) => (
                  <div key={idx} className="text-center px-4">
                     <p className="text-4xl md:text-5xl font-black text-white mb-2">{stat.value}</p>
                     <p className="text-sm font-bold text-white/80 uppercase tracking-widest">{stat.label}</p>
                  </div>
               ))}
            </div>
         </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        
        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-32 items-center">
           <div>
              <div className="flex items-center gap-3 mb-6">
                 <div className="w-12 h-1 bg-[#E85B10] rounded-full"></div>
                 <h2 className="text-sm font-bold text-[#64748B] uppercase tracking-widest">Our Foundation</h2>
              </div>
              <h3 className="text-4xl font-extrabold text-[#1E293B] mb-8 leading-tight">Driven by Purpose, <br/>Defined by Quality.</h3>
              
              <div className="space-y-8">
                <div className="flex gap-6">
                   <div className="w-16 h-16 bg-[#F8FAFC] rounded-2xl flex items-center justify-center shrink-0 border border-[#E2E8F0]">
                      <Target className="w-8 h-8 text-[#137A35]" />
                   </div>
                   <div>
                      <h4 className="text-xl font-bold text-[#1E293B] mb-3">Our Mission</h4>
                      <p className="text-[#64748B] leading-relaxed">To democratize premium real estate by developing accessible, sustainable, and high-appreciation properties that elevate the standard of living for our investors.</p>
                   </div>
                </div>
                
                <div className="flex gap-6">
                   <div className="w-16 h-16 bg-[#F8FAFC] rounded-2xl flex items-center justify-center shrink-0 border border-[#E2E8F0]">
                      <Leaf className="w-8 h-8 text-[#29A53A]" />
                   </div>
                   <div>
                      <h4 className="text-xl font-bold text-[#1E293B] mb-3">Our Vision</h4>
                      <p className="text-[#64748B] leading-relaxed">To be India's most trusted and innovative real estate developer, where every project harmonizes seamlessly with nature while offering world-class infrastructure.</p>
                   </div>
                </div>
              </div>
           </div>
           
           <div className="relative h-[600px] rounded-[40px] overflow-hidden group">
              <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1000" alt="Villa exterior" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-8 left-8 right-8 bg-white/95 backdrop-blur-md p-6 rounded-3xl shadow-2xl flex items-center gap-6">
                 <Trophy className="w-12 h-12 text-[#E85B10]" />
                 <div>
                    <h4 className="font-extrabold text-[#1E293B] text-lg">Award Winning Developer</h4>
                    <p className="text-sm font-bold text-[#64748B]">Recognized for Excellence in 2023</p>
                 </div>
              </div>
           </div>
        </div>

        {/* Why Choose Us */}
        <div className="mb-32">
           <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl font-extrabold text-[#1E293B] mb-6">The Nisarg Advantage</h2>
              <p className="text-lg text-[#64748B]">What separates us from conventional developers.</p>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: ShieldCheck, title: "100% Clear Title", desc: "Every property comes with a legally vetted, clear title ensuring absolute peace of mind for your investment journey." },
                { icon: Activity, title: "High ROI Potential", desc: "Strategically located parcels that guarantee rapid appreciation, situated near upcoming infrastructure developments." },
                { icon: Building, title: "Premium Infrastructure", desc: "From wide concrete roads to underground electrification and bespoke clubhouses, we build without compromise." }
              ].map((item, i) => (
                 <div key={i} className="bg-[#F8FAFC] p-10 rounded-3xl border border-[#E2E8F0] hover:border-[#137A35] hover:shadow-xl transition-all duration-300 group">
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-8 group-hover:-translate-y-2 transition-transform">
                       <item.icon className="w-8 h-8 text-[#137A35]" />
                    </div>
                    <h3 className="text-2xl font-bold text-[#1E293B] mb-4">{item.title}</h3>
                    <p className="text-[#64748B] leading-relaxed">{item.desc}</p>
                 </div>
              ))}
           </div>
        </div>

        {/* Leadership Team */}
        <div className="mb-32">
           <div className="flex items-center justify-between mb-16">
              <div>
                 <h2 className="text-4xl font-extrabold text-[#1E293B] mb-4">Leadership Team</h2>
                 <p className="text-lg text-[#64748B]">The visionaries guiding our projects.</p>
              </div>
              <Link to="/contact" className="hidden md:flex items-center gap-2 font-bold text-[#137A35] hover:text-[#1E293B] transition-colors border-2 border-[#137A35] hover:border-[#1E293B] px-6 py-3 rounded-full">
                 Work With Us
              </Link>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {team.map((member, i) => (
                 <div key={i} className="group cursor-pointer">
                    <div className="relative h-96 rounded-3xl overflow-hidden mb-6">
                       <img src={member.image} alt={member.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                       <div className="absolute inset-0 bg-gradient-to-t from-[#1E293B]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-8">
                          <p className="text-white text-sm font-medium leading-relaxed">{member.bio}</p>
                       </div>
                    </div>
                    <div>
                       <h3 className="text-2xl font-extrabold text-[#1E293B] group-hover:text-[#137A35] transition-colors">{member.name}</h3>
                       <p className="text-[#E85B10] font-bold text-sm uppercase tracking-wider mt-1">{member.role}</p>
                    </div>
                 </div>
              ))}
           </div>
        </div>

        {/* Office & Locations Placeholder */}
        <div className="bg-[#1E293B] rounded-[40px] p-12 md:p-20 overflow-hidden relative border border-[#334155] shadow-2xl">
           <div className="absolute top-0 right-0 w-96 h-96 bg-[#137A35]/20 rounded-full blur-[100px]"></div>
           <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#E85B10]/10 rounded-full blur-[100px]"></div>
           
           <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div>
                 <h2 className="text-4xl font-extrabold text-white mb-6">Visit Our Headquarters</h2>
                 <p className="text-[#CBD5E1] text-lg mb-10 leading-relaxed max-w-lg">
                    Experience the Nisarg Infra difference in person. Our state-of-the-art corporate office is designed to reflect the premium quality of the homes we build.
                 </p>
                 <div className="flex flex-col gap-6">
                    <div className="flex items-center gap-4 text-white">
                       <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center shrink-0 border border-white/20">
                          <MapPin className="w-5 h-5 text-[#29A53A]" />
                       </div>
                       <p className="font-medium">Civil Lines, Nagpur, Maharashtra</p>
                    </div>
                    <div className="flex items-center gap-4 text-white">
                       <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center shrink-0 border border-white/20">
                          <Building className="w-5 h-5 text-[#E85B10]" />
                       </div>
                       <p className="font-medium">Branches: Pune • Bhopal • Raipur</p>
                    </div>
                 </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                 <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=400" className="rounded-3xl w-full h-48 object-cover shadow-lg" alt="Office 1" />
                 <img src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=400" className="rounded-3xl w-full h-48 object-cover mt-12 shadow-lg" alt="Office 2" />
              </div>
           </div>
        </div>

      </div>
    </div>
  );
}
