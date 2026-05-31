import React from 'react';
import { Star, ShieldCheck, ThumbsUp } from 'lucide-react';
import { motion } from 'motion/react';

export default function Reviews() {
  const reviews = [
    {
      name: "Rahul Sharma",
      role: "Investor",
      text: "Investing in Nisarg Infra was the best decision for our family. The balance of nature and modern amenities is unmatched. The customer service from plotting to registry was top-notch.",
      image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=200",
      rating: 5,
      date: "2 months ago",
      source: "Google"
    },
    {
       name: "Priya Patel",
       role: "Homeowner",
       text: "The buying process was incredibly smooth. They delivered exactly what they promised—a beautiful eco-friendly plot in a prime location. Transparent pricing and no hidden costs.",
       image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200",
       rating: 5,
       date: "3 months ago",
       source: "Google"
    },
    {
       name: "Vikram Singh",
       role: "Real Estate Analyst",
       text: "I've seen many developments, but Nisarg Infra's commitment to sustainable infrastructure stands out. The ROI on these properties is exceptionally strong.",
       image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&q=80&w=200",
       rating: 5,
       date: "5 months ago",
       source: "Google"
    },
    {
       name: "Anjali Desai",
       role: "Business Owner",
       text: "Bought a commercial plot for my setup. The location advantages are phenomenal and the entire documentation process was handled seamlessly by their team.",
       image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200",
       rating: 4,
       date: "6 months ago",
       source: "Facebook"
    },
    {
       name: "Sanjay Kumar",
       role: "NRI Investor",
       text: "Being away from India, I was skeptical. But Nisarg Infra provided virtual tours, regular video updates, and complete transparency. Highly trustworthy developers.",
       image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
       rating: 5,
       date: "1 year ago",
       source: "Google"
    },
    {
       name: "Meera Reddy",
       role: "Architect",
       text: "As an architect, I appreciate their planning. Broad roads, proper drainage, and focus on preserving green cover. A truly well-planned township approach.",
       image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
       rating: 5,
       date: "1 year ago",
       source: "Google"
    }
  ];

  return (
    <div className="bg-[#F8FAFC] min-h-screen pb-24">
      {/* Header Section */}
      <div className="bg-[#1E293B] py-24 relative overflow-hidden">
         <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">Customer Testimonials</h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">Don't just take our word for it. Hear what our extended family of investors and homeowners have to say.</p>
         </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20 mb-16">
         <div className="bg-white rounded-3xl shadow-xl flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-[#E2E8F0] overflow-hidden border border-[#E2E8F0]">
            <div className="flex-1 p-8 text-center bg-gradient-to-b from-white to-[#FAFAF7]">
               <div className="flex justify-center text-[#E85B10] mb-2">
                 {[...Array(5)].map((_, i) => <Star key={i} className="h-8 w-8 fill-current" />)}
               </div>
               <p className="text-4xl font-black text-[#1E293B] mb-1">4.9/5</p>
               <p className="text-sm font-bold text-[#64748B] uppercase tracking-widest">Average Rating</p>
            </div>
            <div className="flex-1 p-8 text-center flex flex-col items-center justify-center bg-gradient-to-b from-white to-[#FAFAF7]">
               <ShieldCheck className="h-10 w-10 text-[#137A35] mb-3" />
               <p className="text-3xl font-black text-[#1E293B] mb-1">100%</p>
               <p className="text-sm font-bold text-[#64748B] uppercase tracking-widest">Secure & Transparent</p>
            </div>
            <div className="flex-1 p-8 text-center flex flex-col items-center justify-center bg-gradient-to-b from-white to-[#FAFAF7]">
               <ThumbsUp className="h-10 w-10 text-[#29A53A] mb-3" />
               <p className="text-3xl font-black text-[#1E293B] mb-1">500+</p>
               <p className="text-sm font-bold text-[#64748B] uppercase tracking-widest">Happy Families</p>
            </div>
         </div>
      </div>

      {/* Reviews Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((review, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#E2E8F0] flex flex-col group hover:-translate-y-2 transition-transform duration-300"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                     <img src={review.image} alt={review.name} className="w-14 h-14 rounded-full object-cover border-2 border-[#EBF5ED]" />
                     <div>
                        <h4 className="font-extrabold text-[#1E293B]">{review.name}</h4>
                        <p className="text-xs font-bold text-[#94A3B8] uppercase">{review.role}</p>
                     </div>
                  </div>
                  <img src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png" className="w-6 h-6 opacity-30 grayscale group-hover:grayscale-0 transition-all" alt="Google" />
                </div>
                
                <div className="flex text-[#E85B10] mb-4 gap-1">
                  {[...Array(review.rating)].map((_, j) => <Star key={j} className="h-4 w-4 fill-current" />)}
                </div>
                
                <p className="text-[#64748B] text-[15px] leading-relaxed italic flex-1">"{review.text}"</p>
                
                <div className="mt-6 pt-4 border-t border-[#F1F5F9] flex justify-between items-center text-xs text-[#94A3B8] font-medium">
                   <span>{review.date}</span>
                   <span>Via {review.source}</span>
                </div>
              </motion.div>
            ))}
         </div>
      </div>
    </div>
  );
}
