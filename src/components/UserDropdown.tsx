
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

const UserDropdown = () => {
  const [userEmail] = useState('usuario@example.com'); // Mock user email

  const handleEditProfile = () => {
    console.log('Editar perfil');
  };

  const handleSettings = () => {
    window.location.href = '/configuracoes';
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
            <p className="text-sm font-medium leading-none">Minha Conta</p>
            <p className="text-xs leading-none text-muted-foreground">
              {userEmail}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleEditProfile}>
          <User className="mr-2 h-4 w-4" />
          <span>Editar Perfil</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleSettings}>
          <Settings className="mr-2 h-4 w-4" />
          <span>Configurações</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleHelp}>
          <HelpCircle className="mr-2 h-4 w-4" />
          <span>Ajuda</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sair</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
