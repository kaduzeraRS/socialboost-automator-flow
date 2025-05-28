
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Settings, Trash2, Instagram, Play, Users } from 'lucide-react';

interface AccountCardProps {
  account: any;
  stats: { scheduledPosts: number; publishedPosts: number };
  onDisconnect: (accountId: string, platform: string) => void;
}

const AccountCard = ({ account, stats, onDisconnect }: AccountCardProps) => {
  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'instagram':
        return Instagram;
      case 'tiktok':
        return Play;
      default:
        return Users;
    }
  };

  const Icon = getPlatformIcon(account.platform);

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="w-12 h-12">
              <AvatarImage src={account.profile_picture_url} alt={account.username} />
              <AvatarFallback>
                <Icon className="w-6 h-6" />
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold capitalize">{account.platform}</h3>
              <p className="text-sm text-muted-foreground">{account.username}</p>
            </div>
          </div>
          <Badge variant={account.is_active !== false ? "default" : "secondary"}>
            {account.is_active !== false ? "Conectado" : "Inativo"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-2 text-sm">
          <div className="text-center">
            <p className="font-medium">{account.followers_count || 0}</p>
            <p className="text-muted-foreground text-xs">Seguidores</p>
          </div>
          <div className="text-center">
            <p className="font-medium">{account.following_count || 0}</p>
            <p className="text-muted-foreground text-xs">Seguindo</p>
          </div>
          <div className="text-center">
            <p className="font-medium">{account.posts_count || 0}</p>
            <p className="text-muted-foreground text-xs">Posts</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="text-center p-2 bg-blue-50 dark:bg-blue-900/20 rounded">
            <p className="font-medium text-blue-600">{stats.scheduledPosts}</p>
            <p className="text-xs text-blue-600">Agendados</p>
          </div>
          <div className="text-center p-2 bg-green-50 dark:bg-green-900/20 rounded">
            <p className="font-medium text-green-600">{stats.publishedPosts}</p>
            <p className="text-xs text-green-600">Publicados</p>
          </div>
        </div>

        <div className="flex space-x-2">
          <Button size="sm" variant="outline" className="flex-1">
            <Settings className="w-4 h-4 mr-1" />
            Config
          </Button>
          <Button 
            size="sm" 
            variant="destructive"
            onClick={() => onDisconnect(account.id, account.platform)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AccountCard;
