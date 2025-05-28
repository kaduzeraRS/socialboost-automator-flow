
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { Instagram } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useSocialAccounts } from '@/hooks/useSocialAccounts';
import { useAuth } from '@/hooks/useAuth';
import { InstagramAuthService } from '@/services/InstagramAuthService';
import InstagramLoginForm from './InstagramLoginForm';
import InstagramLoginStatus from './InstagramLoginStatus';

interface InstagramLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const InstagramLoginModal = ({ isOpen, onClose, onSuccess }: InstagramLoginModalProps) => {
  const [isLogging, setIsLogging] = useState(false);
  const [authStatus, setAuthStatus] = useState('');
  const { toast } = useToast();
  const { connectAccount, refetch } = useSocialAccounts();
  const { user } = useAuth();

  const handleLogin = async (credentials: { username: string; password: string }) => {
    setIsLogging(true);
    setAuthStatus('Iniciando automação de login...');

    try {
      const authService = new InstagramAuthService();
      
      toast({
        title: "Conectando com Instagram",
        description: "Aguarde enquanto fazemos o login automaticamente...",
      });

      const result = await authService.loginWithCredentials({
        username: credentials.username,
        password: credentials.password,
        onStatusChange: setAuthStatus
      });

      if (result.success && result.userData) {
        const accountData = {
          platform: 'instagram',
          username: result.userData.username,
          account_id: result.userData.id,
          access_token: result.userData.access_token,
          refresh_token: result.userData.refresh_token,
          followers_count: result.userData.followers_count || 0,
          following_count: result.userData.following_count || 0,
          posts_count: result.userData.posts_count || 0,
          profile_picture_url: result.userData.profile_picture_url
        };

        if (user) {
          const savedAccount = await connectAccount(accountData);
          if (savedAccount) {
            toast({
              title: "Conta conectada!",
              description: "Sua conta Instagram foi conectada com sucesso.",
            });
            
            await refetch();
            onClose();
            onSuccess?.();
          } else {
            throw new Error('Falha ao salvar a conta no banco de dados');
          }
        } else {
          const localAccounts = JSON.parse(localStorage.getItem('connectedAccounts') || '[]');
          const newAccount = { ...accountData, id: `local_${Date.now()}`, is_active: true };
          localAccounts.push(newAccount);
          localStorage.setItem('connectedAccounts', JSON.stringify(localAccounts));

          toast({
            title: "Conta conectada!",
            description: "Sua conta Instagram foi conectada. Faça login para sincronizar com o servidor.",
          });
          
          onClose();
          onSuccess?.();
        }
      } else {
        throw new Error(result.error || 'Falha na conexão');
      }
      
    } catch (error: any) {
      console.error('Erro no login:', error);
      
      toast({
        title: "Erro no login",
        description: error.message || "Ocorreu um erro ao fazer login no Instagram.",
        variant: "destructive"
      });
    } finally {
      setIsLogging(false);
      setAuthStatus('');
    }
  };

  const handleClose = () => {
    if (!isLogging) {
      setAuthStatus('');
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Instagram className="w-5 h-5 text-white" />
            </div>
            <span>Conectar Instagram</span>
          </DialogTitle>
        </DialogHeader>
        
        <Card>
          <CardContent className="p-6 space-y-4">
            <InstagramLoginForm 
              onSubmit={handleLogin}
              isLoading={isLogging}
            />
            
            <InstagramLoginStatus 
              status={authStatus}
              isVisible={isLogging && !!authStatus}
            />
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default InstagramLoginModal;
