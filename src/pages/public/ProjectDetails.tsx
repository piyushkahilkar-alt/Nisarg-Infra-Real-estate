import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { fetchProjectById, fetchProjects, Project } from '../../lib/projectsService';
import toast from 'react-hot-toast';
import { MapPin, Download, Loader2, Phone, MessageCircle, ArrowLeft, ChevronLeft, ChevronRight, CheckCircle2, Map, Play, Maximize } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const GallerySlider = ({ items }: { items: {type: 'video'|'image', url: string}[] }) => {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((i) => (i + 1) % items.length);
  const prev = () => setIndex((i) => (i - 1 + items.length) % items.length);

  if (!items.length) return null;

  const current = items[index];

  return (
    <>
      <div className="absolute inset-0 flex items-center justify-center bg-black">
        <AnimatePresence mode="wait">
          {current.type === 'image' ? (
            <motion.img 
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              src={current.url} 
              className="w-full h-full object-contain"
              alt="Gallery item"
            />
          ) : (
            <motion.video 
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              src={current.url}
              controls
              preload="none"
              className="w-full h-full object-contain"
            />
          )}
        </AnimatePresence>
      </div>
      
      {items.length > 1 && (
        <>
          <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 backdrop-blur p-3 rounded-full text-white transition-all z-20">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 backdrop-blur p-3 rounded-full text-white transition-all z-20">
            <ChevronRight className="w-6 h-6" />
          </button>
          <div className="absolute top-4 right-4 bg-black/60 text-white px-3 py-1.5 rounded-full text-xs font-bold z-20 backdrop-blur">
             {index + 1} / {items.length}
          </div>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20 overflow-x-auto max-w-[80%] pb-2 px-2 scrollbar-none">
            {items.map((item, idx) => (
              <button 
                key={idx} 
                onClick={() => setIndex(idx)}
                className={`w-16 h-12 rounded-lg overflow-hidden border-2 transition-all shrink-0 ${idx === index ? 'border-[#29A53A]' : 'border-transparent opacity-50 hover:opacity-100'}`}
              >
                {item.type === 'video' ? (
                  <div className="w-full h-full bg-slate-800 flex items-center justify-center relative">
                    <Play className="w-4 h-4 text-white" />
                  </div>
                ) : (
                  <img src={item.url} className="w-full h-full object-cover" alt="thumbnail" />
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default function ProjectDetails() {
  const { id } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [relatedProjects, setRelatedProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [images, setImages] = useState<string[]>([]);
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        if (!id) return;
        setLoading(true);
        const [currentProj, allProjects] = await Promise.all([
          fetchProjectById(id),
          fetchProjects()
        ]);

        if (currentProj) {
          setProject(currentProj);
          const iUrls = currentProj.imageURL ? currentProj.imageURL.split(',').map(u => u.trim()) : [];
          setImages(iUrls.length ? iUrls : ['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80']);
          
          const related = allProjects.filter(p => p.id !== id).slice(0, 3);
          setRelatedProjects(related);
        } else {
          setError("Project not found");
        }
      } catch (err: any) {
        console.error(err);
        setError(err.message || 'Failed to load project details');
      } finally {
        setLoading(false);
      }
    };
    loadData();
    window.scrollTo(0, 0);
  }, [id]);

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await addDoc(collection(db, 'leads'), {
        ...formData,
        projectInterested: project?.title || 'Unknown',
        status: 'New Lead',
        createdAt: new Date().toISOString()
      });
      toast.success("Inquiry submitted successfully!");
      setFormData({ name: '', phone: '', email: '', message: '' });
    } catch (error) {
       console.error("Inquiry error:", error);
       toast.error("Failed to submit inquiry");
    } finally {
      setSubmitting(false);
    }
  };

  const nextImage = () => {
    setCurrentImageIndex(prev => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(prev => (prev - 1 + images.length) % images.length);
  };

  if (loading) {
     return <div className="min-h-[70vh] flex items-center justify-center bg-[#F8FAFC]"><Loader2 className="h-10 w-10 text-[#137A35] animate-spin" /></div>;
  }

  if (error || !project) {
     return <div className="py-32 text-center text-xl text-[#64748B] bg-[#F8FAFC] min-h-[70vh]">{error || "Project not found"}</div>;
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-[#F8FAFC] pb-20 min-h-[calc(100vh-80px)]"
    >
      {/* Hero Image / Gallery Slider */}
      <div className="h-[60vh] w-full relative bg-[#1E293B] overflow-hidden group">
         <AnimatePresence mode="wait">
           <motion.img 
              key={currentImageIndex}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              src={images[currentImageIndex]} 
              alt={`${project.title} - ${currentImageIndex + 1}`} 
              className="w-full h-full object-cover brightness-[0.65]"
           />
         </AnimatePresence>

         {images.length > 1 && (
           <>
             <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/30 backdrop-blur-md p-3 rounded-full text-white transition-all opacity-0 group-hover:opacity-100 z-20">
               <ChevronLeft className="w-6 h-6" />
             </button>
             <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/30 backdrop-blur-md p-3 rounded-full text-white transition-all opacity-0 group-hover:opacity-100 z-20">
               <ChevronRight className="w-6 h-6" />
             </button>
             <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
               {images.map((_, idx) => (
                 <button 
                  key={idx} 
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`h-2 rounded-full transition-all ${idx === currentImageIndex ? 'w-8 bg-[#29A53A]' : 'w-2 bg-white/50'}`}
                 />
               ))}
             </div>
           </>
         )}

         <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10 pointer-events-none"></div>

         <div className="absolute inset-0 flex flex-col justify-end p-8 max-w-7xl mx-auto pb-16 z-10">
            <Link to="/projects" className="inline-flex items-center text-white/80 hover:text-white mb-6 text-sm font-medium w-fit bg-black/20 px-3 py-1.5 rounded-lg backdrop-blur-md transition-colors border border-white/10">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Projects
            </Link>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 tracking-tight drop-shadow-lg">{project.title}</h1>
            <div className="flex items-center text-gray-200 text-lg mb-6 drop-shadow-md">
              <MapPin className="h-5 w-5 mr-2 text-[#29A53A]" />
              {project.location}
            </div>
            <div className="flex space-x-4">
                <span className="bg-[#137A35] text-white px-6 py-3 rounded-xl font-bold border border-[#29A53A] shadow-lg">{project.price}</span>
                <span className="bg-white/20 backdrop-blur-xl text-white px-6 py-3 rounded-xl font-bold border border-white/30 shadow-lg tracking-wider uppercase text-sm flex items-center justify-center">{project.status || 'Ongoing'}</span>
            </div>
         </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          <div className="lg:col-span-8 space-y-12">
            
            {/* Project Overview */}
            <motion.section 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="bg-white p-8 md:p-10 rounded-3xl border border-[#E2E8F0] shadow-sm hover:shadow-md transition-shadow"
            >
              <h2 className="text-2xl font-extrabold text-[#1E293B] mb-6 flex items-center">
                <span className="w-8 h-1 bg-[#137A35] rounded-full mr-4"></span>
                Project Overview
              </h2>
              <div className="prose prose-lg text-[#64748B] max-w-none leading-relaxed whitespace-pre-line">
                {project.description || "Premium plotting development offering world-class amenities and sustainable infrastructure. Invest in your legacy today."}
              </div>
            </motion.section>

            {/* Area Details */}
            <motion.section 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="bg-white p-8 md:p-10 rounded-3xl border border-[#E2E8F0] shadow-sm hover:shadow-md transition-shadow grid grid-cols-2 md:grid-cols-4 gap-6"
            >
               <div>
                  <p className="text-sm font-bold text-[#94A3B8] uppercase tracking-wider mb-2">Total Area</p>
                  <p className="text-2xl font-extrabold text-[#1E293B]">10+ Acres</p>
               </div>
               <div>
                  <p className="text-sm font-bold text-[#94A3B8] uppercase tracking-wider mb-2">Plot Sizes</p>
                  <p className="text-2xl font-extrabold text-[#1E293B]">{project.area || '1000-5000 sq.ft'}</p>
               </div>
               <div>
                  <p className="text-sm font-bold text-[#94A3B8] uppercase tracking-wider mb-2">Project Type</p>
                  <p className="text-2xl font-extrabold text-[#1E293B]">Residential</p>
               </div>
               <div>
                  <p className="text-sm font-bold text-[#94A3B8] uppercase tracking-wider mb-2">RERA Status</p>
                  <p className="text-2xl font-extrabold text-[#137A35]">Approved</p>
               </div>
            </motion.section>

            {/* Amenities (Mock Placeholder) */}
            <motion.section 
               initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
               className="bg-white p-8 md:p-10 rounded-3xl border border-[#E2E8F0] shadow-sm hover:shadow-md transition-shadow"
            >
               <h2 className="text-2xl font-extrabold text-[#1E293B] mb-8 flex items-center">
                 <span className="w-8 h-1 bg-[#137A35] rounded-full mr-4"></span>
                 Premium Amenities
               </h2>
               <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                 {['Clubhouse', 'Swimming Pool', 'Landscaped Gardens', '24/7 Security', 'Childrens Play Area', 'Jogging Track', 'Concrete Roads', 'Underground Electrification', 'Sewage Treatment'].map((amenity, i) => (
                   <div key={i} className="flex items-center bg-[#F8FAFC] p-4 rounded-2xl border border-[#F1F5F9] hover:border-[#137A35] transition-colors group">
                     <CheckCircle2 className="h-6 w-6 text-[#29A53A] mr-3 shrink-0 group-hover:scale-110 transition-transform" />
                     <span className="text-[#334155] font-bold text-[15px]">{amenity}</span>
                   </div>
                 ))}
               </div>
            </motion.section>

            {/* Gallery Section */}
            {(project.imageURL || project.videoURL) && (
               <motion.section 
                 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                 className="bg-white p-8 md:p-10 rounded-3xl border border-[#E2E8F0] shadow-sm hover:shadow-md transition-shadow"
               >
                 <h2 className="text-2xl font-extrabold text-[#1E293B] mb-8 flex items-center">
                   <span className="w-8 h-1 bg-[#137A35] rounded-full mr-4"></span>
                   Project Gallery Tour
                 </h2>
                 <div className="w-full h-[400px] md:h-[600px] bg-black rounded-2xl overflow-hidden relative shadow-lg group">
                    <AnimatePresence mode="wait">
                       {(() => {
                         const mediaItems : {type: 'video' | 'image', url: string}[] = [];
                         if (project.videoURL) {
                           project.videoURL.split(',').forEach(v => mediaItems.push({type: 'video', url: v.trim()}));
                         }
                         if (project.imageURL) {
                           project.imageURL.split(',').forEach(img => mediaItems.push({type: 'image', url: img.trim()}));
                         }
                         
                         // Create local state for gallery index outside this block is better, but since this is inline, 
                         // we can leverage the existing `currentImageIndex` from the hero slider, or create a new local component.
                         // Let's create an inline component to handle its own state.
                         return <GallerySlider items={mediaItems} />;
                       })()}
                    </AnimatePresence>
                 </div>
               </motion.section>
            )}

            {/* Location Map Placeholder */}
            <motion.section 
               initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
               className="bg-white p-8 md:p-10 rounded-3xl border border-[#E2E8F0] shadow-sm hover:shadow-md transition-shadow"
            >
               <h2 className="text-2xl font-extrabold text-[#1E293B] mb-8 flex items-center">
                 <span className="w-8 h-1 bg-[#137A35] rounded-full mr-4"></span>
                 Location Map
               </h2>
               <div className="w-full h-[400px] bg-[#E2E8F0] rounded-2xl flex flex-col items-center justify-center border-2 border-dashed border-[#CBD5E1]">
                  <Map className="h-16 w-16 text-[#94A3B8] mb-4" />
                  <p className="text-[#64748B] font-medium text-lg">Google Maps Integration Placeholder</p>
                  <p className="text-sm text-[#94A3B8] mt-2">Will be updated with iframe or Maps API</p>
               </div>
            </motion.section>

          </div>

          {/* Sticky Sidebar */}
          <div className="lg:col-span-4 relative">
             <div className="sticky top-28 space-y-6">
                
                {/* Contact Form Card */}
                <div className="bg-white p-8 rounded-3xl shadow-xl border border-[#E2E8F0]">
                  <h3 className="text-2xl font-extrabold text-[#1E293B] mb-2">Book a Site Visit</h3>
                  <p className="text-[#64748B] text-sm mb-8">Register now to get exclusive details and priority access.</p>
                  
                  <form onSubmit={handleInquirySubmit} className="space-y-4 mb-8">
                    <div>
                      <label className="block text-[11px] font-bold text-[#94A3B8] uppercase mb-1">Full Name</label>
                      <input 
                        type="text" 
                        required
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                        className="w-full px-4 py-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#137A35] focus:border-transparent outline-none text-[15px]"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-[#94A3B8] uppercase mb-1">Phone Number</label>
                      <input 
                        type="tel" 
                        required
                        value={formData.phone}
                        onChange={e => setFormData({...formData, phone: e.target.value})}
                        className="w-full px-4 py-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#137A35] focus:border-transparent outline-none text-[15px]"
                        placeholder="+91"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-[#94A3B8] uppercase mb-1">Email Address</label>
                      <input 
                        type="email" 
                        required
                        value={formData.email}
                        onChange={e => setFormData({...formData, email: e.target.value})}
                        className="w-full px-4 py-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#137A35] focus:border-transparent outline-none text-[15px]"
                        placeholder="your@email.com"
                      />
                    </div>
                    <button 
                      disabled={submitting}
                      className="w-full bg-[#E85B10] text-white font-bold py-4 rounded-xl hover:bg-[#d45410] transition-colors shadow-lg hover:shadow-xl disabled:opacity-70 flex justify-center items-center text-[15px] mt-4"
                    >
                      {submitting ? <Loader2 className="animate-spin h-5 w-5" /> : 'Schedule Site Visit'}
                    </button>
                    <p className="text-center text-[#94A3B8] text-[11px] font-medium uppercase tracking-wider mt-4">100% Secure. No Spam.</p>
                  </form>

                  <div className="grid grid-cols-1 gap-4 border-t border-[#E2E8F0] pt-8">
                    {project.brochureURL && (
                      <a href={project.brochureURL} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 border-2 border-[#1E293B] bg-white py-3.5 rounded-xl text-[15px] font-bold text-[#1E293B] hover:bg-[#1E293B] hover:text-white transition-all">
                        <Download className="h-5 w-5" />
                        Download PDF Brochure
                      </a>
                    )}
                    <div className="grid grid-cols-2 gap-3">
                      <a href="tel:7020785308" className="flex items-center justify-center gap-2 bg-[#F1F5F9] text-[#1E293B] py-3.5 rounded-xl text-[15px] font-bold hover:bg-[#E2E8F0] transition-colors border border-[#E2E8F0]">
                         <Phone className="h-4 w-4" />
                         Call Now
                      </a>
                      <a href={`https://wa.me/917020785308?text=Hello Nisarg Infra Realties, I am interested in ${project.title}. Please share more details.`} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 bg-[#25D366] text-white py-3.5 rounded-xl text-[15px] font-bold hover:bg-[#128C7E] transition-colors shadow-md">
                         <MessageCircle className="h-4 w-4" />
                         WhatsApp
                      </a>
                    </div>
                  </div>
                </div>

             </div>
          </div>

        </div>
      </div>

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
         <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-3xl font-extrabold text-[#1E293B] mb-8">Similar Properties</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               {relatedProjects.map((rp) => (
                  <Link key={rp.id} to={`/projects/${rp.id}`} className="block bg-white rounded-2xl overflow-hidden border border-[#E2E8F0] shadow-sm hover:shadow-xl transition-all duration-300 group">
                    <div className="h-48 overflow-hidden relative">
                       <img src={rp.imageURL ? rp.imageURL.split(',')[0].trim() : ''} alt={rp.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="p-5 bg-white">
                       <h3 className="font-extrabold text-lg text-[#1E293B] group-hover:text-[#137A35] transition-colors">{rp.title}</h3>
                       <p className="text-sm text-[#64748B] flex items-center mt-2"><MapPin className="w-3.5 h-3.5 mr-1 text-[#E85B10]" /> {rp.location}</p>
                       <p className="font-bold text-[#137A35] mt-3">{rp.price}</p>
                    </div>
                  </Link>
               ))}
            </div>
         </div>
      )}

    </motion.div>
  );
}
