import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  MapPin, BadgeCheck, Plane, Heart, Share2, GitCompare, Calendar,
  Languages, Clock, Camera, Award, ChevronRight, ArrowLeft, Star,
  MessageCircle,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Badge, Avatar, Rating, EmptyState } from '@/components/ui';
import { Tabs } from '@/components/ui/Overlay';
import { PackageCard, ReelCard, ReviewCard } from '@/components/cards';
import { MOCK_CREATORS, getCreatorById } from '@/data/mockData';
import { useWishlistStore, useCompareStore, useToastStore } from '@/store';
import { formatCurrency, formatNumber, cn } from '@/lib/utils';

export function CreatorProfilePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const creator = getCreatorById(id || '');
  const { toggleWishlist, isWishlisted } = useWishlistStore();
  const { addToCompare, isComparing } = useCompareStore();
  const { addToast } = useToastStore();
  const [activeTab, setActiveTab] = useState('portfolio');

  if (!creator) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20">
        <EmptyState
          icon={<Camera className="w-12 h-12" />}
          title="Creator not found"
          description="This creator profile doesn't exist or has been removed."
          action={<Button to="/explore">Back to Explore</Button>}
        />
      </div>
    );
  }

  const wishlisted = isWishlisted(creator.id);
  const comparing = isComparing(creator.id);

  const tabs = [
    { id: 'portfolio', label: 'Portfolio', count: creator.portfolio.length },
    { id: 'reels', label: 'Reels', count: creator.reels.length },
    { id: 'packages', label: 'Packages', count: creator.packages.length },
    { id: 'reviews', label: 'Reviews', count: creator.reviews.length },
    { id: 'about', label: 'About' },
  ];

  return (
    <div className="bg-surface min-h-screen">
      {/* Hero Banner */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <img src={creator.banner} alt={creator.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-white hover:bg-white/30"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="absolute top-4 right-4 flex gap-2">
          <button
            onClick={() => { toggleWishlist('creator', creator.id); addToast(wishlisted ? 'Removed from wishlist' : 'Added to wishlist'); }}
            className="w-10 h-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-white hover:bg-white/30"
          >
            <Heart className={cn('w-5 h-5', wishlisted && 'fill-primary text-primary')} />
          </button>
          <button onClick={() => addToast('Profile link copied!')} className="w-10 h-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-white hover:bg-white/30">
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-card p-6 md:p-8">
          <div className="flex flex-col md:flex-row gap-6">
            <img src={creator.avatar} alt={creator.name} className="w-24 h-24 md:w-32 md:h-32 rounded-2xl object-cover ring-4 ring-white shadow-lg" />
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <h1 className="text-2xl md:text-3xl font-bold text-text-primary">{creator.name}</h1>
                {creator.verified && <Badge variant="success"><BadgeCheck className="w-3.5 h-3.5" /> Verified</Badge>}
                {creator.droneCertified && <Badge variant="primary"><Plane className="w-3.5 h-3.5" /> Drone Certified</Badge>}
                {creator.badge && <Badge variant="secondary">{creator.badge}</Badge>}
              </div>
              <div className="flex flex-wrap items-center gap-4 text-sm text-text-secondary mb-3">
                <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {creator.location}</span>
                <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> Responds {creator.responseTime}</span>
                <span className="flex items-center gap-1"><Camera className="w-4 h-4" /> {creator.experience} years exp</span>
              </div>
              <p className="text-text-secondary text-sm mb-4 max-w-2xl">{creator.bio}</p>

              <div className="flex flex-wrap gap-6 mb-4">
                <div>
                  <Rating rating={creator.rating} count={creator.reviewCount} size="md" />
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold text-text-primary">{formatNumber(creator.followerCount)}</p>
                  <p className="text-xs text-text-secondary">Followers</p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold text-text-primary">{formatNumber(creator.bookingCount)}</p>
                  <p className="text-xs text-text-secondary">Bookings</p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold text-primary">{formatCurrency(creator.startingPrice)}</p>
                  <p className="text-xs text-text-secondary">Starting Price</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <Button to={`/book/${creator.id}`} size="md">
                  <Calendar className="w-4 h-4" /> Book Now
                </Button>
                <Button
                  variant="outline"
                  size="md"
                  onClick={() => { addToCompare(creator.id); addToast(comparing ? 'Already in compare' : 'Added to compare'); }}
                >
                  <GitCompare className="w-4 h-4" /> Compare
                </Button>
                <Button variant="ghost" size="md" onClick={() => navigate('/messages')}>
                  <MessageCircle /> Message
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Info Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          {[
            { icon: Camera, label: 'Experience', value: `${creator.experience} years` },
            { icon: Award, label: 'Delivery', value: creator.deliveryTime },
            { icon: Languages, label: 'Languages', value: creator.languages.length + ' languages' },
            { icon: Plane, label: 'Equipment', value: creator.equipment.length + ' items' },
          ].map(info => (
            <div key={info.label} className="bg-white rounded-xl p-4 border border-border">
              <info.icon className="w-5 h-5 text-primary mb-2" />
              <p className="text-xs text-text-secondary">{info.label}</p>
              <p className="font-semibold text-text-primary text-sm">{info.value}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="mt-8">
          <Tabs tabs={tabs} active={activeTab} onChange={setActiveTab} />

          <div className="mt-6">
            {activeTab === 'portfolio' && (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {creator.portfolio.map((item, i) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className="relative aspect-square rounded-xl overflow-hidden group cursor-pointer"
                  >
                    <img src={item.url} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                      <div className="text-white">
                        <p className="text-sm font-semibold">{item.title}</p>
                        <p className="text-xs opacity-80">{item.location}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {activeTab === 'reels' && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {creator.reels.map(reel => (
                  <ReelCard key={reel.id} reel={reel} onClick={() => navigate('/reels')} />
                ))}
              </div>
            )}

            {activeTab === 'packages' && (
              <div className="grid md:grid-cols-3 gap-6">
                {creator.packages.map(pkg => (
                  <PackageCard key={pkg.id} pkg={pkg} creatorId={creator.id} creatorName={creator.name} />
                ))}
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-4 max-w-3xl">
                <div className="bg-white rounded-2xl p-6 border border-border flex items-center gap-6">
                  <div className="text-center">
                    <p className="text-4xl font-bold text-text-primary">{creator.rating}</p>
                    <Rating rating={creator.rating} />
                    <p className="text-xs text-text-secondary mt-1">{creator.reviewCount} reviews</p>
                  </div>
                  <div className="flex-1 space-y-1">
                    {[5, 4, 3, 2, 1].map(stars => (
                      <div key={stars} className="flex items-center gap-2">
                        <span className="text-xs text-text-secondary w-3">{stars}</span>
                        <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                        <div className="flex-1 h-2 bg-border rounded-full overflow-hidden">
                          <div className="h-full bg-amber-400 rounded-full" style={{ width: `${stars === 5 ? 80 : stars === 4 ? 15 : 5}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                {creator.reviews.map(review => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </div>
            )}

            {activeTab === 'about' && (
              <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
                <div className="bg-white rounded-2xl p-6 border border-border">
                  <h3 className="font-bold text-text-primary mb-4">Equipment</h3>
                  <ul className="space-y-2">
                    {creator.equipment.map(eq => (
                      <li key={eq} className="flex items-center gap-2 text-sm text-text-secondary">
                        <Camera className="w-4 h-4 text-primary" /> {eq}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-white rounded-2xl p-6 border border-border">
                  <h3 className="font-bold text-text-primary mb-4">Languages</h3>
                  <div className="flex flex-wrap gap-2">
                    {creator.languages.map(lang => <Badge key={lang} variant="neutral">{lang}</Badge>)}
                  </div>
                </div>
                <div className="bg-white rounded-2xl p-6 border border-border">
                  <h3 className="font-bold text-text-primary mb-4">Travel Charges</h3>
                  <ul className="space-y-2">
                    {creator.travelCharges.map(tc => (
                      <li key={tc.range} className="flex items-center justify-between text-sm">
                        <span className="text-text-secondary">{tc.range}</span>
                        <span className="font-semibold text-text-primary">{tc.charge === 0 ? 'Free' : formatCurrency(tc.charge)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-white rounded-2xl p-6 border border-border">
                  <h3 className="font-bold text-text-primary mb-4">Specializations</h3>
                  <div className="flex flex-wrap gap-2">
                    {creator.categories.map(cat => <Badge key={cat} variant="primary">{cat}</Badge>)}
                    {creator.destinationSpecialist && <Badge variant="secondary">Destination Specialist</Badge>}
                    {creator.hillWeddingSpecialist && <Badge variant="secondary">Hill Wedding Specialist</Badge>}
                  </div>
                </div>
                <div className="bg-white rounded-2xl p-6 border border-border">
                  <h3 className="font-bold text-text-primary mb-4">Availability</h3>
                  <div className="flex flex-wrap gap-2">
                    {creator.availability.map(date => (
                      <Badge key={date} variant="success">{new Date(date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</Badge>
                    ))}
                  </div>
                </div>
                <div className="bg-white rounded-2xl p-6 border border-border">
                  <h3 className="font-bold text-text-primary mb-4">Response & Delivery</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-text-secondary">Response Time</span>
                      <span className="font-semibold">{creator.responseTime}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-text-secondary">Delivery Time</span>
                      <span className="font-semibold">{creator.deliveryTime}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Creators */}
        <div className="mt-16">
          <h2 className="text-xl font-bold text-text-primary mb-6">Similar Creators</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {MOCK_CREATORS.filter(c => c.id !== creator.id && c.categories.some(cat => creator.categories.includes(cat))).slice(0, 4).map(c => (
              <div key={c.id} onClick={() => navigate(`/creator/${c.id}`)} className="cursor-pointer">
                <div className="card overflow-hidden">
                  <img src={c.banner} alt={c.name} className="w-full h-32 object-cover" />
                  <div className="p-3">
                    <div className="flex items-center gap-2">
                      <Avatar src={c.avatar} alt={c.name} size="sm" />
                      <div>
                        <p className="font-semibold text-sm text-text-primary">{c.name}</p>
                        <p className="text-xs text-text-secondary">{c.city}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

