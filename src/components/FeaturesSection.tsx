
import React from 'react';

const FeaturesSection = () => {
  const features = [
    {
      icon: "📅",
      title: "Agendamento Inteligente",
      description: "Agende posts para Instagram e TikTok com horários otimizados para máximo engajamento."
    },
    {
      icon: "🔥", 
      title: "Aquecimento de Conta",
      description: "Automatize curtidas, follows e comentários para fazer suas contas crescerem organicamente."
    },
    {
      icon: "📊",
      title: "Analytics Avançados",
      description: "Acompanhe métricas detalhadas e insights para otimizar sua estratégia de crescimento."
    },
    {
      icon: "🎯",
      title: "Segmentação Precisa",
      description: "Direcione suas ações para o público certo usando filtros avançados de targeting."
    },
    {
      icon: "🔒",
      title: "100% Seguro",
      description: "Tecnologia de ponta que simula comportamento humano, mantendo suas contas protegidas."
    },
    {
      icon: "🚀",
      title: "Crescimento Acelerado",
      description: "Obtenha resultados até 10x mais rápidos com nossa automação inteligente."
    }
  ];

  return (
    <section id="recursos" className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Recursos Poderosos
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Tudo que você precisa para automatizar e escalar suas redes sociais de forma inteligente.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group bg-card rounded-xl p-6 border border-border hover:border-purple-primary/50 transition-all duration-300 card-hover"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-purple-primary transition-colors">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
