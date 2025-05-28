
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Star, CreditCard, HelpCircle, Plus } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSubscriptionPlans } from '@/hooks/useSubscriptionPlans';
import { useUserSubscription } from '@/hooks/useUserSubscription';

const Planos = () => {
  const { t } = useLanguage();
  const { data: plans = [], isLoading: plansLoading } = useSubscriptionPlans();
  const { data: userSubscription, isLoading: subscriptionLoading } = useUserSubscription();

  const getDaysRemaining = () => {
    if (!userSubscription?.current_period_end) return 0;
    const endDate = new Date(userSubscription.current_period_end);
    const today = new Date();
    const diffTime = endDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  };

  const getRenewalDate = () => {
    if (!userSubscription?.current_period_end) return '';
    return new Date(userSubscription.current_period_end).toLocaleDateString('pt-BR');
  };

  const daysRemaining = getDaysRemaining();
  const renewalDate = getRenewalDate();

  const interactionPackages = [
    { amount: 1000, price: 'R$ 5,90' },
    { amount: 2500, price: 'R$ 9,90' },
    { amount: 5000, price: 'R$ 14,90' },
    { amount: 10000, price: 'R$ 19,90' }
  ];

  const handleManagePayment = () => {
    console.log('Gerenciar pagamento');
    alert('Redirecionando para gerenciamento de pagamento...');
  };

  const handleCancelSubscription = () => {
    console.log('Cancelar assinatura');
    if (confirm('Tem certeza que deseja cancelar sua assinatura?')) {
      alert('Assinatura cancelada com sucesso!');
    }
  };

  const handleChoosePlan = (planName: string) => {
    console.log('Escolher plano:', planName);
    alert(`Redirecionando para checkout do plano ${planName}`);
  };

  const handleUpgrade = (planName: string) => {
    console.log('Upgrade para plano:', planName);
    alert(`Redirecionando para upgrade para o plano ${planName}`);
  };

  const handleBuyInteractions = (amount: number, price: string) => {
    console.log('Comprar', amount, 'interações por', price);
    alert(`Comprando ${amount.toLocaleString()} interações por ${price}...`);
  };

  if (plansLoading || subscriptionLoading) {
    return (
      <DashboardLayout>
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Planos e Assinatura</h1>
            <p className="text-muted-foreground mt-2">Gerencie sua assinatura e faça upgrades</p>
          </div>
          <div className="animate-pulse space-y-4">
            <div className="h-48 bg-gray-200 rounded-lg"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-96 bg-gray-200 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Planos e Assinatura</h1>
          <p className="text-muted-foreground mt-2">Gerencie sua assinatura e faça upgrades</p>
        </div>

        {/* Current Subscription Status */}
        {userSubscription && (
          <Card className="border-purple-primary dark:bg-card bg-white border-2">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Star className="w-6 h-6 text-purple-primary" />
                <span className="text-foreground">Sua Assinatura Atual</span>
                <Badge className="bg-purple-primary text-white">
                  {userSubscription.status === 'active' ? 'Ativo' : userSubscription.status}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-primary">{userSubscription.plan.name}</div>
                  <p className="text-sm text-muted-foreground">Plano Atual</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">{daysRemaining} dias</div>
                  <p className="text-sm text-muted-foreground">Restantes</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">{renewalDate}</div>
                  <p className="text-sm text-muted-foreground">Próxima Renovação</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Período de assinatura</span>
                  <span>{Math.round((30 - daysRemaining) / 30 * 100)}% utilizado</span>
                </div>
                <Progress value={(30 - daysRemaining) / 30 * 100} className="h-2" />
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-purple-primary hover:bg-purple-hover text-white" onClick={handleManagePayment}>
                  <CreditCard className="w-4 h-4 mr-2" />
                  {t('manage_payment')}
                </Button>
                <Button variant="outline" size="sm" className="text-red-600 border-red-300 hover:bg-red-50 dark:text-red-400 dark:border-red-600 dark:hover:bg-red-900/20 text-xs h-8 px-2" onClick={handleCancelSubscription}>
                  {t('cancel')}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Available Plans */}
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-6">
            {userSubscription ? 'Planos Disponíveis' : 'Escolha seu Plano'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {plans.map((plan) => {
              const isCurrentPlan = userSubscription?.plan.name === plan.name;
              
              return (
                <Card 
                  key={plan.id}
                  className={`relative transition-all duration-300 hover:shadow-lg dark:bg-card bg-white ${
                    isCurrentPlan ? 'border-2 border-green-500 scale-105 shadow-lg' : 'border-border'
                  }`}
                >
                  {isCurrentPlan && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        Seu Plano Atual
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
                    <div className="space-y-4 mb-6">
                      <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <div className="text-xs font-medium text-blue-800 dark:text-blue-200 mb-1">
                          Automações
                        </div>
                        <div className="text-sm text-blue-600 dark:text-blue-300">
                          {plan.automations_limit === 999999 ? 'Automações ilimitadas' : `${plan.automations_limit?.toLocaleString()} automações/${plan.billing_period}`}
                        </div>
                      </div>
                      
                      <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                        <div className="text-xs font-medium text-purple-800 dark:text-purple-200 mb-1">
                          Relatórios
                        </div>
                        <div className="text-sm text-purple-600 dark:text-purple-300">
                          {plan.reports_type}
                        </div>
                      </div>
                    </div>

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

                    {isCurrentPlan ? (
                      <Button 
                        className="w-full bg-green-500 hover:bg-green-600 text-white"
                        disabled
                      >
                        Plano Ativo
                      </Button>
                    ) : (
                      <div className="space-y-2">
                        <Button 
                          className="w-full bg-purple-primary hover:bg-purple-hover text-white"
                          onClick={() => handleChoosePlan(plan.name)}
                        >
                          Escolher Plano
                        </Button>
                        {userSubscription && (
                          <Button 
                            variant="outline"
                            className="w-full"
                            onClick={() => handleUpgrade(plan.name)}
                          >
                            Fazer Upgrade
                          </Button>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Interaction Packages */}
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-6">Pacotes de Interações</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {interactionPackages.map((pkg, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow dark:bg-card bg-white border-2 border-gray-200 dark:border-gray-700">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Plus className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">+{pkg.amount.toLocaleString()}</h3>
                  <p className="text-sm text-muted-foreground mb-4">Interações</p>
                  <div className="text-lg font-bold text-purple-primary mb-4">{pkg.price}</div>
                  <Button className="w-full bg-purple-primary hover:bg-purple-hover text-white border-2 border-purple-primary" onClick={() => handleBuyInteractions(pkg.amount, pkg.price)}>
                    Comprar
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <Card className="dark:bg-card bg-white border-2 border-gray-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-foreground">
              <HelpCircle className="w-6 h-6" />
              <span>Perguntas Frequentes</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h4 className="font-medium text-foreground mb-2">Posso cancelar a qualquer momento?</h4>
              <p className="text-sm text-muted-foreground">Sim, você pode cancelar sua assinatura a qualquer momento sem taxas de cancelamento.</p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">Como funciona o período de teste?</h4>
              <p className="text-sm text-muted-foreground">Oferecemos 3 dias gratuitos para você testar todos os recursos do plano escolhido após o cadastro do e-mail.</p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">Posso alterar meu plano depois?</h4>
              <p className="text-sm text-muted-foreground">Sim, você pode fazer upgrade ou downgrade do seu plano a qualquer momento.</p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">O que acontece se eu usar a mesma conta em emails diferentes?</h4>
              <p className="text-sm text-muted-foreground">Nosso sistema detecta contas duplicadas para evitar múltiplos períodos de teste gratuito.</p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">Como funcionam as interações extras?</h4>
              <p className="text-sm text-muted-foreground">Você pode comprar pacotes de interações adicionais que são válidos por 30 dias após a compra.</p>
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
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
    </DashboardLayout>
  );
};

export default Planos;
