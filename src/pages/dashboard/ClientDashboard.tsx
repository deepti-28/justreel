import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, Heart, FileText, Bell, Tag, Users, Star, TrendingUp, Clock, CheckCircle, ArrowRight, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge, Avatar, Rating, EmptyState, Spinner } from '@/components/ui';
import { MOCK_BOOKINGS, MOCK_NOTIFICATIONS, MOCK_CONVERSATIONS, MOCK_CREATORS } from '@/data/mockData';
import { useWishlistStore, useNotificationStore } from '@/store';
import { formatCurrency, formatDate, timeAgo, cn } from '@/lib/utils';
import { useState } from 'react';

export function ClientDashboard() {
  const { section } = useParams();
  const current = section || 'overview';

  return (
    <div>
      {current === 'overview' && <Overview />}
      {current === 'bookings' && <BookingsSection />}
      {current === 'invoices' && <InvoicesSection />}
      {current === 'wishlist' && <WishlistSection />}
      {current === 'messages' && <MessagesSection />}
      {current === 'notifications' && <NotificationsSection />}
      {current === 'coupons' && <CouponsSection />}
      {current === 'referrals' && <ReferralsSection />}
      {current === 'reviews' && <ReviewsSection />}
      {current === 'settings' && <SettingsSection />}
    </div>
  );
}

