
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Esta página serve apenas como callback para o OAuth
    // O JavaScript da janela pai já capturou os parâmetros
    console.log('Callback OAuth recebido');
    
    // Fechar janela se for popup
    if (window.opener) {
      window.close();
    } else {
      // Se não for popup, redirecionar para contas
      navigate('/contas');
    }
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-primary mx-auto mb-4"></div>
        <p>Processando autorização...</p>
      </div>
    </div>
  );
};

export default AuthCallback;
