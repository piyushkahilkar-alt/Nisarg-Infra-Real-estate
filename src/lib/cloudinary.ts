export const uploadToCloudinary = async (
  file: File,
  resourceType: 'image' | 'video' | 'raw',
  onProgress?: (progress: number) => void
): Promise<string> => {
  const cloudName = (import.meta as any).env.VITE_CLOUDINARY_CLOUD_NAME || 'ddqhusxnbv';
  const uploadPreset = (import.meta as any).env.VITE_CLOUDINARY_UPLOAD_PRESET || 'nisarg_upload';

  const url = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const fd = new FormData();

    xhr.open('POST', url, true);
    
    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable && onProgress) {
        const percentComplete = Math.round((e.loaded / e.total) * 100);
        onProgress(percentComplete);
      }
    };

    xhr.onload = () => {
      if (xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        resolve(response.secure_url);
      } else {
        reject(new Error('Upload failed'));
      }
    };

    xhr.onerror = () => reject(new Error('Upload error'));

    fd.append('upload_preset', uploadPreset);
    fd.append('file', file);
    
    xhr.send(fd);
  });
};

export const uploadImage = (file: File, onProgress?: (p: number) => void) => 
  uploadToCloudinary(file, 'image', onProgress);

export const uploadVideo = (file: File, onProgress?: (p: number) => void) => 
  uploadToCloudinary(file, 'video', onProgress);

export const uploadPdf = (file: File, onProgress?: (p: number) => void) => 
  uploadToCloudinary(file, 'raw', onProgress);
