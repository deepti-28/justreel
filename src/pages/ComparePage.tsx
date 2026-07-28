import { useNavigate } from 'react-router-dom';
import { X, Check, GitCompare, ArrowRight, Star } from 'lucide-react';
import { useCompareStore, useToastStore } from '@/store';
import { MOCK_CREATORS } from '@/data/mockData';
import { Button } from '@/components/ui/Button';
import { Badge, Avatar, Rating, EmptyState } from '@/components/ui';
import { formatCurrency } from '@/lib/utils';

export function ComparePage() {
  const navigate = useNavigate();
  const { compareList, removeFromCompare, clearCompare } = useCompareStore();
  const { addToast } = useToastStore();

  const creators = compareList
    .map(id => MOCK_CREATORS.find(c => c.id === id))
    .filter(Boolean) as typeof MOCK_CREATORS;

  if (creators.length < 2) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20">
        <EmptyState
          icon={<GitCompare className="w-12 h-12" />}
          title="Compare Creators"
          description="Add at least 2 creators to compare their profiles side by side."
          action={<Button to="/explore">Explore Creators</Button>}
        />
      </div>
    );
  }

  const rows: { label: string; key: string; render: (v: any) => React.ReactNode }[] = [
    { label: 'Starting Price', key: 'startingPrice', render: (v: number) => formatCurrency(v) },
    { label: 'Rating', key: 'rating', render: (v: number) => <Rating rating={v} /> },
    { label: 'Reviews', key: 'reviewCount', render: (v: number) => v },
    { label: 'Bookings', key: 'bookingCount', render: (v: number) => v },
    { label: 'Followers', key: 'followerCount', render: (v: number) => v.toLocaleString() },
    { label: 'Experience', key: 'experience', render: (v: number) => `${v} years` },
    { label: 'Verified', key: 'verified', render: (v: boolean) => v ? <Check className="w-4 h-4 text-green-500" /> : <X className="w-4 h-4 text-red-400" /> },
    { label: 'Drone Certified', key: 'droneCertified', render: (v: boolean) => v ? <Check className="w-4 h-4 text-green-500" /> : <X className="w-4 h-4 text-red-400" /> },
    { label: 'Destination Specialist', key: 'destinationSpecialist', render: (v: boolean) => v ? <Check className="w-4 h-4 text-green-500" /> : <X className="w-4 h-4 text-red-400" /> },
    { label: 'Response Time', key: 'responseTime', render: (v: string) => v },
    { label: 'Delivery Time', key: 'deliveryTime', render: (v: string) => v },
    { label: 'Location', key: 'location', render: (v: string) => v },
    { label: 'Languages', key: 'languages', render: (v: string[]) => v.join(', ') },
    { label: 'Equipment', key: 'equipment', render: (v: string[]) => v.length + ' items' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Compare Creators</h1>
          <p className="text-sm text-text-secondary">{creators.length} of 4 creators selected</p>
        </div>
        <Button variant="outline" onClick={() => { clearCompare(); addToast('Compare list cleared'); }}>
          Clear All
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left p-4 w-48 sticky left-0 bg-white z-10"></th>
              {creators.map(c => (
                <th key={c.id} className="p-4 min-w-[200px]">
                  <div className="relative">
                    <button
                      onClick={() => removeFromCompare(c.id)}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-red-100 text-red-500 rounded-full flex items-center justify-center hover:bg-red-200"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                    <div className="text-center">
                      <img src={c.avatar} alt={c.name} className="w-16 h-16 rounded-xl object-cover mx-auto mb-2" />
                      <p className="font-bold text-text-primary text-sm">{c.name}</p>
                      <p className="text-xs text-text-secondary mb-2">{c.city}</p>
                      <Button to={`/creator/${c.id}`} size="sm" className="w-full">
                        View Profile
                      </Button>
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={row.key} className={i % 2 === 0 ? 'bg-surface' : 'bg-white'}>
                <td className="p-4 font-semibold text-text-primary text-sm sticky left-0 bg-inherit z-10">{row.label}</td>
                {creators.map(c => (
                  <td key={c.id} className="p-4 text-center text-sm text-text-primary">
                    {row.render((c as any)[row.key])}
                  </td>
                ))}
              </tr>
            ))}
            <tr>
              <td className="p-4 font-semibold text-text-primary text-sm sticky left-0 bg-white z-10">Book Now</td>
              {creators.map(c => (
                <td key={c.id} className="p-4 text-center">
                  <Button to={`/book/${c.id}`} size="sm">
                    Book <ArrowRight className="w-3 h-3" />
                  </Button>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
