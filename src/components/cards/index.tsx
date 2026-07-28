import { Link } from 'react-router-dom';
import { MapPin, BadgeCheck, Plane, Heart, Share2, Eye, Play } from 'lucide-react';
import { Avatar, Badge, Rating } from '@/components/ui';
import { useWishlistStore, useCompareStore, useToastStore } from '@/store';
import { formatCurrency, formatNumber, cn } from '@/lib/utils';
import type { Creator } from '@/types';

export function CreatorCard({ creator }: { creator: Creator }) {
  const { toggleWishlist, isWishlisted } = useWishlistStore();
  const { addToCompare, isComparing } = useCompareStore();
  const { addToast } = useToastStore();
  const wishlisted = isWishlisted(creator.id);
  const comparing = isComparing(creator.id);

  return (
    <div className="card group overflow-hidden flex flex-col h-full">
      <div className="relative h-48 overflow-hidden">
        <img
          src={creator.banner}
          alt={creator.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute top-3 left-3 flex gap-2">
          {creator.verified && (
            <Badge variant="success"><BadgeCheck className="w-3 h-3" /> Verified</Badge>
          )}
          {creator.droneCertified && (
            <Badge variant="primary"><Plane className="w-3 h-3" /> Drone</Badge>
          )}
        </div>
        <div className="absolute top-3 right-3 flex gap-2">
          <button
            onClick={(e) => { e.preventDefault(); toggleWishlist('creator', creator.id); addToast(wishlisted ? 'Removed from wishlist' : 'Added to wishlist'); }}
            className="w-8 h-8 rounded-full bg-white/90 backdrop-blur flex items-center justify-center hover:bg-white transition-colors"
          >
            <Heart className={cn('w-4 h-4', wishlisted ? 'fill-primary text-primary' : 'text-text-secondary')} />
          </button>
        </div>
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
          <div className="flex items-center gap-2">
            <Avatar src={creator.avatar} alt={creator.name} size="md" className="ring-2 ring-white" />
            <div className="text-white">
              <h3 className="font-bold text-sm">{creator.name}</h3>
              <div className="flex items-center gap-1 text-xs opacity-90">
                <MapPin className="w-3 h-3" /> {creator.city}
              </div>
            </div>
          </div>
          {creator.badge && <Badge variant="secondary">{creator.badge}</Badge>}
        </div>
      </div>

      <div className="p-4 flex flex-col flex-1">
        <p className="text-xs text-text-secondary line-clamp-2 mb-3">{creator.bio}</p>
        <div className="flex items-center justify-between mb-3">
          <Rating rating={creator.rating} count={creator.reviewCount} />
          <span className="text-xs text-text-secondary">{formatNumber(creator.followerCount)} followers</span>
        </div>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {creator.categories.slice(0, 3).map(cat => (
            <span key={cat} className="text-xs px-2 py-0.5 rounded-full bg-surface text-text-secondary">
              {cat}
            </span>
          ))}
        </div>
        <div className="mt-auto flex items-center justify-between">
          <div>
            <span className="text-xs text-text-secondary">Starting from</span>
            <p className="font-bold text-text-primary">{formatCurrency(creator.startingPrice)}</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={(e) => {
                e.preventDefault();
                addToCompare(creator.id);
                addToast(comparing ? 'Already in compare list' : 'Added to compare list');
              }}
              className="btn-ghost !px-3 !py-2 text-xs"
            >
              Compare
            </button>
            <Link to={`/creator/${creator.id}`} className="btn-primary !px-4 !py-2 text-xs">
              View Profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ReelCard({ reel, onClick }: { reel: any; onClick?: () => void }) {
  const { toggleWishlist, isWishlisted } = useWishlistStore();
  const { addToast } = useToastStore();
  const wishlisted = isWishlisted(reel.id);

  return (
    <div
      onClick={onClick}
      className="relative aspect-reel rounded-2xl overflow-hidden group cursor-pointer bg-black"
    >
      <img
        src={reel.thumbnail}
        alt={reel.title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <div className="absolute inset-0 video-overlay" />
      <div className="absolute top-3 left-3 w-10 h-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center group-hover:scale-110 transition-transform">
        <Play className="w-5 h-5 text-white fill-white" />
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
        <div className="flex items-center gap-2 mb-2">
          <img src={reel.creatorAvatar} alt={reel.creatorName} className="w-7 h-7 rounded-full ring-2 ring-white/50" />
          <span className="text-xs font-medium">{reel.creatorName}</span>
        </div>
        <p className="text-sm font-semibold line-clamp-2">{reel.title}</p>
        <div className="flex items-center gap-3 mt-2 text-xs opacity-90">
          <span className="flex items-center gap-1"><Heart className="w-3 h-3" /> {formatNumber(reel.likes)}</span>
          <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {formatNumber(reel.views)}</span>
        </div>
      </div>
      <button
        onClick={(e) => { e.stopPropagation(); toggleWishlist('reel', reel.id); addToast(wishlisted ? 'Removed from wishlist' : 'Saved to wishlist'); }}
        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 backdrop-blur flex items-center justify-center hover:bg-white/30 transition-colors"
      >
        <Heart className={cn('w-4 h-4', wishlisted ? 'fill-white text-white' : 'text-white')} />
      </button>
    </div>
  );
}

export function DestinationCard({ destination }: { destination: any }) {
  return (
    <Link to={`/destinations/${destination.id}`} className="card group overflow-hidden block">
      <div className="relative h-56 overflow-hidden">
        <img
          src={destination.image}
          alt={destination.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <h3 className="text-xl font-bold">{destination.name}</h3>
          <p className="text-sm opacity-90">{destination.state}, {destination.country}</p>
          <div className="flex flex-wrap gap-1.5 mt-2">
            {destination.popularFor?.slice(0, 2).map((tag: string) => (
              <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-white/20 backdrop-blur">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="p-4">
        <p className="text-sm text-text-secondary line-clamp-2">{destination.description}</p>
        <div className="flex items-center justify-between mt-3">
          <span className="text-xs text-text-secondary">{destination.creatorsCount || 0} creators</span>
          <span className="text-xs font-semibold text-primary">From {formatCurrency(destination.avgPrice || 0)}</span>
        </div>
      </div>
    </Link>
  );
}

export function PackageCard({ pkg, creatorId, creatorName }: { pkg: any; creatorId: string; creatorName: string }) {
  return (
    <div className={cn('card p-5 flex flex-col h-full relative', pkg.popular && 'ring-2 ring-primary')}>
      {pkg.popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <Badge variant="primary" className="bg-brand-gradient text-white">Most Popular</Badge>
        </div>
      )}
      <h3 className="text-lg font-bold text-text-primary">{pkg.name}</h3>
      <p className="text-sm text-text-secondary mt-1 line-clamp-2">{pkg.description}</p>
      <p className="text-xs text-text-secondary mt-2">{pkg.duration}</p>
      <div className="my-4">
        <span className="text-3xl font-bold text-text-primary">{formatCurrency(pkg.price)}</span>
      </div>
      <ul className="space-y-2 flex-1">
        {pkg.deliverables.map((d: string, i: number) => (
          <li key={i} className="flex items-start gap-2 text-sm text-text-secondary">
            <svg className="w-4 h-4 text-primary mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            {d}
          </li>
        ))}
      </ul>
      <Link
        to={`/book/${creatorId}?package=${pkg.id}`}
        className={cn('mt-4 w-full text-center', pkg.popular ? 'btn-primary' : 'btn-secondary')}
      >
        Book {creatorName}'s {pkg.name} Package
      </Link>
    </div>
  );
}

export function ReviewCard({ review }: { review: any }) {
  return (
    <div className="card p-5">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <Avatar src={review.userAvatar} alt={review.userName} size="md" />
          <div>
            <p className="font-semibold text-text-primary text-sm">{review.userName}</p>
            <p className="text-xs text-text-secondary">{review.event}</p>
          </div>
        </div>
        <Rating rating={review.rating} />
      </div>
      <p className="text-sm text-text-secondary leading-relaxed">{review.comment}</p>
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
        <span className="text-xs text-text-secondary">
          {new Date(review.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
        </span>
        <span className="text-xs text-text-secondary">{review.helpful} found this helpful</span>
      </div>
    </div>
  );
}
