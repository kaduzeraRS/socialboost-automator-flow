
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Check, X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface ConnectedAccountCardProps {
  account: {
    id: string;
    platform: string;
    username: string;
    profile_picture_url?: string;
    followers_count?: number;
    is_active?: boolean;
  };
  onDisconnect: (accountId: string, platform: string) => void;
}

const ConnectedAccountCard = ({ account, onDisconnect }: ConnectedAccountCardProps) => {
  const { t } = useLanguage();

  return (
    <Card className="border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-800">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="w-10 h-10">
              <AvatarImage src={account.profile_picture_url} alt={account.username} />
              <AvatarFallback>{account.platform[0].toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium capitalize">{account.platform}</p>
              <p className="text-sm text-muted-foreground">{account.username}</p>
              <p className="text-xs text-muted-foreground">
                {account.followers_count?.toLocaleString()} {t('followers')}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Check className="w-5 h-5 text-green-500" />
            <Button
              variant="outline"
              size="sm"
              onClick={() => onDisconnect(account.id, account.platform)}
              className="text-red-600 hover:text-red-700"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConnectedAccountCard;
