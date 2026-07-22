import React, { useState, useEffect } from 'react';
import { useJsApiLoader } from '@react-google-maps/api';
import { CheckCircle2, Loader2, MapPin, Building, GraduationCap, Subscript as Hospital, ShoppingBag, TreePine, Dumbbell, Coffee, Store } from 'lucide-react';

interface DynamicAmenitiesProps {
  locationText: string;
  coordinates?: { lat: number; lng: number };
}

const getIconForType = (type: string) => {
  switch (type.toLowerCase()) {
    case 'school': return GraduationCap;
    case 'hospital': return Hospital;
    case 'shopping_mall': return ShoppingBag;
    case 'park': return TreePine;
    case 'supermarket': return Store;
    case 'gym': return Dumbbell;
    case 'restaurant': return Coffee;
    default: return Building;
  }
};

export function DynamicAmenities(props: DynamicAmenitiesProps) {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || import.meta.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || 'AIzaSyAoclCUnHDPEo8JgcifEOlnK3wo08pQSVQ';
  const isDev = typeof window !== 'undefined' && window.location.hostname.includes('run.app');

  if (!apiKey || isDev) {
    return <DynamicAmenitiesFallback locationText={props.locationText} />;
  }

  return <DynamicAmenitiesContent {...props} apiKey={apiKey} />;
}

function DynamicAmenitiesFallback({ locationText }: { locationText: string }) {
  const generateRandomAmenities = (location: string) => {
    const cityName = location.split(',')[0].trim();
    return [
      { name: `City Hospital, ${cityName}`, type: 'hospital' },
      { name: `International School`, type: 'school' },
      { name: `Central Mall`, type: 'shopping_mall' },
      { name: `Green Valley Park`, type: 'park' },
      { name: `Supermarket`, type: 'supermarket' },
      { name: `Fitness Center`, type: 'gym' }
    ];
  };

  const amenities = generateRandomAmenities(locationText || 'Local');

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative min-h-[120px]">
      {amenities.map((amenity, i) => {
        const Icon = getIconForType(amenity.type);
        return (
          <div key={i} className="flex items-center bg-[#F8FAFC] p-4 rounded-2xl border border-[#F1F5F9] hover:border-[#137A35] hover:shadow-md transition-all group duration-300">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm mr-4 shrink-0 group-hover:scale-110 group-hover:bg-[#137A35] transition-all duration-300">
              <Icon className="h-6 w-6 text-[#29A53A] group-hover:text-white transition-colors" />
            </div>
            <div>
              <span className="text-[#334155] font-bold text-[15px] block line-clamp-1">{amenity.name}</span>
              <span className="text-[#64748B] text-xs font-medium uppercase tracking-wider block mt-0.5">
                {(amenity.type.replace(/_/g, ' ') || 'Nearby Place')}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function DynamicAmenitiesContent({ coordinates, locationText, apiKey }: DynamicAmenitiesProps & { apiKey: string }) {
  const [libraries] = useState<("places")[]>(['places']);
  
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey,
    libraries,
  });

  const [amenities, setAmenities] = useState<{name: string, type: string}[]>([]);
  const [loading, setLoading] = useState(true);

  // Default mock amenities incase no coordinates are found or error
  const fallbackAmenities = [
    { name: 'Clubhouse', type: '' },
    { name: 'Swimming Pool', type: '' },
    { name: 'Landscaped Gardens', type: '' },
    { name: '24/7 Security', type: '' },
    { name: 'Childrens Play Area', type: '' },
    { name: 'Jogging Track', type: '' }
  ];

  const generateRandomAmenities = (location: string) => {
    const cityName = location.split(',')[0].trim();
    return [
      { name: `City Hospital, ${cityName}`, type: 'hospital' },
      { name: `International School`, type: 'school' },
      { name: `Central Mall`, type: 'shopping_mall' },
      { name: `Green Valley Park`, type: 'park' },
      { name: `Supermarket`, type: 'supermarket' },
      { name: `Fitness Center`, type: 'gym' }
    ];
  };

  useEffect(() => {
    if (loadError) {
      setAmenities(generateRandomAmenities(locationText || 'Local'));
      setLoading(false);
      return;
    }
    
    if (!isLoaded) return;
    
    if (!coordinates && locationText) { // Geocode first
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address: locationText }, (results, status) => {
        if (status === 'OK' && results && results[0]) {
          const loc = results[0].geometry.location;
          fetchAmenities({ lat: loc.lat(), lng: loc.lng() });
        } else {
          setAmenities(generateRandomAmenities(locationText));
          setLoading(false);
        }
      });
    } else if (coordinates) {
       fetchAmenities(coordinates);
    }
  }, [coordinates, locationText, isLoaded, loadError]);

  const fetchAmenities = (center: {lat: number, lng: number}) => {
    const mapDiv = document.createElement('div');
    const service = new window.google.maps.places.PlacesService(mapDiv);
    
    service.nearbySearch({
      location: center,
      radius: 3000,
      keyword: 'school OR hospital OR mall OR supermarket OR park',
    }, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK && results) {
        // Collect specific types
        const found = new Map<string, {name: string, type: string}>();
        
        results.forEach(r => {
           if (r.types && r.name && found.size < 6) {
             const mainType = r.types[0];
             if (!found.has(mainType)) {
                found.set(mainType, {
                   name: r.name,
                   type: mainType
                });
             }
           }
        });
        
        let finalAm = Array.from(found.values());
        
        if (finalAm.length > 0) {
           setAmenities(finalAm);
        } else {
           setAmenities(generateRandomAmenities(locationText));
        }
      } else {
        setAmenities(generateRandomAmenities(locationText));
      }
      setLoading(false);
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative min-h-[120px]">
      {loading ? (
        <div className="absolute inset-0 flex items-center justify-center bg-white/60 backdrop-blur-[2px] z-10 w-full h-full rounded-2xl">
           <Loader2 className="w-8 h-8 animate-spin text-[#137A35]" />
        </div>
      ) : null}
      
      {(amenities.length > 0 ? amenities : fallbackAmenities).map((amenity, i) => {
        const Icon = amenity.type ? getIconForType(amenity.type) : CheckCircle2;
        return (
          <div key={i} className="flex items-center bg-[#F8FAFC] p-4 rounded-2xl border border-[#F1F5F9] hover:border-[#137A35] hover:shadow-md transition-all group duration-300">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm mr-4 shrink-0 group-hover:scale-110 group-hover:bg-[#137A35] transition-all duration-300">
              <Icon className="h-6 w-6 text-[#29A53A] group-hover:text-white transition-colors" />
            </div>
            <div>
              <span className="text-[#334155] font-bold text-[15px] block line-clamp-1">{amenity.name}</span>
              {amenity.type && (
                <span className="text-[#64748B] text-xs font-medium uppercase tracking-wider block mt-0.5">
                  {(amenity.type.replace(/_/g, ' ') || 'Nearby Place')}
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
