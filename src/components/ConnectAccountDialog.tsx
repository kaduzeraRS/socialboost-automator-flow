
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Instagram, Play, Plus, Check, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface ConnectAccountDialogProps {
  children: React.ReactNode;
}

interface ConnectedAccount {
  platform: string;
  username: string;
  connected: boolean;
  timestamp: string;
  avatar: string;
}

const ConnectAccountDialog = ({ children }: ConnectAccountDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [connectedAccounts, setConnectedAccounts] = useState<ConnectedAccount[]>([]);
  const { toast } = useToast();

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

  // Load connected accounts from cookies
  useEffect(() => {
    const loadConnectedAccounts = () => {
      const accountsCookie = document.cookie
        .split('; ')
        .find(row => row.startsWith('connected_accounts='))
        ?.split('=')[1];

      if (accountsCookie) {
        try {
          const accounts = JSON.parse(decodeURIComponent(accountsCookie));
          setConnectedAccounts(accounts);
        } catch (e) {
          setConnectedAccounts([]);
        }
      }
    };

    loadConnectedAccounts();
    
    // Listen for storage changes to update connected accounts
    const handleStorageChange = () => {
      loadConnectedAccounts();
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleConnect = (platform: { name: string; authUrl: string }) => {
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
          
          // Simulate successful authentication and save to cookies
          const accountData = {
            platform: platform.name,
            username: `@usuario_${platform.name.toLowerCase()}`,
            connected: true,
            timestamp: new Date().toISOString(),
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${platform.name}`
          };

          // Save to cookies
          const existingAccounts = document.cookie
            .split('; ')
            .find(row => row.startsWith('connected_accounts='))
            ?.split('=')[1];

          let accounts = [];
          if (existingAccounts) {
            try {
              accounts = JSON.parse(decodeURIComponent(existingAccounts));
            } catch (e) {
              accounts = [];
            }
          }

          // Remove existing account for same platform
          accounts = accounts.filter((acc: any) => acc.platform !== platform.name);
          accounts.push(accountData);
          
          document.cookie = `connected_accounts=${encodeURIComponent(JSON.stringify(accounts))}; path=/; max-age=86400`;

          // Update state
          setConnectedAccounts(accounts);

          toast({
            title: "Conta conectada!",
            description: `Sua conta do ${platform.name} foi conectada com sucesso.`,
          });

          // Close dialog after successful connection
          setIsOpen(false);
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

  const handleDisconnect = (platform: string) => {
    const updatedAccounts = connectedAccounts.filter(acc => acc.platform !== platform);
    
    document.cookie = `connected_accounts=${encodeURIComponent(JSON.stringify(updatedAccounts))}; path=/; max-age=86400`;
    setConnectedAccounts(updatedAccounts);

    toast({
      title: "Conta desconectada",
      description: `Sua conta do ${platform} foi desconectada.`,
    });
  };

  const isConnected = (platformName: string) => {
    return connectedAccounts.some(acc => acc.platform === platformName && acc.connected);
  };

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
                {connectedAccounts.map((account, index) => (
                  <Card key={index} className="border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-800">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={account.avatar} alt={account.username} />
                            <AvatarFallback>{account.platform[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{account.platform}</p>
                            <p className="text-sm text-muted-foreground">{account.username}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Check className="w-5 h-5 text-green-500" />
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDisconnect(account.platform)}
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
