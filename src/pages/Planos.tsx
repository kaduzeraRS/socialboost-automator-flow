import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Check, Star, Zap, Calendar, CreditCard, HelpCircle, Plus, Clock } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
const Planos = () => {
  const {
    t
  } = useLanguage();
  const [currentPlan] = useState('Mensal');
  const [daysRemaining] = useState(23);
  const [renewalDate] = useState('2025-02-15');
  const plans = [{
    name: "Quinzenal",
    price: "R$ 29,90",
    period: "15 dias",
    features: ["2 contas Instagram/TikTok", "100 posts agendados", "5.000 interações/15 dias", "Suporte básico"],
    popular: false
  }, {
    name: "Mensal",
    price: "R$ 49,90",
    period: "mês",
    features: ["5 contas Instagram/TikTok", "1.000 posts agendados", "10.000 interações/mês", "Analytics avançados", "Suporte prioritário"],
    popular: true
  }, {
    name: "Trimestral",
    price: "R$ 149,90",
    period: "3 meses",
    originalPrice: "R$ 49,90/mês",
    features: ["10 contas Instagram/TikTok", "2.000 posts agendados", "15.000 interações/mês", "Analytics avançados", "Suporte VIP", "API access"],
    popular: false
  }, {
    name: "Anual",
    price: "R$ 549,90",
    period: "ano",
    originalPrice: "R$ 45,90/mês",
    features: ["Contas ilimitadas", "Posts ilimitados", "20.000 interações/mês", "Tudo do plano anterior", "Gerente dedicado", "White label"],
    popular: false
  }];
  const interactionPackages = [{
    amount: 1000,
    price: 'R$ 5,90'
  }, {
    amount: 2500,
    price: 'R$ 9,90'
  }, {
    amount: 5000,
    price: 'R$ 14,90'
  }, {
    amount: 10000,
    price: 'R$ 19,90'
  }];
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
  const handleBuyInteractions = (amount: number, price: string) => {
    console.log('Comprar', amount, 'interações por', price);
    alert(`Comprando ${amount.toLocaleString()} interações por ${price}...`);
  };
  return <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Planos e Assinatura</h1>
          <p className="text-muted-foreground mt-2">Gerencie sua assinatura e faça upgrades</p>
        </div>

        {/* Current Subscription Status */}
        <Card className="border-purple-primary dark:bg-card bg-white border-2">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Star className="w-6 h-6 text-purple-primary" />
              <span className="text-foreground">Sua Assinatura Atual</span>
              <Badge className="bg-purple-primary text-white">Ativo</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-primary">{currentPlan}</div>
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
                <span>{Math.round(daysRemaining / 30 * 100)}% restante</span>
              </div>
              <Progress value={daysRemaining / 30 * 100} className="h-2" />
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

        {/* Upgrade Plans */}
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-6">Planos Disponíveis</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {plans.map((plan, index) => <Card key={index} className={`relative transition-all duration-300 hover:shadow-lg dark:bg-card bg-white ${plan.popular ? 'border-2 border-purple-primary scale-105 shadow-lg' : 'border-border'}`}>
                {plan.popular && <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-purple-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                      Mais Popular
                    </span>
                  </div>}
                
                <CardHeader className="text-center">
                  <CardTitle className="text-lg font-semibold text-foreground">{plan.name}</CardTitle>
                  <div className="mt-4">
                    <div className="flex items-baseline justify-center">
                      <span className={`font-bold text-foreground ${plan.name === 'Anual' ? 'text-2xl' : 'text-3xl'}`}>
                        {plan.price}
                      </span>
                      <span className="text-muted-foreground ml-1 mx-0 text-xs">/{plan.period}</span>
                    </div>
                    {plan.originalPrice && <div className="text-sm text-muted-foreground mt-1">
                        {plan.originalPrice}
                      </div>}
                  </div>
                </CardHeader>

                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, featureIndex) => <li key={featureIndex} className="flex items-center text-sm">
                        <svg className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-foreground">{feature}</span>
                      </li>)}
                  </ul>

                  <Button className={`w-full ${plan.popular ? 'bg-purple-primary hover:bg-purple-hover text-white' : 'bg-foreground hover:bg-foreground/90 text-background'}`} onClick={() => handleChoosePlan(plan.name)}>
                    {plan.popular ? 'Começar Agora' : 'Escolher Plano'}
                  </Button>
                </CardContent>
              </Card>)}
          </div>
        </div>

        {/* Interaction Packages */}
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-6">Pacotes de Interações</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {interactionPackages.map((pkg, index) => <Card key={index} className="hover:shadow-lg transition-shadow dark:bg-card bg-white border-2 border-gray-200 dark:border-gray-700">
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
              </Card>)}
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
    </DashboardLayout>;
};
export default Planos;