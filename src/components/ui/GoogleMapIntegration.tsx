import React, { useState, useEffect, useCallback } from 'react';
import { useJsApiLoader, GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';
import { Navigation } from 'lucide-react';

const containerStyle = {
  width: '100%',
  height: '100%',
};

// Default center (can be overridden by geocoding)
const defaultCenter = {
  lat: 21.1458,
  lng: 79.0882, // Nagpur center
};

interface GoogleMapIntegrationProps {
  locationText: string;
  coordinates?: { lat: number; lng: number };
  title?: string;
}

function GoogleMapContent({ locationText, coordinates, apiKey, title }: GoogleMapIntegrationProps & { apiKey: string }) {
  const [libraries] = useState<("places")[]>(['places']);
  
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey,
    libraries,
  });

  const [center, setCenter] = useState(coordinates || defaultCenter);
  const [markerPos, setMarkerPos] = useState<{ lat: number; lng: number } | null>(coordinates || null);
  const [isInfoWindowOpen, setIsInfoWindowOpen] = useState(true);

  useEffect(() => {
    if (coordinates) {
      setCenter(coordinates);
      setMarkerPos(coordinates);
    } else if (isLoaded && locationText) {
      // Use Geocoder if no coordinates are provided
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address: locationText }, (results, status) => {
        if (status === 'OK' && results && results[0]) {
          const loc = results[0].geometry.location;
          const newPos = { lat: loc.lat(), lng: loc.lng() };
          setCenter(newPos);
          setMarkerPos(newPos);
        }
      });
    }
  }, [coordinates, locationText, isLoaded]);

  if (loadError) {
    const iframeSrc = `https://maps.google.com/maps?q=${coordinates ? `${coordinates.lat},${coordinates.lng}` : encodeURIComponent(locationText)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
    const directionsUrl = coordinates 
      ? `https://www.google.com/maps/dir/?api=1&destination=${coordinates.lat},${coordinates.lng}`
      : `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(locationText)}`;
    
    return (
      <div className="w-full flex flex-col gap-4">
        <div className="w-full h-[400px] rounded-2xl overflow-hidden border border-[#E2E8F0] shadow-sm relative">
           <iframe 
             title={title || "Google Map"}
             width="100%" 
             height="100%" 
             style={{ border: 0 }} 
             loading="lazy" 
             allowFullScreen 
             src={iframeSrc}
           ></iframe>
        </div>
        <a 
          href={directionsUrl}
          target="_blank"
          rel="noreferrer"
          className="self-start flex items-center justify-center gap-2 bg-[#E2E8F0] text-[#1E293B] hover:bg-[#CBD5E1] transition-colors py-2 px-4 rounded-lg font-bold text-sm"
        >
          <Navigation className="w-4 h-4" />
          Get Directions
        </a>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="w-full h-[400px] bg-[#E2E8F0] rounded-2xl flex flex-col items-center justify-center border-2 border-dashed border-[#CBD5E1]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#137A35] border-t-transparent mb-4"></div>
        <p className="text-[#64748B] font-medium text-lg">Loading Map...</p>
      </div>
    );
  }

  const directionsUrl = markerPos 
    ? `https://www.google.com/maps/dir/?api=1&destination=${markerPos.lat},${markerPos.lng}`
    : `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(locationText)}`;

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="w-full h-[400px] rounded-2xl overflow-hidden border border-[#E2E8F0] shadow-sm relative">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={coordinates || markerPos ? 15 : 12}
          options={{
            mapTypeControl: false,
            streetViewControl: false,
          }}
        >
          {markerPos && (
            <Marker 
              position={markerPos} 
              onClick={() => setIsInfoWindowOpen(true)}
            >
              {isInfoWindowOpen && title && (
                <InfoWindow position={markerPos} onCloseClick={() => setIsInfoWindowOpen(false)}>
                  <div className="p-1 max-w-[200px]">
                    <h3 className="font-bold text-[#1E293B] text-sm">{title}</h3>
                    <p className="text-xs text-[#64748B] mt-1">{locationText}</p>
                  </div>
                </InfoWindow>
              )}
            </Marker>
          )}
        </GoogleMap>
      </div>
      <a 
        href={directionsUrl}
        target="_blank"
        rel="noreferrer"
        className="self-start flex items-center justify-center gap-2 bg-[#E2E8F0] text-[#1E293B] hover:bg-[#CBD5E1] transition-colors py-2 px-4 rounded-lg font-bold text-sm"
      >
        <Navigation className="w-4 h-4" />
        Get Directions
      </a>
    </div>
  );
}

export function GoogleMapIntegration({ locationText, coordinates, title }: GoogleMapIntegrationProps) {
  // Using the provided API key as a fallback. Best practice is to set VITE_GOOGLE_MAPS_API_KEY in the platform secrets.
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || import.meta.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || 'AIzaSyAoclCUnHDPEo8JgcifEOlnK3wo08pQSVQ';
  
  const isDev = typeof window !== 'undefined' && window.location.hostname.includes('run.app');
  
  if (!apiKey || isDev) {
    const iframeSrc = `https://maps.google.com/maps?q=${coordinates ? `${coordinates.lat},${coordinates.lng}` : encodeURIComponent(locationText)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
    const directionsUrl = coordinates 
      ? `https://www.google.com/maps/dir/?api=1&destination=${coordinates.lat},${coordinates.lng}`
      : `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(locationText)}`;
    
    return (
      <div className="w-full flex flex-col gap-4">
        <div className="w-full h-[400px] rounded-2xl overflow-hidden border border-[#E2E8F0] shadow-sm relative">
           <iframe 
             title={title || "Google Map"}
             width="100%" 
             height="100%" 
             style={{ border: 0 }} 
             loading="lazy" 
             allowFullScreen 
             src={iframeSrc}
           ></iframe>
        </div>
        <a 
          href={directionsUrl}
          target="_blank"
          rel="noreferrer"
          className="self-start flex items-center justify-center gap-2 bg-[#E2E8F0] text-[#1E293B] hover:bg-[#CBD5E1] transition-colors py-2 px-4 rounded-lg font-bold text-sm"
        >
          <Navigation className="w-4 h-4" />
          Get Directions
        </a>
      </div>
    );
  }

  return <GoogleMapContent locationText={locationText} coordinates={coordinates} apiKey={apiKey} title={title} />;
}
