import { useState } from 'react';
import { Plane, BadgeCheck, Star, MapPin, Check, Filter } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge, Rating } from '@/components/ui';
import { MOCK_DRONE_OPERATORS } from '@/data/mockData';
import { formatCurrency, cn } from '@/lib/utils';

export function DroneMarketplacePage() {
  const [filter, setFilter] = useState('all');
  const [capability, setCapability] = useState<string | null>(null);

  const capabilities = ['4K', '8K', 'FPV', 'Night Flying', 'Thermal', 'Indoor'];

  const filtered = MOCK_DRONE_OPERATORS.filter(op => {
    if (capability && !op.capabilities.includes(capability)) return false;
    if (filter === 'available' && !op.available) return false;
    if (filter === 'dgca' && !op.dgcaVerified) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-surface">
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-primary mb-4">
            <Plane className="w-4 h-4" /> Drone Marketplace
          </div>
          <h1 className="text-4xl font-bold text-text-primary mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>DGCA-Verified Drone Operators</h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">Book professional drone operators for stunning aerial coverage at your events.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setFilter('all')}
            className={cn('px-4 py-2 rounded-xl text-sm font-medium border transition-all', filter === 'all' ? 'bg-primary text-white border-primary' : 'bg-white border-border text-text-secondary')}
          >
            All Operators
          </button>
          <button
            onClick={() => setFilter('available')}
            className={cn('px-4 py-2 rounded-xl text-sm font-medium border transition-all', filter === 'available' ? 'bg-primary text-white border-primary' : 'bg-white border-border text-text-secondary')}
          >
            Available Now
          </button>
          <button
            onClick={() => setFilter('dgca')}
            className={cn('px-4 py-2 rounded-xl text-sm font-medium border transition-all', filter === 'dgca' ? 'bg-primary text-white border-primary' : 'bg-white border-border text-text-secondary')}
          >
            DGCA Verified
          </button>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {capabilities.map(cap => (
            <button
              key={cap}
              onClick={() => setCapability(capability === cap ? null : cap)}
              className={cn('px-3 py-1.5 rounded-full text-xs font-medium border transition-all', capability === cap ? 'bg-secondary text-white border-secondary' : 'bg-white border-border text-text-secondary')}
            >
              {cap}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(op => (
            <div key={op.id} className="card p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <img src={op.avatar} alt={op.name} className="w-14 h-14 rounded-xl object-cover" />
                  <div>
                    <h3 className="font-bold text-text-primary">{op.name}</h3>
                    <p className="text-xs text-text-secondary flex items-center gap-1"><MapPin className="w-3 h-3" /> {op.location}</p>
                  </div>
                </div>
                {op.available ? <Badge variant="success">Available</Badge> : <Badge variant="neutral">Busy</Badge>}
              </div>

              <div className="flex items-center gap-2 mb-3">
                <Rating rating={op.rating} count={op.reviewCount} />
              </div>

              {op.dgcaVerified && (
                <Badge variant="success" className="mb-3"><BadgeCheck className="w-3 h-3" /> DGCA Verified</Badge>
              )}

              <div className="space-y-2 mb-4">
                <div>
                  <p className="text-xs text-text-secondary mb-1">Capabilities</p>
                  <div className="flex flex-wrap gap-1.5">
                    {op.capabilities.map(cap => <span key={cap} className="text-xs px-2 py-0.5 rounded-full bg-surface text-text-secondary">{cap}</span>)}
                  </div>
                </div>
                <div>
                  <p className="text-xs text-text-secondary mb-1">Equipment</p>
                  <div className="flex flex-wrap gap-1.5">
                    {op.equipment.map(eq => <span key={eq} className="text-xs px-2 py-0.5 rounded-full bg-primary/5 text-primary">{eq}</span>)}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div>
                  <p className="text-xs text-text-secondary">Starting from</p>
                  <p className="font-bold text-text-primary">{formatCurrency(op.pricePerHour)}/hour</p>
                </div>
                <Button size="sm" disabled={!op.available}>
                  {op.available ? 'Book Now' : 'Unavailable'}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
