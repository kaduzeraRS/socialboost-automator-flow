
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Check, Star, Zap, Calendar, CreditCard, HelpCircle, Plus } from 'lucide-react';
import { useState } from 'react';

const Planos = () => {
  const [currentPlan] = useState('Mensal'); // Simulate current plan
  const [daysRemaining] = useState(23);
  const [renewalDate] = useState('2024-02-15');

  const plans = [
    {
      name: 'Quinzenal',
      price: 'R$ 29',
      period: '/15 dias',
      description: 'Ideal para começar',
      features: [
        '2 contas Instagram/TikTok',
        '100 posts agendados',
        '500 interações/dia',
        'Suporte básico'
      ],
      popular: false
    },
    {
      name: 'Mensal',
      price: 'R$ 49',
      period: '/mês',
      description: 'Para criadores de conteúdo',
      features: [
        '5 contas Instagram/TikTok',
        '500 posts agendados',
        '2.000 interações/dia',
        'Analytics avançados',
        'Suporte prioritário'
      ],
      popular: true
    },
    {
      name: 'Trimestral',
      price: 'R$ 39',
      period: '/mês',
      originalPrice: 'R$ 49',
      description: 'Para crescimento sustentável',
      features: [
        '10 contas Instagram/TikTok',
        '1.500 posts agendados',
        '5.000 interações/dia',
        'Analytics avançados',
        'Suporte VIP',
        'API access'
      ],
      popular: false
    },
    {
      name: 'Anual',
      price: 'R$ 29',
      period: '/mês',
      originalPrice: 'R$ 49',
      description: 'Máximo valor para empresas',
      features: [
        'Contas ilimitadas',
        'Posts ilimitados',
        '10.000 interações/dia',
        'Tudo do plano anterior',
        'Gerente dedicado',
        'White label'
      ],
      popular: false
    }
  ];

  const interactionPackages = [
    { amount: 100, price: 'R$ 2,90' },
    { amount: 200, price: 'R$ 4,90' },
    { amount: 500, price: 'R$ 9,90' },
    { amount: 1000, price: 'R$ 17,90' }
  ];

  const faqs = [
    {
      question: 'Posso cancelar a qualquer momento?',
      answer: 'Sim, você pode cancelar sua assinatura a qualquer momento sem taxas de cancelamento.'
    },
    {
      question: 'Como funciona o período de teste?',
      answer: 'Oferecemos 3 dias gratuitos para você testar todos os recursos do plano escolhido após o cadastro do e-mail. Nosso sistema detecta contas duplicadas para evitar múltiplos períodos de teste gratuito.'
    },
    {
      question: 'Posso alterar meu plano depois?',
      answer: 'Sim, você pode fazer upgrade ou downgrade do seu plano a qualquer momento.'
    },
    {
      question: 'O que acontece se eu usar a mesma conta em emails diferentes?',
      answer: 'Nosso sistema detecta contas duplicadas para evitar múltiplos períodos de teste gratuito.'
    },
    {
      question: 'Como funcionam as interações extras?',
      answer: 'Você pode comprar pacotes de interações adicionais que são válidos por 30 dias após a compra.'
    }
  ];

  const handleCancelSubscription = () => {
    console.log('Cancelar assinatura');
  };

  const handleUpgradePlan = (planName: string) => {
    console.log('Upgrade para:', planName);
  };

  const handlePurchaseInteractions = (amount: number, price: string) => {
    console.log('Comprar', amount, 'interações por', price);
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Planos e Assinatura</h1>
          <p className="text-muted-foreground mt-2">Gerencie sua assinatura e faça upgrades</p>
        </div>

        {/* Current Subscription Status */}
        <Card className="border-purple-500">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Star className="w-6 h-6 text-purple-600" />
              <span>Sua Assinatura Atual</span>
              <Badge className="bg-purple-600 text-white">Ativo</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{currentPlan}</div>
                <p className="text-sm text-muted-foreground">Plano Atual</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{daysRemaining} dias</div>
                <p className="text-sm text-muted-foreground">Restantes</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{renewalDate}</div>
                <p className="text-sm text-muted-foreground">Próxima Renovação</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Período de assinatura</span>
                <span className="text-muted-foreground">{Math.round((daysRemaining / 30) * 100)}% restante</span>
              </div>
              <Progress value={(daysRemaining / 30) * 100} className="h-2" />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-between items-start">
              <Button 
                className="bg-purple-600 hover:bg-purple-700 text-white"
                onClick={() => console.log('Gerenciar assinatura')}
              >
                <CreditCard className="w-4 h-4 mr-2" />
                Gerenciar Pagamento
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 text-xs px-2 py-1 h-7"
                onClick={handleCancelSubscription}
              >
                Cancelar Assinatura
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Upgrade Plans */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Fazer Upgrade</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {plans.map((plan) => {
              const isCurrentPlan = plan.name === currentPlan;
              
              return (
                <Card key={plan.name} className={`relative ${plan.popular ? 'ring-2 ring-purple-500' : ''} ${isCurrentPlan ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20' : ''}`}>
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-purple-600 text-white px-4 py-1">
                        Mais Popular
                      </Badge>
                    </div>
                  )}
                  {isCurrentPlan && (
                    <div className="absolute -top-4 right-4">
                      <Badge className="bg-green-500 text-white px-3 py-1">
                        Seu Plano
                      </Badge>
                    </div>
                  )}
                  
                  <CardHeader className="text-center pb-4">
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <p className="text-muted-foreground">{plan.description}</p>
                    <div className="flex items-baseline justify-center mt-4">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      <span className="text-muted-foreground ml-1">{plan.period}</span>
                    </div>
                    {plan.originalPrice && (
                      <div className="text-sm text-muted-foreground line-through">
                        {plan.originalPrice}/{plan.period}
                      </div>
                    )}
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <ul className="space-y-3">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center space-x-3">
                          <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Button 
                      className={`w-full mt-6 ${
                        isCurrentPlan 
                          ? 'bg-gray-400 text-white cursor-not-allowed' 
                          : plan.popular 
                            ? 'bg-purple-600 hover:bg-purple-700 text-white' 
                            : 'bg-gray-800 hover:bg-gray-900 text-white dark:bg-gray-700 dark:hover:bg-gray-600'
                      }`}
                      disabled={isCurrentPlan}
                      onClick={() => !isCurrentPlan && handleUpgradePlan(plan.name)}
                    >
                      {isCurrentPlan ? 'Plano Atual' : plan.popular ? 'Começar Agora' : 'Escolher Plano'}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Interaction Packages */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Pacotes de Interações</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {interactionPackages.map((pkg, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Plus className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold">+{pkg.amount}</h3>
                  <p className="text-sm text-muted-foreground mb-4">Interações</p>
                  <div className="text-lg font-bold text-purple-600 mb-4">{pkg.price}</div>
                  <Button 
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                    onClick={() => handlePurchaseInteractions(pkg.amount, pkg.price)}
                  >
                    Comprar
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <HelpCircle className="w-6 h-6" />
              <span>Perguntas Frequentes</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index}>
                <h4 className="font-medium mb-2">{faq.question}</h4>
                <p className="text-sm text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Planos;
