
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Switch } from '@/components/ui/switch';
import { Bell, BellOff } from 'lucide-react';

const NotificationSettings = () => {
  const [notifications, setNotifications] = useState({
    posts: true,
    interactions: true,
    system: false,
    marketing: false
  });

  const handleNotificationToggle = (type: string, enabled: boolean) => {
    setNotifications(prev => ({
      ...prev,
      [type]: enabled
    }));
    console.log(`Notificação ${type} ${enabled ? 'ativada' : 'desativada'}`);
  };

  const allNotificationsOff = !Object.values(notifications).some(Boolean);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          {allNotificationsOff ? (
            <BellOff className="w-5 h-5" />
          ) : (
            <Bell className="w-5 h-5" />
          )}
          {!allNotificationsOff && (
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-purple-primary rounded-full"></span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64 bg-background border border-border shadow-lg">
        <DropdownMenuLabel className="text-foreground">
          Configurações de Notificação
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <div className="p-2 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-foreground">Posts Agendados</span>
            <Switch 
              checked={notifications.posts}
              onCheckedChange={(checked) => handleNotificationToggle('posts', checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-foreground">Interações</span>
            <Switch 
              checked={notifications.interactions}
              onCheckedChange={(checked) => handleNotificationToggle('interactions', checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-foreground">Sistema</span>
            <Switch 
              checked={notifications.system}
              onCheckedChange={(checked) => handleNotificationToggle('system', checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-foreground">Marketing</span>
            <Switch 
              checked={notifications.marketing}
              onCheckedChange={(checked) => handleNotificationToggle('marketing', checked)}
            />
          </div>
        </div>
        
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          onClick={() => console.log('Abrir configurações completas')}
          className="text-center cursor-pointer hover:bg-accent hover:text-accent-foreground"
        >
          <span className="text-sm text-muted-foreground">Ver todas as configurações</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationSettings;
