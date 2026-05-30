import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Link } from 'react-router-dom';
import { MapPin, Loader2, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export default function Projects() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const q = query(collection(db, 'projects'), orderBy('createdAt', 'desc'));
        const snap = await getDocs(q);
        setProjects(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return (
    <div className="py-20 bg-[#FAFAF7] min-h-[calc(100vh-80px)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#1E293B] mb-4">Our Projects</h1>
          <div className="h-1 w-20 bg-[#137A35] mx-auto mb-6"></div>
          <p className="text-[#64748B]">Explore our prime locations and sustainable developments.</p>
        </div>

        {loading ? (
          <div className="flex justify-center p-20">
            <Loader2 className="h-10 w-10 text-[#137A35] animate-spin" />
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center text-[#64748B] p-20 bg-white rounded-2xl border border-[#E2E8F0]">
            No projects available at the moment.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, idx) => (
              <motion.div 
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden border border-[#E2E8F0] shadow-sm hover:shadow-lg transition-all group flex flex-col"
              >
                <div className="h-64 overflow-hidden relative">
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur text-[#29A53A] text-[10px] uppercase font-bold px-3 py-1.5 rounded-md shadow-sm z-10 tracking-widest border border-[#E2E8F0]">
                    {project.status || 'Ongoing'}
                  </div>
                  <img 
                    src={project.images?.[0] || 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80'} 
                    alt={project.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-[#1E293B] mb-2">{project.title}</h3>
                  <div className="flex items-center text-[#64748B] text-sm mb-4">
                    <MapPin className="h-4 w-4 mr-1 text-[#E85B10]" />
                    {project.location}
                  </div>
                  <p className="text-[#137A35] font-extrabold text-lg mb-6">{project.price}</p>
                  
                  <div className="mt-auto pt-4 border-t border-[#E2E8F0]">
                    <Link to={`/projects/${project.id}`} className="flex items-center text-[#1E293B] hover:text-[#137A35] font-bold text-sm transition-colors uppercase tracking-wide">
                      View Details
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
