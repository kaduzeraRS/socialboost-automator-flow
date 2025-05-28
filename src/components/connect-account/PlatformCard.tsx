
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, ExternalLink } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface Platform {
  name: string;
  icon: any;
  color: string;
  description: string;
}

interface PlatformCardProps {
  platform: Platform;
  isConnected: boolean;
  onConnect: (platform: Platform) => void;
}

const PlatformCard = ({ platform, isConnected, onConnect }: PlatformCardProps) => {
  const { t } = useLanguage();
  const Icon = platform.icon;

  return (
    <Card className="cursor-pointer hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className={`w-16 h-16 bg-gradient-to-br ${platform.color} rounded-lg flex items-center justify-center`}>
            <Icon className="w-8 h-8 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">{platform.name}</h3>
            <p className="text-sm text-muted-foreground mt-2">{platform.description}</p>
          </div>
          
          {isConnected ? (
            <Button 
              variant="outline"
              className="w-full"
              disabled
            >
              <Check className="w-4 h-4 mr-2" />
              {t('connected')}
            </Button>
          ) : (
            <Button 
              onClick={() => onConnect(platform)}
              className="w-full bg-purple-primary hover:bg-purple-hover text-white"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              {t('connect')} {platform.name}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PlatformCard;
