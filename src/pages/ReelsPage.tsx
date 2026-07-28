import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, MessageCircle, Share2, Bookmark, Music, MoreVertical, BadgeCheck, Play, Pause, Volume2, VolumeX, ChevronLeft } from 'lucide-react';
import { MOCK_REELS, getCreatorById } from '@/data/mockData';
import { useWishlistStore, useToastStore } from '@/store';
import { formatNumber, cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

export function ReelsPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(true);
  const [likedReels, setLikedReels] = useState<Set<string>>(new Set());
  const { toggleWishlist, isWishlisted } = useWishlistStore();
  const { addToast } = useToastStore();
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const items = container.querySelectorAll('.reel-item');
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const idx = Number((entry.target as HTMLElement).dataset.index);
            setCurrentIndex(idx);
          }
        });
      },
      { threshold: 0.6 }
    );
    items.forEach(item => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  const toggleLike = (id: string) => {
    setLikedReels(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="fixed inset-0 bg-black z-40 overflow-hidden">
      <div ref={containerRef} className="reel-container">
        {MOCK_REELS.map((reel, index) => {
          const creator = getCreatorById(reel.creatorId);
          const liked = likedReels.has(reel.id);
          const saved = isWishlisted(reel.id);
          const isActive = currentIndex === index;

          return (
            <div key={reel.id} data-index={index} className="reel-item relative h-screen flex items-center justify-center">
              <div className="relative h-full w-full max-w-md flex items-center justify-center">
                {/* Video Placeholder (thumbnail with play overlay) */}
                <div className="relative w-full h-full bg-black flex items-center justify-center">
                  <img src={reel.thumbnail} alt={reel.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 video-overlay" />

                  {isActive && (
                    <button
                      onClick={() => setPlaying(!playing)}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      {!playing && (
                        <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
                          <Play className="w-8 h-8 text-white fill-white" />
                        </div>
                      )}
                    </button>
                  )}

                  {/* Top Bar */}
                  <div className="absolute top-4 left-0 right-0 px-4 flex items-center justify-between">
                    <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-full bg-white/20 backdrop-blur flex items-center justify-center hover:bg-white/30 transition-colors">
                      <ChevronLeft className="w-5 h-5 text-white" />
                    </button>
                    <button onClick={() => setMuted(!muted)} className="w-9 h-9 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
                      {muted ? <VolumeX className="w-4 h-4 text-white" /> : <Volume2 className="w-4 h-4 text-white" />}
                    </button>
                  </div>

                  {/* Right Actions */}
                  <div className="absolute right-3 bottom-24 flex flex-col gap-4 items-center">
                    <button onClick={() => toggleLike(reel.id)} className="flex flex-col items-center gap-1">
                      <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur flex items-center justify-center">
                        <Heart className={cn('w-6 h-6', liked ? 'fill-red-500 text-red-500' : 'text-white')} />
                      </div>
                      <span className="text-white text-xs font-medium">{formatNumber(reel.likes + (liked ? 1 : 0))}</span>
                    </button>
                    <button className="flex flex-col items-center gap-1">
                      <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur flex items-center justify-center">
                        <MessageCircle className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-white text-xs font-medium">{formatNumber(reel.comments)}</span>
                    </button>
                    <button onClick={() => { addToast('Link copied!'); }} className="flex flex-col items-center gap-1">
                      <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur flex items-center justify-center">
                        <Share2 className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-white text-xs font-medium">{formatNumber(reel.shares)}</span>
                    </button>
                    <button onClick={() => { toggleWishlist('reel', reel.id); addToast(saved ? 'Removed' : 'Saved'); }} className="flex flex-col items-center gap-1">
                      <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur flex items-center justify-center">
                        <Bookmark className={cn('w-6 h-6', saved ? 'fill-primary text-primary' : 'text-white')} />
                      </div>
                      <span className="text-white text-xs font-medium">{formatNumber(reel.saves)}</span>
                    </button>
                    <button className="w-12 h-12 rounded-full bg-white/10 backdrop-blur flex items-center justify-center">
                      <MoreVertical className="w-6 h-6 text-white" />
                    </button>
                  </div>

                  {/* Bottom Info */}
                  <div className="absolute bottom-4 left-4 right-20 text-white">
                    <Link to={`/creator/${reel.creatorId}`} className="flex items-center gap-2 mb-3">
                      <img src={reel.creatorAvatar} alt={reel.creatorName} className="w-10 h-10 rounded-full ring-2 ring-white/50" />
                      <div>
                        <div className="flex items-center gap-1">
                          <span className="font-bold text-sm">{reel.creatorName}</span>
                          {creator?.verified && <BadgeCheck className="w-4 h-4 text-blue-400" />}
                        </div>
                        <span className="text-xs opacity-80">{reel.location}</span>
                      </div>
                      <button
                        onClick={(e) => { e.preventDefault(); addToast('Following!'); }}
                        className="ml-2 px-3 py-1 rounded-full border border-white text-xs font-semibold hover:bg-white hover:text-black transition-colors"
                      >
                        Follow
                      </button>
                    </Link>
                    <p className="text-sm font-medium mb-2 line-clamp-2">{reel.title}</p>
                    <div className="flex items-center gap-2 text-xs opacity-80">
                      <Music className="w-3 h-3" />
                      <span>Original Audio - {reel.creatorName}</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {reel.tags.slice(0, 4).map(tag => (
                        <span key={tag} className="text-xs">#{tag}</span>
                      ))}
                    </div>
                    <Link
                      to={`/creator/${reel.creatorId}`}
                      className="inline-flex items-center gap-2 mt-3 px-4 py-2 rounded-full bg-brand-gradient text-white text-sm font-semibold"
                    >
                      Book {reel.creatorName}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
