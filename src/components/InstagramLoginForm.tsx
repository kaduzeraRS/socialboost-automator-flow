
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, Loader2 } from 'lucide-react';

interface InstagramLoginFormProps {
  onSubmit: (credentials: { username: string; password: string }) => void;
  isLoading: boolean;
}

const InstagramLoginForm = ({ onSubmit, isLoading }: InstagramLoginFormProps) => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(credentials);
  };

  const handleInputChange = (field: string, value: string) => {
    setCredentials(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="username">Usuário, e-mail ou telefone</Label>
        <Input
          id="username"
          type="text"
          placeholder="Digite seu usuário, e-mail ou telefone"
          value={credentials.username}
          onChange={(e) => handleInputChange('username', e.target.value)}
          disabled={isLoading}
          required
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
            disabled={isLoading}
            required
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
            onClick={() => setShowPassword(!showPassword)}
            disabled={isLoading}
          >
            {showPassword ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>

      <Button 
        type="submit"
        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
        disabled={isLoading || !credentials.username || !credentials.password}
      >
        {isLoading ? (
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
    </form>
  );
};

export default InstagramLoginForm;
