import React, { useState, useEffect } from "react";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { Loader2, Play } from "lucide-react";
import { motion } from "motion/react";

export default function Gallery() {
  const [media, setMedia] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const q = query(collection(db, "gallery"), orderBy("createdAt", "desc"));
        const snap = await getDocs(q);
        setMedia(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchMedia();
  }, []);

  if (loading) {
     return <div className="min-h-[60vh] flex items-center justify-center"><Loader2 className="h-10 w-10 text-[#137A35] animate-spin" /></div>;
  }

  return (
    <div className="py-20 bg-[#FAFAF7] min-h-[calc(100vh-80px)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#1E293B] mb-4">Gallery</h1>
          <div className="h-1 w-20 bg-[#137A35] mx-auto mb-6"></div>
          <p className="text-[#64748B]">Explore the beauty and progress of our sustainable developments.</p>
        </div>

        {media.length === 0 ? (
          <div className="text-center text-[#64748B] p-20 bg-white rounded-2xl border border-[#E2E8F0]">
            No media found in gallery.
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {media.map((item, idx) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="break-inside-avoid relative rounded-2xl overflow-hidden group border border-[#E2E8F0]"
              >
                {item.type === "image" ? (
                  <img 
                    src={item.url} 
                    alt="Gallery Item" 
                    className="w-full object-cover group-hover:scale-105 transition-transform duration-500 bg-gray-200"
                    loading="lazy"
                  />
                ) : (
                  <div className="relative w-full bg-black flex items-center justify-center">
                    <video 
                       src={item.url} 
                       className="w-full object-contain max-h-[500px]"
                       controls
                       controlsList="nodownload"
                    />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
