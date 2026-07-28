import { useNotificationStore } from '@/store';
import { Bell, CheckCheck } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn, timeAgo } from '@/lib/utils';
import { Link } from 'react-router-dom';

export function NotificationsPage() {
  const { notifications, markRead, markAllRead, unreadCount } = useNotificationStore();

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Notifications</h1>
          <p className="text-text-secondary text-sm">{unreadCount()} unread notifications</p>
        </div>
        {unreadCount() > 0 && (
          <Button variant="ghost" size="sm" onClick={markAllRead}>
            <CheckCheck className="w-4 h-4" /> Mark all read
          </Button>
        )}
      </div>

      <div className="space-y-2">
        {notifications.map(n => (
          <Link
            key={n.id}
            to={n.link || '#'}
            onClick={() => markRead(n.id)}
            className={cn(
              'flex items-start gap-3 p-4 rounded-xl border transition-all',
              n.read ? 'bg-white border-border' : 'bg-primary/5 border-primary/20 hover:bg-primary/10'
            )}
          >
            {n.avatar ? (
              <img src={n.avatar} alt="" className="w-10 h-10 rounded-full object-cover" />
            ) : (
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Bell className="w-5 h-5 text-primary" />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm text-text-primary">{n.title}</p>
              <p className="text-sm text-text-secondary">{n.message}</p>
              <p className="text-xs text-text-secondary mt-1">{timeAgo(n.createdAt)}</p>
            </div>
            {!n.read && <span className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0" />}
          </Link>
        ))}
      </div>
    </div>
  );
}
