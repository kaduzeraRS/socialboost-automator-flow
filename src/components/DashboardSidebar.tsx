
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Calendar, 
  Flame, 
  Users, 
  CreditCard, 
  Settings,
  Shield
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/hooks/useAuth';

const DashboardSidebar = () => {
  const location = useLocation();
  const { t } = useLanguage();
  const { profile, loading } = useAuth();

  const menuItems = [
    { title: t('panel'), href: '/dashboard', icon: LayoutDashboard },
    { title: t('post_scheduling'), href: '/agendamento', icon: Calendar },
    { title: t('account_warming'), href: '/aquecimento', icon: Flame },
    { title: t('accounts'), href: '/contas', icon: Users },
    { title: t('subscription_plans'), href: '/planos', icon: CreditCard },
    { title: t('settings'), href: '/configuracoes', icon: Settings },
  ];

  // Check if user is admin based on profile data
  const isAdmin = profile?.role === 'admin';

  if (loading) {
    return (
      <div className="w-64 bg-card border-r border-border h-screen sticky top-0">
        <div className="p-6">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-primary to-purple-hover flex items-center justify-center">
              <span className="text-white font-bold text-sm">AB</span>
            </div>
            <h1 className="text-xl font-bold text-foreground">Adacemy Boost</h1>
          </div>
        </div>
        <div className="px-4 space-y-2">
          <div className="animate-pulse">
            <div className="h-10 bg-gray-200 rounded mb-2"></div>
            <div className="h-10 bg-gray-200 rounded mb-2"></div>
            <div className="h-10 bg-gray-200 rounded mb-2"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-64 bg-card border-r border-border h-screen sticky top-0">
      <div className="p-6">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-primary to-purple-hover flex items-center justify-center">
            <span className="text-white font-bold text-sm">AB</span>
          </div>
          <h1 className="text-xl font-bold text-foreground">Adacemy Boost</h1>
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
        
        {/* Admin menu item - only show for admins */}
        {isAdmin && (
          <Link
            to="/admin"
            className={cn(
              "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
              location.pathname === "/admin"
                ? "bg-purple-primary text-white" 
                : "text-muted-foreground hover:text-foreground hover:bg-accent"
            )}
          >
            <Shield className="w-5 h-5" />
            <span>{t('admin')}</span>
          </Link>
        )}
      </nav>
    </div>
  );
};

export default DashboardSidebar;
