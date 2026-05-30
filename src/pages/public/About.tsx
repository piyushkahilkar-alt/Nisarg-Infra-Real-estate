import React from 'react';
import { Leaf } from 'lucide-react';

export default function About() {
  return (
    <div className="py-20 bg-white min-h-[calc(100vh-80px)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#1E293B] mb-4">About Us</h1>
          <div className="h-1 w-20 bg-[#137A35] mx-auto mb-6"></div>
          <p className="text-lg text-[#64748B]">Building sustainable ecosystems since our inception.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-20">
          <div className="relative">
            <div className="absolute inset-0 bg-[#EBF5ED] rounded-3xl transform translate-x-4 translate-y-4"></div>
            <img 
              src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80" 
              alt="Sustainable building" 
              className="rounded-3xl shadow-lg relative z-10 w-full h-[500px] object-cover"
            />
          </div>
          <div>
            <h2 className="text-3xl font-extrabold text-[#1E293B] mb-6">Our Story</h2>
            <p className="text-[#64748B] mb-6 leading-relaxed text-lg">
              Nisarg Infra Realties was founded with a unified purpose: to bring humans closer to nature through sustainable residential development. We believe in creating living spaces that aren't just concrete walls, but vibrant ecosystems. 
            </p>
            <p className="text-[#64748B] leading-relaxed mb-8 text-lg">
              We specialize in land plotting, premium villas, and eco-friendly townships. Our developments focus on green energy, water conservation, and preserving natural habitats.
            </p>
            <div className="flex items-center gap-4 bg-[#FAFAF7] p-4 rounded-xl border border-[#E2E8F0] shadow-sm max-w-sm">
              <div className="h-12 w-12 bg-[#137A35]/10 rounded-lg flex items-center justify-center">
                <Leaf className="h-6 w-6 text-[#137A35]" />
              </div>
              <span className="font-bold text-[#1E293B]">Eco-Friendly Architecture</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
