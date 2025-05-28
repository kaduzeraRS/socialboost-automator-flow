
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Instagram, Loader2, Eye, EyeOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useSocialAccounts } from '@/hooks/useSocialAccounts';
import { useAuth } from '@/hooks/useAuth';
import { InstagramAuthService } from '@/services/InstagramAuthService';

interface InstagramLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const InstagramLoginModal = ({ isOpen, onClose, onSuccess }: InstagramLoginModalProps) => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLogging, setIsLogging] = useState(false);
  const [authStatus, setAuthStatus] = useState('');
  const { toast } = useToast();
  const { connectAccount, refetch } = useSocialAccounts();
  const { user } = useAuth();

  const handleInputChange = (field: string, value: string) => {
    setCredentials(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleLogin = async () => {
    if (!credentials.username || !credentials.password) {
      toast({
        title: "Dados incompletos",
        description: "Por favor, preencha usuário e senha.",
        variant: "destructive"
      });
      return;
    }

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
        console.log('Dados reais capturados:', result.userData);
        
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

        console.log('Dados preparados para salvar:', accountData);

        // Se usuário logado, salvar no banco de dados
        if (user) {
          console.log('Usuário logado, salvando no banco...');
          const savedAccount = await connectAccount(accountData);
          if (savedAccount) {
            console.log('Conta salva no banco com sucesso:', savedAccount);
            
            toast({
              title: "Conta conectada!",
              description: "Sua conta Instagram foi conectada e salva no banco de dados.",
            });
            
            await refetch();
            onClose();
            onSuccess?.();
          } else {
            throw new Error('Falha ao salvar a conta no banco de dados');
          }
        } else {
          // Se não logado, salvar apenas localmente
          console.log('Usuário não logado, salvando apenas localmente...');
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
      setCredentials({ username: '', password: '' });
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
            <div className="space-y-2">
              <Label htmlFor="username">Usuário, e-mail ou telefone</Label>
              <Input
                id="username"
                type="text"
                placeholder="Digite seu usuário, e-mail ou telefone"
                value={credentials.username}
                onChange={(e) => handleInputChange('username', e.target.value)}
                disabled={isLogging}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Digite sua senha"
                  value={credentials.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  disabled={isLogging}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLogging}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>

            {isLogging && authStatus && (
              <div className="text-center space-y-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="flex items-center justify-center space-x-2">
                  <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                  <span className="text-sm text-blue-600">{authStatus}</span>
                </div>
              </div>
            )}

            <Button 
              onClick={handleLogin}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
              disabled={isLogging || !credentials.username || !credentials.password}
            >
              {isLogging ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Conectando...
                </>
              ) : (
                'Conectar'
              )}
            </Button>

            <p className="text-xs text-muted-foreground text-center">
              Seus dados são utilizados apenas para conectar sua conta e não são armazenados.
            </p>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default InstagramLoginModal;
