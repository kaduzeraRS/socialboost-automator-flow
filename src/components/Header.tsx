
import DarkModeToggle from './DarkModeToggle';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-primary to-purple-hover flex items-center justify-center">
            <span className="text-white font-bold text-sm">AB</span>
          </div>
          <h1 className="text-xl font-bold text-foreground">Adacemy Boost</h1>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#recursos" className="text-muted-foreground hover:text-foreground transition-colors">
            Recursos
          </a>
          <a href="#planos" className="text-muted-foreground hover:text-foreground transition-colors">
            Planos
          </a>
          <a href="https://discord.gg/FmFKuDnJQu" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
            Contato
          </a>
        </nav>

        <div className="flex items-center space-x-3">
          <DarkModeToggle />
          <Button variant="ghost" className="hidden md:inline-flex">
            Entrar
          </Button>
          <Link to="/dashboard">
            <Button className="bg-purple-primary hover:bg-purple-hover">
              Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
