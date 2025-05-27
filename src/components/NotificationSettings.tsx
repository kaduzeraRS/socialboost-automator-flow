
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
import { useLanguage } from '@/contexts/LanguageContext';

const NotificationSettings = () => {
  const { t } = useLanguage();
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

  const handleViewAllSettings = () => {
    console.log('Redirecionando para configurações completas');
    // Aqui você pode implementar navegação para página de configurações
    window.location.href = '/configuracoes';
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
      <DropdownMenuContent align="end" className="w-64 bg-background border border-border shadow-lg z-50">
        <DropdownMenuLabel className="text-foreground">
          Configurações de Notificação
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <div className="p-2 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-foreground">{t('posts_scheduled')}</span>
            <Switch 
              checked={notifications.posts}
              onCheckedChange={(checked) => handleNotificationToggle('posts', checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-foreground">{t('interactions')}</span>
            <Switch 
              checked={notifications.interactions}
              onCheckedChange={(checked) => handleNotificationToggle('interactions', checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-foreground">{t('system')}</span>
            <Switch 
              checked={notifications.system}
              onCheckedChange={(checked) => handleNotificationToggle('system', checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-foreground">{t('marketing')}</span>
            <Switch 
              checked={notifications.marketing}
              onCheckedChange={(checked) => handleNotificationToggle('marketing', checked)}
            />
          </div>
        </div>
        
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          onClick={handleViewAllSettings}
          className="text-center cursor-pointer hover:bg-accent hover:text-accent-foreground"
        >
          <span className="text-sm text-muted-foreground">{t('view_all_settings')}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationSettings;
