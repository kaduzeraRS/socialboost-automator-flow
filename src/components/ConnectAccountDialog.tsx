
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Instagram, Play, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ConnectAccountDialogProps {
  children: React.ReactNode;
}

const ConnectAccountDialog = ({ children }: ConnectAccountDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const platforms = [
    {
      name: 'Instagram',
      icon: Instagram,
      color: 'from-purple-500 to-pink-500',
      description: 'Conecte sua conta do Instagram para agendar posts e analisar métricas',
      authUrl: 'https://api.instagram.com/oauth/authorize' // Simulated URL
    },
    {
      name: 'TikTok',
      icon: Play,
      color: 'from-black to-gray-800',
      description: 'Conecte sua conta do TikTok para gerenciar conteúdo e acompanhar performance',
      authUrl: 'https://www.tiktok.com/auth/authorize' // Simulated URL
    }
  ];

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
        // In a real implementation, you would check if the auth window has been redirected
        // to your callback URL and extract the auth code/token
        if (authWindow?.closed) {
          clearInterval(checkAuth);
          
          // Simulate successful authentication and save to cookies
          const accountData = {
            platform: platform.name,
            username: `@usuario_${platform.name.toLowerCase()}`,
            connected: true,
            timestamp: new Date().toISOString()
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

          accounts.push(accountData);
          document.cookie = `connected_accounts=${encodeURIComponent(JSON.stringify(accounts))}; path=/; max-age=86400`;

          toast({
            title: "Conta conectada!",
            description: `Sua conta do ${platform.name} foi conectada com sucesso.`,
          });

          setIsOpen(false);
        }
      } catch (error) {
        // Handle cross-origin errors gracefully
        console.log('Checking auth status...');
      }
    }, 1000);

    // Clear interval after 5 minutes to prevent infinite checking
    setTimeout(() => {
      clearInterval(checkAuth);
    }, 300000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Conectar Nova Conta</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
          {platforms.map((platform) => {
            const Icon = platform.icon;
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
                    <Button 
                      onClick={() => handleConnect(platform)}
                      className="w-full bg-purple-primary hover:bg-purple-hover"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Conectar {platform.name}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConnectAccountDialog;
