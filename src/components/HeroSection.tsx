import { Search, MapPin, Home, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { locations, propertyTypes, priceRanges } from '@/data/properties';

interface HeroSectionProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedLocation: string;
  setSelectedLocation: (location: string) => void;
  selectedType: string;
  setSelectedType: (type: string) => void;
  selectedPrice: string;
  setSelectedPrice: (price: string) => void;
}

export const HeroSection = ({
  searchQuery,
  setSearchQuery,
  selectedLocation,
  setSelectedLocation,
  selectedType,
  setSelectedType,
  selectedPrice,
  setSelectedPrice,
}: HeroSectionProps) => {
  return (
    <section className="relative min-h-[85vh] flex items-center gradient-hero overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }} />
      </div>
      
      <div className="container relative z-10 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4 opacity-0 animate-fade-in" style={{ animationDelay: '100ms' }}>
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
              <Home className="w-4 h-4" />
              Find Your Perfect Home
            </div>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-foreground leading-tight text-balance">
              Discover Your Dream
              <span className="text-primary"> House</span> Without
              <span className="text-accent"> Leaving Home</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Browse thousands of verified properties, connect directly with landlords and caretakers, 
              and find your next home with ease. Free listings for property owners.
            </p>
          </div>
          
          {/* Search Box */}
          <div 
            className="bg-card/80 backdrop-blur-xl p-6 rounded-2xl shadow-card border border-border/50 opacity-0 animate-fade-in-up"
            style={{ animationDelay: '300ms' }}
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative md:col-span-2">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search by property name or keyword..."
                  className="pl-10 h-12 bg-background border-border"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger className="h-12 bg-background">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <SelectValue placeholder="Location" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  {locations.map((location) => (
                    <SelectItem key={location} value={location}>
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Button variant="hero" size="lg" className="h-12">
                <Search className="w-5 h-5" />
                Search
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-border/50">
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-auto h-9 bg-secondary/50 border-0">
                  <div className="flex items-center gap-2">
                    <Home className="w-4 h-4 text-muted-foreground" />
                    <SelectValue placeholder="Property Type" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  {propertyTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={selectedPrice} onValueChange={setSelectedPrice}>
                <SelectTrigger className="w-auto h-9 bg-secondary/50 border-0">
                  <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-muted-foreground" />
                    <SelectValue placeholder="Price Range" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  {priceRanges.map((range) => (
                    <SelectItem key={range.value} value={range.value}>
                      {range.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Stats */}
          <div 
            className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-0 animate-fade-in"
            style={{ animationDelay: '500ms' }}
          >
            {[
              { value: '1,200+', label: 'Properties Listed' },
              { value: '500+', label: 'Happy Tenants' },
              { value: '300+', label: 'Verified Landlords' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-display text-3xl font-bold text-primary">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
