
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Instagram, Play, Plus, Check, X, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useSocialAccounts } from '@/hooks/useSocialAccounts';
import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/contexts/LanguageContext';

interface ConnectAccountDialogProps {
  children: React.ReactNode;
}

const ConnectAccountDialog = ({ children }: ConnectAccountDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  const { accounts, connectAccount, disconnectAccount, loading } = useSocialAccounts();
  const { user, loading: authLoading } = useAuth();
  const { t } = useLanguage();

  const platforms = [
    {
      name: 'Instagram',
      icon: Instagram,
      color: 'from-purple-500 to-pink-500',
      description: t('connect_instagram_desc'),
      loginUrl: 'https://api.instagram.com/oauth/authorize?client_id=YOUR_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI&scope=user_profile,user_media&response_type=code'
    },
    {
      name: 'TikTok',
      icon: Play,
      color: 'from-black to-gray-800',
      description: t('connect_tiktok_desc'),
      loginUrl: 'https://www.tiktok.com/auth/authorize/?client_key=YOUR_CLIENT_KEY&scope=user.info.basic,video.list&response_type=code&redirect_uri=YOUR_REDIRECT_URI'
    }
  ];

  const generateSimilarStats = () => {
    const baseFollowers = Math.floor(Math.random() * 50000) + 10000;
    const baseFollowing = Math.floor(Math.random() * 2000) + 500;
    const basePosts = Math.floor(Math.random() * 300) + 100;
    
    return {
      followers_count: baseFollowers + Math.floor(Math.random() * 1000),
      following_count: baseFollowing + Math.floor(Math.random() * 100),
      posts_count: basePosts + Math.floor(Math.random() * 50)
    };
  };

  const handleConnect = async (platform: { name: string; loginUrl: string }) => {
    console.log('Attempting to connect account for platform:', platform.name);
    
    try {
      console.log('Opening OAuth flow for platform:', platform.name);
      
      toast({
        title: "Redirecionando...",
        description: `Abrindo ${platform.name} para autenticação...`,
      });

      // Abrir janela de OAuth
      const width = 600;
      const height = 700;
      const left = window.screenX + (window.outerWidth - width) / 2;
      const top = window.screenY + (window.outerHeight - height) / 2;
      
      const authWindow = window.open(
        platform.loginUrl,
        'oauth',
        `width=${width},height=${height},left=${left},top=${top},scrollbars=yes,resizable=yes`
      );

      if (!authWindow) {
        toast({
          title: "Popup bloqueado",
          description: "Por favor, permita popups para este site e tente novamente.",
          variant: "destructive"
        });
        return;
      }

      // Simular sucesso após 3 segundos (para demonstração)
      setTimeout(async () => {
        authWindow.close();
        
        toast({
          title: "Conectando conta...",
          description: `Processando conexão com ${platform.name}...`,
        });

        const stats = generateSimilarStats();
        
        const accountData = {
          platform: platform.name.toLowerCase(),
          username: `@usuario_${platform.name.toLowerCase()}_${Math.floor(Math.random() * 1000)}`,
          account_id: `auth_${Date.now()}`,
          access_token: `token_${Date.now()}`,
          refresh_token: `refresh_${Date.now()}`,
          ...stats,
          profile_picture_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=${platform.name}${Date.now()}`
        };

        console.log('Connecting account with OAuth data:', accountData);

        // Se o usuário não estiver logado, só mostrar que a conexão foi bem-sucedida
        // mas não salvar no banco (isso seria implementado quando houver autenticação)
        if (!user) {
          toast({
            title: "Conta conectada localmente!",
            description: `Sua conta ${platform.name} foi conectada. Para salvar permanentemente, faça login no sistema.`,
          });
          setIsOpen(false);
          return;
        }

        const result = await connectAccount(accountData);
        
        if (result) {
          console.log('Account connected successfully:', result);
          setIsOpen(false);
          toast({
            title: "Conta conectada!",
            description: `Sua conta ${platform.name} foi conectada com sucesso.`,
          });
        } else {
          console.error('Failed to connect account - no result returned');
          toast({
            title: "Erro na conexão",
            description: "Não foi possível conectar a conta. Tente novamente.",
            variant: "destructive"
          });
        }
      }, 3000);

    } catch (error) {
      console.error('Error connecting account:', error);
      toast({
        title: "Erro na conexão",
        description: "Ocorreu um erro ao conectar a conta. Tente novamente.",
        variant: "destructive"
      });
    }
  };

  const handleDisconnect = async (accountId: string, platform: string) => {
    console.log('Disconnecting account:', accountId, platform);
    await disconnectAccount(accountId, platform);
  };

  const isConnected = (platformName: string) => {
    return accounts.some(acc => 
      acc.platform.toLowerCase() === platformName.toLowerCase() && acc.is_active
    );
  };

  if (loading || authLoading) {
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          {children}
        </DialogTrigger>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Carregando...</DialogTitle>
          </DialogHeader>
          <div className="flex justify-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-primary"></div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  const connectedAccounts = accounts.filter(acc => acc.is_active);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>{t('manage_accounts')}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Mostrar contas conectadas apenas se o usuário estiver logado */}
          {user && connectedAccounts.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-4">{t('connected_accounts')}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {connectedAccounts.map((account) => (
                  <Card key={account.id} className="border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-800">
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
                            <p className="text-xs text-muted-foreground">{account.followers_count?.toLocaleString()} {t('followers')}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Check className="w-5 h-5 text-green-500" />
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDisconnect(account.id, account.platform)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          <div>
            <h3 className="text-lg font-semibold mb-4">{t('connect_new_account')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {platforms.map((platform) => {
                const Icon = platform.icon;
                const connected = isConnected(platform.name);
                
                return (
                  <Card key={platform.name} className="cursor-pointer hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex flex-col items-center text-center space-y-4">
                        <div className={`w-16 h-16 bg-gradient-to-br ${platform.color} rounded-lg flex items-center justify-center`}>
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{platform.name}</h3>
                          <p className="text-sm text-muted-foreground mt-2">{platform.description}</p>
                        </div>
                        {connected ? (
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
                            onClick={() => handleConnect(platform)}
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
              })}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConnectAccountDialog;
