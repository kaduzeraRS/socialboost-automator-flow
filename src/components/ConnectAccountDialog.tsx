
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Instagram, Play, Plus, Check, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useSocialAccounts } from '@/hooks/useSocialAccounts';
import { useAuth } from '@/hooks/useAuth';

interface ConnectAccountDialogProps {
  children: React.ReactNode;
}

const ConnectAccountDialog = ({ children }: ConnectAccountDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  const { accounts, connectAccount, disconnectAccount, loading } = useSocialAccounts();
  const { user } = useAuth();

  const platforms = [
    {
      name: 'Instagram',
      icon: Instagram,
      color: 'from-purple-500 to-pink-500',
      description: 'Conecte sua conta do Instagram para agendar posts e analisar métricas',
    },
    {
      name: 'TikTok',
      icon: Play,
      color: 'from-black to-gray-800',
      description: 'Conecte sua conta do TikTok para gerenciar conteúdo e acompanhar performance',
    }
  ];

  const generateSimilarStats = () => {
    // Gera estatísticas similares para Instagram e TikTok
    const baseFollowers = Math.floor(Math.random() * 50000) + 10000;
    const baseFollowing = Math.floor(Math.random() * 2000) + 500;
    const basePosts = Math.floor(Math.random() * 300) + 100;
    
    return {
      followers_count: baseFollowers + Math.floor(Math.random() * 1000),
      following_count: baseFollowing + Math.floor(Math.random() * 100),
      posts_count: basePosts + Math.floor(Math.random() * 50)
    };
  };

  const handleConnect = async (platform: { name: string }) => {
    console.log('Attempting to connect account for platform:', platform.name);
    console.log('Current user:', user);
    
    if (!user) {
      console.error('No user found when trying to connect account');
      toast({
        title: "Erro de autenticação",
        description: "Você precisa estar logado para conectar uma conta.",
        variant: "destructive"
      });
      return;
    }

    try {
      console.log('User is authenticated, proceeding with connection...');
      
      toast({
        title: "Conectando conta",
        description: `Simulando conexão com ${platform.name}...`,
      });

      // Gerar estatísticas similares para ambas as plataformas
      const stats = generateSimilarStats();
      
      const accountData = {
        platform: platform.name.toLowerCase(),
        username: `@usuario_${platform.name.toLowerCase()}_${Math.floor(Math.random() * 1000)}`,
        account_id: `mock_${Date.now()}`,
        ...stats,
        profile_picture_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=${platform.name}${Date.now()}`
      };

      console.log('Connecting account with data:', accountData);

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
    } catch (error) {
      console.error('Error connecting account:', error);
      toast({
        title: "Erro na conexão",
        description: "Não foi possível conectar a conta. Tente novamente.",
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

  if (loading) {
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
          <DialogTitle>Gerenciar Contas</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {connectedAccounts.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Contas Conectadas</h3>
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
                            <p className="text-xs text-muted-foreground">{account.followers_count?.toLocaleString()} seguidores</p>
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
            <h3 className="text-lg font-semibold mb-4">Conectar Nova Conta</h3>
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
                            Conectado
                          </Button>
                        ) : (
                          <Button 
                            onClick={() => handleConnect(platform)}
                            className="w-full bg-purple-primary hover:bg-purple-hover text-white"
                          >
                            <Plus className="w-4 h-4 mr-2" />
                            Conectar {platform.name}
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
