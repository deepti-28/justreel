import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Camera, MapPin, Calendar, MessageCircle, ChevronLeft, ChevronRight,
  MoreVertical, Play, CheckCircle, Clock, Zap, Star, Video,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

const ACTIVE_BOOKINGS = [
  {
    id: 'bk-1',
    status: 'Confirmed',
    statusColor: 'bg-emerald-100 text-emerald-700',
    creator: 'Elena Vance',
    project: 'Brand Campaign: Ethereal Sands',
    date: 'Oct 24, 2024',
    location: 'Dubai, UAE',
    thumbnail: 'https://images.pexels.com/photos/1537671/pexels-photo-1537671.jpeg',
    primaryAction: 'Manage Shoot',
    primaryVariant: 'gradient' as const,
  },
  {
    id: 'bk-2',
    status: 'In Progress',
    statusColor: 'bg-pink-100 text-pink-700',
    creator: 'Marco Rossi',
    project: 'Cinematic Wedding: Villa d\'Este',
    date: 'Nov 02, 2024',
    location: 'Lake Como, Italy',
    thumbnail: 'https://images.pexels.com/photos/169198/pexels-photo-169198.jpeg',
    primaryAction: 'View Footage',
    primaryVariant: 'gradient' as const,
  },
];

const CALENDAR_DAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const CALENDAR_DATES = [
  [20, 21, 22, 23, 24, 25, 26],
];

const SCHEDULE_EVENTS = [
  { color: 'bg-primary', title: 'Ethereal Sands Shoot', time: '09:00 AM', loc: 'Dubai' },
  { color: 'bg-pink-400', title: 'Prep Meeting: Rossi', time: '04:30 PM', loc: 'Zoom' },
];

const RECENT_HISTORY = [
  {
    id: 'h1',
    title: "Project 'Neon Pulse'",
    date: 'Completed Sep 12',
    thumb: 'https://images.pexels.com/photos/1049622/pexels-photo-1049622.jpeg',
  },
  {
    id: 'h2',
    title: 'Autumn Lookbook',
    date: 'Completed Aug 28',
    thumb: 'https://images.pexels.com/photos/2253870/pexels-photo-2253870.jpeg',
  },
];

type ViewMode = 'list' | 'timeline';

