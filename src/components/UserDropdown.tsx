
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
    console.log('Redirecionando para configurações');
    window.location.href = '/configuracoes';
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
        onClick={() => window.location.href = '/auth'}
        className="transition-all duration-200 hover:scale-105"
      >
        <User className="w-5 h-5" />
      </Button>
    );
  }

  const userEmail = user.email || 'usuario@email.com';
  const userName = profile?.full_name || user.user_metadata?.full_name || userEmail.split('@')[0] || 'Usuário';
  const userRole = profile?.role || 'user';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          className="flex items-center space-x-2 px-3 py-2 h-auto transition-all duration-200 hover:scale-105 hover:bg-accent"
        >
          <div className="w-8 h-8 bg-gradient-to-br from-purple-primary to-purple-hover rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
          </div>
          <div className="hidden md:flex flex-col items-start">
            <span className="text-sm font-medium text-foreground">{userName}</span>
            <span className="text-xs text-muted-foreground">{userEmail}</span>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-80 bg-popover border shadow-lg animate-in fade-in-0 zoom-in-95"
      >
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-2 p-2">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-primary to-purple-hover rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium leading-none">{userName}</p>
                <p className="text-xs leading-none text-muted-foreground mt-1 bg-muted px-2 py-1 rounded">
                  {userEmail}
                </p>
              </div>
            </div>
            {userRole && userRole !== 'user' && (
              <div className="ml-15">
                <span className="inline-block text-xs leading-none text-purple-600 font-medium capitalize bg-purple-50 dark:bg-purple-900/20 px-2 py-1 rounded">
                  {userRole === 'admin' ? 'Administrador' : 
                   userRole === 'agency' ? 'Agência' : 
                   userRole === 'moderator' ? 'Moderador' : userRole}
                </span>
              </div>
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
          <span>Ajuda & Suporte</span>
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
