
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const PricingSection = () => {
  const plans = [
    {
      name: "Quinzenal",
      price: "R$ 29",
      period: "15 dias",
      features: [
        "2 contas Instagram/TikTok",
        "100 posts agendados",
        "500 interações/dia",
        "Suporte básico"
      ],
      popular: false
    },
    {
      name: "Mensal",
      price: "R$ 49",
      period: "mês",
      features: [
        "5 contas Instagram/TikTok",
        "500 posts agendados",
        "2.000 interações/dia",
        "Analytics avançados",
        "Suporte prioritário"
      ],
      popular: true
    },
    {
      name: "Trimestral",
      price: "R$ 39",
      period: "mês",
      originalPrice: "R$ 49",
      features: [
        "10 contas Instagram/TikTok",
        "1.500 posts agendados",
        "5.000 interações/dia",
        "Analytics avançados",
        "Suporte VIP",
        "API access"
      ],
      popular: false
    },
    {
      name: "Anual",
      price: "R$ 29",
      period: "mês",
      originalPrice: "R$ 49",
      features: [
        "Contas ilimitadas",
        "Posts ilimitados",
        "10.000 interações/dia",
        "Tudo do plano anterior",
        "Gerente dedicado",
        "White label"
      ],
      popular: false
    }
  ];

  return (
    <section id="planos" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Planos de Assinatura
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Escolha o plano ideal para o seu negócio. Comece grátis e escale conforme cresce.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={index}
              className={`relative ${plan.popular ? 'border-2 border-blue-500 scale-105' : 'border-border'} transition-all duration-300 hover:shadow-lg`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Mais Popular
                  </span>
                </div>
              )}
              
              <CardHeader className="text-center">
                <CardTitle className="text-lg font-semibold">{plan.name}</CardTitle>
                <div className="mt-4">
                  <div className="flex items-baseline justify-center">
                    <span className="text-3xl font-bold text-foreground">{plan.price}</span>
                    <span className="text-muted-foreground ml-1">/{plan.period}</span>
                  </div>
                  {plan.originalPrice && (
                    <div className="text-sm text-muted-foreground line-through">
                      {plan.originalPrice}/{plan.period}
                    </div>
                  )}
                </div>
              </CardHeader>

              <CardContent>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm">
                      <svg className="w-4 h-4 text-success mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button 
                  className={`w-full ${plan.popular ? 'bg-blue-500 hover:bg-blue-600' : 'bg-purple-primary hover:bg-purple-hover'}`}
                >
                  {plan.popular ? 'Começar Agora' : 'Escolher Plano'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Todos os planos incluem 7 dias de teste grátis
          </p>
          <div className="inline-flex items-center space-x-4 text-sm text-muted-foreground">
            <span className="flex items-center">
              <svg className="w-4 h-4 text-success mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Sem taxa de setup
            </span>
            <span className="flex items-center">
              <svg className="w-4 h-4 text-success mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Cancele quando quiser
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
