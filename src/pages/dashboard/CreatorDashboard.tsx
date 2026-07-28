import { useParams } from 'react-router-dom';
import { Wallet, Calendar, TrendingUp, Eye, Heart, Star, Users, Camera, Package, ArrowUpRight, ArrowDownRight, Download } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge, Avatar, Rating } from '@/components/ui';
import { MOCK_CREATORS, CREATOR_ANALYTICS, MOCK_BOOKINGS } from '@/data/mockData';
import { formatCurrency, formatNumber, formatDate, cn } from '@/lib/utils';
import { useState } from 'react';
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';

export function CreatorDashboard() {
  const { section } = useParams();
  const current = section || 'overview';

  return (
    <div>
      {current === 'overview' && <Overview />}
      {current === 'revenue' && <RevenueSection />}
      {current === 'bookings' && <BookingsSection />}
      {current === 'availability' && <AvailabilitySection />}
      {current === 'portfolio' && <PortfolioSection />}
      {current === 'packages' && <PackagesSection />}
      {current === 'followers' && <FollowersSection />}
      {current === 'analytics' && <AnalyticsSection />}
      {current === 'withdrawals' && <WithdrawalsSection />}
      {current === 'messages' && <MessagesSection />}
      {current === 'settings' && <SettingsSection />}
    </div>
  );
}

