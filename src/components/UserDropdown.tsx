
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
import { User, Settings, HelpCircle, LogOut } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const UserDropdown = () => {
  const { t } = useLanguage();
  const [userEmail] = useState('usuario@example.com'); // Mock user email

  const handleEditProfile = () => {
    console.log('Redirecionando para editar perfil');
    window.location.href = '/configuracoes'; // Navigate to settings page to edit profile
  };

  const handleSettings = () => {
    console.log('Redirecionando para configurações de notificações');
    window.location.href = '/configuracoes'; // Navigate to settings page for notifications
  };

  const handleHelp = () => {
    window.open('https://discord.gg/FmFKuDnJQu', '_blank');
  };

  const handleLogout = () => {
    console.log('Logout');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <User className="w-5 h-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{t('my_account')}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {userEmail}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleEditProfile}>
          <User className="mr-2 h-4 w-4" />
          <span>{t('edit_profile')}</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleSettings}>
          <Settings className="mr-2 h-4 w-4" />
          <span>{t('settings')}</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleHelp}>
          <HelpCircle className="mr-2 h-4 w-4" />
          <span>{t('help')}</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>{t('logout')}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
