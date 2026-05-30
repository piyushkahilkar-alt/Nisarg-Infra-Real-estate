import React, { useState, useEffect } from "react";
import {
  collection,
  query,
  orderBy,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../lib/firebase";
import { Trash2, Loader2, Image as ImageIcon, Video } from "lucide-react";
import toast from "react-hot-toast";
import CloudinaryUploadWidget from "../../components/admin/CloudinaryUploadWidget";

export default function AdminGallery() {
  const [media, setMedia] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMedia = async () => {
    try {
      const q = query(collection(db, "gallery"), orderBy("createdAt", "desc"));
      const snap = await getDocs(q);
      setMedia(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error(error);
      toast.error("Failed to load gallery");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const handleImageSuccess = async (url: string) => {
    try {
      await addDoc(collection(db, "gallery"), {
        type: "image",
        url,
        createdAt: new Date().toISOString(),
      });
      toast.success("Image added to gallery");
      fetchMedia();
    } catch (e) {
      toast.error("Failed to save image");
    }
  };

  const handleVideoSuccess = async (url: string) => {
    try {
      await addDoc(collection(db, "gallery"), {
        type: "video",
        url,
        createdAt: new Date().toISOString(),
      });
      toast.success("Video added to gallery");
      fetchMedia();
    } catch (e) {
      toast.error("Failed to save video");
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this media?")) return;
    try {
      await deleteDoc(doc(db, "gallery", id));
      toast.success("Deleted");
      fetchMedia();
    } catch (e) {
      toast.error("Delete failed");
    }
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
        <h1 className="text-2xl font-bold text-gray-900">Manage Gallery</h1>
        <div className="flex gap-4">
          <CloudinaryUploadWidget 
             resourceType="image"
             multiple={true}
             folder="gallery/images"
             onSuccess={handleImageSuccess}
             buttonText={<span className="flex items-center text-sm font-medium"><ImageIcon className="h-4 w-4 mr-2" /> Upload Image</span>}
             className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700"
          />
          <CloudinaryUploadWidget 
             resourceType="video"
             multiple={true}
             folder="gallery/videos"
             onSuccess={handleVideoSuccess}
             buttonText={<span className="flex items-center text-sm font-medium"><Video className="h-4 w-4 mr-2" /> Upload Video</span>}
             className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-indigo-700"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {media.map((item) => (
          <div key={item.id} className="relative group bg-gray-100 rounded-lg overflow-hidden border">
            {item.type === "image" ? (
              <img src={item.url} alt="Gallery" className="w-full h-48 object-cover" />
            ) : (
              <div className="w-full h-48 bg-black flex items-center justify-center relative">
                 <Video className="text-white h-10 w-10 opacity-50" />
                 <video src={item.url} className="absolute inset-0 w-full h-full object-cover opacity-70" muted loop onMouseOver={e => (e.target as HTMLVideoElement).play()} onMouseOut={e => (e.target as HTMLVideoElement).pause()} />
              </div>
            )}
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => handleDelete(item.id)}
                className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 shadow"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
            <div className="absolute bottom-2 left-2 bg-black/60 px-2 py-1 rounded text-[10px] text-white font-bold uppercase tracking-wider backdrop-blur">
              {item.type}
            </div>
          </div>
        ))}
        {media.length === 0 && (
          <div className="col-span-full py-10 text-center text-gray-500 border-2 border-dashed rounded-lg">
            No media found in gallery.
          </div>
        )}
      </div>
    </div>
  );
}