function Overview() {
  const creator = MOCK_CREATORS[0];
  const perf = CREATOR_ANALYTICS.performance;
  const stats = [
    { label: 'Total Revenue', value: formatCurrency(perf.totalRevenue), change: '+12%', up: true, icon: Wallet },
    { label: 'Total Bookings', value: perf.totalBookings, change: '+8%', up: true, icon: Calendar },
    { label: 'Profile Views', value: formatNumber(perf.profileViews), change: '+24%', up: true, icon: Eye },
    { label: 'Reel Views', value: formatNumber(perf.reelViews), change: '+18%', up: true, icon: TrendingUp },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Creator Dashboard</h1>
          <p className="text-text-secondary text-sm">Welcome back, {creator.name}!</p>
        </div>
        <Button to="/dashboard/creator/portfolio" size="sm"><Camera className="w-4 h-4" /> Upload Reel</Button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(stat => (
          <div key={stat.label} className="bg-white rounded-2xl p-4 border border-border">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-brand-gradient text-white flex items-center justify-center">
                <stat.icon className="w-5 h-5" />
              </div>
              <span className={cn('text-xs font-semibold flex items-center gap-0.5', stat.up ? 'text-green-500' : 'text-red-500')}>
                {stat.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {stat.change}
              </span>
            </div>
            <p className="text-2xl font-bold text-text-primary">{stat.value}</p>
            <p className="text-xs text-text-secondary">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-5 border border-border">
          <h2 className="font-bold text-text-primary mb-4">Revenue Trend</h2>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={CREATOR_ANALYTICS.revenue}>
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FF4F9A" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#FF4F9A" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3D6E4" />
              <XAxis dataKey="month" stroke="#666" fontSize={12} />
              <YAxis stroke="#666" fontSize={12} />
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #F3D6E4' }} />
              <Area type="monotone" dataKey="revenue" stroke="#FF4F9A" fill="url(#revGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-border">
          <h2 className="font-bold text-text-primary mb-4">Weekly Views</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={CREATOR_ANALYTICS.views}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3D6E4" />
              <XAxis dataKey="day" stroke="#666" fontSize={12} />
              <YAxis stroke="#666" fontSize={12} />
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #F3D6E4' }} />
              <Bar dataKey="views" fill="#FF7A45" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-5 border border-border">
          <h2 className="font-bold text-text-primary mb-4">Category Distribution</h2>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={CREATOR_ANALYTICS.categoryDistribution} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={40} outerRadius={70}>
                {CREATOR_ANALYTICS.categoryDistribution.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1">
            {CREATOR_ANALYTICS.categoryDistribution.map(cat => (
              <div key={cat.name} className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full" style={{ background: cat.color }} /> {cat.name}</span>
                <span className="font-semibold">{cat.value}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-border">
          <h2 className="font-bold text-text-primary mb-4">Performance</h2>
          <div className="space-y-3">
            {[
              { label: 'Avg Rating', value: perf.avgRating, icon: Star },
              { label: 'Response Rate', value: `${perf.responseRate}%`, icon: TrendingUp },
              { label: 'Completion Rate', value: `${perf.completionRate}%`, icon: Camera },
              { label: 'Repeat Clients', value: perf.repeatClients, icon: Users },
            ].map(item => (
              <div key={item.label} className="flex items-center justify-between">
                <span className="text-sm text-text-secondary flex items-center gap-2"><item.icon className="w-4 h-4 text-primary" /> {item.label}</span>
                <span className="font-bold text-text-primary">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-border">
          <h2 className="font-bold text-text-primary mb-4">Recent Bookings</h2>
          <div className="space-y-2">
            {MOCK_BOOKINGS.slice(0, 3).map(b => (
              <div key={b.id} className="flex items-center gap-2 text-sm">
                <img src={b.creatorAvatar} alt="" className="w-7 h-7 rounded-full" />
                <div className="flex-1 min-w-0">
                  <p className="text-text-primary truncate">{b.packageName}</p>
                  <p className="text-xs text-text-secondary">{formatDate(b.eventDate)}</p>
                </div>
                <span className="font-semibold text-primary text-xs">{formatCurrency(b.total)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function RevenueSection() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-text-primary">Revenue</h1>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Revenue', value: formatCurrency(1532000) },
          { label: 'This Month', value: formatCurrency(285000) },
          { label: 'Pending Payout', value: formatCurrency(45000) },
          { label: 'Available to Withdraw', value: formatCurrency(240000) },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-2xl p-4 border border-border">
            <p className="text-2xl font-bold text-text-primary">{s.value}</p>
            <p className="text-xs text-text-secondary">{s.label}</p>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-2xl p-5 border border-border">
        <h2 className="font-bold text-text-primary mb-4">Monthly Revenue</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={CREATOR_ANALYTICS.revenue}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F3D6E4" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #F3D6E4' }} />
            <Bar dataKey="revenue" fill="#FF4F9A" radius={[8, 8, 0, 0]} />
            <Bar dataKey="bookings" fill="#FF7A45" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="bg-white rounded-2xl p-5 border border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-text-primary">Transaction History</h2>
          <Button variant="ghost" size="sm"><Download className="w-4 h-4" /> Export</Button>
        </div>
        <div className="space-y-2">
          {MOCK_BOOKINGS.map(b => (
            <div key={b.id} className="flex items-center justify-between py-3 border-b border-border">
              <div>
                <p className="font-semibold text-sm">{b.packageName} Package</p>
                <p className="text-xs text-text-secondary">{formatDate(b.createdAt)}</p>
              </div>
              <span className="font-bold text-green-500">+{formatCurrency(b.total)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function BookingsSection() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-text-primary">Bookings</h1>
      <div className="space-y-4">
        {MOCK_BOOKINGS.map(b => (
          <div key={b.id} className="bg-white rounded-2xl p-5 border border-border flex items-center gap-4">
            <img src={b.creatorAvatar} alt="" className="w-12 h-12 rounded-xl object-cover" />
            <div className="flex-1">
              <p className="font-semibold text-text-primary">{b.packageName} Package</p>
              <p className="text-sm text-text-secondary">{formatDate(b.eventDate)} · {b.location}</p>
            </div>
            <Badge variant={b.status === 'completed' ? 'success' : 'primary'}>{b.status}</Badge>
            <span className="font-bold text-primary">{formatCurrency(b.total)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function AvailabilitySection() {
  const [dates, setDates] = useState<string[]>((['2024-12-10', '2024-12-15', '2024-12-20']));
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-text-primary">Availability Calendar</h1>
      <div className="bg-white rounded-2xl p-6 border border-border">
        <p className="text-sm text-text-secondary mb-4">Mark dates you're available for bookings</p>
        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: 31 }, (_, i) => i + 1).map(day => {
            const dateStr = `2024-12-${day.toString().padStart(2, '0')}`;
            const available = dates.includes(dateStr);
            return (
              <button
                key={day}
                onClick={() => setDates(available ? dates.filter(d => d !== dateStr) : [...dates, dateStr])}
                className={cn('aspect-square rounded-lg text-sm font-medium transition-all', available ? 'bg-brand-gradient text-white' : 'bg-surface text-text-secondary hover:bg-primary/10')}
              >
                {day}
              </button>
            );
          })}
        </div>
        <Button className="mt-4">Save Availability</Button>
      </div>
    </div>
  );
}

function PortfolioSection() {
  const creator = MOCK_CREATORS[0];
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-text-primary">Portfolio & Reels</h1>
        <Button><Camera className="w-4 h-4" /> Upload New</Button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {creator.portfolio.map(item => (
          <div key={item.id} className="relative aspect-square rounded-xl overflow-hidden group">
            <img src={item.url} alt={item.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              <Button size="sm" variant="outline" className="!bg-white">Edit</Button>
              <Button size="sm" variant="outline" className="!bg-white !text-red-500 !border-red-500">Delete</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PackagesSection() {
  const creator = MOCK_CREATORS[0];
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-text-primary">Packages</h1>
        <Button><Package className="w-4 h-4" /> Create Package</Button>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        {creator.packages.map(pkg => (
          <div key={pkg.id} className="bg-white rounded-2xl p-5 border border-border">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-bold text-text-primary">{pkg.name}</h3>
              {pkg.popular && <Badge variant="primary">Popular</Badge>}
            </div>
            <p className="text-2xl font-bold text-primary mb-2">{formatCurrency(pkg.price)}</p>
            <p className="text-sm text-text-secondary mb-3">{pkg.duration}</p>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="flex-1">Edit</Button>
              <Button size="sm" variant="ghost" className="text-red-500">Delete</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FollowersSection() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-text-primary">Followers</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {Array.from({ length: 9 }, (_, i) => (
          <div key={i} className="bg-white rounded-2xl p-4 border border-border flex items-center gap-3">
            <Avatar src={`https://images.pexels.com/photos/${220453 + i}/pexels-photo-${220453 + i}.jpeg`} alt="" size="md" />
            <div className="flex-1">
              <p className="font-semibold text-sm">User {i + 1}</p>
              <p className="text-xs text-text-secondary">Following since 2024</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AnalyticsSection() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-text-primary">Analytics</h1>
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-5 border border-border">
          <h2 className="font-bold text-text-primary mb-4">Views Over Time</h2>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={CREATOR_ANALYTICS.views}>
              <defs><linearGradient id="vGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#FF7A45" stopOpacity={0.3} /><stop offset="100%" stopColor="#FF7A45" stopOpacity={0} /></linearGradient></defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3D6E4" />
              <XAxis dataKey="day" /><YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="views" stroke="#FF7A45" fill="url(#vGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-border">
          <h2 className="font-bold text-text-primary mb-4">Bookings by Category</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={CREATOR_ANALYTICS.categoryDistribution} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80}>
                {CREATOR_ANALYTICS.categoryDistribution.map((e, i) => <Cell key={i} fill={e.color} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

function WithdrawalsSection() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-text-primary">Withdrawals</h1>
      <div className="bg-brand-gradient text-white rounded-2xl p-6">
        <p className="text-sm opacity-90">Available Balance</p>
        <p className="text-4xl font-bold mb-4">{formatCurrency(240000)}</p>
        <Button variant="outline" className="!border-white !text-white hover:!bg-white/10"><Wallet className="w-4 h-4" /> Withdraw Funds</Button>
      </div>
      <div className="bg-white rounded-2xl p-5 border border-border">
        <h2 className="font-bold text-text-primary mb-4">Recent Withdrawals</h2>
        <div className="space-y-2">
          {[{date: '2024-07-15', amount: 100000, status: 'completed'}, {date: '2024-06-10', amount: 85000, status: 'completed'}, {date: '2024-05-05', amount: 50000, status: 'completed'}].map((w, i) => (
            <div key={i} className="flex items-center justify-between py-3 border-b border-border">
              <div>
                <p className="font-semibold text-sm">{formatCurrency(w.amount)}</p>
                <p className="text-xs text-text-secondary">{formatDate(w.date)}</p>
              </div>
              <Badge variant="success">{w.status}</Badge>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MessagesSection() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-text-primary">Messages</h1>
      <div className="bg-white rounded-2xl p-8 border border-border text-center">
        <p className="text-text-secondary">No messages yet.</p>
      </div>
    </div>
  );
}

function SettingsSection() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-text-primary">Settings</h1>
      <div className="bg-white rounded-2xl p-6 border border-border">
        <h2 className="font-bold text-text-primary mb-4">Creator Profile</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div><label className="label">Display Name</label><input className="input-field" defaultValue={MOCK_CREATORS[0].name} /></div>
          <div><label className="label">Location</label><input className="input-field" defaultValue={MOCK_CREATORS[0].location} /></div>
          <div><label className="label">Starting Price</label><input className="input-field" defaultValue={MOCK_CREATORS[0].startingPrice} /></div>
          <div><label className="label">Response Time</label><input className="input-field" defaultValue={MOCK_CREATORS[0].responseTime} /></div>
        </div>
        <div className="mt-4"><label className="label">Bio</label><textarea className="input-field resize-none" rows={3} defaultValue={MOCK_CREATORS[0].bio} /></div>
        <Button className="mt-4">Save Changes</Button>
      </div>
    </div>
  );
}
