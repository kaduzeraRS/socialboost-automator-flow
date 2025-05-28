
import { Button } from '@/components/ui/button';
import DarkModeToggle from './DarkModeToggle';
import UserDropdown from './UserDropdown';
import LanguageSelector from './LanguageSelector';
import NotificationSettings from './NotificationSettings';

const DashboardHeader = () => {
  return (
    <header className="h-16 border-b border-border bg-background px-6 flex items-center justify-between transition-all duration-300">
      <div className="flex items-center space-x-4">
        <h2 className="text-lg font-semibold text-foreground">Dashboard</h2>
      </div>
      
      <div className="flex items-center space-x-3">
        <div className="transition-all duration-200 hover:scale-105">
          <DarkModeToggle />
        </div>
        <div className="transition-all duration-200 hover:scale-105">
          <LanguageSelector />
        </div>
        <div className="transition-all duration-200 hover:scale-105">
          <NotificationSettings />
        </div>
        <UserDropdown />
      </div>
    </header>
  );
};

export default DashboardHeader;
