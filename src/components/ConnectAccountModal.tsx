
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Instagram, Play, Plus, Check, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useSocialAccounts } from '@/hooks/useSocialAccounts';
import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/contexts/LanguageContext';
import InstagramLoginModal from './InstagramLoginModal';

interface ConnectAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ConnectAccountModal = ({ isOpen, onClose }: ConnectAccountModalProps) => {
  const [showInstagramModal, setShowInstagramModal] = useState(false);
  const { toast } = useToast();
  const { accounts, loading, refetch } = useSocialAccounts();
  const { user } = useAuth();
  const { t } = useLanguage();

  const platforms = [
    {
      name: 'Instagram',
      icon: Instagram,
      color: 'from-purple-500 to-pink-500',
      description: 'Conecte sua conta do Instagram para agendamento automático',
    },
    {
      name: 'TikTok',
      icon: Play,
      color: 'from-black to-gray-800',
      description: 'Conecte sua conta do TikTok (em breve)',
    }
  ];

  const handleConnect = async (platform: any) => {
    if (!user) {
      toast({
        title: "Login necessário",
        description: "Faça login para conectar suas contas sociais.",
        variant: "destructive"
      });
      return;
    }

    if (platform.name === 'Instagram') {
      setShowInstagramModal(true);
    } else {
      toast({
        title: "Em desenvolvimento",
        description: "A conexão com TikTok será implementada em breve.",
        variant: "destructive"
      });
    }
  };

  const isConnected = (platformName: string) => {
    return accounts.some(acc => 
      acc.platform.toLowerCase() === platformName.toLowerCase() && acc.is_active
    );
  };

  const handleInstagramSuccess = () => {
    setShowInstagramModal(false);
    onClose();
    refetch();
  };

  if (loading) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl">
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

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Conectar Nova Conta
            </DialogTitle>
          </DialogHeader>
          
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
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Conectar {platform.name}
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </DialogContent>
      </Dialog>

      <InstagramLoginModal
        isOpen={showInstagramModal}
        onClose={() => setShowInstagramModal(false)}
        onSuccess={handleInstagramSuccess}
      />
    </>
  );
};

export default ConnectAccountModal;
