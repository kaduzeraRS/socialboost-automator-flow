
import { useAuth } from '@/hooks/useAuth';
import PricingHeader from './pricing/PricingHeader';
import PlanCard from './pricing/PlanCard';
import PricingFooter from './pricing/PricingFooter';

const PricingSection = () => {
  const { user } = useAuth();
  
  // Fix: Make currentPlan dynamic - this could come from user data in a real app
  const getCurrentUserPlan = (): "Quinzenal" | "Mensal" | "Trimestral" | "Anual" | null => {
    if (!user) return null;
    // For now, we'll simulate different plans - in a real app this would come from the user's subscription data
    return "Mensal"; // This could be user.subscription?.plan or similar
  };
  
  const currentPlan = getCurrentUserPlan();

  const plans = [
    {
      name: "Quinzenal" as const,
      price: "R$ 29,90",
      period: "15 dias",
      features: [
        "2 contas Instagram/TikTok",
        "100 posts agendados",
        "5.000 interações/15 dias",
        "Suporte básico",
        "Relatórios básicos",
        "Analytics básicos"
      ],
      automations: "500 automações/15 dias",
      reports: "Relatórios básicos de engajamento",
      popular: false,
      isCurrent: currentPlan === "Quinzenal"
    },
    {
      name: "Mensal" as const,
      price: "R$ 49,90",
      period: "mês",
      features: [
        "5 contas Instagram/TikTok",
        "1.000 posts agendados",
        "10.000 interações/mês",
        "Analytics avançados",
        "Suporte prioritário",
        "Relatórios detalhados",
        "Métricas de engajamento",
        "Análise de crescimento"
      ],
      automations: "2.000 automações/mês",
      reports: "Relatórios avançados + Analytics de crescimento",
      popular: false,
      isCurrent: currentPlan === "Mensal"
    },
    {
      name: "Trimestral" as const,
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
        "Insights personalizados",
        "Automações avançadas",
        "Métricas comparativas"
      ],
      automations: "5.000 automações/mês",
      reports: "Relatórios premium + API de dados + Insights personalizados",
      popular: false,
      isCurrent: currentPlan === "Trimestral"
    },
    {
      name: "Anual" as const,
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
        "Consultoria estratégica",
        "Dashboard personalizado",
        "Integração customizada"
      ],
      automations: "Automações ilimitadas",
      reports: "Relatórios executivos + Consultoria estratégica + Dashboard personalizado",
      popular: false,
      isCurrent: currentPlan === "Anual"
    }
  ];

  const handleChoosePlan = (planName: string) => {
    console.log('Escolher plano:', planName);
    alert(`Redirecionando para checkout do plano ${planName}`);
  };

  const handleUpgrade = (planName: string) => {
    console.log('Upgrade para plano:', planName);
    alert(`Redirecionando para upgrade para o plano ${planName}`);
  };

  return (
    <section id="planos" className="py-20 px-4 bg-background">
      <div className="container mx-auto">
        <PricingHeader currentPlan={currentPlan} isLoggedIn={!!user} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <PlanCard
              key={index}
              plan={plan}
              onChoosePlan={handleChoosePlan}
              onUpgrade={handleUpgrade}
              isLoggedIn={!!user}
            />
          ))}
        </div>

        <PricingFooter />
      </div>
    </section>
  );
};

export default PricingSection;
