
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
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

const UserDropdown = () => {
  const { t } = useLanguage();
  const { user, profile, signOut, loading } = useAuth();
  const { toast } = useToast();

  const handleEditProfile = () => {
    console.log('Redirecionando para editar perfil');
    window.location.href = '/configuracoes';
  };

  const handleSettings = () => {
    console.log('Redirecionando para configurações de notificações');
    window.location.href = '/configuracoes';
  };

  const handleHelp = () => {
    window.open('https://discord.gg/FmFKuDnJQu', '_blank');
  };

  const handleLogout = async () => {
    try {
      await signOut();
      toast({
        title: "Logout realizado",
        description: "Você foi desconectado com sucesso.",
      });
      window.location.href = '/';
    } catch (error) {
      console.error('Error during logout:', error);
      toast({
        title: "Erro no logout",
        description: "Ocorreu um erro ao fazer logout. Tente novamente.",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return (
      <Button variant="ghost" size="icon" disabled>
        <User className="w-5 h-5" />
      </Button>
    );
  }

  if (!user) {
    return (
      <Button variant="ghost" size="icon" onClick={() => window.location.href = '/'}>
        <User className="w-5 h-5" />
      </Button>
    );
  }

  const userEmail = user.email || 'Usuário não identificado';
  const userName = profile?.full_name || user.user_metadata?.full_name || 'Usuário';

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
            <p className="text-sm font-medium leading-none">{userName}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {userEmail}
            </p>
            {profile?.role && profile.role !== 'user' && (
              <p className="text-xs leading-none text-purple-600 font-medium capitalize">
                {profile.role === 'admin' ? 'Administrador' : 
                 profile.role === 'agency' ? 'Agência' : 
                 profile.role === 'moderator' ? 'Moderador' : profile.role}
              </p>
            )}
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
