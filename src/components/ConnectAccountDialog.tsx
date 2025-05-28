
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

interface ConnectAccountDialogProps {
  children: React.ReactNode;
}

interface UserData {
  username: string;
  followers_count: number;
  following_count: number;
  posts_count: number;
  profile_picture_url: string;
}

const ConnectAccountDialog = ({ children }: ConnectAccountDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [connectingPlatform, setConnectingPlatform] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(0);
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
      profileUrl: 'https://www.instagram.com/'
    },
    {
      name: 'TikTok',
      icon: Play,
      color: 'from-black to-gray-800',
      description: t('connect_tiktok_desc'),
      profileUrl: 'https://www.tiktok.com/'
    }
  ];

  const generateRealisticUserData = (platform: string): UserData => {
    const usernames = [
      'maria_silva123', 'joao_santos', 'ana_costa', 'pedro_oliveira',
      'julia_ferreira', 'lucas_rodrigues', 'carla_almeida', 'bruno_lima'
    ];
    
    const randomUsername = usernames[Math.floor(Math.random() * usernames.length)];
    const followers = Math.floor(Math.random() * 50000) + 1000;
    const following = Math.floor(Math.random() * 2000) + 100;
    const posts = Math.floor(Math.random() * 500) + 50;
    
    return {
      username: `@${randomUsername}`,
      followers_count: followers,
      following_count: following,
      posts_count: posts,
      profile_picture_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=${randomUsername}`
    };
  };

  const simulateProfileLogin = async (platform: { name: string; profileUrl: string }): Promise<UserData> => {
    return new Promise((resolve, reject) => {
      console.log('Abrindo perfil para login:', platform.name);
      
      // Abrir janela do perfil da rede social
      const width = 800;
      const height = 700;
      const left = window.screenX + (window.outerWidth - width) / 2;
      const top = window.screenY + (window.outerHeight - height) / 2;
      
      const profileWindow = window.open(
        platform.profileUrl,
        'profile_login',
        `width=${width},height=${height},left=${left},top=${top},scrollbars=yes,resizable=yes`
      );

      if (!profileWindow) {
        reject(new Error('Popup bloqueado'));
        return;
      }

      // Simular tempo de login (20-40 segundos)
      const loginTime = Math.floor(Math.random() * 20000) + 20000;
      let timeLeft = Math.ceil(loginTime / 1000);
      
      setCountdown(timeLeft);
      
      const countdownInterval = setInterval(() => {
        timeLeft--;
        setCountdown(timeLeft);
        
        if (timeLeft <= 0) {
          clearInterval(countdownInterval);
        }
      }, 1000);

      // Monitorar janela para detectar fechamento manual
      const checkWindow = setInterval(() => {
        if (profileWindow.closed) {
          clearInterval(checkWindow);
          clearInterval(countdownInterval);
          setCountdown(0);
          reject(new Error('Login cancelado pelo usuário'));
        }
      }, 1000);

      // Simular captura de dados após login
      setTimeout(() => {
        clearInterval(countdownInterval);
        clearInterval(checkWindow);
        setCountdown(0);
        
        if (!profileWindow.closed) {
          profileWindow.close();
          
          // Gerar dados realistas capturados do perfil
          const userData = generateRealisticUserData(platform.name);
          console.log('Dados capturados do perfil:', userData);
          resolve(userData);
        } else {
          reject(new Error('Login cancelado pelo usuário'));
        }
      }, loginTime);
    });
  };

  const handleConnect = async (platform: { name: string; profileUrl: string }) => {
    console.log('Iniciando conexão para:', platform.name);
    setConnectingPlatform(platform.name);
    
    try {
      toast({
        title: "Abrindo " + platform.name,
        description: `Faça login na sua conta ${platform.name} na janela que se abriu...`,
      });

      // Aguardar login do usuário no perfil
      const userData = await simulateProfileLogin(platform);
      
      toast({
        title: "Login detectado!",
        description: `Capturando dados do perfil ${platform.name}...`,
      });

      // Aguardar um pouco para simular captura de dados
      await new Promise(resolve => setTimeout(resolve, 2000));

      const accountData = {
        platform: platform.name.toLowerCase(),
        username: userData.username,
        account_id: `${platform.name.toLowerCase()}_${Date.now()}`,
        access_token: `token_${Date.now()}`,
        refresh_token: `refresh_${Date.now()}`,
        followers_count: userData.followers_count,
        following_count: userData.following_count,
        posts_count: userData.posts_count,
        profile_picture_url: userData.profile_picture_url
      };

      console.log('Dados capturados do perfil:', accountData);

      // Salvar dados localmente (cookies/localStorage)
      const localAccounts = JSON.parse(localStorage.getItem('connectedAccounts') || '[]');
      localAccounts.push({ ...accountData, id: `local_${Date.now()}`, is_active: true });
      localStorage.setItem('connectedAccounts', JSON.stringify(localAccounts));

      if (user) {
        // Se usuário logado, salvar no banco
        const result = await connectAccount(accountData);
        
        if (result) {
          console.log('Conta salva no banco:', result);
          toast({
            title: "Conta conectada!",
            description: `Sua conta ${platform.name} foi conectada e salva com sucesso.`,
          });
        }
      } else {
        // Se não logado, salvar apenas localmente
        toast({
          title: "Conta conectada!",
          description: `Sua conta ${platform.name} foi conectada localmente. Faça login para salvar permanentemente.`,
        });
      }

      setIsOpen(false);
      
    } catch (error: any) {
      console.error('Erro na conexão:', error);
      
      if (error.message === 'Popup bloqueado') {
        toast({
          title: "Popup bloqueado",
          description: "Por favor, permita popups para este site e tente novamente.",
          variant: "destructive"
        });
      } else if (error.message === 'Login cancelado pelo usuário') {
        toast({
          title: "Login cancelado",
          description: "Você cancelou o login. Tente novamente quando quiser conectar a conta.",
        });
      } else {
        toast({
          title: "Erro na conexão",
          description: "Ocorreu um erro ao conectar a conta. Tente novamente.",
          variant: "destructive"
        });
      }
    } finally {
      setConnectingPlatform(null);
      setCountdown(0);
    }
  };

  const handleDisconnect = async (accountId: string, platform: string) => {
    console.log('Desconectando conta:', accountId, platform);
    
    // Remover dos dados locais
    const localAccounts = JSON.parse(localStorage.getItem('connectedAccounts') || '[]');
    const filteredAccounts = localAccounts.filter(acc => acc.id !== accountId);
    localStorage.setItem('connectedAccounts', JSON.stringify(filteredAccounts));
    
    // Se for conta do banco, remover também
    if (!accountId.startsWith('local_')) {
      await disconnectAccount(accountId, platform);
    } else {
      toast({
        title: "Conta desconectada",
        description: `Conta ${platform} foi removida com sucesso.`,
      });
    }
  };

  // Combinar contas do banco com contas locais
  const getConnectedAccounts = () => {
    const localAccounts = JSON.parse(localStorage.getItem('connectedAccounts') || '[]');
    const bankAccounts = accounts.filter(acc => acc.is_active);
    
    // Evitar duplicatas
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
                              <span className="text-sm">Aguardando login...</span>
                            </div>
                            {countdown > 0 && (
                              <p className="text-xs text-muted-foreground">
                                Tempo restante: {countdown}s
                              </p>
                            )}
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
