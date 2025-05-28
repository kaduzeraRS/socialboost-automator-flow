
import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import SubscriptionCard from '@/components/dashboard/SubscriptionCard';
import QuickActions from '@/components/dashboard/QuickActions';
import SocialStatsCard from '@/components/dashboard/SocialStatsCard';
import PostCalendar from '@/components/dashboard/PostCalendar';

const Dashboard = () => {
  const [selectedInstagramAccount, setSelectedInstagramAccount] = useState<string>('');
  const [selectedTikTokAccount, setSelectedTikTokAccount] = useState<string>('');

  const automationsData = {
    current: 750,
    limit: 1500,
    todayCount: 127,
    monthlyCount: 750
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-in fade-in-0 duration-500">
        <SubscriptionCard automationsData={automationsData} />
        <QuickActions />
        
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <SocialStatsCard 
            platform="instagram"
            selectedAccount={selectedInstagramAccount}
            onAccountChange={setSelectedInstagramAccount}
          />
          <SocialStatsCard 
            platform="tiktok"
            selectedAccount={selectedTikTokAccount}
            onAccountChange={setSelectedTikTokAccount}
          />
        </div>

        <PostCalendar />
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
