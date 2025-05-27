
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const HeroSection = () => {
  return (
    <section className="pt-32 pb-20 px-4">
      <div className="container mx-auto text-center max-w-4xl">
        <div className="animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            Automatize o Instagram e TikTok com
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-primary to-purple-hover">
              {" "}inteligência
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Agende posts, automatize interações e faça suas contas crescerem 10x mais rápido 
            com nossa plataforma de automação inteligente.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto mb-8">
            <Input 
              type="email" 
              placeholder="Digite seu melhor e-mail"
              className="flex-1 h-12 text-base"
            />
            <Button className="bg-purple-primary hover:bg-purple-hover h-12 px-8 text-base font-medium">
              Começar Agora
            </Button>
          </div>

          <p className="text-sm text-muted-foreground">
            ✨ Teste grátis por 7 dias • Sem cartão de crédito
          </p>
        </div>

        <div className="mt-16 animate-scale-in">
          <div className="relative max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-purple-primary/20 to-purple-hover/20 rounded-2xl p-8 backdrop-blur-sm border border-purple-primary/20">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div>
                  <div className="text-2xl font-bold text-foreground">10k+</div>
                  <div className="text-sm text-muted-foreground">Contas Gerenciadas</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">500k+</div>
                  <div className="text-sm text-muted-foreground">Posts Agendados</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">2M+</div>
                  <div className="text-sm text-muted-foreground">Interações Automáticas</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">98%</div>
                  <div className="text-sm text-muted-foreground">Satisfação</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
