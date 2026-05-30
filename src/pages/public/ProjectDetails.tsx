import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { fetchProjectById, Project } from '../../lib/projectsService';
import toast from 'react-hot-toast';
import { MapPin, Download, Loader2 } from 'lucide-react';

export default function ProjectDetails() {
  const { id } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const loadProject = async () => {
      try {
        if (!id) return;
        const data = await fetchProjectById(id);
        if (data) {
          setProject(data);
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
    loadProject();
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

  if (loading) {
     return <div className="min-h-[60vh] flex items-center justify-center"><Loader2 className="h-10 w-10 text-[#137A35] animate-spin" /></div>;
  }

  if (error || !project) {
     return <div className="py-20 text-center text-xl text-gray-500">{error || "Project not found"}</div>;
  }

  return (
    <div className="bg-[#FAFAF7] pb-20 min-h-[calc(100vh-80px)]">
      {/* Hero Image */}
      <div className="h-[50vh] w-full relative bg-[#1E293B]">
         <img 
            src={project.imageURL || 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80'} 
            alt={project.title} 
            className="w-full h-full object-cover brightness-[0.7]"
         />
         <div className="absolute inset-0 flex flex-col justify-end p-8 max-w-7xl mx-auto pb-16">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">{project.title}</h1>
            <div className="flex items-center text-gray-300 text-lg mb-6">
              <MapPin className="h-5 w-5 mr-2 text-[#E85B10]" />
              {project.location}
            </div>
            <div className="flex space-x-4">
                <span className="bg-[#137A35] text-white px-5 py-2.5 rounded font-bold">{project.price}</span>
                <span className="bg-white/20 backdrop-blur text-white px-5 py-2.5 rounded font-medium">{project.status}</span>
            </div>
         </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          <div className="lg:col-span-2 space-y-10">
            <section className="bg-white p-8 rounded-2xl border border-[#E2E8F0] shadow-sm">
              <h2 className="text-2xl font-extrabold text-[#1E293B] mb-6">About the Project</h2>
              <div className="prose prose-lg text-[#64748B] max-w-none leading-relaxed whitespace-pre-line">
                {project.description}
              </div>
            </section>

            {project.videoURL && (
               <section className="bg-white p-8 rounded-2xl border border-[#E2E8F0] shadow-sm">
                 <h2 className="text-2xl font-extrabold text-[#1E293B] mb-6">Project Video</h2>
                 <div className="w-full h-80 lg:h-[450px] bg-black rounded-xl overflow-hidden relative">
                    <video 
                      src={project.videoURL} 
                      controls 
                      className="absolute inset-0 w-full h-full object-contain"
                    />
                 </div>
               </section>
            )}
          </div>

          {/* Sticky Sidebar Form */}
          <div className="lg:col-span-1">
             <div className="sticky top-28 bg-white p-8 rounded-2xl shadow-xl border border-[#E2E8F0]">
                <h3 className="text-xl font-bold text-[#1E293B] mb-2">Interested in this project?</h3>
                <p className="text-[#64748B] text-sm mb-6">Book a site visit or request more details.</p>
                
                <form onSubmit={handleInquirySubmit} className="space-y-4 mb-6">
                  <input 
                    type="text" 
                    placeholder="Your Full Name" 
                    required
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3 bg-[#FAFAF7] border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#137A35] focus:border-transparent outline-none text-[15px]"
                  />
                  <input 
                    type="tel" 
                    placeholder="Contact Number (+91)" 
                    required
                    value={formData.phone}
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-4 py-3 bg-[#FAFAF7] border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#137A35] focus:border-transparent outline-none text-[15px]"
                  />
                  <input 
                    type="email" 
                    placeholder="Email Address" 
                    required
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3 bg-[#FAFAF7] border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#137A35] focus:border-transparent outline-none text-[15px]"
                  />
                  <select 
                     required
                     value={(formData as any).budget || ''}
                     onChange={e => setFormData({...formData, budget: e.target.value} as any)}
                     className="w-full px-4 py-3 bg-[#FAFAF7] border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#137A35] focus:border-transparent outline-none text-[15px]"
                  >
                     <option value="">Select Budget</option>
                     <option value="10L-25L">₹10L - ₹25L</option>
                     <option value="25L-50L">₹25L - ₹50L</option>
                     <option value="50L-1Cr">₹50L - ₹1Cr</option>
                     <option value="1Cr+">₹1Cr+</option>
                  </select>
                  <textarea 
                    placeholder="Your Message (Optional).." 
                    rows={3}
                    value={formData.message}
                    onChange={e => setFormData({...formData, message: e.target.value})}
                    className="w-full px-4 py-3 bg-[#FAFAF7] border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#137A35] focus:border-transparent outline-none resize-none text-[15px]"
                  />
                  <button 
                    disabled={submitting}
                    className="w-full bg-[#E85B10] text-white font-bold py-3.5 rounded-xl hover:bg-opacity-90 transition-colors disabled:opacity-70 flex justify-center items-center text-[15px]"
                  >
                    {submitting ? <Loader2 className="animate-spin h-5 w-5" /> : 'Schedule Site Visit'}
                  </button>
                </form>

                <div className="grid grid-cols-2 gap-4">
                  {project.brochureURL && (
                    <a href={project.brochureURL} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 border border-[#E2E8F0] bg-white py-3 rounded-xl text-sm font-bold text-[#1E293B] hover:bg-gray-50 transition-colors col-span-2">
                      <Download className="h-4 w-4" />
                      Download Brochure
                    </a>
                  )}
                  <a href="tel:7020785308" className="flex items-center justify-center gap-2 bg-[#1E293B] text-white py-3 rounded-xl text-sm font-bold hover:bg-[#334155] transition-colors">
                     Call Now
                  </a>
                  <a href={`https://wa.me/917020785308?text=Hello Nisarg Infra Realties, I am interested in your real estate projects. Please share more details.`} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 bg-[#25D366] text-white py-3 rounded-xl text-sm font-bold hover:bg-[#128C7E] transition-colors">
                     WhatsApp
                  </a>
                </div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
}
