export interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  priceType: 'month' | 'year';
  bedrooms: number;
  bathrooms: number;
  size: number;
  image: string;
  type: 'apartment' | 'house' | 'studio' | 'bedsitter';
  amenities: string[];
  available: boolean;
  landlord: {
    name: string;
    phone: string;
    email: string;
    isCaretaker: boolean;
  };
  featured: boolean;
  description: string;
}

export const properties: Property[] = [
  {
    id: '1',
    title: 'Modern 2BR Apartment in Westlands',
    location: 'Westlands, Nairobi',
    price: 45000,
    priceType: 'month',
    bedrooms: 2,
    bathrooms: 2,
    size: 85,
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop',
    type: 'apartment',
    amenities: ['Parking', 'Security', 'Gym', 'Pool'],
    available: true,
    landlord: {
      name: 'John Mwangi',
      phone: '+254 712 345 678',
      email: 'john.mwangi@email.com',
      isCaretaker: false,
    },
    featured: true,
    description: 'Beautiful modern apartment with stunning city views. Recently renovated with high-end finishes.',
  },
  {
    id: '2',
    title: 'Spacious 3BR House in Karen',
    location: 'Karen, Nairobi',
    price: 120000,
    priceType: 'month',
    bedrooms: 3,
    bathrooms: 3,
    size: 200,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format&fit=crop',
    type: 'house',
    amenities: ['Garden', 'Parking', 'Security', 'Staff Quarters'],
    available: true,
    landlord: {
      name: 'Grace Wanjiku',
      phone: '+254 723 456 789',
      email: 'grace.w@email.com',
      isCaretaker: false,
    },
    featured: true,
    description: 'Elegant family home in serene Karen with large compound and mature garden.',
  },
  {
    id: '3',
    title: 'Cozy Studio in Kilimani',
    location: 'Kilimani, Nairobi',
    price: 25000,
    priceType: 'month',
    bedrooms: 1,
    bathrooms: 1,
    size: 35,
    image: 'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800&auto=format&fit=crop',
    type: 'studio',
    amenities: ['Security', 'Water', 'WiFi'],
    available: true,
    landlord: {
      name: 'Peter Ochieng (Caretaker)',
      phone: '+254 734 567 890',
      email: 'caretaker.kilimani@email.com',
      isCaretaker: true,
    },
    featured: false,
    description: 'Perfect studio for young professionals. Walking distance to shopping centers.',
  },
  {
    id: '4',
    title: 'Affordable Bedsitter in Roysambu',
    location: 'Roysambu, Nairobi',
    price: 8000,
    priceType: 'month',
    bedrooms: 1,
    bathrooms: 1,
    size: 20,
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop',
    type: 'bedsitter',
    amenities: ['Water', 'Security'],
    available: true,
    landlord: {
      name: 'Mary Njeri (Caretaker)',
      phone: '+254 745 678 901',
      email: 'caretaker.roysambu@email.com',
      isCaretaker: true,
    },
    featured: false,
    description: 'Budget-friendly bedsitter ideal for students. Near TRM and major universities.',
  },
  {
    id: '5',
    title: 'Executive 4BR Penthouse in Kileleshwa',
    location: 'Kileleshwa, Nairobi',
    price: 180000,
    priceType: 'month',
    bedrooms: 4,
    bathrooms: 4,
    size: 280,
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop',
    type: 'apartment',
    amenities: ['Rooftop Terrace', 'Parking', 'Gym', 'Pool', 'Concierge'],
    available: true,
    landlord: {
      name: 'James Kamau',
      phone: '+254 756 789 012',
      email: 'james.kamau@email.com',
      isCaretaker: false,
    },
    featured: true,
    description: 'Luxury penthouse with panoramic views of Nairobi. Premium finishes throughout.',
  },
  {
    id: '6',
    title: 'Family 3BR in South B',
    location: 'South B, Nairobi',
    price: 55000,
    priceType: 'month',
    bedrooms: 3,
    bathrooms: 2,
    size: 120,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop',
    type: 'apartment',
    amenities: ['Parking', 'Security', 'Backup Water'],
    available: true,
    landlord: {
      name: 'Samuel Kiprop',
      phone: '+254 767 890 123',
      email: 'samuel.k@email.com',
      isCaretaker: false,
    },
    featured: false,
    description: 'Well-maintained family apartment in quiet neighborhood with excellent schools nearby.',
  },
];

export const locations = [
  'All Locations',
  'Westlands',
  'Karen',
  'Kilimani',
  'Kileleshwa',
  'Lavington',
  'South B',
  'South C',
  'Roysambu',
  'Kasarani',
  'Embakasi',
];

export const propertyTypes = [
  { value: 'all', label: 'All Types' },
  { value: 'apartment', label: 'Apartment' },
  { value: 'house', label: 'House' },
  { value: 'studio', label: 'Studio' },
  { value: 'bedsitter', label: 'Bedsitter' },
];

export const priceRanges = [
  { value: 'all', label: 'Any Price', min: 0, max: Infinity },
  { value: 'budget', label: 'Under 15K', min: 0, max: 15000 },
  { value: 'mid', label: '15K - 50K', min: 15000, max: 50000 },
  { value: 'high', label: '50K - 100K', min: 50000, max: 100000 },
  { value: 'luxury', label: '100K+', min: 100000, max: Infinity },
];
