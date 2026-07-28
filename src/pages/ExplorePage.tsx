import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, MapPin, LayoutGrid, List, Map as MapIcon, X, ChevronDown } from 'lucide-react';
import { CreatorCard } from '@/components/cards';
import { Button } from '@/components/ui/Button';
import { Input, Checkbox } from '@/components/ui/Form';
import { Badge, EmptyState, Spinner } from '@/components/ui';
import { MOCK_CREATORS } from '@/data/mockData';
import { CATEGORIES, CITIES, LANGUAGES, SORT_OPTIONS } from '@/constants';
import { formatCurrency, cn } from '@/lib/utils';

export function ExplorePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(false);
  const [visibleCount, setVisibleCount] = useState(12);

  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    location: '',
    rating: 0,
    verified: false,
    droneCertified: false,
    destinationSpecialist: false,
    hillWeddingSpecialist: false,
    minPrice: 0,
    maxPrice: 200000,
    sortBy: 'trending',
    languages: [] as string[],
  });

  const searchQuery = searchParams.get('q') || '';

  const filtered = useMemo(() => {
    let result = [...MOCK_CREATORS];
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(c =>
        c.name.toLowerCase().includes(q) ||
        c.bio.toLowerCase().includes(q) ||
        c.categories.some(cat => cat.includes(q)) ||
        c.city.toLowerCase().includes(q)
      );
    }
    if (filters.category) result = result.filter(c => c.categories.includes(filters.category));
    if (filters.location) result = result.filter(c => c.city === filters.location);
    if (filters.rating > 0) result = result.filter(c => c.rating >= filters.rating);
    if (filters.verified) result = result.filter(c => c.verified);
    if (filters.droneCertified) result = result.filter(c => c.droneCertified);
    if (filters.destinationSpecialist) result = result.filter(c => c.destinationSpecialist);
    if (filters.hillWeddingSpecialist) result = result.filter(c => c.hillWeddingSpecialist);
    result = result.filter(c => c.startingPrice >= filters.minPrice && c.startingPrice <= filters.maxPrice);
    if (filters.languages.length > 0) {
      result = result.filter(c => filters.languages.some(l => c.languages.includes(l)));
    }

    switch (filters.sortBy) {
      case 'newest': result.reverse(); break;
      case 'popular': result.sort((a, b) => b.bookingCount - a.bookingCount); break;
      case 'top_rated': result.sort((a, b) => b.rating - a.rating); break;
      case 'price_low': result.sort((a, b) => a.startingPrice - b.startingPrice); break;
      case 'price_high': result.sort((a, b) => b.startingPrice - a.startingPrice); break;
      default: result.sort((a, b) => b.followerCount - a.followerCount);
    }
    return result;
  }, [searchQuery, filters]);

  const updateFilter = (key: string, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setLoading(true);
    setTimeout(() => setLoading(false), 300);
  };

  const loadMore = () => {
    setLoading(true);
    setTimeout(() => {
      setVisibleCount(prev => prev + 8);
      setLoading(false);
    }, 500);
  };

  const clearFilters = () => {
    setFilters({
      category: '', location: '', rating: 0, verified: false,
      droneCertified: false, destinationSpecialist: false, hillWeddingSpecialist: false,
      minPrice: 0, maxPrice: 200000, sortBy: 'trending', languages: [],
    });
    setSearchParams({});
  };

  const activeFilterCount = [
    filters.category, filters.location, filters.verified, filters.droneCertified,
    filters.destinationSpecialist, filters.hillWeddingSpecialist,
  ].filter(Boolean).length + (filters.rating > 0 ? 1 : 0) + filters.languages.length;

  return (
    <div className="min-h-screen bg-surface">
      {/* Header */}
      <div className="bg-white border-b border-border sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-text-primary">Explore Creators</h1>
              <p className="text-sm text-text-secondary">{filtered.length} creators found</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <select
                  value={filters.sortBy}
                  onChange={e => updateFilter('sortBy', e.target.value)}
                  className="appearance-none pl-4 pr-9 py-2 border border-border rounded-xl text-sm bg-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/30"
                >
                  {SORT_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                </select>
                <ChevronDown className="w-4 h-4 text-text-secondary absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
              <div className="flex gap-1 p-1 bg-surface rounded-lg">
                <button onClick={() => setView('grid')} className={cn('p-2 rounded-md', view === 'grid' ? 'bg-white shadow-sm' : '')}>
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button onClick={() => setView('list')} className={cn('p-2 rounded-md', view === 'list' ? 'bg-white shadow-sm' : '')}>
                  <List className="w-4 h-4" />
                </button>
              </div>
              <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)} className="relative">
                <SlidersHorizontal className="w-4 h-4" /> Filters
                {activeFilterCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {activeFilterCount}
                  </span>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex gap-6">
        {/* Filters Sidebar */}
        {showFilters && (
          <aside className="w-72 shrink-0 hidden lg:block">
            <div className="bg-white rounded-2xl border border-border p-5 sticky top-32">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-text-primary">Filters</h3>
                {activeFilterCount > 0 && (
                  <button onClick={clearFilters} className="text-xs text-primary hover:underline">Clear all</button>
                )}
              </div>
              <FilterContent filters={filters} updateFilter={updateFilter} />
            </div>
          </aside>
        )}

        {/* Mobile Filter Drawer */}
        {showFilters && (
          <div className="lg:hidden fixed inset-0 z-50 bg-black/40" onClick={() => setShowFilters(false)}>
            <div className="absolute right-0 top-0 bottom-0 w-80 bg-white p-5 overflow-y-auto" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-text-primary">Filters</h3>
                <button onClick={() => setShowFilters(false)}><X className="w-5 h-5" /></button>
              </div>
              <FilterContent filters={filters} updateFilter={updateFilter} />
              <Button className="w-full mt-4" onClick={() => setShowFilters(false)}>Apply Filters</Button>
            </div>
          </div>
        )}

        {/* Results */}
        <div className="flex-1">
          {loading && (
            <div className="flex justify-center py-20"><Spinner size="lg" /></div>
          )}

          {!loading && filtered.length === 0 && (
            <EmptyState
              icon={<MapPin className="w-12 h-12" />}
              title="No creators found"
              description="Try adjusting your filters or search query"
              action={<Button onClick={clearFilters}>Clear Filters</Button>}
            />
          )}

          {!loading && filtered.length > 0 && (
            <>
              <div className={cn(
                view === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'
              )}>
                {filtered.slice(0, visibleCount).map(creator => (
                  <CreatorCard key={creator.id} creator={creator} />
                ))}
              </div>

              {visibleCount < filtered.length && (
                <div className="flex justify-center mt-10">
                  <Button variant="outline" onClick={loadMore} disabled={loading}>
                    {loading ? <Spinner size="sm" /> : 'Load More Creators'}
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function FilterContent({ filters, updateFilter }: { filters: any; updateFilter: (key: string, value: any) => void }) {
  return (
    <div className="space-y-5">
      <div>
        <label className="label">Category</label>
        <select value={filters.category} onChange={e => updateFilter('category', e.target.value)} className="input-field text-sm">
          <option value="">All Categories</option>
          {CATEGORIES.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
        </select>
      </div>

      <div>
        <label className="label">Location</label>
        <select value={filters.location} onChange={e => updateFilter('location', e.target.value)} className="input-field text-sm">
          <option value="">All Locations</option>
          {CITIES.map(city => <option key={city} value={city}>{city}</option>)}
        </select>
      </div>

      <div>
        <label className="label">Budget Range: {formatCurrency(filters.minPrice)} - {formatCurrency(filters.maxPrice)}</label>
        <input
          type="range"
          min={0}
          max={200000}
          step={5000}
          value={filters.maxPrice}
          onChange={e => updateFilter('maxPrice', Number(e.target.value))}
          className="w-full"
        />
      </div>

      <div>
        <label className="label">Minimum Rating</label>
        <div className="flex gap-2">
          {[0, 3, 4, 4.5].map(r => (
            <button
              key={r}
              onClick={() => updateFilter('rating', r)}
              className={cn('px-3 py-1.5 rounded-lg text-xs font-medium border', filters.rating === r ? 'border-primary bg-primary/5 text-primary' : 'border-border text-text-secondary')}
            >
              {r === 0 ? 'Any' : `${r}+`}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Checkbox label="Verified Only" checked={filters.verified} onChange={v => updateFilter('verified', v)} />
        <Checkbox label="Drone Certified" checked={filters.droneCertified} onChange={v => updateFilter('droneCertified', v)} />
        <Checkbox label="Destination Specialist" checked={filters.destinationSpecialist} onChange={v => updateFilter('destinationSpecialist', v)} />
        <Checkbox label="Hill Wedding Specialist" checked={filters.hillWeddingSpecialist} onChange={v => updateFilter('hillWeddingSpecialist', v)} />
      </div>

      <div>
        <label className="label">Languages</label>
        <div className="space-y-1.5 max-h-32 overflow-y-auto">
          {LANGUAGES.slice(0, 6).map(lang => (
            <Checkbox
              key={lang}
              label={lang}
              checked={filters.languages.includes(lang)}
              onChange={v => {
                const newLangs = v ? [...filters.languages, lang] : filters.languages.filter((l: string) => l !== lang);
                updateFilter('languages', newLangs);
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
