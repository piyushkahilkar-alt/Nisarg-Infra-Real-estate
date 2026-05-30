import React, { useState, useRef } from 'react';
import { uploadImage, uploadVideo, uploadPdf } from '../../lib/cloudinary';
import { Loader2, UploadCloud } from 'lucide-react';
import toast from 'react-hot-toast';

interface MediaUploaderProps {
  onSuccess: (url: string) => void;
  resourceType: 'image' | 'video' | 'raw';
  multiple?: boolean;
  buttonText?: React.ReactNode;
  accept?: string;
  className?: string;
}

export default function MediaUploader({ 
  onSuccess, 
  resourceType, 
  multiple = false, 
  buttonText = "Upload", 
  accept,
  className = "bg-gray-200 text-sm px-3 py-1.5 rounded cursor-pointer hover:bg-gray-300 disabled:opacity-50 flex items-center" 
}: MediaUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    let successCount = 0;

    for (let i = 0; i < files.length; i++) {
       const file = files[i];
       try {
         setProgress(0);
         let url = '';
         if (resourceType === 'image') url = await uploadImage(file, setProgress);
         else if (resourceType === 'video') url = await uploadVideo(file, setProgress);
         else url = await uploadPdf(file, setProgress);
         
         onSuccess(url);
         successCount++;
       } catch (error) {
         console.error(error);
         toast.error(`Failed to upload ${file.name}`);
       }
    }
    
    setUploading(false);
    setProgress(0);
    if (fileInputRef.current) fileInputRef.current.value = '';
    
    if (successCount > 0) {
      toast.success(`Successfully uploaded ${successCount} file(s)`);
    } else {
      toast.error('Upload failed. Please check your Cloudinary configuration.');
    }
  };

  return (
    <div className="relative inline-block">
      <input 
        type="file" 
        multiple={multiple}
        accept={accept || (resourceType === 'image' ? 'image/*' : resourceType === 'video' ? 'video/*' : '.pdf')}
        className="hidden" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
      />
      <button 
        type="button"
        disabled={uploading}
        onClick={() => fileInputRef.current?.click()}
        className={className}
      >
        {uploading ? (
           <><Loader2 className="h-4 w-4 animate-spin mr-2" /> {progress}%</>
        ) : buttonText}
      </button>
    </div>
  );
}
