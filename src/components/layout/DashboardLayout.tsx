import { NavLink, Outlet, useLocation, useParams, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store';
import { APP_CONFIG } from '@/constants';
import { cn } from '@/lib/utils';
import type { UserRole } from '@/types';

interface NavItem {
  id: string;
  label: string;
  icon: string;
}

const CLIENT_NAV: NavItem[] = [
  { id: 'overview', label: 'Overview', icon: 'LayoutDashboard' },
  { id: 'bookings', label: 'Bookings', icon: 'Calendar' },
  { id: 'invoices', label: 'Invoices', icon: 'FileText' },
  { id: 'wishlist', label: 'Wishlist', icon: 'Heart' },
  { id: 'messages', label: 'Messages', icon: 'MessageSquare' },
  { id: 'notifications', label: 'Notifications', icon: 'Bell' },
  { id: 'coupons', label: 'Coupons', icon: 'Tag' },
  { id: 'referrals', label: 'Referrals', icon: 'Users' },
  { id: 'reviews', label: 'Reviews', icon: 'Star' },
  { id: 'settings', label: 'Settings', icon: 'Settings' },
];

const CREATOR_NAV: NavItem[] = [
  { id: 'overview', label: 'Dashboard', icon: 'LayoutDashboard' },
  { id: 'revenue', label: 'Revenue', icon: 'Wallet' },
  { id: 'bookings', label: 'Bookings', icon: 'Calendar' },
  { id: 'availability', label: 'Availability', icon: 'CalendarCheck' },
  { id: 'portfolio', label: 'Portfolio', icon: 'Camera' },
  { id: 'packages', label: 'Packages', icon: 'Package' },
  { id: 'followers', label: 'Followers', icon: 'Users' },
  { id: 'analytics', label: 'Analytics', icon: 'BarChart' },
  { id: 'withdrawals', label: 'Withdrawals', icon: 'CreditCard' },
  { id: 'messages', label: 'Messages', icon: 'MessageSquare' },
  { id: 'settings', label: 'Settings', icon: 'Settings' },
];

const ADMIN_NAV: NavItem[] = [
  { id: 'overview', label: 'Dashboard', icon: 'LayoutDashboard' },
  { id: 'creators', label: 'Creators', icon: 'Users' },
  { id: 'users', label: 'Users', icon: 'UserCheck' },
  { id: 'payments', label: 'Payments', icon: 'CreditCard' },
  { id: 'analytics', label: 'Analytics', icon: 'BarChart' },
  { id: 'reports', label: 'Reports', icon: 'FileBarChart' },
  { id: 'disputes', label: 'Disputes', icon: 'AlertTriangle' },
  { id: 'approvals', label: 'Approvals', icon: 'CheckCircle' },
  { id: 'support', label: 'Support', icon: 'Headphones' },
];

export function DashboardLayout({ role }: { role: UserRole }) {
  const location = useLocation();
  const params = useParams();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const nav = role === 'creator' ? CREATOR_NAV : role === 'admin' ? ADMIN_NAV : CLIENT_NAV;
  const basePath = `/dashboard/${role}`;
  const activeSection = params.section || 'overview';

  return (
    <div className="min-h-screen bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid lg:grid-cols-[240px_1fr] gap-6">
          {/* Sidebar */}
          <aside className="lg:sticky lg:top-20 h-fit">
            <div className="bg-white rounded-2xl border border-border p-3">
              <div className="flex items-center gap-3 p-2 mb-3">
                <img src={user?.avatar} alt={user?.name} className="w-10 h-10 rounded-full object-cover" />
                <div className="min-w-0">
                  <p className="font-semibold text-text-primary text-sm truncate">{user?.name}</p>
                  <p className="text-xs text-text-secondary capitalize">{role} Account</p>
                </div>
              </div>
              <nav className="space-y-1">
                {nav.map(item => (
                  <NavLink
                    key={item.id}
                    to={`${basePath}/${item.id === 'overview' ? '' : item.id}`}
                    className={() => cn(
                      'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all',
                      activeSection === item.id || (item.id === 'overview' && !params.section)
                        ? 'bg-primary/10 text-primary'
                        : 'text-text-secondary hover:bg-surface hover:text-primary'
                    )}
                  >
                    <span className="w-4 h-4 shrink-0" />
                    {item.label}
                  </NavLink>
                ))}
              </nav>
            </div>
          </aside>

          {/* Content */}
          <div>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
