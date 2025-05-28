import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Instagram, Play, Plus, Check, X, ExternalLink, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useSocialAccounts } from '@/hooks/useSocialAccounts';
import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/contexts/LanguageContext';
import { SocialAuthService } from '@/services/SocialAuthService';

interface ConnectAccountDialogProps {
  children: React.ReactNode;
}

const ConnectAccountDialog = ({ children }: ConnectAccountDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [connectingPlatform, setConnectingPlatform] = useState<string | null>(null);
  const [authStatus, setAuthStatus] = useState<string>('');
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
    },
    {
      name: 'TikTok',
      icon: Play,
      color: 'from-black to-gray-800',
      description: t('connect_tiktok_desc'),
    }
  ];

  const handleConnect = async (platform: any) => {
    console.log('Iniciando conexão com:', platform.name);
    setConnectingPlatform(platform.name);
    setAuthStatus('Preparando conexão...');
    
    try {
      const authService = new SocialAuthService();
      
      toast({
        title: "Conectando com " + platform.name,
        description: `Uma janela será aberta. Faça login para conectar sua conta.`,
      });

      const result = await authService.authenticateWithPlatform({
        platform: platform.name.toLowerCase(),
        onStatusChange: setAuthStatus
      });

      if (result.success && result.userData) {
        console.log('Dados capturados:', result.userData);
        
        const accountData = {
          platform: platform.name.toLowerCase(),
          username: result.userData.username,
          account_id: result.userData.id,
          access_token: result.userData.access_token,
          refresh_token: result.userData.refresh_token,
          followers_count: result.userData.followers_count || 0,
          following_count: result.userData.following_count || 0,
          posts_count: result.userData.posts_count || 0,
          profile_picture_url: result.userData.profile_picture_url
        };

        // Salvar localmente primeiro
        const localAccounts = JSON.parse(localStorage.getItem('connectedAccounts') || '[]');
        const newAccount = { ...accountData, id: `local_${Date.now()}`, is_active: true };
        localAccounts.push(newAccount);
        localStorage.setItem('connectedAccounts', JSON.stringify(localAccounts));

        // Se usuário logado, salvar no banco também
        if (user) {
          const savedAccount = await connectAccount(accountData);
          if (savedAccount) {
            console.log('Conta salva no banco:', savedAccount);
          }
        }

        toast({
          title: "Conta conectada!",
          description: `Sua conta ${platform.name} foi conectada com sucesso.`,
        });

        setIsOpen(false);
      } else {
        throw new Error(result.error || 'Falha na conexão');
      }
      
    } catch (error: any) {
      console.error('Erro na conexão:', error);
      
      toast({
        title: "Erro na conexão",
        description: error.message || "Ocorreu um erro ao conectar a conta.",
        variant: "destructive"
      });
    } finally {
      setConnectingPlatform(null);
      setAuthStatus('');
    }
  };

  const handleDisconnect = async (accountId: string, platform: string) => {
    console.log('Desconectando conta:', accountId, platform);
    
    const localAccounts = JSON.parse(localStorage.getItem('connectedAccounts') || '[]');
    const filteredAccounts = localAccounts.filter(acc => acc.id !== accountId);
    localStorage.setItem('connectedAccounts', JSON.stringify(filteredAccounts));
    
    if (!accountId.startsWith('local_')) {
      await disconnectAccount(accountId, platform);
    } else {
      toast({
        title: "Conta desconectada",
        description: `Conta ${platform} foi removida com sucesso.`,
      });
    }
  };

  const getConnectedAccounts = () => {
    const localAccounts = JSON.parse(localStorage.getItem('connectedAccounts') || '[]');
    const bankAccounts = accounts.filter(acc => acc.is_active);
    
    const allAccounts = [...bankAccounts];
    localAccounts.forEach(localAcc => {
      const existsInBank = bankAccounts.some(bankAcc => 
        bankAcc.platform === localAcc.platform && bankAcc.username === localAcc.username
      );
      if (!existsInBank) {
        allAccounts.push(localAcc);
      }
    });
    
    return allAccounts;
  };

  const isConnected = (platformName: string) => {
    const connectedAccounts = getConnectedAccounts();
    return connectedAccounts.some(acc => 
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

  const connectedAccounts = getConnectedAccounts();

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
          {connectedAccounts.length > 0 && (
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
                const isConnecting = connectingPlatform === platform.name;
                
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
                        
                        {isConnecting && (
                          <div className="text-center space-y-2">
                            <div className="flex items-center justify-center space-x-2">
                              <Loader2 className="w-4 h-4 animate-spin" />
                              <span className="text-sm">{authStatus}</span>
                            </div>
                          </div>
                        )}
                        
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
                            disabled={isConnecting}
                          >
                            {isConnecting ? (
                              <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Conectando...
                              </>
                            ) : (
                              <>
                                <ExternalLink className="w-4 h-4 mr-2" />
                                {t('connect')} {platform.name}
                              </>
                            )}
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
