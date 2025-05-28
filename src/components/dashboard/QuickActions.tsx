
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Zap, Instagram, Link2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const QuickActions = () => {
  return (
    <Card className="transition-all duration-300 hover:shadow-md">
      <CardHeader>
        <CardTitle>Ações Rápidas</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-4">
          <Button asChild className="bg-purple-primary hover:bg-purple-hover transition-all duration-200 hover:scale-105">
            <Link to="/agendamento">
              <Plus className="w-4 h-4 mr-2" />
              Novo Post
            </Link>
          </Button>
          <Button asChild variant="outline" className="transition-all duration-200 hover:scale-105">
            <Link to="/aquecimento">
              <Zap className="w-4 h-4 mr-2" />
              Iniciar Aquecimento
            </Link>
          </Button>
          <Button asChild variant="secondary" className="bg-gradient-to-br from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 transition-all duration-200 hover:scale-105">
            <Link to="/contas">
              <Instagram className="w-4 h-4 mr-2" />
              Conectar Instagram
            </Link>
          </Button>
          <Button asChild variant="secondary" className="bg-black text-white hover:bg-gray-800 transition-all duration-200 hover:scale-105">
            <Link to="/contas">
              <Link2 className="w-4 h-4 mr-2" />
              Conectar TikTok
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
