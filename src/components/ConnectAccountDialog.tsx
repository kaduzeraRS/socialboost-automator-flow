
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useAuth } from '@/hooks/useAuth';
import { useSocialAccounts } from '@/hooks/useSocialAccounts';
import ConnectAccountModal from './ConnectAccountModal';
import ConnectedAccountsList from './ConnectedAccountsList';

interface ConnectAccountDialogProps {
  children: React.ReactNode;
}

const ConnectAccountDialog = ({ children }: ConnectAccountDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showConnectModal, setShowConnectModal] = useState(false);
  const { user, loading: authLoading } = useAuth();
  const { loading } = useSocialAccounts();

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

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          {children}
        </DialogTrigger>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Gerenciar Contas</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            <ConnectedAccountsList />
            
            <div className="flex justify-center">
              <button
                onClick={() => setShowConnectModal(true)}
                className="bg-purple-primary hover:bg-purple-hover text-white px-6 py-2 rounded-lg transition-colors"
              >
                Conectar Nova Conta
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <ConnectAccountModal
        isOpen={showConnectModal}
        onClose={() => setShowConnectModal(false)}
      />
    </>
  );
};

export default ConnectAccountDialog;
