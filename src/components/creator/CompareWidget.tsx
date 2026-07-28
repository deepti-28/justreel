import { useNavigate } from 'react-router-dom';
import { X, GitCompare } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useCompareStore } from '@/store';
import { MOCK_CREATORS } from '@/data/mockData';
import { Avatar } from '@/components/ui';

export function CompareWidget() {
  const navigate = useNavigate();
  const { compareList, removeFromCompare, clearCompare } = useCompareStore();

  const creators = compareList
    .map(id => MOCK_CREATORS.find(c => c.id === id))
    .filter(Boolean);

  if (creators.length === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[80] bg-white rounded-2xl shadow-card-hover border border-border p-3 flex items-center gap-3 max-w-[90vw]"
      >
        <div className="flex items-center gap-1">
          {creators.map(creator => (
            <div key={creator!.id} className="relative group">
              <Avatar src={creator!.avatar} alt={creator!.name} size="sm" />
              <button
                onClick={() => removeFromCompare(creator!.id)}
                className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
        <div className="text-sm">
          <span className="font-semibold text-text-primary">{creators.length}/4</span>
          <span className="text-text-secondary text-xs ml-1">selected</span>
        </div>
        <button
          onClick={() => navigate('/compare')}
          disabled={creators.length < 2}
          className="btn-primary !px-4 !py-2 text-sm disabled:opacity-50"
        >
          <GitCompare className="w-4 h-4" /> Compare
        </button>
        <button onClick={clearCompare} className="text-text-secondary hover:text-red-500 p-1">
          <X className="w-4 h-4" />
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
