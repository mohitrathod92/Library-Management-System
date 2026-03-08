import { Settings, Bell, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useLibrary } from '@/contexts/LibraryContext';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Badge } from '@/components/ui/badge';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

export function Header() {
  const { user } = useAuth();
  const { notifications, markNotificationRead, unreadNotificationCount } = useLibrary();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const timeStr = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const dateStr = currentTime.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });

  return (
    <header className="h-14 border-b bg-background flex items-center justify-between px-4">
      <div className="flex items-center gap-3">
        <SidebarTrigger className="text-foreground" />
        <div className="flex items-center gap-2">
          <User className="h-5 w-5 text-foreground" />
          <div>
            <p className="text-sm font-semibold text-foreground leading-tight">{user?.name || 'Guest'}</p>
            <p className="text-xs text-muted-foreground capitalize">{user?.role === 'librarian' ? 'Admin' : 'Reader'}</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Popover>
          <PopoverTrigger asChild>
            <button className="relative p-1.5 rounded-md hover:bg-muted transition-colors">
              <Bell className="h-5 w-5 text-foreground" />
              {unreadNotificationCount > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-primary-foreground text-[10px] flex items-center justify-center font-bold">
                  {unreadNotificationCount}
                </span>
              )}
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0" align="end">
            <div className="p-3 border-b">
              <h4 className="text-sm font-semibold">Notifications</h4>
            </div>
            <div className="max-h-64 overflow-y-auto">
              {notifications.length === 0 ? (
                <p className="p-3 text-sm text-muted-foreground">No notifications</p>
              ) : (
                notifications.map(n => (
                  <button
                    key={n.id}
                    onClick={() => markNotificationRead(n.id)}
                    className={`w-full text-left p-3 border-b last:border-b-0 hover:bg-muted transition-colors ${!n.read ? 'bg-muted/50' : ''}`}
                  >
                    <p className="text-sm text-foreground">{n.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(n.created_at).toLocaleString()}
                    </p>
                  </button>
                ))
              )}
            </div>
          </PopoverContent>
        </Popover>

        <div className="text-right text-xs text-muted-foreground leading-tight">
          <p className="font-medium text-foreground">{timeStr}</p>
          <p>{dateStr}</p>
        </div>

        <Link to="/settings" className="p-1.5 rounded-md hover:bg-muted transition-colors">
          <Settings className="h-5 w-5 text-foreground" />
        </Link>
      </div>
    </header>
  );
}
