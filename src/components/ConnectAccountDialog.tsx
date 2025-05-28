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
import InstagramLoginModal from './InstagramLoginModal';

interface ConnectAccountDialogProps {
  children: React.ReactNode;
}

const ConnectAccountDialog = ({ children }: ConnectAccountDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showInstagramModal, setShowInstagramModal] = useState(false);
  const { toast } = useToast();
  const { accounts, disconnectAccount, loading, refetch } = useSocialAccounts();
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

  const handleDisconnect = async (accountId: string, platform: string) => {
    console.log('Desconectando conta:', accountId, platform);
    
    // Remover do localStorage (se existir)
    const localAccounts = JSON.parse(localStorage.getItem('connectedAccounts') || '[]');
    const filteredAccounts = localAccounts.filter(acc => acc.id !== accountId);
    localStorage.setItem('connectedAccounts', JSON.stringify(filteredAccounts));
    
    // Se não for conta local, remover do banco também
    if (!accountId.startsWith('local_')) {
      await disconnectAccount(accountId, platform);
    } else {
      toast({
        title: "Conta desconectada",
        description: `Conta ${platform} foi removida com sucesso.`,
      });
    }
    
    // Recarregar as contas
    await refetch();
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

  const handleInstagramSuccess = () => {
    setShowInstagramModal(false);
    setIsOpen(false);
    refetch();
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
    <>
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

      <InstagramLoginModal
        isOpen={showInstagramModal}
        onClose={() => setShowInstagramModal(false)}
        onSuccess={handleInstagramSuccess}
      />
    </>
  );
};

export default ConnectAccountDialog;
