import { useParams } from 'react-router-dom';
import { Users, DollarSign, TrendingUp, AlertTriangle, CheckCircle, Headphones, FileBarChart, UserCheck } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge, Avatar } from '@/components/ui';
import { MOCK_CREATORS, MOCK_BOOKINGS } from '@/data/mockData';
import { formatCurrency, formatDate, cn } from '@/lib/utils';
import { useState } from 'react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function AdminDashboard() {
  const { section } = useParams();
  const current = section || 'overview';

  return (
    <div>
      {current === 'overview' && <Overview />}
      {current === 'creators' && <CreatorsSection />}
      {current === 'users' && <UsersSection />}
      {current === 'payments' && <PaymentsSection />}
      {current === 'analytics' && <AnalyticsSection />}
      {current === 'reports' && <ReportsSection />}
      {current === 'disputes' && <DisputesSection />}
      {current === 'approvals' && <ApprovalsSection />}
      {current === 'support' && <SupportSection />}
    </div>
  );
}

function Overview() {
  const stats = [
    { label: 'Total Creators', value: '5,200', icon: Users, change: '+124' },
    { label: 'Total Users', value: '32,400', icon: UserCheck, change: '+1,200' },
    { label: 'Revenue (MTD)', value: formatCurrency(4850000), icon: DollarSign, change: '+18%' },
    { label: 'Active Disputes', value: '12', icon: AlertTriangle, change: '-3' },
  ];

  const revenueData = [
    { month: 'Jan', revenue: 2800000, bookings: 180 },
    { month: 'Feb', revenue: 3200000, bookings: 220 },
    { month: 'Mar', revenue: 3800000, bookings: 280 },
    { month: 'Apr', revenue: 3500000, bookings: 260 },
    { month: 'May', revenue: 4200000, bookings: 310 },
    { month: 'Jun', revenue: 4800000, bookings: 350 },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-text-primary">Admin Dashboard</h1>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(s => (
          <div key={s.label} className="bg-white rounded-2xl p-4 border border-border">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-brand-gradient text-white flex items-center justify-center"><s.icon className="w-5 h-5" /></div>
              <span className="text-xs text-green-500 font-semibold">{s.change}</span>
            </div>
            <p className="text-2xl font-bold text-text-primary">{s.value}</p>
            <p className="text-xs text-text-secondary">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl p-5 border border-border">
        <h2 className="font-bold text-text-primary mb-4">Platform Revenue</h2>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={revenueData}>
            <defs><linearGradient id="aGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#FF4F9A" stopOpacity={0.3} /><stop offset="100%" stopColor="#FF4F9A" stopOpacity={0} /></linearGradient></defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#F3D6E4" />
            <XAxis dataKey="month" /><YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="revenue" stroke="#FF4F9A" fill="url(#aGrad)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-5 border border-border">
          <h2 className="font-bold text-text-primary mb-4">Pending Approvals</h2>
          <div className="space-y-2">
            {MOCK_CREATORS.slice(0, 4).map(c => (
              <div key={c.id} className="flex items-center gap-3 py-2">
                <Avatar src={c.avatar} alt={c.name} size="sm" />
                <div className="flex-1">
                  <p className="text-sm font-semibold">{c.name}</p>
                  <p className="text-xs text-text-secondary">{c.city}</p>
                </div>
                <Button size="sm">Review</Button>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-border">
          <h2 className="font-bold text-text-primary mb-4">Recent Disputes</h2>
          <div className="space-y-2">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex items-center gap-3 py-2">
                <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center"><AlertTriangle className="w-4 h-4 text-amber-500" /></div>
                <div className="flex-1">
                  <p className="text-sm font-semibold">Dispute #{i}</p>
                  <p className="text-xs text-text-secondary">Opened 2 days ago</p>
                </div>
                <Button size="sm" variant="outline">Resolve</Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function CreatorsSection() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-text-primary">Creators Management</h1>
      <div className="bg-white rounded-2xl border border-border overflow-hidden">
        <table className="w-full">
          <thead className="bg-surface">
            <tr>
              <th className="text-left p-4 text-xs font-semibold text-text-secondary">Creator</th>
              <th className="text-left p-4 text-xs font-semibold text-text-secondary">Location</th>
              <th className="text-left p-4 text-xs font-semibold text-text-secondary">Bookings</th>
              <th className="text-left p-4 text-xs font-semibold text-text-secondary">Rating</th>
              <th className="text-left p-4 text-xs font-semibold text-text-secondary">Status</th>
              <th className="text-left p-4 text-xs font-semibold text-text-secondary">Actions</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_CREATORS.slice(0, 10).map(c => (
              <tr key={c.id} className="border-t border-border">
                <td className="p-4"><div className="flex items-center gap-2"><Avatar src={c.avatar} alt={c.name} size="sm" /><span className="text-sm font-semibold">{c.name}</span></div></td>
                <td className="p-4 text-sm text-text-secondary">{c.city}</td>
                <td className="p-4 text-sm">{c.bookingCount}</td>
                <td className="p-4 text-sm">{c.rating}</td>
                <td className="p-4"><Badge variant="success">Active</Badge></td>
                <td className="p-4"><Button size="sm" variant="ghost">View</Button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function UsersSection() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-text-primary">Users</h1>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-4 border border-border text-center"><p className="text-2xl font-bold">32,400</p><p className="text-xs text-text-secondary">Total Users</p></div>
        <div className="bg-white rounded-2xl p-4 border border-border text-center"><p className="text-2xl font-bold">1,200</p><p className="text-xs text-text-secondary">New This Month</p></div>
        <div className="bg-white rounded-2xl p-4 border border-border text-center"><p className="text-2xl font-bold">89%</p><p className="text-xs text-text-secondary">Active Rate</p></div>
      </div>
    </div>
  );
}

function PaymentsSection() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-text-primary">Payments</h1>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-4 border border-border"><p className="text-2xl font-bold text-text-primary">{formatCurrency(4850000)}</p><p className="text-xs text-text-secondary">Total Volume</p></div>
        <div className="bg-white rounded-2xl p-4 border border-border"><p className="text-2xl font-bold text-text-primary">{formatCurrency(242500)}</p><p className="text-xs text-text-secondary">Platform Revenue</p></div>
        <div className="bg-white rounded-2xl p-4 border border-border"><p className="text-2xl font-bold text-text-primary">350</p><p className="text-xs text-text-secondary">Transactions</p></div>
      </div>
      <div className="bg-white rounded-2xl p-5 border border-border">
        <h2 className="font-bold text-text-primary mb-4">Recent Transactions</h2>
        <div className="space-y-2">
          {MOCK_BOOKINGS.map(b => (
            <div key={b.id} className="flex items-center justify-between py-3 border-b border-border">
              <div><p className="text-sm font-semibold">#{b.id.slice(-8).toUpperCase()}</p><p className="text-xs text-text-secondary">{formatDate(b.createdAt)}</p></div>
              <span className="font-bold">{formatCurrency(b.total)}</span>
              <Badge variant="success">Completed</Badge>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AnalyticsSection() {
  const data = [
    { month: 'Jan', users: 28000, creators: 4800 },
    { month: 'Feb', users: 29000, creators: 4900 },
    { month: 'Mar', users: 30000, creators: 5000 },
    { month: 'Apr', users: 31000, creators: 5100 },
    { month: 'May', users: 32000, creators: 5200 },
    { month: 'Jun', users: 32400, creators: 5200 },
  ];
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-text-primary">Analytics</h1>
      <div className="bg-white rounded-2xl p-5 border border-border">
        <h2 className="font-bold text-text-primary mb-4">User & Creator Growth</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F3D6E4" />
            <XAxis dataKey="month" /><YAxis />
            <Tooltip />
            <Bar dataKey="users" fill="#FF4F9A" radius={[8, 8, 0, 0]} />
            <Bar dataKey="creators" fill="#FF7A45" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function ReportsSection() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-text-primary">Reports</h1>
      <div className="grid md:grid-cols-2 gap-4">
        {['Revenue Report', 'User Growth Report', 'Creator Performance', 'Booking Analytics', 'Refund Report', 'Dispute Report'].map(r => (
          <div key={r} className="bg-white rounded-2xl p-5 border border-border flex items-center justify-between">
            <div><p className="font-semibold text-text-primary">{r}</p><p className="text-xs text-text-secondary">Last 30 days</p></div>
            <Button size="sm" variant="outline">Download</Button>
          </div>
        ))}
      </div>
    </div>
  );
}

function DisputesSection() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-text-primary">Disputes</h1>
      <div className="space-y-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="bg-white rounded-2xl p-5 border border-border">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center"><AlertTriangle className="w-4 h-4 text-amber-500" /></div>
                <div><p className="font-semibold text-sm">Dispute #{1000 + i}</p><p className="text-xs text-text-secondary">Opened 3 days ago</p></div>
              </div>
              <Badge variant="warning">Pending</Badge>
            </div>
            <p className="text-sm text-text-secondary mb-3">Client reported delayed delivery of final reels. Creator claims delivery was on time.</p>
            <div className="flex gap-2">
              <Button size="sm">Resolve</Button>
              <Button size="sm" variant="outline">View Details</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ApprovalsSection() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-text-primary">Pending Approvals</h1>
      <div className="space-y-4">
        {MOCK_CREATORS.slice(0, 5).map(c => (
          <div key={c.id} className="bg-white rounded-2xl p-5 border border-border flex items-center gap-4">
            <Avatar src={c.avatar} alt={c.name} size="lg" />
            <div className="flex-1">
              <p className="font-semibold text-text-primary">{c.name}</p>
              <p className="text-sm text-text-secondary">{c.location} · {c.categories.join(', ')}</p>
              <div className="flex gap-2 mt-2">
                {c.droneCertified && <Badge variant="primary">Drone Certified</Badge>}
                <Badge variant="neutral">{c.experience} years exp</Badge>
              </div>
            </div>
            <div className="flex gap-2">
              <Button size="sm"><CheckCircle className="w-4 h-4" /> Approve</Button>
              <Button size="sm" variant="ghost" className="text-red-500">Reject</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SupportSection() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-text-primary">Support Tickets</h1>
      <div className="space-y-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="bg-white rounded-2xl p-5 border border-border">
            <div className="flex items-center justify-between mb-2">
              <p className="font-semibold text-sm">Ticket #{2000 + i}</p>
              <Badge variant={i === 1 ? 'error' : 'warning'}>{i === 1 ? 'High Priority' : 'Normal'}</Badge>
            </div>
            <p className="text-sm text-text-secondary">Issue with booking payment not reflecting in account.</p>
            <Button size="sm" variant="outline" className="mt-3">Open Ticket</Button>
          </div>
        ))}
      </div>
    </div>
  );
}
