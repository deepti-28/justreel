import { useWishlistStore } from '@/store';
import { MOCK_CREATORS, MOCK_REELS } from '@/data/mockData';
import { Button } from '@/components/ui/Button';
import { Badge, EmptyState } from '@/components/ui';
import { ReelCard } from '@/components/cards';
import { Heart, Folder, Bookmark } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export function WishlistPage() {
  const { items, removeItem } = useWishlistStore();
  const [tab, setTab] = useState<'creators' | 'reels' | 'packages'>('creators');

  const creatorItems = items.filter(i => i.type === 'creator').map(i => MOCK_CREATORS.find(c => c.id === i.itemId)).filter(Boolean);
  const reelItems = items.filter(i => i.type === 'reel').map(i => MOCK_REELS.find(r => r.id === i.itemId)).filter(Boolean);
  const packageItems = items.filter(i => i.type === 'package');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-text-primary mb-2">My Wishlist</h1>
      <p className="text-text-secondary text-sm mb-6">Save your favorite creators, reels and packages</p>

      <div className="flex gap-2 mb-6 border-b border-border">
        {[
          { id: 'creators', label: 'Creators', count: creatorItems.length },
          { id: 'reels', label: 'Saved Reels', count: reelItems.length },
          { id: 'packages', label: 'Packages', count: packageItems.length },
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id as any)}
            className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-all ${tab === t.id ? 'border-primary text-primary' : 'border-transparent text-text-secondary'}`}
          >
            {t.label} ({t.count})
          </button>
        ))}
      </div>

      {tab === 'creators' && (
        creatorItems.length === 0 ? (
          <EmptyState icon={<Heart className="w-12 h-12" />} title="No saved creators" description="Tap the heart icon on any creator to save them here." action={<Button to="/explore">Explore Creators</Button>} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {creatorItems.map(c => (
              <div key={c!.id} className="bg-white rounded-2xl border border-border overflow-hidden">
                <img src={c!.banner} alt={c!.name} className="w-full h-32 object-cover" />
                <div className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <img src={c!.avatar} alt={c!.name} className="w-12 h-12 rounded-full object-cover ring-2 ring-white -mt-8" />
                    <div className="flex-1">
                      <p className="font-bold text-sm">{c!.name}</p>
                      <p className="text-xs text-text-secondary">{c!.city}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button to={`/creator/${c!.id}`} size="sm" className="flex-1">View Profile</Button>
                    <button onClick={() => removeItem(items.find(i => i.itemId === c!.id)!.id)} className="p-2 text-red-400 hover:text-red-500"><Heart className="w-4 h-4 fill-current" /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )
      )}

      {tab === 'reels' && (
        reelItems.length === 0 ? (
          <EmptyState icon={<Bookmark className="w-12 h-12" />} title="No saved reels" description="Save reels you love to watch them later." action={<Button to="/reels">Watch Reels</Button>} />
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {reelItems.map(r => <ReelCard key={r!.id} reel={r} />)}
          </div>
        )
      )}

      {tab === 'packages' && (
        <EmptyState icon={<Folder className="w-12 h-12" />} title="No saved packages" description="Save packages to compare them later." action={<Button to="/explore">Explore Packages</Button>} />
      )}
    </div>
  );
}
