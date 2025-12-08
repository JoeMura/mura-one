import { useState, useMemo } from 'react';
import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { PropertyCard } from '@/components/PropertyCard';
import { PropertyMap } from '@/components/PropertyMap';
import { HowItWorks } from '@/components/HowItWorks';
import { Footer } from '@/components/Footer';
import { properties, priceRanges } from '@/data/properties';
import { Home, LayoutGrid, Map } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedPrice, setSelectedPrice] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');

  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      // Search query filter
      const matchesSearch = property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.description.toLowerCase().includes(searchQuery.toLowerCase());

      // Location filter
      const matchesLocation = selectedLocation === 'All Locations' ||
        property.location.includes(selectedLocation);

      // Type filter
      const matchesType = selectedType === 'all' || property.type === selectedType;

      // Price filter
      const priceRange = priceRanges.find(r => r.value === selectedPrice);
      const matchesPrice = !priceRange || selectedPrice === 'all' ||
        (property.price >= priceRange.min && property.price <= priceRange.max);

      return matchesSearch && matchesLocation && matchesType && matchesPrice;
    });
  }, [searchQuery, selectedLocation, selectedType, selectedPrice]);

  const featuredProperties = filteredProperties.filter(p => p.featured);
  const regularProperties = filteredProperties.filter(p => !p.featured);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main>
        <HeroSection
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
          selectedType={selectedType}
          setSelectedType={setSelectedType}
          selectedPrice={selectedPrice}
          setSelectedPrice={setSelectedPrice}
        />

        {/* Featured Properties */}
        {featuredProperties.length > 0 && (
          <section id="properties" className="py-20">
            <div className="container">
              <div className="flex items-center justify-between mb-10">
                <div>
                  <span className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium mb-3">
                    ⭐ Featured
                  </span>
                  <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                    Featured Properties
                  </h2>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredProperties.map((property, index) => (
                  <PropertyCard key={property.id} property={property} index={index} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* All Properties */}
        <section className="py-20 bg-secondary/30">
          <div className="container">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
              <div>
                <span className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-3">
                  <Home className="w-4 h-4" />
                  Available Now
                </span>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                  All Properties
                </h2>
                <p className="text-muted-foreground mt-2">
                  {filteredProperties.length} properties found
                </p>
              </div>
              
              <div className="flex items-center gap-2 bg-background rounded-lg p-1 border border-border">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="gap-2"
                >
                  <LayoutGrid className="w-4 h-4" />
                  Grid
                </Button>
                <Button
                  variant={viewMode === 'map' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('map')}
                  className="gap-2"
                >
                  <Map className="w-4 h-4" />
                  Map
                </Button>
              </div>
            </div>

            {filteredProperties.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                  <Home className="w-10 h-10 text-muted-foreground" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                  No properties found
                </h3>
                <p className="text-muted-foreground">
                  Try adjusting your search filters
                </p>
              </div>
            ) : viewMode === 'map' ? (
              <PropertyMap properties={filteredProperties} />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {(regularProperties.length > 0 ? regularProperties : filteredProperties).map((property, index) => (
                  <PropertyCard 
                    key={property.id} 
                    property={property} 
                    index={featuredProperties.length + index} 
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        <HowItWorks />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
