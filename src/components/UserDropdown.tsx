
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
import { User, Settings, HelpCircle, LogOut, Edit } from 'lucide-react';
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
    console.log('Redirecionando para aba de notificações');
    window.location.href = '/configuracoes?tab=notifications';
  };

  const handleHelp = () => {
    console.log('Abrindo comunidade do Discord');
    window.open('https://discord.gg/FmFKuDnJQu', '_blank');
  };

  const handleLogout = async () => {
    try {
      console.log('Iniciando logout...');
      await signOut();
      toast({
        title: "Logout realizado",
        description: "Você foi desconectado com sucesso.",
      });
      console.log('Logout realizado, redirecionando para home...');
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
      <Button variant="ghost" size="icon" disabled className="transition-all duration-200">
        <User className="w-5 h-5" />
      </Button>
    );
  }

  if (!user) {
    return (
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={() => window.location.href = '/'}
        className="transition-all duration-200 hover:scale-105"
      >
        <User className="w-5 h-5" />
      </Button>
    );
  }

  const userEmail = user.email || 'Usuário não identificado';
  const userName = profile?.full_name || user.user_metadata?.full_name || 'Usuário';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon"
          className="transition-all duration-200 hover:scale-105 hover:bg-accent"
        >
          <User className="w-5 h-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-72 bg-popover border shadow-lg animate-in fade-in-0 zoom-in-95"
      >
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-2 p-2">
            <p className="text-sm font-medium leading-none">{userName}</p>
            <p className="text-xs leading-none text-muted-foreground bg-muted px-2 py-1 rounded">
              {userEmail}
            </p>
            {profile?.role && profile.role !== 'user' && (
              <p className="text-xs leading-none text-purple-600 font-medium capitalize bg-purple-50 px-2 py-1 rounded">
                {profile.role === 'admin' ? 'Administrador' : 
                 profile.role === 'agency' ? 'Agência' : 
                 profile.role === 'moderator' ? 'Moderador' : profile.role}
              </p>
            )}
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          onClick={handleEditProfile}
          className="cursor-pointer transition-colors duration-200 hover:bg-accent"
        >
          <Edit className="mr-3 h-4 w-4" />
          <span>Editar Perfil</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={handleSettings}
          className="cursor-pointer transition-colors duration-200 hover:bg-accent"
        >
          <Settings className="mr-3 h-4 w-4" />
          <span>Configurações</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={handleHelp}
          className="cursor-pointer transition-colors duration-200 hover:bg-accent"
        >
          <HelpCircle className="mr-3 h-4 w-4" />
          <span>Ajuda</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          onClick={handleLogout}
          className="cursor-pointer transition-colors duration-200 hover:bg-destructive hover:text-destructive-foreground"
        >
          <LogOut className="mr-3 h-4 w-4" />
          <span>Sair</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
