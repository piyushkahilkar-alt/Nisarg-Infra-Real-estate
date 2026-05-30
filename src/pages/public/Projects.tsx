import React, { useEffect, useState, useRef } from 'react';
import { fetchProjects, Project } from '../../lib/projectsService';
import { Link } from 'react-router-dom';
import { MapPin, Loader2, ArrowRight, Play, Camera } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import toast from 'react-hot-toast';

const ProjectMedia = ({ project }: { project: Project }) => {
  const [isHovered, setIsHovered] = useState(false);
  const hasVideo = !!project.videoURL;
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (hasVideo && videoRef.current) {
      if (isHovered) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  }, [isHovered, hasVideo]);

  const defaultImage = 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80';

  return (
    <div 
      className="h-64 overflow-hidden relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)} // Support mobile tap-to-hover
    >
      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur text-[#29A53A] text-[10px] uppercase font-bold px-3 py-1.5 rounded-md shadow-sm z-20 tracking-widest border border-[#E2E8F0]">
        {project.status || 'Ongoing'}
      </div>
      
      {hasVideo && (
        <div className="absolute top-4 left-4 bg-black/60 backdrop-blur text-white text-[10px] uppercase font-bold px-3 py-1.5 rounded-md shadow-sm z-20 flex items-center gap-1.5">
          <Play className="w-3 h-3" />
          Video Preview
        </div>
      )}

      <AnimatePresence mode="popLayout">
        {!isHovered || !hasVideo ? (
          <motion.img 
            key="image"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            src={project.imageURL || defaultImage} 
            alt={project.title} 
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
        ) : (
          <motion.div
            key="video"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="absolute inset-0 w-full h-full bg-black z-10"
          >
            <video 
              ref={videoRef}
              src={project.videoURL} 
              muted 
              loop 
              playsInline
              className="w-full h-full object-cover opacity-90"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await fetchProjects();
        setProjects(data);
      } catch (err: any) {
        console.error(err);
        setError(err.message || 'Failed to load projects');
        toast.error('Failed to load projects');
      } finally {
        setLoading(false);
      }
    };
    loadProjects();
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
        ) : error ? (
           <div className="text-center text-red-500 p-20 bg-white rounded-2xl border border-red-100 flex flex-col items-center">
             <div className="mb-4">{error}</div>
             <p className="text-sm text-gray-500">Please make sure you have deployed your Google Apps Script and added the URL to your environment variables.</p>
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
                className="bg-white rounded-2xl overflow-hidden border border-[#E2E8F0] shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col"
              >
                <ProjectMedia project={project} />
                <div className="p-6 flex-1 flex flex-col relative bg-white z-20">
                  <h3 className="text-xl font-bold text-[#1E293B] mb-2 group-hover:text-[#137A35] transition-colors">{project.title}</h3>
                  <div className="flex items-center text-[#64748B] text-sm mb-4">
                    <MapPin className="h-4 w-4 mr-1 text-[#E85B10]" />
                    {project.location}
                  </div>
                  <p className="text-[#137A35] font-extrabold text-xl mb-6">{project.price}</p>
                  
                  <div className="mt-auto pt-4 border-t border-[#E2E8F0] flex items-center justify-between">
                    <Link to={`/projects/${project.id}`} className="flex items-center text-[#1E293B] hover:text-[#137A35] font-bold text-sm transition-colors uppercase tracking-wide group/btn">
                      View Details
                      <ArrowRight className="h-4 w-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                    {project.videoURL && project.imageURL && (
                      <div className="flex items-center text-[#94A3B8] gap-2">
                        <Camera className="h-4 w-4" />
                        <span className="text-xs font-medium">Media</span>
                      </div>
                    )}
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
