import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, Heart, Bell, Menu, X, ChevronDown, User, LogOut, LayoutDashboard, MessageSquare, Sparkles } from 'lucide-react';
import { useAuthStore, useNotificationStore, useWishlistStore } from '@/store';
import { APP_CONFIG } from '@/constants';
import { cn } from '@/lib/utils';

export function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuthStore();
  const { unreadCount } = useNotificationStore();
  const { items: wishlistItems } = useWishlistStore();
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMobileOpen(false);
    setUserMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/explore?q=${encodeURIComponent(searchQuery)}`);
      setSearchOpen(false);
      setMobileOpen(false);
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Explore', path: '/explore' },
    { name: 'Reels', path: '/reels' },
    { name: 'Destinations', path: '/destinations' },
    { name: 'AI Planning', path: '/ai/smart-search' },
    { name: 'Booking', path: '/productions' },
  ];

  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(path + '/');

  const dashboardPath = user?.role === 'creator' ? '/dashboard/creator' : user?.role === 'admin' ? '/dashboard/admin' : '/dashboard/client';

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-lg border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <Link to="/" className="flex items-center gap-2 shrink-0">
                <img src={APP_CONFIG.logo} alt="JustReel" className="h-9 w-9 rounded-lg object-cover" />
                <span className="text-xl font-bold text-text-primary hidden sm:block">
                  JustReel
                </span>
              </Link>
              <nav className="hidden lg:flex items-center gap-6">
                {navLinks.map(link => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={cn('nav-link', isActive(link.path) && 'text-primary font-semibold')}
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 hover:bg-surface rounded-lg transition-colors"
                aria-label="Search"
              >
                <Search className="w-5 h-5 text-text-secondary" />
              </button>

              {isAuthenticated ? (
                <>
                  <Link to="/wishlist" className="p-2 hover:bg-surface rounded-lg transition-colors relative" aria-label="Wishlist">
                    <Heart className="w-5 h-5 text-text-secondary" />
                    {wishlistItems.length > 0 && (
                      <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                        {wishlistItems.length}
                      </span>
                    )}
                  </Link>
                  <Link to="/notifications" className="p-2 hover:bg-surface rounded-lg transition-colors relative" aria-label="Notifications">
                    <Bell className="w-5 h-5 text-text-secondary" />
                    {unreadCount() > 0 && (
                      <span className="absolute -top-1 -right-1 w-4 h-4 bg-secondary text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                        {unreadCount()}
                      </span>
                    )}
                  </Link>
                  <div ref={userMenuRef} className="relative">
                    <button
                      onClick={() => setUserMenuOpen(!userMenuOpen)}
                      className="flex items-center gap-2 p-1 pr-2 hover:bg-surface rounded-full transition-colors"
                    >
                      <img src={user?.avatar} alt={user?.name} className="w-8 h-8 rounded-full object-cover" />
                      <ChevronDown className="w-4 h-4 text-text-secondary hidden sm:block" />
                    </button>
                    {userMenuOpen && (
                      <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-card-hover border border-border py-2 animate-slide-down">
                        <div className="px-4 py-2 border-b border-border">
                          <p className="font-semibold text-sm text-text-primary">{user?.name}</p>
                          <p className="text-xs text-text-secondary">{user?.email}</p>
                        </div>
                        <Link to={dashboardPath} className="flex items-center gap-3 px-4 py-2.5 text-sm text-text-primary hover:bg-surface">
                          <LayoutDashboard className="w-4 h-4" /> Dashboard
                        </Link>
                        <Link to="/dashboard/client/messages" className="flex items-center gap-3 px-4 py-2.5 text-sm text-text-primary hover:bg-surface">
                          <MessageSquare className="w-4 h-4" /> Messages
                        </Link>
                        <Link to="/settings" className="flex items-center gap-3 px-4 py-2.5 text-sm text-text-primary hover:bg-surface">
                          <User className="w-4 h-4" /> Settings
                        </Link>
                        <button
                          onClick={() => { logout(); navigate('/'); }}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50"
                        >
                          <LogOut className="w-4 h-4" /> Logout
                        </button>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className="hidden sm:flex items-center gap-2">
                  <Link to="/login" className="px-4 py-2 text-sm font-semibold text-text-primary hover:text-primary transition-colors">Login</Link>
                  <Link to="/register" className="px-5 py-2 text-sm font-semibold text-white rounded-full bg-brand-gradient shadow-md hover:shadow-lg hover:scale-105 transition-all">Get Started</Link>
                </div>
              )}

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 hover:bg-surface rounded-lg transition-colors"
                aria-label="Menu"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {searchOpen && (
          <div className="border-t border-border bg-white animate-slide-down">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <form onSubmit={handleSearch} className="flex gap-2">
                <input
                  autoFocus
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search creators, reels, destinations..."
                  className="input-field flex-1"
                />
                <button type="submit" className="btn-primary">Search</button>
              </form>
            </div>
          </div>
        )}

        {mobileOpen && (
          <div className="lg:hidden border-t border-border bg-white animate-slide-down">
            <nav className="px-4 py-4 space-y-2">
              {navLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn('block py-2.5 px-3 rounded-lg nav-link', isActive(link.path) && 'bg-surface text-primary font-semibold')}
                >
                  {link.name}
                </Link>
              ))}
              {!isAuthenticated && (
                <div className="pt-3 border-t border-border space-y-2">
                  <Link to="/login" className="block py-2.5 px-3 rounded-lg btn-secondary text-center">Login</Link>
                  <Link to="/register" className="block py-2.5 px-3 rounded-lg btn-primary text-center">Get Started</Link>
                </div>
              )}
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
