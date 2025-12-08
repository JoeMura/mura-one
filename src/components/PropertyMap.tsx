import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import { Property } from '@/data/properties';
import { Bed, Bath, Square, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import 'leaflet/dist/leaflet.css';

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

// Custom marker icon
const customIcon = new Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

interface PropertyMapProps {
  properties: Property[];
}

export const PropertyMap = ({ properties }: PropertyMapProps) => {
  const nairobiCenter: [number, number] = [-1.2864, 36.8172];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="w-full h-[600px] rounded-xl overflow-hidden border border-border shadow-lg">
      <MapContainer
        center={nairobiCenter}
        zoom={11}
        className="w-full h-full"
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {properties.map((property) => {
          const coords = getPropertyCoords(property.location);
          return (
            <Marker key={property.id} position={coords} icon={customIcon}>
              <Popup className="property-popup" maxWidth={320}>
                <div className="p-2">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-32 object-cover rounded-lg mb-3"
                  />
                  <h3 className="font-semibold text-foreground text-sm mb-1 line-clamp-2">
                    {property.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mb-2">
                    {property.location}
                  </p>
                  <p className="text-primary font-bold text-lg mb-3">
                    {formatPrice(property.price)}
                    <span className="text-xs text-muted-foreground font-normal">
                      /{property.priceType}
                    </span>
                  </p>
                  
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
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

                  <div className="border-t border-border pt-3">
                    <p className="text-xs font-medium text-foreground mb-2">
                      Contact: {property.landlord.name}
                    </p>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        className="flex-1 text-xs h-8"
                        onClick={() => window.open(`tel:${property.landlord.phone}`)}
                      >
                        <Phone className="w-3 h-3 mr-1" />
                        Call
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 text-xs h-8"
                        onClick={() => window.open(`mailto:${property.landlord.email}`)}
                      >
                        <Mail className="w-3 h-3 mr-1" />
                        Email
                      </Button>
                    </div>
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};
