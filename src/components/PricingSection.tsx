
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';

const PricingSection = () => {
  const { user } = useAuth();
  const currentPlan = "Mensal"; // Isso viria do Supabase posteriormente

  const plans = [
    {
      name: "Quinzenal",
      price: "R$ 29,90",
      period: "15 dias",
      features: [
        "2 contas Instagram/TikTok",
        "100 posts agendados",
        "5.000 interações/15 dias",
        "Suporte básico",
        "Relatórios básicos"
      ],
      popular: false,
      isCurrent: currentPlan === "Quinzenal"
    },
    {
      name: "Mensal",
      price: "R$ 49,90",
      period: "mês",
      features: [
        "5 contas Instagram/TikTok",
        "1.000 posts agendados",
        "10.000 interações/mês",
        "Analytics avançados",
        "Suporte prioritário",
        "Relatórios detalhados"
      ],
      popular: false,
      isCurrent: currentPlan === "Mensal"
    },
    {
      name: "Trimestral",
      price: "R$ 149,90",
      period: "3 meses",
      originalPrice: "R$ 49,90/mês",
      features: [
        "10 contas Instagram/TikTok",
        "2.000 posts agendados",
        "15.000 interações/mês",
        "Analytics avançados",
        "Suporte VIP",
        "API access",
        "Relatórios premium",
        "Insights personalizados"
      ],
      popular: false,
      isCurrent: currentPlan === "Trimestral"
    },
    {
      name: "Anual",
      price: "R$ 549,90",
      period: "ano",
      originalPrice: "R$ 45,90/mês",
      features: [
        "Contas ilimitadas",
        "Posts ilimitados",
        "20.000 interações/mês",
        "Tudo do plano anterior",
        "Gerente dedicado",
        "White label",
        "Relatórios executivos",
        "Consultoria estratégica"
      ],
      popular: false,
      isCurrent: currentPlan === "Anual"
    }
  ];

  const handleChoosePlan = (planName: string) => {
    console.log('Escolher plano:', planName);
    alert(`Redirecionando para checkout do plano ${planName}`);
  };

  return (
    <section id="planos" className="py-20 px-4 bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Planos de Assinatura
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Escolha o plano ideal para o seu negócio. Comece grátis e escale conforme cresce.
          </p>
          {user && (
            <div className="mt-4">
              <span className="inline-block bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-200 px-4 py-2 rounded-full text-sm font-medium">
                Seu Plano Atual: {currentPlan}
              </span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={index}
              className={`relative transition-all duration-300 hover:shadow-lg dark:bg-card bg-white ${
                plan.isCurrent ? 'border-2 border-green-500 scale-105 shadow-lg' : 
                plan.popular ? 'border-2 border-purple-primary scale-105 shadow-lg' : 'border-border'
              }`}
            >
              {plan.isCurrent && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Plano Atual
                  </span>
                </div>
              )}
              
              {plan.popular && !plan.isCurrent && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-purple-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                    Mais Popular
                  </span>
                </div>
              )}
              
              <CardHeader className="text-center">
                <CardTitle className="text-lg font-semibold text-foreground">{plan.name}</CardTitle>
                <div className="mt-4">
                  <div className="flex items-baseline justify-center">
                    <span className={`font-bold text-foreground ${
                      plan.name === 'Trimestral' ? 'text-xl' : 'text-3xl'
                    }`}>
                      {plan.price}
                    </span>
                    <span className="text-muted-foreground ml-1 text-sm">/{plan.period}</span>
                  </div>
                  {plan.originalPrice && (
                    <div className="text-sm text-muted-foreground mt-1">
                      {plan.originalPrice}
                    </div>
                  )}
                </div>
              </CardHeader>

              <CardContent>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm">
                      <svg className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  className={`w-full ${
                    plan.isCurrent 
                      ? 'bg-green-500 hover:bg-green-600 text-white' 
                      : plan.popular 
                        ? 'bg-purple-primary hover:bg-purple-hover text-white' 
                        : 'bg-foreground hover:bg-foreground/90 text-background'
                  }`}
                  onClick={() => handleChoosePlan(plan.name)}
                  disabled={plan.isCurrent}
                >
                  {plan.isCurrent ? 'Plano Ativo' : plan.popular ? 'Começar Agora' : 'Escolher Plano'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Todos os planos incluem 3 dias de teste grátis
          </p>
          <div className="inline-flex items-center space-x-4 text-sm text-muted-foreground">
            <span className="flex items-center">
              <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Sem taxa de setup
            </span>
            <span className="flex items-center">
              <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
