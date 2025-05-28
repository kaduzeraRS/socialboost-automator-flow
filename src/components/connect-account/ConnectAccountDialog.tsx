
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { useSocialAccounts } from '@/hooks/useSocialAccounts';
import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/contexts/LanguageContext';
import InstagramLoginModal from '../InstagramLoginModal';
import ConnectedAccountsList from './ConnectedAccountsList';
import PlatformsList from './PlatformsList';

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
            <ConnectedAccountsList
              accounts={connectedAccounts}
              onDisconnect={handleDisconnect}
            />

            <PlatformsList
              connectedAccounts={connectedAccounts}
              onConnect={handleConnect}
            />
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
