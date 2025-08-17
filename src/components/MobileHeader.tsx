
import { Scale, Search, Bell, Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { MobileSidebar } from './MobileSidebar';
import { NewsNotificationDropdownEnhanced } from './NewsNotificationDropdownEnhanced';
import { useSmartNotifications } from '@/hooks/useSmartNotifications';
interface MobileHeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}
export const MobileHeader = ({
  sidebarOpen,
  setSidebarOpen
}: MobileHeaderProps) => {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const { unreadCount, resetNotifications } = useSmartNotifications();

  const handleBellClick = () => {
    if (!notificationsOpen) {
      // Se está abrindo as notificações, resetar contador
      resetNotifications();
    }
    setNotificationsOpen(!notificationsOpen);
  };
  return <>
      <header className="fixed top-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-xl border-b border-border/20 safe-area-pt">
        <div className="px-4 py-3 bg-zinc-950">
          <div className="flex items-center justify-between">
            {/* Logo and Title */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg overflow-hidden">
                <img src="https://imgur.com/zlvHIAs.png" alt="Direito Premium" className="w-full h-full object-contain" />
              </div>
              <div>
                <h1 className="text-lg font-bold gradient-text">Direito Premium</h1>
                <p className="text-xs text-muted-foreground">Sua plataforma jurídica</p>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              {/* Notification Button */}
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-10 w-10 rounded-full hover:bg-primary/20 bg-primary/10 transition-all duration-300 active:scale-95 relative group overflow-hidden"
                onClick={handleBellClick}
              >
                {/* Enhanced glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent-legal/20 to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse" />
                
                <Bell className={cn(
                  "h-5 w-5 text-primary transition-all duration-300 relative z-10",
                  unreadCount > 0 && "animate-pulse"
                )} />
                
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center text-white text-xs font-bold min-w-[20px] shadow-lg border-2 border-background animate-bounce">
                    {unreadCount > 99 ? '99+' : unreadCount}
                  </span>
                )}
              </Button>

              <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full hover:bg-amber-400/20 bg-amber-400/10 transition-all duration-200 active:scale-95" onClick={() => setSidebarOpen(true)}>
                <Menu className={`h-5 w-5 text-amber-400 transition-transform duration-200 ${sidebarOpen ? 'rotate-90' : 'rotate-0'}`} />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <MobileSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <NewsNotificationDropdownEnhanced 
        isOpen={notificationsOpen} 
        onClose={() => setNotificationsOpen(false)} 
      />
    </>;
};