function Overview() {
  const navigate = useNavigate();
  const activeBookings = MOCK_BOOKINGS.filter(b => b.status !== 'completed');
  const completedBookings = MOCK_BOOKINGS.filter(b => b.status === 'completed');

  const stats = [
    { label: 'Active Bookings', value: activeBookings.length, icon: Calendar, color: 'bg-blue-50 text-blue-500' },
    { label: 'Completed', value: completedBookings.length, icon: CheckCircle, color: 'bg-green-50 text-green-500' },
    { label: 'Wishlist Items', value: useWishlistStore(state => state.items.length), icon: Heart, color: 'bg-pink-50 text-pink-500' },
    { label: 'Total Spent', value: formatCurrency(MOCK_BOOKINGS.reduce((s, b) => s + b.total, 0)), icon: TrendingUp, color: 'bg-amber-50 text-amber-500' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text-primary">Welcome back!</h1>
        <p className="text-text-secondary text-sm">Here's what's happening with your bookings.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(stat => (
          <div key={stat.label} className="bg-white rounded-2xl p-4 border border-border">
            <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center mb-3', stat.color)}>
              <stat.icon className="w-5 h-5" />
            </div>
            <p className="text-2xl font-bold text-text-primary">{stat.value}</p>
            <p className="text-xs text-text-secondary">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-5 border border-border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-text-primary">Active Bookings</h2>
            <Button variant="ghost" size="sm" to="/dashboard/client/bookings">View All</Button>
          </div>
          <div className="space-y-3">
            {activeBookings.map(booking => (
              <div key={booking.id} onClick={() => navigate(`/booking/tracking/${booking.id}`)} className="flex items-center gap-3 p-3 rounded-xl bg-surface cursor-pointer hover:bg-primary/5 transition-colors">
                <img src={booking.creatorAvatar} alt={booking.creatorName} className="w-10 h-10 rounded-lg object-cover" />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-text-primary text-sm">{booking.creatorName}</p>
                  <p className="text-xs text-text-secondary">{formatDate(booking.eventDate)} · {booking.packageName}</p>
                </div>
                <Badge variant={booking.status === 'confirmed' ? 'success' : 'warning'}>{booking.status}</Badge>
              </div>
            ))}
            {activeBookings.length === 0 && <p className="text-sm text-text-secondary text-center py-4">No active bookings</p>}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-text-primary">Recent Notifications</h2>
            <Button variant="ghost" size="sm" to="/dashboard/client/notifications">View All</Button>
          </div>
          <div className="space-y-2">
            {MOCK_NOTIFICATIONS.slice(0, 4).map(n => (
              <div key={n.id} className="flex items-start gap-3 p-3 rounded-xl hover:bg-surface">
                {n.avatar ? <img src={n.avatar} alt="" className="w-8 h-8 rounded-full" /> : <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center"><Bell className="w-4 h-4 text-primary" /></div>}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-text-primary">{n.title}</p>
                  <p className="text-xs text-text-secondary line-clamp-1">{n.message}</p>
                </div>
                <span className="text-xs text-text-secondary">{timeAgo(n.createdAt)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-brand-gradient rounded-2xl p-6 text-white">
        <h2 className="text-xl font-bold mb-2">Looking for a creator?</h2>
        <p className="opacity-90 mb-4">Explore 5,200+ verified creators for your next event.</p>
        <Button to="/explore" variant="outline" className="!border-white !text-white hover:!bg-white/10">
          Explore Creators <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}

function BookingsSection() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');
  const filtered = filter === 'all' ? MOCK_BOOKINGS : MOCK_BOOKINGS.filter(b => b.status === filter);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-text-primary">My Bookings</h1>
      <div className="flex gap-2 flex-wrap">
        {['all', 'confirmed', 'completed', 'pending'].map(f => (
          <button key={f} onClick={() => setFilter(f)} className={cn('px-4 py-2 rounded-xl text-sm font-medium border', filter === f ? 'bg-primary text-white border-primary' : 'bg-white border-border text-text-secondary')}>
            {f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>
      <div className="space-y-4">
        {filtered.map(booking => (
          <div key={booking.id} className="bg-white rounded-2xl p-5 border border-border">
            <div className="flex items-start gap-4">
              <img src={booking.creatorAvatar} alt={booking.creatorName} className="w-14 h-14 rounded-xl object-cover" />
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-text-primary">{booking.creatorName}</h3>
                    <p className="text-sm text-text-secondary">{booking.packageName} Package · {formatDate(booking.eventDate)}</p>
                    <p className="text-xs text-text-secondary mt-1">{booking.location}</p>
                  </div>
                  <Badge variant={booking.status === 'completed' ? 'success' : booking.status === 'confirmed' ? 'primary' : 'warning'}>
                    {booking.status.replace('_', ' ')}
                  </Badge>
                </div>
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                  <span className="font-bold text-primary">{formatCurrency(booking.total)}</span>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => navigate(`/booking/tracking/${booking.id}`)}>Track</Button>
                    {booking.status === 'completed' && <Button size="sm" to="/dashboard/client/reviews">Review</Button>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function InvoicesSection() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-text-primary">Invoices</h1>
      <div className="bg-white rounded-2xl border border-border overflow-hidden">
        <table className="w-full">
          <thead className="bg-surface">
            <tr>
              <th className="text-left p-4 text-xs font-semibold text-text-secondary">Invoice ID</th>
              <th className="text-left p-4 text-xs font-semibold text-text-secondary">Creator</th>
              <th className="text-left p-4 text-xs font-semibold text-text-secondary">Date</th>
              <th className="text-left p-4 text-xs font-semibold text-text-secondary">Amount</th>
              <th className="text-left p-4 text-xs font-semibold text-text-secondary">Status</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_BOOKINGS.map(b => (
              <tr key={b.id} className="border-t border-border">
                <td className="p-4 text-sm font-mono text-primary">#{b.id.slice(-8).toUpperCase()}</td>
                <td className="p-4 text-sm">{b.creatorName}</td>
                <td className="p-4 text-sm text-text-secondary">{formatDate(b.createdAt)}</td>
                <td className="p-4 text-sm font-semibold">{formatCurrency(b.total)}</td>
                <td className="p-4"><Badge variant="success">Paid</Badge></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function WishlistSection() {
  const { items, removeItem } = useWishlistStore();
  const creators = items.filter(i => i.type === 'creator').map(i => MOCK_CREATORS.find(c => c.id === i.itemId)).filter(Boolean);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-text-primary">My Wishlist</h1>
      {creators.length === 0 ? (
        <EmptyState icon={<Heart className="w-12 h-12" />} title="Your wishlist is empty" description="Save creators you love to find them quickly later." action={<Button to="/explore">Explore Creators</Button>} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {creators.map(c => (
            <div key={c!.id} className="bg-white rounded-2xl border border-border overflow-hidden">
              <img src={c!.banner} alt={c!.name} className="w-full h-24 object-cover" />
              <div className="p-4">
                <div className="flex items-center gap-3">
                  <Avatar src={c!.avatar} alt={c!.name} size="md" />
                  <div className="flex-1">
                    <p className="font-semibold text-sm">{c!.name}</p>
                    <p className="text-xs text-text-secondary">{c!.city}</p>
                  </div>
                  <button onClick={() => removeItem(items.find(i => i.itemId === c!.id)!.id)} className="text-red-400 hover:text-red-500">
                    <Heart className="w-4 h-4 fill-current" />
                  </button>
                </div>
                <Button to={`/creator/${c!.id}`} size="sm" className="w-full mt-3">View Profile</Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function MessagesSection() {
  const [activeConv, setActiveConv] = useState<string | null>(MOCK_CONVERSATIONS[0]?.id || null);
  const active = MOCK_CONVERSATIONS.find(c => c.id === activeConv);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-text-primary">Messages</h1>
      <div className="grid md:grid-cols-[280px_1fr] gap-4 bg-white rounded-2xl border border-border overflow-hidden h-[60vh]">
        <div className="border-r border-border overflow-y-auto">
          {MOCK_CONVERSATIONS.map(conv => (
            <button key={conv.id} onClick={() => setActiveConv(conv.id)} className={cn('w-full flex items-center gap-3 p-3 hover:bg-surface text-left', activeConv === conv.id && 'bg-primary/5')}>
              <Avatar src={conv.participantAvatar} alt={conv.participantName} size="md" />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm truncate">{conv.participantName}</p>
                <p className="text-xs text-text-secondary truncate">{conv.lastMessage}</p>
              </div>
              {conv.unreadCount > 0 && <span className="w-5 h-5 bg-primary text-white text-xs rounded-full flex items-center justify-center">{conv.unreadCount}</span>}
            </button>
          ))}
        </div>
        <div className="flex flex-col">
          {active && (
            <>
              <div className="p-3 border-b border-border flex items-center gap-3">
                <Avatar src={active.participantAvatar} alt={active.participantName} size="sm" />
                <span className="font-semibold text-sm">{active.participantName}</span>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-surface">
                <div className="flex justify-start">
                  <div className="bg-white border border-border rounded-2xl px-3 py-2 text-sm max-w-[70%]">Hi! Thank you for booking my package.</div>
                </div>
                <div className="flex justify-end">
                  <div className="bg-primary text-white rounded-2xl px-3 py-2 text-sm max-w-[70%]">Thank you! Looking forward to it.</div>
                </div>
              </div>
              <div className="p-3 border-t border-border flex gap-2">
                <input placeholder="Type a message..." className="flex-1 border border-border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                <Button size="sm">Send</Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function NotificationsSection() {
  const { notifications, markAllRead, markRead } = useNotificationStore();
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-text-primary">Notifications</h1>
        <Button variant="ghost" size="sm" onClick={markAllRead}>Mark all read</Button>
      </div>
      <div className="space-y-2">
        {notifications.map(n => (
          <div key={n.id} onClick={() => markRead(n.id)} className={cn('flex items-start gap-3 p-4 rounded-xl border cursor-pointer', n.read ? 'bg-white border-border' : 'bg-primary/5 border-primary/20')}>
            {n.avatar ? <img src={n.avatar} alt="" className="w-10 h-10 rounded-full" /> : <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center"><Bell className="w-5 h-5 text-primary" /></div>}
            <div className="flex-1">
              <p className="font-semibold text-sm text-text-primary">{n.title}</p>
              <p className="text-sm text-text-secondary">{n.message}</p>
              <p className="text-xs text-text-secondary mt-1">{timeAgo(n.createdAt)}</p>
            </div>
            {!n.read && <span className="w-2 h-2 bg-primary rounded-full mt-2" />}
          </div>
        ))}
      </div>
    </div>
  );
}

function CouponsSection() {
  const coupons = [
    { code: 'JUSTREEL10', discount: '10% OFF', desc: 'On all packages', expiry: 'Dec 31, 2024', used: false },
    { code: 'WEDDING50', discount: '₹5,000 OFF', desc: 'On bookings above ₹50,000', expiry: 'Jan 15, 2025', used: false },
    { code: 'FIRSTBOOK', discount: '15% OFF', desc: 'First booking only', expiry: 'Expired', used: true },
  ];
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-text-primary">My Coupons</h1>
      <div className="grid md:grid-cols-2 gap-4">
        {coupons.map(c => (
          <div key={c.code} className={cn('bg-white rounded-2xl p-5 border-2 border-dashed', c.used ? 'border-border opacity-60' : 'border-primary')}>
            <div className="flex items-start justify-between">
              <div>
                <p className="font-bold text-2xl text-primary">{c.discount}</p>
                <p className="text-sm text-text-secondary">{c.desc}</p>
              </div>
              <Badge variant={c.used ? 'neutral' : 'success'}>{c.used ? 'Used' : 'Active'}</Badge>
            </div>
            <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
              <code className="text-sm font-mono font-bold text-text-primary">{c.code}</code>
              <span className="text-xs text-text-secondary">Expires: {c.expiry}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ReferralsSection() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-text-primary">Referrals</h1>
      <div className="bg-brand-gradient text-white rounded-2xl p-6">
        <h2 className="text-xl font-bold mb-2">Refer & Earn ₹1,000</h2>
        <p className="opacity-90 mb-4">Invite friends to JustReel and earn ₹1,000 when they make their first booking.</p>
        <div className="bg-white/20 backdrop-blur rounded-xl p-3 flex items-center justify-between">
          <code className="font-mono font-bold">JUSTREEL-USER123</code>
          <Button variant="outline" size="sm" className="!border-white !text-white">Copy Code</Button>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-4 border border-border text-center">
          <p className="text-2xl font-bold text-text-primary">12</p>
          <p className="text-xs text-text-secondary">Friends Invited</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-border text-center">
          <p className="text-2xl font-bold text-text-primary">5</p>
          <p className="text-xs text-text-secondary">Joined</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-border text-center">
          <p className="text-2xl font-bold text-primary">{formatCurrency(5000)}</p>
          <p className="text-xs text-text-secondary">Earned</p>
        </div>
      </div>
    </div>
  );
}

function ReviewsSection() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-text-primary">My Reviews</h1>
      <div className="space-y-4">
        {MOCK_BOOKINGS.filter(b => b.status === 'completed').map(b => (
          <div key={b.id} className="bg-white rounded-2xl p-5 border border-border">
            <div className="flex items-center gap-3 mb-3">
              <img src={b.creatorAvatar} alt={b.creatorName} className="w-10 h-10 rounded-full" />
              <div>
                <p className="font-semibold text-sm">{b.creatorName}</p>
                <p className="text-xs text-text-secondary">{b.packageName} · {formatDate(b.eventDate)}</p>
              </div>
            </div>
            <div className="flex gap-1 mb-2">
              {[1, 2, 3, 4, 5].map(s => <Star key={s} className="w-5 h-5 text-amber-400 fill-amber-400" />)}
            </div>
            <p className="text-sm text-text-secondary">Amazing experience! The reels were absolutely stunning.</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function SettingsSection() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-text-primary">Settings</h1>
      <div className="bg-white rounded-2xl p-6 border border-border">
        <h2 className="font-bold text-text-primary mb-4">Profile</h2>
        <div className="flex items-center gap-4 mb-6">
          <img src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg" alt="" className="w-20 h-20 rounded-full object-cover" />
          <Button variant="outline" size="sm">Change Photo</Button>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div><label className="label">Name</label><input className="input-field" defaultValue="Guest User" /></div>
          <div><label className="label">Email</label><input className="input-field" defaultValue="user@justreel.com" /></div>
          <div><label className="label">Phone</label><input className="input-field" defaultValue="+91 98765 43210" /></div>
          <div><label className="label">Location</label><input className="input-field" defaultValue="Mumbai, Maharashtra" /></div>
        </div>
        <Button className="mt-4">Save Changes</Button>
      </div>

      <div className="bg-white rounded-2xl p-6 border border-border">
        <h2 className="font-bold text-text-primary mb-4">Notifications</h2>
        <div className="space-y-3">
          {[['Email notifications', true], ['SMS alerts', true], ['Push notifications', false], ['WhatsApp updates', true]].map(([label, checked]) => (
            <div key={label as string} className="flex items-center justify-between">
              <span className="text-sm text-text-primary">{label}</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked={checked as boolean} className="sr-only peer" />
                <div className="w-11 h-6 bg-border rounded-full peer-checked:bg-primary transition-colors">
                  <div className={cn('w-5 h-5 bg-white rounded-full shadow transition-transform mt-0.5', checked && 'translate-x-5')} />
                </div>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
