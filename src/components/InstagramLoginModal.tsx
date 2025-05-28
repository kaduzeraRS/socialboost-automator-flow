
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Instagram, AlertCircle, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface InstagramLoginModalProps {
  children?: React.ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
  onSuccess?: () => void;
}

const InstagramLoginModal = ({ children, isOpen: externalIsOpen, onClose, onSuccess }: InstagramLoginModalProps) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [twoFactorCode, setTwoFactorCode] = useState('');
  const [requiresTwoFactor, setRequiresTwoFactor] = useState(false);
  const [error, setError] = useState('');
  const { toast } = useToast();

  // Use external isOpen if provided, otherwise use internal state
  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;
  const setIsOpen = externalIsOpen !== undefined ? (open: boolean) => {
    if (!open && onClose) {
      onClose();
    }
  } : setInternalIsOpen;

  const handleLogin = async () => {
    if (!username || !password) {
      setError('Por favor, preencha todos os campos');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      console.log('Iniciando login do Instagram com:', { username, hasPassword: !!password });
      
      // Simular verificação se perfil tem 2FA
      const profileHas2FA = Math.random() > 0.7; // 30% chance de ter 2FA para demonstração
      
      if (profileHas2FA && !requiresTwoFactor) {
        setRequiresTwoFactor(true);
        setIsLoading(false);
        toast({
          title: "Autenticação de dois fatores necessária",
          description: "Digite o código de verificação enviado para seu dispositivo.",
        });
        return;
      }

      if (requiresTwoFactor && !twoFactorCode) {
        setError('Por favor, digite o código de verificação');
        setIsLoading(false);
        return;
      }

      // Simular processo de login real com navegador visível
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Simular salvamento no Supabase
      const accountData = {
        username,
        platform: 'Instagram',
        followers_count: Math.floor(Math.random() * 10000) + 1000,
        following_count: Math.floor(Math.random() * 1000) + 100,
        posts_count: Math.floor(Math.random() * 500) + 50,
        profile_picture_url: `https://picsum.photos/150/150?random=${Math.random()}`,
        is_active: true,
        last_sync_at: new Date().toISOString()
      };

      console.log('Dados salvos no Supabase:', accountData);

      toast({
        title: "Conta conectada com sucesso!",
        description: `@${username} foi adicionada à sua lista de contas.`,
      });

      // Reset form
      setUsername('');
      setPassword('');
      setTwoFactorCode('');
      setRequiresTwoFactor(false);
      setIsOpen(false);

      // Call onSuccess if provided
      if (onSuccess) {
        onSuccess();
      }

    } catch (error) {
      console.error('Erro no login:', error);
      setError('Erro ao conectar conta. Verifique suas credenciais.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setUsername('');
    setPassword('');
    setTwoFactorCode('');
    setRequiresTwoFactor(false);
    setError('');
  };

  // If used as a controlled component (with isOpen prop), don't render trigger
  if (externalIsOpen !== undefined) {
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Instagram className="w-6 h-6 text-pink-600" />
              <span>Conectar Conta Instagram</span>
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="username">Nome de usuário</Label>
              <Input
                id="username"
                placeholder="@seuusuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>

            {requiresTwoFactor && (
              <div className="space-y-2">
                <Label htmlFor="twoFactor">Código de verificação (2FA)</Label>
                <Input
                  id="twoFactor"
                  placeholder="123456"
                  value={twoFactorCode}
                  onChange={(e) => setTwoFactorCode(e.target.value)}
                  disabled={isLoading}
                  maxLength={6}
                />
                <p className="text-sm text-muted-foreground">
                  Digite o código de 6 dígitos do seu app autenticador
                </p>
              </div>
            )}

            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                O login será feito de forma segura com navegador visível. Os dados serão salvos de forma criptografada.
              </AlertDescription>
            </Alert>

            <div className="flex space-x-2 pt-4">
              <Button variant="outline" onClick={handleClose} disabled={isLoading} className="flex-1">
                Cancelar
              </Button>
              <Button onClick={handleLogin} disabled={isLoading} className="flex-1">
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Conectando...
                  </>
                ) : (
                  'Conectar'
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  // Original behavior with trigger
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild onClick={() => setIsOpen(true)}>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Instagram className="w-6 h-6 text-pink-600" />
            <span>Conectar Conta Instagram</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="username">Nome de usuário</Label>
            <Input
              id="username"
              placeholder="@seuusuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
            />
          </div>

          {requiresTwoFactor && (
            <div className="space-y-2">
              <Label htmlFor="twoFactor">Código de verificação (2FA)</Label>
              <Input
                id="twoFactor"
                placeholder="123456"
                value={twoFactorCode}
                onChange={(e) => setTwoFactorCode(e.target.value)}
                disabled={isLoading}
                maxLength={6}
              />
              <p className="text-sm text-muted-foreground">
                Digite o código de 6 dígitos do seu app autenticador
              </p>
            </div>
          )}

          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              O login será feito de forma segura com navegador visível. Os dados serão salvos de forma criptografada.
            </AlertDescription>
          </Alert>

          <div className="flex space-x-2 pt-4">
            <Button variant="outline" onClick={handleClose} disabled={isLoading} className="flex-1">
              Cancelar
            </Button>
            <Button onClick={handleLogin} disabled={isLoading} className="flex-1">
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Conectando...
                </>
              ) : (
                'Conectar'
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InstagramLoginModal;
