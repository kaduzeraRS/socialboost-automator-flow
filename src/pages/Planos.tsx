
import DashboardLayout from '@/components/DashboardLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSubscriptionPlans } from '@/hooks/useSubscriptionPlans';
import { useUserSubscription } from '@/hooks/useUserSubscription';
import ProtectedRoute from '@/components/ProtectedRoute';
import CurrentPlanCard from '@/components/planos/CurrentPlanCard';
import PlanCard from '@/components/planos/PlanCard';
import InteractionPackages from '@/components/planos/InteractionPackages';
import FAQSection from '@/components/planos/FAQSection';

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
      <ProtectedRoute>
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
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Planos e Assinatura</h1>
            <p className="text-muted-foreground mt-2">Gerencie sua assinatura e faça upgrades</p>
          </div>

          {/* Current Subscription Status */}
          {userSubscription && (
            <CurrentPlanCard
              userSubscription={userSubscription}
              daysRemaining={daysRemaining}
              renewalDate={renewalDate}
              onManagePayment={handleManagePayment}
              onCancelSubscription={handleCancelSubscription}
            />
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
                  <PlanCard
                    key={plan.id}
                    plan={plan}
                    isCurrentPlan={isCurrentPlan}
                    hasSubscription={!!userSubscription}
                    onChoosePlan={handleChoosePlan}
                    onUpgrade={handleUpgrade}
                  />
                );
              })}
            </div>
          </div>

          {/* Interaction Packages */}
          <InteractionPackages
            packages={interactionPackages}
            onBuyInteractions={handleBuyInteractions}
          />

          {/* FAQ Section */}
          <FAQSection />
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
};

export default Planos;
