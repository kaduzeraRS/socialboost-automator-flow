
import { Link } from 'react-router-dom';

interface AuthHeaderProps {
  isSignUp: boolean;
}

const AuthHeader = ({ isSignUp }: AuthHeaderProps) => {
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-center mb-4">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-primary to-purple-hover flex items-center justify-center">
            <span className="text-white font-bold">AB</span>
          </div>
          <span className="text-xl font-bold">Adacemy Boost</span>
        </Link>
      </div>
      <h1 className="text-2xl font-bold text-center">
        {isSignUp ? 'Criar conta' : 'Entrar'}
      </h1>
      <p className="text-center text-muted-foreground">
        {isSignUp 
          ? 'Crie sua conta para começar a usar o Adacemy Boost'
          : 'Entre na sua conta para continuar'
        }
      </p>
    </div>
  );
};

export default AuthHeader;
