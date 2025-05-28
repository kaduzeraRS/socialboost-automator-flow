
import PlatformCard from './PlatformCard';
import { Instagram, Play } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface Platform {
  name: string;
  icon: any;
  color: string;
  description: string;
}

interface PlatformsListProps {
  connectedAccounts: any[];
  onConnect: (platform: Platform) => void;
}

const PlatformsList = ({ connectedAccounts, onConnect }: PlatformsListProps) => {
  const { t } = useLanguage();

  const platforms: Platform[] = [
    {
      name: 'Instagram',
      icon: Instagram,
      color: 'from-purple-500 to-pink-500',
      description: t('connect_instagram_desc'),
    },
    {
      name: 'TikTok',
      icon: Play,
      color: 'from-black to-gray-800',
      description: t('connect_tiktok_desc'),
    }
  ];

  const isConnected = (platformName: string) => {
    return connectedAccounts.some(acc => 
      acc.platform.toLowerCase() === platformName.toLowerCase() && acc.is_active
    );
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">{t('connect_new_account')}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {platforms.map((platform) => (
          <PlatformCard
            key={platform.name}
            platform={platform}
            isConnected={isConnected(platform.name)}
            onConnect={onConnect}
          />
        ))}
      </div>
    </div>
  );
};

export default PlatformsList;
