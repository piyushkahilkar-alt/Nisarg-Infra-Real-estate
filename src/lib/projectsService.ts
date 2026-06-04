export interface Project {
  id: string;
  title: string;
  location: string;
  price: string;
  status: string;
  description: string;
  imageURL: string;
  brochureURL: string;
  videoURL: string;
  area: string;
  latitude?: number;
  longitude?: number;
}

// Replace this URL with your deployed Google Apps Script Web App URL
export const GOOGLE_APPS_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SHEETS_URL || 'https://script.google.com/macros/s/AKfycbznmt2AWz__0dl6-bTlTJaZ79rmxaRone2NSXUaNaPqqudx7EZd8Si_oRhPfW304ZY/exec';

let cachedProjects: Project[] | null = null;
let lastFetchTime = 0;
const CACHE_DURATION = 1000 * 60 * 15; // 15 minutes cache

export const fetchProjects = async (): Promise<Project[]> => {
  if (!GOOGLE_APPS_SCRIPT_URL) {
    throw new Error('Google Apps Script URL is not configured. Please add VITE_GOOGLE_SHEETS_URL to your environment variables.');
  }

  // Check memory cache first
  if (cachedProjects && (Date.now() - lastFetchTime < CACHE_DURATION)) {
    return cachedProjects;
  }

  // Check sessionStorage next
  try {
    const sessionCache = sessionStorage.getItem('projectsData');
    const sessionTime = sessionStorage.getItem('projectsFetchTime');
    if (sessionCache && sessionTime && (Date.now() - parseInt(sessionTime) < CACHE_DURATION)) {
       cachedProjects = JSON.parse(sessionCache);
       lastFetchTime = parseInt(sessionTime);
       return cachedProjects!;
    }
  } catch(e) {}

  const response = await fetch(GOOGLE_APPS_SCRIPT_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch projects');
  }

  const data = await response.json();
  
  if (!data.status || data.status !== 'success') {
    throw new Error('Invalid response from Google Sheets');
  }

  const projects = data.data.map((item: any, index: number) => ({
    id: item.id || `project-${index}`,
    title: item.Title || '',
    location: item.Location || '',
    price: item.Price || '',
    status: item.Status || 'Ongoing',
    description: item.Description || '',
    imageURL: item.ImageURL || '',
    brochureURL: item.BrochureURL || '',
    videoURL: item.VideoURL || '',
    area: item.Area || '1000-5000 sq.ft',
    latitude: item.Latitude ? parseFloat(item.Latitude) : undefined,
    longitude: item.Longitude ? parseFloat(item.Longitude) : undefined
  }));

  cachedProjects = projects;
  lastFetchTime = Date.now();
  
  try {
     sessionStorage.setItem('projectsData', JSON.stringify(projects));
     sessionStorage.setItem('projectsFetchTime', lastFetchTime.toString());
  } catch(e) {}
  
  return projects;
};

export const fetchProjectById = async (id: string): Promise<Project | null> => {
  const projects = await fetchProjects();
  return projects.find(p => p.id === id) || null;
};
