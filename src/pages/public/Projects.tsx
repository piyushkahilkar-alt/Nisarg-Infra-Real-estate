import React, { useEffect, useState, useRef, useMemo } from 'react';
import { fetchProjects, Project } from '../../lib/projectsService';
import { Link } from 'react-router-dom';
import { MapPin, Loader2, Play, Heart, Share2, MessageCircle, Maximize, Search, Filter, RefreshCw, Images, Scale, X, Building, CheckCircle2 } from 'lucide-react';
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
          <Images className="w-3 h-3" />
          Project Gallery
        </div>
      )}

      <AnimatePresence mode="wait">
        {!isHovered || !hasVideo ? (
          <motion.img 
            key="image"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            src={project.imageURL ? project.imageURL.split(',')[0].trim() : defaultImage} 
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
              preload="none"
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
  const [likedProjects, setLikedProjects] = useState<Record<string, boolean>>({});
  const [compareProjects, setCompareProjects] = useState<Project[]>([]);
  const [showCompareModal, setShowCompareModal] = useState(false);

  // Search and Filter States
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All Projects');
  const [selectedBudget, setSelectedBudget] = useState('All Budgets');

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
    const savedLikes = localStorage.getItem('likedProjects');
    if (savedLikes) {
      setLikedProjects(JSON.parse(savedLikes));
    }
  }, []);

  const toggleCompare = (e: React.MouseEvent, project: Project) => {
    e.preventDefault();
    setCompareProjects(prev => {
      const isAlreadyAdded = prev.some(p => p.id === project.id);
      if (isAlreadyAdded) {
        return prev.filter(p => p.id !== project.id);
      }
      if (prev.length >= 2) {
        toast.error('You can only compare a maximum of 2 projects.');
        return prev;
      }
      return [...prev, project];
    });
  };

  const toggleLike = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setLikedProjects(prev => {
      const newLikes = { ...prev, [id]: !prev[id] };
      localStorage.setItem('likedProjects', JSON.stringify(newLikes));
      if (newLikes[id]) {
        toast.success('Added to favorites!');
      } else {
        toast.success('Removed from favorites.');
      }
      return newLikes;
    });
  };

  const handleShare = (e: React.MouseEvent, project: Project) => {
    e.preventDefault();
    const url = `${window.location.origin}/projects/${project.id}`;
    const text = `Check out this amazing property: ${project.title} at ${project.location}.\nPrice: ${project.price}\nArea: ${project.area}\n\nView details here: ${url}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  const parseBudget = (priceStr: string) => {
    // Basic parser for "₹ XX Lakhs" to match budget ranges
    const match = priceStr.toLowerCase().match(/([\d.]+)\s*lakh/);
    if (!match) return 9999; // unknown, just place high
    return parseFloat(match[1]);
  };

  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesSearch = 
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        project.location.toLowerCase().includes(searchTerm.toLowerCase());
      
      let matchesType = true;
      if (selectedType !== 'All Projects') {
        const titleLower = project.title.toLowerCase();
        const typeLower = selectedType.toLowerCase();
        // Since we don't have a strict category in DB currently, we match via string for demonstration.
        // We can check title or add it to mock attributes.
        matchesType = titleLower.includes(typeLower) || 
                      (typeLower === 'plots' && titleLower.includes('plot')) ||
                      (typeLower === 'residential' && titleLower.includes('valley')) || 
                      (typeLower === 'commercial') || 
                      (typeLower === 'farmhouse' && titleLower.includes('farm'));
        
        // If it's all projects we just allow it. For realistic checking, you'd match the database 'category'.
        // To make it functional right now without a strict DB category:
        if (selectedType === 'Residential') matchesType = !titleLower.includes('commercial') && !titleLower.includes('farmhouse');
        if (selectedType === 'Commercial') matchesType = titleLower.includes('commercial');
        if (selectedType === 'Farmhouse') matchesType = titleLower.includes('farm');
        if (selectedType === 'Plots') matchesType = titleLower.includes('plot') || titleLower.includes('land');
      }

      let matchesBudget = true;
      const budgetVal = parseBudget(project.price);
      if (selectedBudget === 'Under ₹10 Lakh') {
        matchesBudget = budgetVal < 10;
      } else if (selectedBudget === '₹10–20 Lakh') {
        matchesBudget = budgetVal >= 10 && budgetVal <= 20;
      } else if (selectedBudget === '₹20–50 Lakh') {
        matchesBudget = budgetVal > 20 && budgetVal <= 50;
      } else if (selectedBudget === 'Above ₹50 Lakh') {
        matchesBudget = budgetVal > 50 && budgetVal < 1000;
      }

      return matchesSearch && matchesType && matchesBudget;
    });
  }, [projects, searchTerm, selectedType, selectedBudget]);

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedType('All Projects');
    setSelectedBudget('All Budgets');
  };

  return (
    <div className="py-20 bg-[#FAFAF7] min-h-[calc(100vh-80px)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#1E293B] mb-4">Our Projects</h1>
          <div className="h-1 w-20 bg-[#137A35] mx-auto mb-6"></div>
          <p className="text-[#64748B] text-lg">Explore our prime locations, vast areas, and sustainable developments.</p>
        </div>

        {/* Search & Filters */}
        <div className="bg-white p-6 rounded-3xl border border-[#E2E8F0] shadow-sm mb-12 relative z-20">
           <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              <div className="md:col-span-4 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94A3B8]" />
                <input 
                  type="text" 
                  placeholder="Search by project name or location..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#137A35] focus:border-transparent outline-none font-medium text-[#1E293B]"
                />
              </div>
              
              <div className="md:col-span-3 relative">
                <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94A3B8] pointer-events-none" />
                <select 
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full pl-12 pr-10 py-3.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#137A35] focus:border-transparent outline-none font-medium text-[#1E293B] appearance-none"
                >
                   <option value="All Projects">All Categories</option>
                   <option value="Residential">Residential</option>
                   <option value="Commercial">Commercial</option>
                   <option value="Farmhouse">Farmhouse</option>
                   <option value="Plots">Plots</option>
                </select>
              </div>

              <div className="md:col-span-3 relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-[#94A3B8] pointer-events-none">₹</span>
                <select 
                  value={selectedBudget}
                  onChange={(e) => setSelectedBudget(e.target.value)}
                  className="w-full pl-10 pr-10 py-3.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#137A35] focus:border-transparent outline-none font-medium text-[#1E293B] appearance-none"
                >
                   <option value="All Budgets">All Budgets</option>
                   <option value="Under ₹10 Lakh">Under ₹10 Lakh</option>
                   <option value="₹10–20 Lakh">₹10–20 Lakh</option>
                   <option value="₹20–50 Lakh">₹20–50 Lakh</option>
                   <option value="Above ₹50 Lakh">Above ₹50 Lakh</option>
                </select>
              </div>

              <div className="md:col-span-2">
                 <button 
                  onClick={resetFilters}
                  className="w-full h-full min-h-[52px] bg-[#E2E8F0] hover:bg-[#CBD5E1] text-[#1E293B] font-bold rounded-xl flex items-center justify-center transition-colors"
                 >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Reset
                 </button>
              </div>
           </div>
        </div>

        {loading ? (
          <div className="flex justify-center p-20">
            <Loader2 className="h-10 w-10 text-[#137A35] animate-spin" />
          </div>
        ) : error ? (
           <div className="text-center text-red-500 p-20 bg-white rounded-3xl border border-red-100 flex flex-col items-center shadow-sm">
             <div className="mb-4 font-bold">{error}</div>
             <p className="text-sm text-gray-500">Please make sure you have deployed your Google Apps Script and added the URL to your environment variables.</p>
           </div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center p-20 bg-white rounded-3xl border border-[#E2E8F0] shadow-sm flex flex-col items-center">
            <Search className="w-12 h-12 text-[#CBD5E1] mb-4" />
            <h3 className="text-xl font-extrabold text-[#1E293B] mb-2">No matching projects found.</h3>
            <p className="text-[#64748B] mb-6">We couldn't find any projects matching your current filters.</p>
            <button 
               onClick={resetFilters}
               className="bg-[#137A35] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#29A53A] transition-colors shadow-md"
            >
               Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, idx) => (
              <motion.div 
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden border border-[#E2E8F0] shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col"
              >
                <Link to={`/projects/${project.id}`} className="block relative">
                  <ProjectMedia project={project} />
                  
                  {/* Action Buttons Overlay */}
                  <div className="absolute top-14 right-4 flex flex-col gap-2 z-20 opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button 
                      onClick={(e) => toggleCompare(e, project)}
                      className="bg-white/95 backdrop-blur-sm p-2.5 rounded-full shadow-lg hover:scale-110 active:scale-95 transition-all"
                      title={compareProjects.some(p => p.id === project.id) ? "Remove from Compare" : "Compare"}
                    >
                      <Scale className={`w-4 h-4 ${compareProjects.some(p => p.id === project.id) ? 'text-[#137A35] font-bold' : 'text-gray-600 hover:text-[#137A35]'}`} />
                    </button>
                    <button 
                      onClick={(e) => toggleLike(e, project.id)}
                      className="bg-white/95 backdrop-blur-sm p-2.5 rounded-full shadow-lg hover:scale-110 active:scale-95 transition-all"
                      title={likedProjects[project.id] ? "Remove from Favorites" : "Add to Favorites"}
                    >
                      <Heart className={`w-4 h-4 ${likedProjects[project.id] ? 'fill-red-500 text-red-500' : 'text-gray-600 hover:text-red-500'}`} />
                    </button>
                    <button 
                      onClick={(e) => handleShare(e, project)}
                      className="bg-white/95 backdrop-blur-sm p-2.5 rounded-full shadow-lg hover:scale-110 active:scale-95 transition-all group/share"
                      title="Share Project"
                    >
                      <Share2 className="w-4 h-4 text-gray-600 group-hover/share:text-[#25D366]" />
                    </button>
                  </div>
                </Link>

                <div className="p-6 flex-1 flex flex-col relative bg-white z-20">
                  <div className="flex justify-between items-start mb-2">
                     <Link to={`/projects/${project.id}`}>
                       <h3 className="text-xl font-extrabold text-[#1E293B] group-hover:text-[#137A35] transition-colors">{project.title}</h3>
                     </Link>
                  </div>
                  
                  <div className="flex flex-col gap-2 mb-4">
                     <div className="flex items-center text-[#64748B] text-[15px] font-medium">
                       <MapPin className="h-4 w-4 mr-2 text-[#E85B10]" />
                       {project.location}
                     </div>
                     <div className="flex items-center text-[#64748B] text-[15px] font-medium">
                       <Maximize className="h-4 w-4 mr-2 text-[#29A53A]" />
                       {project.area || '1000 - 5000 sq.ft'}
                     </div>
                  </div>

                  <p className="text-[#137A35] font-black text-2xl mb-6">{project.price}</p>
                  
                  <div className="mt-auto flex flex-col gap-3">
                    <Link to={`/projects/${project.id}`} onClick={() => (window as any).gtag?.('event', 'view_project', { location: 'projects_list', project_id: project.id })} className="w-full bg-[#FAFAF7] hover:bg-[#137A35] text-[#1E293B] hover:text-white border border-[#E2E8F0] hover:border-[#137A35] rounded-xl py-3 flex items-center justify-center font-bold text-sm transition-all duration-300">
                      View full details
                    </Link>
                    <div className="grid grid-cols-2 gap-3">
                       <a href={`https://wa.me/917020785308?text=Hello, I am interested in ${project.title}.`} onClick={() => (window as any).gtag?.('event', 'whatsapp_click', { location: 'projects_list', project_id: project.id })} target="_blank" rel="noreferrer" className="bg-[#25D366] text-white rounded-xl py-3 flex items-center justify-center font-bold text-sm hover:bg-[#128C7E] transition-colors">
                          <MessageCircle className="w-4 h-4 mr-1.5" />
                          WhatsApp
                       </a>
                       <Link to="/contact" className="bg-[#1E293B] text-white rounded-xl py-3 flex items-center justify-center font-bold text-sm hover:bg-[#334155] transition-colors">
                          Enquire Now
                       </Link>
                    </div>
                  </div>

                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Compare Modal */}
      <AnimatePresence>
        {showCompareModal && compareProjects.length > 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4 overflow-y-auto"
            onClick={() => setShowCompareModal(false)}
          >
             <motion.div 
               initial={{ scale: 0.95, y: 20 }}
               animate={{ scale: 1, y: 0 }}
               exit={{ scale: 0.95, y: 20 }}
               onClick={e => e.stopPropagation()}
               className="bg-white rounded-3xl overflow-hidden shadow-2xl max-w-4xl w-full border border-[#E2E8F0]"
             >
                <div className="p-6 border-b border-[#E2E8F0] flex justify-between items-center bg-[#F8FAFC]">
                   <div className="flex items-center gap-3">
                     <div className="w-10 h-10 bg-[#137A35]/10 rounded-full flex items-center justify-center text-[#137A35]">
                       <Scale className="w-5 h-5" />
                     </div>
                     <h2 className="text-2xl font-extrabold text-[#1E293B]">Project Comparison</h2>
                   </div>
                   <button onClick={() => setShowCompareModal(false)} className="w-10 h-10 bg-white border border-[#E2E8F0] rounded-full flex items-center justify-center text-[#64748B] hover:text-[#1E293B] hover:bg-gray-50 transition-colors shadow-sm text-xl font-bold"><X className="w-6 h-6" /></button>
                </div>
                
                <div className="p-6 md:p-8">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
                      {compareProjects.map(project => (
                         <div key={project.id} className="flex flex-col">
                            <div className="h-48 rounded-2xl overflow-hidden mb-6 relative">
                               <img src={project.imageURL ? project.imageURL.split(',')[0].trim() : 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80'} alt={project.title} className="w-full h-full object-cover" />
                               <div className="absolute top-3 right-3 bg-[#E85B10] text-white text-[10px] uppercase font-bold px-2 py-1 rounded shadow-sm">
                                 {project.status || 'Ongoing'}
                               </div>
                            </div>
                            <h3 className="text-2xl font-extrabold text-[#1E293B] mb-2">{project.title}</h3>
                            <div className="flex items-center text-[#64748B] text-sm font-medium mb-6">
                              <MapPin className="h-4 w-4 mr-1 text-[#E85B10]" />
                              {project.location}
                            </div>
                            
                            <div className="space-y-4">
                               <div className="p-4 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] shadow-sm flex items-center justify-between">
                                  <p className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider mb-1">Starting Price</p>
                                  <p className="text-[#137A35] font-black text-xl">{project.price}</p>
                               </div>
                               <div className="p-4 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] shadow-sm flex items-center justify-between">
                                  <p className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider mb-1">Area Range</p>
                                  <div className="flex items-center text-[#1E293B] font-bold text-lg">
                                    <Maximize className="h-5 w-5 mr-2 text-[#29A53A]" />
                                    {project.area || '1000 - 5000 sq.ft'}
                                  </div>
                               </div>
                               <div className="p-4 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] shadow-sm">
                                  <p className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider mb-2 flex items-center gap-1"><Building className="h-4 w-4"/> Property Status</p>
                                  <div className="flex flex-wrap gap-2">
                                    <span className="inline-flex items-center gap-1.5 bg-white border border-[#E2E8F0] px-3 py-1 rounded-lg text-xs font-bold text-[#64748B]"><CheckCircle2 className="h-3.5 w-3.5 text-[#137A35]" /> Title Clear</span>
                                    <span className="inline-flex items-center gap-1.5 bg-white border border-[#E2E8F0] px-3 py-1 rounded-lg text-xs font-bold text-[#64748B]"><CheckCircle2 className="h-3.5 w-3.5 text-[#137A35]" /> NMRDA Sanctioned</span>
                                  </div>
                               </div>
                            </div>
                            
                            <Link to={`/projects/${project.id}`} onClick={() => (window as any).gtag?.('event', 'view_project', { location: 'compare_modal', project_id: project.id })} className="mt-8 bg-[#1E293B] text-white font-bold py-3 rounded-xl hover:bg-[#334155] transition-colors text-center shadow-md">
                               View Full Details
                            </Link>
                         </div>
                      ))}
                      {compareProjects.length === 1 && (
                         <div className="flex flex-col items-center justify-center h-full min-h-[300px] border-2 border-dashed border-[#E2E8F0] rounded-2xl bg-[#F8FAFC]">
                            <Scale className="w-10 h-10 text-[#CBD5E1] mb-4" />
                            <p className="text-[#64748B] font-bold">Select another project to compare</p>
                         </div>
                      )}
                   </div>
                </div>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Floating Bar */}
      <AnimatePresence>
        {compareProjects.length > 0 && (
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-0 left-0 right-0 bg-[#1E293B] text-white p-4 shadow-[0_-10px_40px_rgba(0,0,0,0.2)] z-50 rounded-t-3xl border-t border-[#334155] mx-auto max-w-4xl"
          >
            <div className="flex items-center justify-between">
               <div className="flex items-center gap-4">
                 <Scale className="w-6 h-6 text-[#137A35]" />
                 <div>
                   <p className="font-extrabold text-sm md:text-base">Compare Projects ({compareProjects.length}/2)</p>
                   <p className="text-xs text-[#94A3B8] hidden md:block">Select up to 2 projects to compare features and pricing.</p>
                 </div>
               </div>
               <div className="flex items-center gap-3">
                 <div className="hidden md:flex gap-2 mr-4">
                    {compareProjects.map(p => (
                       <div key={p.id} className="bg-[#334155] px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2">
                         <span className="truncate max-w-[150px]">{p.title}</span>
                         <button onClick={() => setCompareProjects(prev => prev.filter(x => x.id !== p.id))} className="text-[#94A3B8] hover:text-white"><X className="w-3.5 h-3.5"/></button>
                       </div>
                    ))}
                 </div>
                 <button 
                   onClick={() => setShowCompareModal(true)}
                   className="bg-[#137A35] hover:bg-[#29A53A] disabled:opacity-50 disabled:hover:bg-[#137A35] px-6 py-2.5 rounded-xl font-bold text-sm transition-colors shadow-lg"
                 >
                   Compare Now
                 </button>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
