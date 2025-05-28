
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useSubscriptionPlans } from '@/hooks/useSubscriptionPlans';
import { useAuth } from '@/hooks/useAuth';

const HomePricingSection = () => {
  const { data: plans = [], isLoading } = useSubscriptionPlans();
  const { user } = useAuth();

  const handleChoosePlan = (planName: string) => {
    console.log('Escolher plano:', planName);
    if (!user) {
      // Redirecionar para auth se não estiver logado
      window.location.href = '/auth';
      return;
    }
    alert(`Redirecionando para checkout do plano ${planName}`);
  };

  if (isLoading) {
    return (
      <section id="planos" className="py-20 px-4 bg-background">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Planos Disponíveis
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Escolha o plano ideal para o seu negócio. Comece grátis e escale conforme cresce.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="h-6 bg-gray-200 rounded mb-2"></div>
                  <div className="h-8 bg-gray-200 rounded"></div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {[1, 2, 3, 4].map((j) => (
                      <div key={j} className="h-4 bg-gray-200 rounded"></div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="planos" className="py-20 px-4 bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Planos Disponíveis
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Escolha o plano ideal para o seu negócio. Comece grátis e escale conforme cresce.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {plans.map((plan) => (
            <Card 
              key={plan.id}
              className={`relative transition-all duration-300 hover:shadow-lg dark:bg-card bg-white ${
                plan.is_popular ? 'border-2 border-purple-primary scale-105 shadow-lg' : 'border-border'
              }`}
            >
              {plan.is_popular && (
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
                      plan.type === 'trimestral' ? 'text-lg' : plan.type === 'anual' ? 'text-xl' : 'text-2xl'
                    }`}>
                      R$ {plan.price.toFixed(2).replace('.', ',')}
                    </span>
                    <span className="text-muted-foreground ml-1 text-sm">/{plan.billing_period}</span>
                  </div>
                  {plan.original_price && (
                    <div className="text-sm text-muted-foreground mt-1">
                      R$ {plan.original_price.toFixed(2).replace('.', ',')}/mês
                    </div>
                  )}
                </div>
              </CardHeader>

              <CardContent>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center text-sm">
                    <svg className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-foreground">
                      {plan.max_accounts === 999999 ? 'Contas ilimitadas' : `${plan.max_accounts} contas Instagram/TikTok`}
                    </span>
                  </li>
                  <li className="flex items-center text-sm">
                    <svg className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-foreground">
                      {plan.max_posts_per_month === 999999 ? 'Posts ilimitados' : `${plan.max_posts_per_month} posts agendados`}
                    </span>
                  </li>
                  <li className="flex items-center text-sm">
                    <svg className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-foreground">
                      {plan.max_interactions_per_period.toLocaleString()} interações/{plan.billing_period}
                    </span>
                  </li>
                  {plan.basic_support && (
                    <li className="flex items-center text-sm">
                      <svg className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-foreground">Suporte básico</span>
                    </li>
                  )}
                  {plan.priority_support && (
                    <li className="flex items-center text-sm">
                      <svg className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-foreground">Suporte prioritário</span>
                    </li>
                  )}
                  {plan.vip_support && (
                    <li className="flex items-center text-sm">
                      <svg className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-foreground">Suporte VIP</span>
                    </li>
                  )}
                  {plan.advanced_analytics && (
                    <li className="flex items-center text-sm">
                      <svg className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-foreground">Analytics avançados</span>
                    </li>
                  )}
                  {plan.api_access && (
                    <li className="flex items-center text-sm">
                      <svg className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-foreground">API access</span>
                    </li>
                  )}
                  {plan.white_label && (
                    <li className="flex items-center text-sm">
                      <svg className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-foreground">White label</span>
                    </li>
                  )}
                  {plan.dedicated_manager && (
                    <li className="flex items-center text-sm">
                      <svg className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-foreground">Gerente dedicado</span>
                    </li>
                  )}
                </ul>

                <Button 
                  className={`w-full ${
                    plan.is_popular 
                      ? 'bg-purple-primary hover:bg-purple-hover text-white' 
                      : 'bg-foreground hover:bg-foreground/90 text-background'
                  }`}
                  onClick={() => handleChoosePlan(plan.name)}
                >
                  {plan.is_popular ? 'Começar Agora' : 'Escolher Plano'}
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

export default HomePricingSection;
