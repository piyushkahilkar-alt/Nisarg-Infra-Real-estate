import React, { useState, useEffect } from "react";
import {
  collection,
  query,
  orderBy,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../lib/firebase";
import { Plus, Trash2, Edit, Loader2, Image as ImageIcon, Video, FileText, X } from "lucide-react";
import toast from "react-hot-toast";
import CloudinaryUploadWidget from "../../components/admin/CloudinaryUploadWidget";

export default function AdminProjects() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);

  // Form State
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Ongoing");
  const [reraNumber, setReraNumber] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [videos, setVideos] = useState<string[]>([]);
  const [brochurePdf, setBrochurePdf] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const fetchProjects = async () => {
    try {
      const q = query(collection(db, "projects"), orderBy("createdAt", "desc"));
      const snap = await getDocs(q);
      setProjects(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error(error);
      toast.error("Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await addDoc(collection(db, "projects"), {
        title,
        location,
        price,
        description,
        status,
        reraNumber,
        amenities: ["Clubhouse", "Gym", "Swimming Pool", "Security"], // Default mock
        images: images,
        videos: videos,
        brochurePdf: brochurePdf,
        createdAt: new Date().toISOString(),
      });
      toast.success("Project added successfully");
      setIsAdding(false);
      resetForm();
      fetchProjects();
    } catch (err) {
      toast.error("Failed to add project");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await deleteDoc(doc(db, "projects", id));
      toast.success("Deleted");
      fetchProjects();
    } catch (e) {
      toast.error("Delete failed");
    }
  };

  const resetForm = () => {
    setTitle("");
    setLocation("");
    setPrice("");
    setDescription("");
    setReraNumber("");
    setStatus("Ongoing");
    setImages([]);
    setVideos([]);
    setBrochurePdf("");
  };

  if (loading)
    return (
      <div className="flex justify-center p-10">
        <Loader2 className="animate-spin h-8 w-8 text-[#137A35]" />
      </div>
    );

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Manage Projects</h1>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="bg-[#137A35] text-white px-4 py-2 rounded-lg flex items-center text-sm font-medium hover:bg-[#29A53A]"
        >
          {isAdding ? (
            "Cancel"
          ) : (
            <>
              <Plus className="h-4 w-4 mr-2" /> Add Project
            </>
          )}
        </button>
      </div>

      {isAdding && (
        <div className="bg-white p-6 rounded-xl border border-gray-200 mb-8 shadow-sm">
          <h2 className="text-lg font-bold mb-4">Add New Project</h2>
          <form
            onSubmit={handleAddProject}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <input
              required
              type="text"
              placeholder="Project Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border p-2 rounded"
            />
            <input
              required
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="border p-2 rounded"
            />
            <input
              required
              type="text"
              placeholder="Price (e.g. ₹50 Lakhs onwards)"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="border p-2 rounded"
            />
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="border p-2 rounded"
            >
              <option value="Upcoming">Upcoming</option>
              <option value="Ongoing">Ongoing</option>
              <option value="Completed">Completed</option>
            </select>
            <input
              type="text"
              placeholder="RERA Number"
              value={reraNumber}
              onChange={(e) => setReraNumber(e.target.value)}
              className="border p-2 rounded"
            />
            <div className="md:col-span-2">
              <textarea
                required
                rows={4}
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border p-2 rounded w-full"
              />
            </div>
            
            {/* Media Uploads */}
            <div className="md:col-span-2 border-t pt-4 mt-2">
               <h3 className="text-sm font-bold text-gray-700 mb-4">Project Media (Cloudinary)</h3>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 
                 {/* Images */}
                 <div className="border rounded-lg p-4 bg-gray-50">
                    <div className="flex justify-between items-center mb-3">
                       <span className="font-semibold text-sm flex items-center"><ImageIcon className="h-4 w-4 mr-2" /> Images</span>
                       <CloudinaryUploadWidget 
                         resourceType="image"
                         multiple={true}
                         folder="projects/images"
                         onSuccess={(url) => setImages(prev => [...prev, url])}
                         buttonText={<span className="text-xs bg-gray-200 px-2 py-1 rounded cursor-pointer hover:bg-gray-300">Add Image</span>}
                       />
                    </div>
                    <div className="flex flex-wrap gap-2">
                       {images.map((url, idx) => (
                         <div key={idx} className="relative w-16 h-16 rounded overflow-hidden group">
                            <img src={url} alt="Uploaded" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/50 hidden group-hover:flex items-center justify-center">
                              <X className="text-white h-4 w-4 cursor-pointer" onClick={() => setImages(images.filter((_, i) => i !== idx))} />
                            </div>
                         </div>
                       ))}
                       {images.length === 0 && <span className="text-xs text-gray-400">No images</span>}
                    </div>
                 </div>

                 {/* Videos */}
                 <div className="border rounded-lg p-4 bg-gray-50">
                    <div className="flex justify-between items-center mb-3">
                       <span className="font-semibold text-sm flex items-center"><Video className="h-4 w-4 mr-2" /> Videos</span>
                       <CloudinaryUploadWidget 
                         resourceType="video"
                         multiple={true}
                         folder="projects/videos"
                         onSuccess={(url) => setVideos(prev => [...prev, url])}
                         buttonText={<span className="text-xs bg-gray-200 px-2 py-1 rounded cursor-pointer hover:bg-gray-300">Add Video</span>}
                       />
                    </div>
                    <div className="flex flex-wrap gap-2">
                       {videos.map((url, idx) => (
                         <div key={idx} className="relative w-16 h-16 rounded overflow-hidden bg-black group flex items-center justify-center">
                            <Video className="text-white h-6 w-6" />
                            <div className="absolute inset-0 bg-black/50 hidden group-hover:flex items-center justify-center">
                              <X className="text-white h-4 w-4 cursor-pointer" onClick={() => setVideos(videos.filter((_, i) => i !== idx))} />
                            </div>
                         </div>
                       ))}
                       {videos.length === 0 && <span className="text-xs text-gray-400">No videos</span>}
                    </div>
                 </div>

                 {/* Brochure PDF */}
                 <div className="border rounded-lg p-4 bg-gray-50">
                    <div className="flex justify-between items-center mb-3">
                       <span className="font-semibold text-sm flex items-center"><FileText className="h-4 w-4 mr-2" /> Brochure</span>
                       <CloudinaryUploadWidget 
                         resourceType="raw"
                         folder="projects/brochures"
                         onSuccess={(url) => setBrochurePdf(url)}
                         buttonText={<span className="text-xs bg-gray-200 px-2 py-1 rounded cursor-pointer hover:bg-gray-300">{brochurePdf ? 'Replace' : 'Upload PDF'}</span>}
                       />
                    </div>
                    <div>
                       {brochurePdf ? (
                         <div className="flex items-center justify-between bg-white border p-2 rounded text-sm group">
                            <span className="truncate text-blue-600 no-underline cursor-default">Brochure Attached</span>
                            <X className="h-4 w-4 text-red-500 cursor-pointer" onClick={() => setBrochurePdf("")} />
                         </div>
                       ) : (
                         <span className="text-xs text-gray-400">No PDF</span>
                       )}
                    </div>
                 </div>

               </div>
            </div>

            <div className="md:col-span-2 flex justify-end mt-4">
              <button
                disabled={submitting}
                type="submit"
                className="bg-[#137A35] text-white px-6 py-2 rounded font-medium"
              >
                {submitting ? "Saving..." : "Save Project"}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Project
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Location
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {projects.map((proj) => (
              <tr key={proj.id}>
                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                  {proj.title}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                  {proj.location}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                    {proj.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  {/* Edit functionality left out for brevity in prompt scope, focusing on working list & delete */}
                  <button
                    onClick={() => handleDelete(proj.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
            {projects.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                  No projects found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
