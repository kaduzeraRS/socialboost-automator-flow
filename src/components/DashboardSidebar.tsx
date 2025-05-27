
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Home, 
  Calendar, 
  BarChart3, 
  Settings, 
  Users, 
  CreditCard,
  Zap,
  Shield
} from 'lucide-react';

const DashboardSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { icon: Home, label: 'Dashboard', path: '/dashboard' },
    { icon: Calendar, label: 'Agendamento', path: '/agendamento' },
    { icon: Users, label: 'Contas', path: '/contas' },
    { icon: Zap, label: 'Aquecimento', path: '/aquecimento' },
    { icon: BarChart3, label: 'Analytics', path: '/analytics' },
    { icon: CreditCard, label: 'Planos', path: '/planos' },
    { icon: Shield, label: 'Admin', path: '/admin' },
    { icon: Settings, label: 'Configurações', path: '/configuracoes' },
  ];

  return (
    <Card className="w-64 h-full bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
      <div className="p-6">
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg"></div>
          <span className="text-xl font-bold text-gray-900 dark:text-white">SocialBot</span>
        </div>
        
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Button
                key={item.path}
                variant={isActive ? "default" : "ghost"}
                className={`w-full justify-start ${
                  isActive 
                    ? 'bg-purple-600 hover:bg-purple-700 text-white' 
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                onClick={() => navigate(item.path)}
              >
                <Icon className="mr-3 h-4 w-4" />
                {item.label}
              </Button>
            );
          })}
        </nav>
      </div>
    </Card>
  );
};

export default DashboardSidebar;
