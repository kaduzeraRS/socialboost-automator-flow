
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, Heart, MessageCircle, Share2, Users, TrendingUp, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
import AccountSelector from '@/components/AccountSelector';

interface SocialStatsCardProps {
  platform: 'instagram' | 'tiktok';
  selectedAccount: string;
  onAccountChange: (accountId: string) => void;
}

const SocialStatsCard = ({ platform, selectedAccount, onAccountChange }: SocialStatsCardProps) => {
  const isInstagram = platform === 'instagram';
  
  const stats = isInstagram ? {
    views: { value: '24.8K', change: '+18.2%' },
    likes: { value: '1.2K', change: '+24.1%' },
    comments: { value: '186', change: '+31.5%' },
    shares: { value: '89', change: '+12.3%' },
    followers: { value: '+127', change: '+8.3%' },
    reach: { value: '18.5K', change: '+15.2%' }
  } : {
    views: { value: '89.3K', change: '+45.2%' },
    likes: { value: '3.2K', change: '+28.7%' },
    comments: { value: '412', change: '+52.1%' },
    shares: { value: '234', change: '+67.3%' },
    followers: { value: '+89', change: '+12.8%' },
    engagement: { value: '5.7%', change: '+1.2%' }
  };

  const StatItem = ({ icon: Icon, label, value, change, color }: any) => (
    <div className={`text-center p-3 rounded-lg bg-gradient-to-br from-${color}-50 to-${color}-100 dark:from-${color}-900/20 dark:to-${color}-800/20 transition-all duration-200 hover:scale-105`}>
      <div className="flex items-center justify-center mb-2">
        <Icon className={`w-4 h-4 mr-1 text-${color}-600`} />
        <span className={`text-sm font-medium text-${color}-700 dark:text-${color}-300`}>{label}</span>
      </div>
      <p className={`text-2xl font-bold text-${color}-800 dark:text-${color}-200`}>{value}</p>
      <p className="text-xs text-green-600">{change}</p>
    </div>
  );

  return (
    <Card className="transition-all duration-300 hover:shadow-md">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center">
            {isInstagram ? (
              <>
                <svg className="w-5 h-5 mr-2 text-purple-500" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                Instagram - Últimos 7 dias
              </>
            ) : (
              <>
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                </svg>
                TikTok - Últimos 7 dias
              </>
            )}
          </CardTitle>
          <AccountSelector 
            platform={platform}
            selectedAccountId={selectedAccount}
            onAccountChange={onAccountChange}
          />
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <StatItem 
            icon={Eye} 
            label={isInstagram ? "Visualizações" : "Views"} 
            value={stats.views.value} 
            change={stats.views.change} 
            color="blue" 
          />
          <StatItem 
            icon={Heart} 
            label={isInstagram ? "Curtidas" : "Likes"} 
            value={stats.likes.value} 
            change={stats.likes.change} 
            color="red" 
          />
          <StatItem 
            icon={MessageCircle} 
            label="Comentários" 
            value={stats.comments.value} 
            change={stats.comments.change} 
            color="green" 
          />
          <StatItem 
            icon={Share2} 
            label="Shares" 
            value={stats.shares.value} 
            change={stats.shares.change} 
            color="orange" 
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <StatItem 
            icon={Users} 
            label="Seguidores" 
            value={stats.followers.value} 
            change={stats.followers.change} 
            color="purple" 
          />
          <StatItem 
            icon={isInstagram ? TrendingUp : Activity} 
            label={isInstagram ? "Alcance" : "Engajamento"} 
            value={isInstagram ? stats.reach.value : stats.engagement.value} 
            change={isInstagram ? stats.reach.change : stats.engagement.change} 
            color="indigo" 
          />
        </div>

        <Button asChild variant="outline" className="w-full transition-all duration-200 hover:scale-105">
          <Link to="/contas">
            <TrendingUp className="w-4 h-4 mr-2" />
            Ver Relatório Completo
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default SocialStatsCard;
