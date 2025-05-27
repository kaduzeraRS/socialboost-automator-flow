
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Instagram, Play, Plus, Check, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useSocialAccounts } from '@/hooks/useSocialAccounts';

interface ConnectAccountDialogProps {
  children: React.ReactNode;
}

const ConnectAccountDialog = ({ children }: ConnectAccountDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  const { accounts, connectAccount, disconnectAccount, loading } = useSocialAccounts();

  const platforms = [
    {
      name: 'Instagram',
      icon: Instagram,
      color: 'from-purple-500 to-pink-500',
      description: 'Conecte sua conta do Instagram para agendar posts e analisar métricas',
      authUrl: 'https://www.instagram.com/accounts/login/'
    },
    {
      name: 'TikTok',
      icon: Play,
      color: 'from-black to-gray-800',
      description: 'Conecte sua conta do TikTok para gerenciar conteúdo e acompanhar performance',
      authUrl: 'https://www.tiktok.com/login'
    }
  ];

  const handleConnect = async (platform: { name: string; authUrl: string }) => {
    toast({
      title: "Abrindo navegador",
      description: `Redirecionando para ${platform.name}...`,
    });

    // Open browser window for authentication
    const authWindow = window.open(
      platform.authUrl,
      '_blank',
      'width=600,height=700,scrollbars=yes,resizable=yes'
    );

    // Simulate authentication process
    const checkAuth = setInterval(() => {
      try {
        if (authWindow?.closed) {
          clearInterval(checkAuth);
          
          // Simulate successful authentication and save to database
          const handleSuccessfulAuth = async () => {
            const accountData = {
              platform: platform.name.toLowerCase(),
              username: `@usuario_${platform.name.toLowerCase()}`,
              account_id: `mock_${Date.now()}`,
              followers_count: Math.floor(Math.random() * 10000) + 1000,
              profile_picture_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=${platform.name}`
            };

            const result = await connectAccount(accountData);
            
            if (result) {
              // Close dialog after successful connection
              setIsOpen(false);
            }
          };

          handleSuccessfulAuth();
        }
      } catch (error) {
        console.log('Checking auth status...');
      }
    }, 1000);

    // Clear interval after 5 minutes to prevent infinite checking
    setTimeout(() => {
      clearInterval(checkAuth);
    }, 300000);
  };

  const handleDisconnect = async (accountId: string, platform: string) => {
    await disconnectAccount(accountId, platform);
  };

  const isConnected = (platformName: string) => {
    return accounts.some(acc => 
      acc.platform.toLowerCase() === platformName.toLowerCase() && acc.is_active
    );
  };

  const getConnectedAccount = (platformName: string) => {
    return accounts.find(acc => 
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
          {/* Connected Accounts Section */}
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
                            <p className="text-xs text-muted-foreground">{account.followers_count} seguidores</p>
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

          {/* Available Platforms Section */}
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
