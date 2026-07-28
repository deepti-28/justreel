import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Sparkles, Search, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { APP_CONFIG } from '@/constants';

interface Slide {
  image: string;
  badge: string;
  title: string;
  subtitle: string;
  ctaLabel: string;
  ctaPath: string;
}

const SLIDES: Slide[] = [
  {
    image: 'https://images.pexels.com/photos/313707/pexels-photo-313707.jpeg',
    badge: 'AI-Powered Creator Marketplace',
    title: 'Find & Book Filmmakers for Your Perfect Event',
    subtitle: 'Discover verified creators, watch their reels, compare packages and book with confidence.',
    ctaLabel: 'Explore Creators',
    ctaPath: '/explore',
  },
  {
    image: 'https://images.pexels.com/photos/169198/pexels-photo-169198.jpeg',
    badge: 'Royal Palace Weddings',
    title: 'Capture Your Dream Wedding in Udaipur',
    subtitle: 'Handpicked creators specializing in destination and palace weddings.',
    ctaLabel: 'View Destinations',
    ctaPath: '/destinations',
  },
  {
    image: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg',
    badge: 'Beach Weddings',
    title: 'Sunset Ceremonies in Goa',
    subtitle: 'Beachfront venues, bohemian themes, and creators who know the golden hour.',
    ctaLabel: 'Explore Goa Creators',
    ctaPath: '/explore?q=goa',
  },
  {
    image: 'https://images.pexels.com/photos/2161468/pexels-photo-2161468.jpeg',
    badge: 'Cinematic Reels',
    title: 'Watch Stunning Work from Top Creators',
    subtitle: 'Instagram-style reels with autoplay, likes, saves and instant booking.',
    ctaLabel: 'Watch Reels',
    ctaPath: '/reels',
  },
  {
    image: 'https://images.pexels.com/photos/2253870/pexels-photo-2253870.jpeg',
    badge: 'Hill Weddings',
    title: 'Misty Mountains & Snow Backdrops',
    subtitle: 'Drone-certified specialists for Shimla, Manali and beyond.',
    ctaLabel: 'Explore Hill Stations',
    ctaPath: '/destinations/shimla',
  },
];

export function HeroCarousel() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [aiQuery, setAiQuery] = useState('');

  const next = useCallback(() => setCurrent(prev => (prev + 1) % SLIDES.length), []);
  const prev = useCallback(() => setCurrent(prev => (prev - 1 + SLIDES.length) % SLIDES.length), []);

  useEffect(() => {
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [next]);

  const handleAISearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/ai/smart-search?q=${encodeURIComponent(aiQuery)}`);
  };

  const slide = SLIDES[current];

  return (
    <section className="relative h-[90vh] min-h-[600px] overflow-hidden">
      {/* Slides */}
      {SLIDES.map((s, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: i === current ? 1 : 0, zIndex: i === current ? 1 : 0 }}
        >
          <img src={s.image} alt={s.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        </div>
      ))}

      {/* Bottom gradient for search bar area */}
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-black/60 to-transparent z-10" />

      {/* Arrows */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-white hover:bg-white/30 transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-white hover:bg-white/30 transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2 rounded-full transition-all ${i === current ? 'w-8 bg-primary' : 'w-2 bg-white/50'}`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* AI Search Bar (positioned at bottom, not over the main image) */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20 w-full max-w-2xl px-4">
        <form onSubmit={handleAISearch} className="bg-white rounded-2xl p-2 flex items-center gap-2 shadow-2xl">
          <div className="flex items-center gap-2 flex-1 px-3">
            <Sparkles className="w-5 h-5 text-primary shrink-0" />
            <input
              type="text"
              value={aiQuery}
              onChange={(e) => setAiQuery(e.target.value)}
              placeholder="Describe your dream shoot... e.g., 'beach wedding in Goa under 50k'"
              className="flex-1 py-3 text-text-primary placeholder-text-secondary focus:outline-none text-sm"
            />
          </div>
          <Button type="submit" size="md" className="shrink-0">
            <Search className="w-4 h-4" /> Search
          </Button>
        </form>

        {/* CTA buttons under search */}
        <div className="flex flex-wrap gap-3 justify-center mt-4">
          <Button to="/explore" variant="primary" size="lg">
            Explore Creators <ArrowRight className="w-4 h-4" />
          </Button>
          <Button to="/register?role=creator" variant="outline" size="lg" className="!bg-white/10 !border-white/30 !text-white hover:!bg-white/20 backdrop-blur">
            Become a Creator
          </Button>
        </div>
      </div>
    </section>
  );
}
