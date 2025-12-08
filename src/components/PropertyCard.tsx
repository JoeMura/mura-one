import { Property } from '@/data/properties';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Bed, Bath, Square, Phone, MessageCircle, User } from 'lucide-react';

interface PropertyCardProps {
  property: Property;
  index: number;
}

export const PropertyCard = ({ property, index }: PropertyCardProps) => {
  const handleCall = () => {
    window.location.href = `tel:${property.landlord.phone}`;
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent(`Hi, I'm interested in your property: ${property.title}`);
    const phone = property.landlord.phone.replace(/\s/g, '').replace('+', '');
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
  };

  return (
    <Card 
      className="group overflow-hidden border-0 shadow-card hover:shadow-card-hover transition-all duration-500 gradient-card opacity-0 animate-fade-in-up"
      style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
    >
      <div className="relative overflow-hidden">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
        
        <div className="absolute top-4 left-4 flex gap-2">
          {property.featured && (
            <Badge className="bg-accent text-accent-foreground font-display">
              Featured
            </Badge>
          )}
          <Badge variant="secondary" className="backdrop-blur-sm bg-card/80 text-foreground font-body">
            {property.type.charAt(0).toUpperCase() + property.type.slice(1)}
          </Badge>
        </div>
        
        <div className="absolute bottom-4 left-4 right-4">
          <p className="text-primary-foreground font-display text-2xl font-bold">
            KES {property.price.toLocaleString()}
            <span className="text-sm font-normal opacity-80">/{property.priceType}</span>
          </p>
        </div>
      </div>
      
      <div className="p-5 space-y-4">
        <div>
          <h3 className="font-display font-semibold text-lg text-foreground group-hover:text-primary transition-colors line-clamp-1">
            {property.title}
          </h3>
          <div className="flex items-center gap-1 text-muted-foreground mt-1">
            <MapPin className="w-4 h-4 text-primary" />
            <span className="text-sm">{property.location}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Bed className="w-4 h-4" />
            <span>{property.bedrooms} Bed{property.bedrooms > 1 ? 's' : ''}</span>
          </div>
          <div className="flex items-center gap-1">
            <Bath className="w-4 h-4" />
            <span>{property.bathrooms} Bath{property.bathrooms > 1 ? 's' : ''}</span>
          </div>
          <div className="flex items-center gap-1">
            <Square className="w-4 h-4" />
            <span>{property.size} m²</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-1.5">
          {property.amenities.slice(0, 3).map((amenity) => (
            <Badge key={amenity} variant="outline" className="text-xs font-normal">
              {amenity}
            </Badge>
          ))}
          {property.amenities.length > 3 && (
            <Badge variant="outline" className="text-xs font-normal">
              +{property.amenities.length - 3} more
            </Badge>
          )}
        </div>
        
        <div className="pt-3 border-t border-border">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">{property.landlord.name}</p>
              <p className="text-xs text-muted-foreground">
                {property.landlord.isCaretaker ? 'Caretaker' : 'Landlord'}
              </p>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1"
              onClick={handleCall}
            >
              <Phone className="w-4 h-4" />
              Call
            </Button>
            <Button 
              variant="default" 
              size="sm" 
              className="flex-1 bg-[#25D366] hover:bg-[#128C7E] text-white"
              onClick={handleWhatsApp}
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};
