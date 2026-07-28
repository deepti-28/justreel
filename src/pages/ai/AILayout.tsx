import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { AI_FEATURES } from '@/constants';
import { Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

export function AILayout() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary mb-3">
            <Sparkles className="w-4 h-4" /> AI-Powered Tools
          </div>
          <h1 className="text-3xl font-bold text-text-primary">JustReel AI Studio</h1>
          <p className="text-text-secondary mt-2">10 AI tools to plan, book and create the perfect event</p>
        </div>

        <div className="grid lg:grid-cols-[260px_1fr] gap-6">
          <aside className="lg:sticky lg:top-20 h-fit">
            <div className="bg-white rounded-2xl border border-border p-3">
              <nav className="space-y-1">
                {AI_FEATURES.map(feature => (
                  <NavLink
                    key={feature.id}
                    to={feature.path}
                    className={({ isActive }) => cn(
                      'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all',
                      isActive ? 'bg-primary/10 text-primary' : 'text-text-secondary hover:bg-surface hover:text-primary'
                    )}
                  >
                    <Sparkles className="w-4 h-4 shrink-0" />
                    <span className="truncate">{feature.name}</span>
                  </NavLink>
                ))}
              </nav>
            </div>
          </aside>

          <div className="min-h-[60vh]">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
