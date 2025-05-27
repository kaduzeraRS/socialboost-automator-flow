
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Calendar, 
  Flame, 
  Users, 
  CreditCard, 
  Settings 
} from 'lucide-react';
import { cn } from '@/lib/utils';

const menuItems = [
  { title: 'Painel', href: '/dashboard', icon: LayoutDashboard },
  { title: 'Agendamento de Posts', href: '/agendamento', icon: Calendar },
  { title: 'Aquecimento de Conta', href: '/aquecimento', icon: Flame },
  { title: 'Contas', href: '/contas', icon: Users },
  { title: 'Planos de Assinatura', href: '/planos', icon: CreditCard },
  { title: 'Configurações', href: '/configuracoes', icon: Settings },
];

const DashboardSidebar = () => {
  const location = useLocation();

  return (
    <div className="w-64 bg-card border-r border-border h-screen sticky top-0">
      <div className="p-6">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-primary to-purple-hover flex items-center justify-center">
            <span className="text-white font-bold text-sm">SB</span>
          </div>
          <h1 className="text-xl font-bold text-foreground">SocialBoost</h1>
        </div>
      </div>
      
      <nav className="px-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.href;
          
          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                isActive 
                  ? "bg-purple-primary text-white" 
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
              )}
            >
              <Icon className="w-5 h-5" />
              <span>{item.title}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default DashboardSidebar;
