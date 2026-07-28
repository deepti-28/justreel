import { useState } from 'react';
import { Search, MapPin, ChevronDown } from 'lucide-react';
import { DestinationCard } from '@/components/cards';
import { Input } from '@/components/ui/Form';
import { MOCK_DESTINATIONS } from '@/data/mockData';
import { DESTINATION_WEDDINGS } from '@/constants';

export function DestinationsPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');

  const allDestinations: any[] = [...MOCK_DESTINATIONS, ...DESTINATION_WEDDINGS.map(d => ({
    ...d,
    creatorsCount: 0,
    avgPrice: 50000,
    weather: { best_months: [], temperature: '', humidity: '', notes: '' },
    travelCost: { from_delhi: 0, from_mumbai: 0, from_bangalore: 0 },
    droneRestrictions: [],
    hotels: [],
  }))];

  const filtered = allDestinations.filter(d => {
    const matchesSearch = d.name.toLowerCase().includes(search.toLowerCase()) || d.state.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'all' || d.category === category;
    return matchesSearch && matchesCategory;
  });

  const categories = [
    { id: 'all', label: 'All Destinations' },
    { id: 'beach', label: 'Beach' },
    { id: 'hill', label: 'Hill Station' },
    { id: 'heritage', label: 'Heritage' },
  ];

  return (
    <div className="min-h-screen bg-surface">
      <div className="bg-brand-gradient text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>Destination Weddings</h1>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">Discover breathtaking wedding destinations with verified creators, drone operators and complete planning support.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <Input
            placeholder="Search destinations..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            icon={<Search className="w-4 h-4" />}
            className="flex-1"
          />
          <div className="flex gap-2 flex-wrap">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setCategory(cat.id)}
                className={`px-4 py-2.5 rounded-xl text-sm font-medium border transition-all ${category === cat.id ? 'bg-primary text-white border-primary' : 'bg-white border-border text-text-secondary hover:border-primary'}`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(dest => (
            <DestinationCard key={dest.id} destination={dest} />
          ))}
        </div>
      </div>
    </div>
  );
}