export function ProductionsPage() {
  const navigate = useNavigate();
  const [view, setView] = useState<ViewMode>('list');

  return (
    <div className="min-h-screen bg-[#fdf6f8]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl font-extrabold text-text-primary tracking-tight">Your Productions</h1>
          <p className="text-text-secondary mt-1">Manage your cinematic journeys and active collaborations.</p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Column */}
          <div className="flex-1 min-w-0 space-y-6">

            {/* Stats Bar */}
            <motion.div
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
              className="flex gap-3"
            >
              <div className="flex items-center gap-3 bg-white rounded-2xl px-5 py-3 shadow-sm border border-border flex-1">
                <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Video className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-[10px] font-semibold text-text-secondary uppercase tracking-widest">Active</p>
                  <p className="text-lg font-extrabold text-text-primary leading-tight">3 Shoots</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white rounded-2xl px-5 py-3 shadow-sm border border-border flex-1">
                <div className="w-9 h-9 rounded-xl bg-orange-100 flex items-center justify-center">
                  <Clock className="w-4 h-4 text-orange-500" />
                </div>
                <div>
                  <p className="text-[10px] font-semibold text-text-secondary uppercase tracking-widest">Past</p>
                  <p className="text-lg font-extrabold text-text-primary leading-tight">12 Total</p>
                </div>
              </div>
            </motion.div>

            {/* Active Bookings */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-text-primary">Active Bookings</h2>
                <div className="flex rounded-xl overflow-hidden border border-border">
                  {(['list', 'timeline'] as ViewMode[]).map(v => (
                    <button
                      key={v}
                      onClick={() => setView(v)}
                      className={cn(
                        'px-4 py-1.5 text-xs font-semibold capitalize transition-colors',
                        view === v ? 'bg-primary/10 text-primary' : 'bg-white text-text-secondary hover:bg-surface'
                      )}
                    >
                      {v === 'list' ? 'List View' : 'Timeline'}
                    </button>
                  ))}
                </div>
              </div>

              {view === 'list' ? (
                <div className="space-y-4">
                  {ACTIVE_BOOKINGS.map((b, i) => (
                    <motion.div
                      key={b.id}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.12 + i * 0.06 }}
                      className="bg-white rounded-2xl overflow-hidden shadow-sm border border-border flex"
                    >
                      {/* Thumbnail */}
                      <div className="relative w-40 sm:w-48 shrink-0">
                        <img src={b.thumbnail} alt={b.project} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20" />
                        <span className={cn('absolute top-3 left-3 text-[10px] font-bold px-2.5 py-1 rounded-full', b.statusColor)}>
                          {b.status}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="flex-1 p-5 min-w-0">
                        <div className="flex items-start justify-between mb-1">
                          <h3 className="text-base font-extrabold text-text-primary truncate">{b.creator}</h3>
                          <button className="text-text-secondary hover:text-text-primary ml-2 shrink-0">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-xs font-semibold text-primary mb-3 truncate">{b.project}</p>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-text-secondary mb-4">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 shrink-0" /> {b.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 shrink-0" /> {b.location}
                          </span>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => navigate(`/booking/tracking/${b.id}`)}
                            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-brand-gradient text-white shadow hover:opacity-90 transition-opacity"
                          >
                            {b.status === 'In Progress' ? (
                              <><Play className="w-3.5 h-3.5 fill-white" /> {b.primaryAction}</>
                            ) : (
                              <>{b.primaryAction}</>
                            )}
                          </button>
                          <button
                            onClick={() => navigate('/messages')}
                            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold border-2 border-border text-text-primary hover:border-primary hover:text-primary transition-colors"
                          >
                            <MessageCircle className="w-3.5 h-3.5" /> Message Creator
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-2xl border border-border p-6">
                  <div className="relative pl-4 space-y-6">
                    <div className="absolute left-0 top-2 bottom-2 w-0.5 bg-gradient-to-b from-primary to-pink-400 rounded-full" />
                    {ACTIVE_BOOKINGS.map((b, i) => (
                      <div key={b.id} className="flex gap-4 items-start">
                        <div className={cn('w-3 h-3 rounded-full mt-1 shrink-0 -ml-5 ring-2 ring-white', i === 0 ? 'bg-primary' : 'bg-pink-400')} />
                        <div>
                          <p className="text-xs text-text-secondary">{b.date}</p>
                          <p className="font-bold text-text-primary text-sm">{b.creator}</p>
                          <p className="text-xs text-primary">{b.project}</p>
                          <p className="text-xs text-text-secondary mt-0.5 flex items-center gap-1"><MapPin className="w-3 h-3" />{b.location}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>

            {/* Planning CTA */}
            <motion.div
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.22 }}
              className="bg-white rounded-2xl border border-border p-8 text-center"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Camera className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-bold text-text-primary text-base mb-1">Planning another masterpiece?</h3>
              <p className="text-sm text-text-secondary mb-5">Our top creators are ready for your next big project.</p>
              <button
                onClick={() => navigate('/explore')}
                className="inline-flex items-center gap-2 bg-text-primary text-white px-6 py-3 rounded-full text-sm font-bold hover:opacity-90 transition-opacity"
              >
                Explore Creators
              </button>
            </motion.div>
          </div>

          {/* Right Sidebar */}
          <div className="w-full lg:w-72 shrink-0 space-y-4">

            {/* Schedule */}
            <motion.div
              initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }}
              className="bg-white rounded-2xl border border-border p-5 shadow-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-text-primary">Schedule</h3>
                <div className="flex gap-1">
                  <button className="w-7 h-7 rounded-lg bg-surface flex items-center justify-center hover:bg-border transition-colors">
                    <ChevronLeft className="w-4 h-4 text-text-secondary" />
                  </button>
                  <button className="w-7 h-7 rounded-lg bg-surface flex items-center justify-center hover:bg-border transition-colors">
                    <ChevronRight className="w-4 h-4 text-text-secondary" />
                  </button>
                </div>
              </div>

              {/* Mini Calendar */}
              <div className="grid grid-cols-7 gap-y-1 mb-4">
                {CALENDAR_DAYS.map((d, i) => (
                  <div key={i} className="text-center text-[10px] font-semibold text-text-secondary py-1">{d}</div>
                ))}
                {CALENDAR_DATES[0].map((d) => (
                  <button
                    key={d}
                    className={cn(
                      'text-center text-xs py-1.5 rounded-full font-semibold transition-colors',
                      d === 24
                        ? 'bg-primary text-white'
                        : [22, 23, 25, 26].includes(d)
                        ? 'text-primary font-bold'
                        : 'text-text-secondary hover:bg-surface'
                    )}
                  >
                    {d}
                  </button>
                ))}
              </div>

              {/* Today's Events */}
              <div className="space-y-2">
                {SCHEDULE_EVENTS.map((ev, i) => (
                  <div key={i} className="flex items-start gap-2.5 p-2.5 rounded-xl bg-surface">
                    <div className={cn('w-1 self-stretch rounded-full shrink-0', ev.color)} />
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-text-primary truncate">{ev.title}</p>
                      <p className="text-[10px] text-text-secondary">{ev.time} · {ev.loc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Recent History */}
            <motion.div
              initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl border border-border p-5 shadow-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-text-primary">Recent History</h3>
                <button className="text-xs text-primary font-semibold hover:underline">View All</button>
              </div>
              <div className="space-y-3">
                {RECENT_HISTORY.map((h) => (
                  <div key={h.id} className="flex items-center gap-3">
                    <img src={h.thumb} alt={h.title} className="w-10 h-10 rounded-xl object-cover shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-text-primary truncate">{h.title}</p>
                      <p className="text-xs text-text-secondary">{h.date}</p>
                    </div>
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Upgrade CTA */}
            <motion.div
              initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 }}
              className="rounded-2xl p-5 overflow-hidden relative"
              style={{ background: 'linear-gradient(135deg, #e91e8c 0%, #ff6b6b 100%)' }}
            >
              <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-white/10 -translate-y-6 translate-x-6" />
              <div className="absolute bottom-0 left-0 w-16 h-16 rounded-full bg-white/10 translate-y-6 -translate-x-4" />
              <div className="relative">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-4 h-4 text-white fill-white" />
                  <h3 className="font-extrabold text-white text-sm">Unlock Pro Assets</h3>
                </div>
                <p className="text-white/80 text-xs mb-4 leading-relaxed">
                  Get exclusive 4K b-roll and licensed music for your bookings.
                </p>
                <button className="w-full bg-white text-pink-600 font-bold text-xs py-2.5 rounded-xl hover:bg-white/90 transition-colors flex items-center justify-center gap-1.5">
                  <Star className="w-3.5 h-3.5 fill-pink-600 text-pink-600" /> Upgrade to Pro
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
