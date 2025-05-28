
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Instagram, Loader2, Eye, EyeOff, Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useSocialAccounts } from '@/hooks/useSocialAccounts';
import { useAuth } from '@/hooks/useAuth';
import { InstagramAuthService } from '@/services/InstagramAuthService';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';

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
  const [show2FA, setShow2FA] = useState(false);
  const [twoFactorCode, setTwoFactorCode] = useState('');
  const [twoFactorCallback, setTwoFactorCallback] = useState<((code: string) => void) | null>(null);
  const { toast } = useToast();
  const { connectAccount } = useSocialAccounts();
  const { isAuthenticated } = useAuth();

  const handleInputChange = (field: string, value: string) => {
    setCredentials(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handle2FASubmit = () => {
    if (twoFactorCode.length === 6 && twoFactorCallback) {
      twoFactorCallback(twoFactorCode);
      setShow2FA(false);
      setTwoFactorCode('');
      setTwoFactorCallback(null);
    }
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
    setAuthStatus('Iniciando login via navegador visível...');

    try {
      const authService = new InstagramAuthService();
      
      toast({
        title: "Conectando com Instagram",
        description: "Abrindo navegador visível para login transparente...",
      });

      const result = await authService.loginWithCredentials({
        username: credentials.username,
        password: credentials.password,
        onStatusChange: setAuthStatus,
        on2FARequired: (callback) => {
          setShow2FA(true);
          setTwoFactorCallback(() => callback);
          setAuthStatus('Autenticação de dois fatores detectada...');
        }
      });

      if (result.success && result.userData) {
        console.log('Dados capturados via navegador visível:', result.userData);
        
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

        console.log('Salvando dados reais no banco:', accountData);

        const savedAccount = await connectAccount(accountData);
        if (savedAccount) {
          console.log('Conta salva com sucesso:', savedAccount);
          
          if (isAuthenticated) {
            toast({
              title: "Conta conectada!",
              description: "Sua conta Instagram foi conectada e dados reais salvos no banco.",
            });
          } else {
            toast({
              title: "Conta conectada localmente!",
              description: "Faça login para sincronizar com o servidor.",
            });
          }
          
          onClose();
          onSuccess?.();
        } else {
          throw new Error('Falha ao salvar a conta no banco');
        }
      } else {
        throw new Error(result.error || 'Falha na conexão via navegador');
      }
      
    } catch (error: any) {
      console.error('Erro no login via navegador:', error);
      
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
    if (!isLogging && !show2FA) {
      setCredentials({ username: '', password: '' });
      setAuthStatus('');
      setShow2FA(false);
      setTwoFactorCode('');
      setTwoFactorCallback(null);
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
            {!isAuthenticated && (
              <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <p className="text-sm text-yellow-800 dark:text-yellow-200">
                  <strong>Nota:</strong> Você não está logado. A conta será salva localmente e sincronizada quando fizer login.
                </p>
              </div>
            )}

            {show2FA ? (
              <div className="space-y-4">
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto">
                    <Shield className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold">Autenticação de Dois Fatores</h3>
                  <p className="text-sm text-muted-foreground">
                    Digite o código de 6 dígitos do seu aplicativo autenticador ou SMS
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="2fa-code">Código 2FA</Label>
                  <div className="flex justify-center">
                    <InputOTP
                      maxLength={6}
                      value={twoFactorCode}
                      onChange={setTwoFactorCode}
                    >
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                </div>

                <Button 
                  onClick={handle2FASubmit}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  disabled={twoFactorCode.length !== 6}
                >
                  Verificar Código
                </Button>
              </div>
            ) : (
              <>
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

                <div className="space-y-2">
                  <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <p className="text-sm text-green-800 dark:text-green-200">
                      <strong>Navegador Visível:</strong> O login será feito em uma janela do navegador visível para maior transparência.
                    </p>
                  </div>
                  
                  <p className="text-xs text-muted-foreground text-center">
                    Seus dados são utilizados apenas para conectar sua conta e não são armazenados permanentemente.
                  </p>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default InstagramLoginModal;
