import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, CloudRain, Plane, Hotel, Calendar, CheckCircle, AlertTriangle, Users } from 'lucide-react';
import { getDestinationById, MOCK_CREATORS } from '@/data/mockData';
import { Button } from '@/components/ui/Button';
import { Badge, EmptyState } from '@/components/ui';
import { CreatorCard } from '@/components/cards';
import { formatCurrency } from '@/lib/utils';

export function DestinationDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const destination = getDestinationById(id || '');

  if (!destination) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20">
        <EmptyState title="Destination not found" action={<Button to="/destinations">Back to Destinations</Button>} />
      </div>
    );
  }

  const suggestedCreators = MOCK_CREATORS.filter(c =>
    c.city === destination.name || c.destinationSpecialist
  ).slice(0, 4);

  return (
    <div className="min-h-screen bg-surface">
      <div className="relative h-80 overflow-hidden">
        <img src={destination.image} alt={destination.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <button onClick={() => navigate(-1)} className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-white">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h1 className="text-4xl font-bold mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>{destination.name}</h1>
          <p className="flex items-center gap-2 opacity-90"><MapPin className="w-4 h-4" /> {destination.state}, {destination.country}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-border">
              <h2 className="text-xl font-bold text-text-primary mb-3">About {destination.name}</h2>
              <p className="text-text-secondary leading-relaxed">{destination.description}</p>
              <div className="flex flex-wrap gap-2 mt-4">
                {destination.popularFor.map(tag => <Badge key={tag} variant="primary">{tag}</Badge>)}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-border">
              <h3 className="font-bold text-text-primary mb-4 flex items-center gap-2"><CloudRain className="w-5 h-5 text-primary" /> Weather & Best Time</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-text-secondary">Best Months</p>
                  <p className="font-semibold text-text-primary text-sm">{destination.weather.best_months.join(', ')}</p>
                </div>
                <div>
                  <p className="text-xs text-text-secondary">Temperature</p>
                  <p className="font-semibold text-text-primary text-sm">{destination.weather.temperature}</p>
                </div>
                <div>
                  <p className="text-xs text-text-secondary">Humidity</p>
                  <p className="font-semibold text-text-primary text-sm">{destination.weather.humidity}</p>
                </div>
              </div>
              <p className="text-sm text-text-secondary mt-3 p-3 bg-amber-50 rounded-lg flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                {destination.weather.notes}
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-border">
              <h3 className="font-bold text-text-primary mb-4 flex items-center gap-2"><Plane className="w-5 h-5 text-primary" /> Drone Restrictions</h3>
              <ul className="space-y-2">
                {destination.droneRestrictions.map((r, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-text-secondary">
                    <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" /> {r}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-border">
              <h3 className="font-bold text-text-primary mb-4 flex items-center gap-2"><Calendar className="w-5 h-5 text-primary" /> Wedding Timeline</h3>
              <div className="space-y-3">
                {[
                  { time: '6 months before', task: 'Book venue and creator' },
                  { time: '3 months before', task: 'Get drone permissions' },
                  { time: '1 month before', task: 'Pre-wedding shoot' },
                  { time: 'Event day', task: 'Full coverage' },
                  { time: '2 weeks after', task: 'Receive final deliverables' },
                ].map((step, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-brand-gradient text-white flex items-center justify-center text-xs font-bold">{i + 1}</div>
                      {i < 4 && <div className="w-0.5 h-8 bg-border" />}
                    </div>
                    <div className="pb-2">
                      <p className="font-semibold text-text-primary text-sm">{step.time}</p>
                      <p className="text-text-secondary text-sm">{step.task}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-border">
              <h3 className="font-bold text-text-primary mb-4 flex items-center gap-2"><Plane className="w-5 h-5 text-primary" /> Travel Cost</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-secondary">From Delhi</span>
                  <span className="font-semibold">{formatCurrency(destination.travelCost.from_delhi)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-secondary">From Mumbai</span>
                  <span className="font-semibold">{formatCurrency(destination.travelCost.from_mumbai)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-secondary">From Bangalore</span>
                  <span className="font-semibold">{formatCurrency(destination.travelCost.from_bangalore)}</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-border">
              <h3 className="font-bold text-text-primary mb-4 flex items-center gap-2"><Hotel className="w-5 h-5 text-primary" /> Top Hotels</h3>
              <div className="space-y-3">
                {destination.hotels.map(hotel => (
                  <div key={hotel.name} className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-text-primary text-sm">{hotel.name}</p>
                      <p className="text-xs text-text-secondary">{hotel.distance}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-primary text-sm">{formatCurrency(hotel.price_per_night)}</p>
                      <p className="text-xs text-text-secondary">★ {hotel.rating}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-brand-gradient text-white rounded-2xl p-6">
              <h3 className="font-bold mb-2 flex items-center gap-2"><Users className="w-5 h-5" /> {destination.creatorsCount} Creators</h3>
              <p className="text-sm opacity-90 mb-4">Available in {destination.name}</p>
              <Button to="/explore" variant="outline" className="w-full !border-white !text-white hover:!bg-white/10">View All Creators</Button>
            </div>
          </div>
        </div>

        {suggestedCreators.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-text-primary mb-6">Suggested Creators in {destination.name}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {suggestedCreators.map(c => <CreatorCard key={c.id} creator={c} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
