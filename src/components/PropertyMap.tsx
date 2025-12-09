import { useEffect, useRef } from 'react';
import L from 'leaflet';
import { Property } from '@/data/properties';
import { Bed, Bath, Square, Phone, Mail } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in Leaflet with bundlers
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

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
      return [
        coords[0] + (Math.random() - 0.5) * 0.01,
        coords[1] + (Math.random() - 0.5) * 0.01,
      ];
    }
  }
  return [-1.2864, 36.8172];
};

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

const createPopupContent = (property: Property): string => {
  return `
    <div style="min-width: 280px; padding: 8px;">
      <img
        src="${property.image}"
        alt="${property.title}"
        style="width: 100%; height: 128px; object-fit: cover; border-radius: 8px; margin-bottom: 12px;"
      />
      <h3 style="font-weight: 600; color: #111827; font-size: 14px; margin-bottom: 4px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
        ${property.title}
      </h3>
      <p style="font-size: 12px; color: #6b7280; margin-bottom: 8px;">
        ${property.location}
      </p>
      <p style="color: #059669; font-weight: 700; font-size: 18px; margin-bottom: 12px;">
        ${formatPrice(property.price)}
        <span style="font-size: 12px; color: #6b7280; font-weight: 400;">/${property.priceType}</span>
      </p>
      
      <div style="display: flex; align-items: center; gap: 12px; font-size: 12px; color: #6b7280; margin-bottom: 12px;">
        <span style="display: flex; align-items: center; gap: 4px;">
          🛏️ ${property.bedrooms}
        </span>
        <span style="display: flex; align-items: center; gap: 4px;">
          🚿 ${property.bathrooms}
        </span>
        <span style="display: flex; align-items: center; gap: 4px;">
          📐 ${property.size}m²
        </span>
      </div>

      <div style="border-top: 1px solid #e5e7eb; padding-top: 12px;">
        <p style="font-size: 12px; font-weight: 500; color: #111827; margin-bottom: 8px;">
          Contact: ${property.landlord.name}
        </p>
        <div style="display: flex; gap: 8px;">
          <a
            href="tel:${property.landlord.phone}"
            style="flex: 1; display: inline-flex; align-items: center; justify-content: center; font-size: 12px; height: 32px; padding: 0 12px; background-color: #059669; color: white; border-radius: 6px; text-decoration: none;"
          >
            📞 Call
          </a>
          <a
            href="mailto:${property.landlord.email}"
            style="flex: 1; display: inline-flex; align-items: center; justify-content: center; font-size: 12px; height: 32px; padding: 0 12px; border: 1px solid #d1d5db; color: #374151; border-radius: 6px; text-decoration: none; background: white;"
          >
            ✉️ Email
          </a>
        </div>
      </div>
    </div>
  `;
};

interface PropertyMapProps {
  properties: Property[];
}

export const PropertyMap = ({ properties }: PropertyMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);

  useEffect(() => {
    if (!mapContainer.current || mapInstance.current) return;

    const nairobiCenter: [number, number] = [-1.2864, 36.8172];

    mapInstance.current = L.map(mapContainer.current, {
      center: nairobiCenter,
      zoom: 11,
      scrollWheelZoom: true,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(mapInstance.current);

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!mapInstance.current) return;

    // Clear existing markers
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    // Add new markers
    properties.forEach((property) => {
      const coords = getPropertyCoords(property.location);
      const marker = L.marker(coords)
        .addTo(mapInstance.current!)
        .bindPopup(createPopupContent(property), {
          maxWidth: 320,
        });
      markersRef.current.push(marker);
    });
  }, [properties]);

  return (
    <div className="w-full h-[600px] rounded-xl overflow-hidden border border-border shadow-lg">
      <div ref={mapContainer} className="w-full h-full" />
    </div>
  );
};
