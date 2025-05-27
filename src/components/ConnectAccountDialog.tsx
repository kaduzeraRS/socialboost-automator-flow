
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
      description: 'Conecte sua conta do Instagram para agendar posts e analisar métricas'
    },
    {
      name: 'TikTok',
      icon: Play,
      color: 'from-black to-gray-800',
      description: 'Conecte sua conta do TikTok para gerenciar conteúdo e acompanhar performance'
    }
  ];

  const handleConnect = (platform: string) => {
    toast({
      title: "Conectando conta",
      description: `Redirecionando para ${platform}...`,
    });
    // Aqui seria implementada a lógica real de conexão
    console.log(`Connecting to ${platform}`);
    setIsOpen(false);
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
                      onClick={() => handleConnect(platform.name)}
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
