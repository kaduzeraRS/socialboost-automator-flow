
import { Bell, Globe, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import DarkModeToggle from './DarkModeToggle';

const DashboardHeader = () => {
  return (
    <header className="h-16 border-b border-border bg-background px-6 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <h2 className="text-lg font-semibold text-foreground">Dashboard</h2>
      </div>
      
      <div className="flex items-center space-x-3">
        <DarkModeToggle />
        <Button variant="ghost" size="icon">
          <Bell className="w-5 h-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <Globe className="w-5 h-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <User className="w-5 h-5" />
        </Button>
      </div>
    </header>
  );
};

export default DashboardHeader;
