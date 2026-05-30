import React, { useEffect, useRef } from 'react';

declare global {
  interface Window {
    cloudinary: any;
  }
}

interface CloudinaryUploadWidgetProps {
  onSuccess: (url: string) => void;
  folder?: string;
  resourceType?: 'image' | 'video' | 'raw' | 'auto';
  buttonText?: React.ReactNode;
  className?: string;
  multiple?: boolean;
}

export default function CloudinaryUploadWidget({
  onSuccess,
  folder = '',
  resourceType = 'auto',
  buttonText = 'Upload',
  className = '',
  multiple = false
}: CloudinaryUploadWidgetProps) {
  const widgetRef = useRef<any>(null);

  useEffect(() => {
    const initWidget = () => {
      if (window.cloudinary && !widgetRef.current) {
        widgetRef.current = window.cloudinary.createUploadWidget(
          {
            cloudName: (import.meta as any).env.VITE_CLOUDINARY_CLOUD_NAME || 'ddqhusxnb',
            uploadPreset: (import.meta as any).env.VITE_CLOUDINARY_UPLOAD_PRESET || 'nisarg upload',
            folder: folder,
            resourceType: resourceType,
            multiple: multiple,
          },
          (error: any, result: any) => {
            if (!error && result && result.event === 'success') {
              onSuccess(result.info.secure_url);
            }
          }
        );
      }
    };

    // Try initializing immediately or wait for script to load if lazy loaded
    if (window.cloudinary) {
      initWidget();
    } else {
      // In case it's not loaded yet, though index.html should have it
      setTimeout(initWidget, 1000);
    }
  }, [folder, resourceType, multiple, onSuccess]);

  const openWidget = (e: React.MouseEvent) => {
    e.preventDefault();
    if (widgetRef.current) {
      widgetRef.current.open();
    } else {
      console.warn("Cloudinary widget not initialized");
      alert("Missing Cloudinary configuration. Please add VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET to environment variables.");
    }
  };

  return (
    <button onClick={openWidget} className={className}>
      {buttonText}
    </button>
  );
}
