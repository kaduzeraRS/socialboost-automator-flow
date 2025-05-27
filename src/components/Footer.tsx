
const Footer = () => {
  return (
    <footer className="bg-muted/50 border-t border-border py-16 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Branding */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-primary to-purple-hover flex items-center justify-center">
                <span className="text-white font-bold text-sm">AB</span>
              </div>
              <h3 className="text-xl font-bold text-foreground">Adacemy Boost</h3>
            </div>
            <p className="text-muted-foreground text-sm max-w-xs">
              A plataforma mais completa para automação de Instagram e TikTok. 
              Cresça suas redes sociais de forma inteligente e segura.
            </p>
            <div className="flex space-x-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Plataforma */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Plataforma</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Recursos</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Automação Instagram</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Automação TikTok</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Agendamento</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Analytics</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Termos de Uso</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Política de Privacidade</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">LGPD</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Cookies</a></li>
            </ul>
          </div>

          {/* Contato */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Contato</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="https://discord.gg/FmFKuDnJQu" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">Suporte</a></li>
              <li><a href="https://discord.gg/FmFKuDnJQu" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">Chat ao Vivo</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Base de Conhecimento</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">API Docs</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Status</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © 2025 Adacemy Boost. Todos os direitos reservados.
          </p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0 text-sm text-muted-foreground">
            <span>🇧🇷 Produto brasileiro</span>
            <span>•</span>
            <span>🔒 Dados seguros</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
