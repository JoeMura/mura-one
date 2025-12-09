import { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Property } from '@/data/properties';
import { Bed, Bath, Square, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in Leaflet with bundlers
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

// Nairobi coordinates for different locations
const locationCoords: Record<string, [number, number]> = {
  'Westlands': [-1.2673, 36.8111],
  'Karen': [-1.3188, 36.7098],
  'Kilimani': [-1.2905, 36.7864],
  'Kileleshwa': [-1.2781, 36.7789],
  'Lavington': [-1.2747, 36.7678],
  'South B': [-1.3106, 36.8350],
  'South C': [-1.3183, 36.8250],
  'Roysambu': [-1.2178, 36.8878],
  'Kasarani': [-1.2213, 36.9008],
  'Embakasi': [-1.3197, 36.9018],
};

const getPropertyCoords = (location: string): [number, number] => {
  for (const [area, coords] of Object.entries(locationCoords)) {
    if (location.includes(area)) {
      // Add slight random offset to prevent markers from stacking
      return [
        coords[0] + (Math.random() - 0.5) * 0.01,
        coords[1] + (Math.random() - 0.5) * 0.01,
      ];
    }
  }
  return [-1.2864, 36.8172]; // Default Nairobi center
};

interface PropertyMapProps {
  properties: Property[];
}

// Component to handle map invalidation after render
const MapResizer = () => {
  const map = useMap();
  
  useEffect(() => {
    setTimeout(() => {
      map.invalidateSize();
    }, 100);
  }, [map]);
  
  return null;
};

// Property marker component
const PropertyMarker = ({ property }: { property: Property }) => {
  const coords = getPropertyCoords(property.location);
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Marker position={coords}>
      <Popup maxWidth={320}>
        <div className="p-2 min-w-[280px]">
          <img
            src={property.image}
            alt={property.title}
            className="w-full h-32 object-cover rounded-lg mb-3"
          />
          <h3 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-2">
            {property.title}
          </h3>
          <p className="text-xs text-gray-500 mb-2">
            {property.location}
          </p>
          <p className="text-emerald-600 font-bold text-lg mb-3">
            {formatPrice(property.price)}
            <span className="text-xs text-gray-500 font-normal">
              /{property.priceType}
            </span>
          </p>
          
          <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
            <span className="flex items-center gap-1">
              <Bed className="w-3 h-3" />
              {property.bedrooms}
            </span>
            <span className="flex items-center gap-1">
              <Bath className="w-3 h-3" />
              {property.bathrooms}
            </span>
            <span className="flex items-center gap-1">
              <Square className="w-3 h-3" />
              {property.size}m²
            </span>
          </div>

          <div className="border-t border-gray-200 pt-3">
            <p className="text-xs font-medium text-gray-900 mb-2">
              Contact: {property.landlord.name}
            </p>
            <div className="flex gap-2">
              <a
                href={`tel:${property.landlord.phone}`}
                className="flex-1 inline-flex items-center justify-center text-xs h-8 px-3 bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
              >
                <Phone className="w-3 h-3 mr-1" />
                Call
              </a>
              <a
                href={`mailto:${property.landlord.email}`}
                className="flex-1 inline-flex items-center justify-center text-xs h-8 px-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
              >
                <Mail className="w-3 h-3 mr-1" />
                Email
              </a>
            </div>
          </div>
        </div>
      </Popup>
    </Marker>
  );
};

export const PropertyMap = ({ properties }: PropertyMapProps) => {
  const nairobiCenter: [number, number] = [-1.2864, 36.8172];
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    setMapReady(true);
  }, []);

  if (!mapReady) {
    return (
      <div className="w-full h-[600px] rounded-xl overflow-hidden border border-border shadow-lg bg-muted flex items-center justify-center">
        <p className="text-muted-foreground">Loading map...</p>
      </div>
    );
  }

  return (
    <div className="w-full h-[600px] rounded-xl overflow-hidden border border-border shadow-lg">
      <MapContainer
        center={nairobiCenter}
        zoom={11}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
      >
        <MapResizer />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {properties.map((property) => (
          <PropertyMarker key={property.id} property={property} />
        ))}
      </MapContainer>
    </div>
  );
};
