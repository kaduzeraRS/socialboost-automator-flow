
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail, Lock, User, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface RegisterFormProps {
  onSuccess: () => void;
  onToggleMode: () => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

const RegisterForm = ({ onSuccess, onToggleMode, loading, setLoading }: RegisterFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const { toast } = useToast();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validações
      if (password !== confirmPassword) {
        toast({
          title: "Erro na validação",
          description: "As senhas não coincidem",
          variant: "destructive"
        });
        setLoading(false);
        return;
      }

      if (password.length < 6) {
        toast({
          title: "Erro na validação",
          description: "A senha deve ter pelo menos 6 caracteres",
          variant: "destructive"
        });
        setLoading(false);
        return;
      }

      if (!fullName.trim()) {
        toast({
          title: "Erro na validação",
          description: "Nome completo é obrigatório",
          variant: "destructive"
        });
        setLoading(false);
        return;
      }

      // Tentar cadastro com confirmação automática
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
          emailRedirectTo: window.location.origin + '/dashboard'
        }
      });

      if (error) {
        console.error('Register error:', error);
        
        if (error.message.includes('User already registered')) {
          toast({
            title: "Erro no cadastro",
            description: "Este email já está cadastrado. Tente fazer login.",
            variant: "destructive"
          });
        } else {
          toast({
            title: "Erro no cadastro",
            description: error.message,
            variant: "destructive"
          });
        }
        return;
      }

      console.log('Register successful:', data);

      // Se há uma sessão, significa que o usuário foi automaticamente logado
      if (data.session) {
        toast({
          title: "Conta criada com sucesso!",
          description: "Bem-vindo ao Adacemy Boost!",
        });
        onSuccess();
      } else if (data.user && !data.session) {
        // Se não há sessão, mas há usuário, significa que precisa confirmar email
        toast({
          title: "Cadastro realizado!",
          description: "Verifique seu email para confirmar a conta antes de fazer login.",
        });
        
        // Tentar fazer login automaticamente após um breve delay
        setTimeout(async () => {
          try {
            const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
              email,
              password,
            });

            if (!loginError && loginData.session) {
              toast({
                title: "Login automático realizado!",
                description: "Você foi conectado automaticamente.",
              });
              onSuccess();
            }
          } catch (autoLoginError) {
            console.log('Auto login failed, user needs to verify email:', autoLoginError);
          }
        }, 1000);
      }

    } catch (error) {
      console.error('Unexpected register error:', error);
      toast({
        title: "Erro inesperado",
        description: "Ocorreu um erro inesperado. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleRegister} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="fullName">Nome completo</Label>
        <div className="relative">
          <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="fullName"
            type="text"
            placeholder="Seu nome completo"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="pl-10 transition-all duration-200 focus:scale-105"
            required
            disabled={loading}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="email"
            type="email"
            placeholder="seu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="pl-10 transition-all duration-200 focus:scale-105"
            required
            disabled={loading}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Senha</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="password"
            type="password"
            placeholder="Sua senha (mín. 6 caracteres)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="pl-10 transition-all duration-200 focus:scale-105"
            required
            disabled={loading}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirmar senha</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="confirmPassword"
            type="password"
            placeholder="Confirme sua senha"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="pl-10 transition-all duration-200 focus:scale-105"
            required
            disabled={loading}
          />
        </div>
      </div>

      <Button 
        type="submit" 
        className="w-full bg-purple-primary hover:bg-purple-hover transition-all duration-200 hover:scale-105"
        disabled={loading}
      >
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Criar conta
      </Button>

      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          Já tem uma conta?
          <Button
            variant="link"
            onClick={onToggleMode}
            className="p-0 ml-1 font-medium transition-all duration-200 hover:scale-105"
            disabled={loading}
          >
            Fazer login
          </Button>
        </p>
      </div>
    </form>
  );
};

export default RegisterForm;
