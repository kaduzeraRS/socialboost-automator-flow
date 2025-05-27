
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Check, Star, Zap, Calendar, CreditCard, HelpCircle, Plus } from 'lucide-react';
import { useState } from 'react';

const Planos = () => {
  const [currentPlan] = useState('Profissional'); // Simulate current plan
  const [daysRemaining] = useState(23);
  const [renewalDate] = useState('2024-02-15');

  const plans = [
    {
      name: 'Básico',
      price: 'R$ 29,90',
      period: '/mês',
      description: 'Ideal para começar',
      features: [
        '1 conta conectada',
        'Até 30 posts por mês',
        'Agendamento básico',
        'Relatórios básicos',
        'Suporte por email'
      ],
      icon: Check,
      color: 'from-gray-500 to-gray-600',
      popular: false
    },
    {
      name: 'Profissional',
      price: 'R$ 59,90',
      period: '/mês',
      description: 'Para criadores de conteúdo',
      features: [
        '3 contas conectadas',
        'Posts ilimitados',
        'Agendamento avançado',
        'Analytics detalhados',
        'Aquecimento de conta',
        'Suporte prioritário'
      ],
      icon: Star,
      color: 'from-purple-500 to-pink-500',
      popular: true
    },
    {
      name: 'Empresarial',
      price: 'R$ 149,90',
      period: '/mês',
      description: 'Para equipes e agências',
      features: [
        '10 contas conectadas',
        'Posts ilimitados',
        'Todos os recursos premium',
        'API personalizada',
        'Gerenciamento de equipe',
        'Suporte 24/7',
        'White label'
      ],
      icon: Zap,
      color: 'from-yellow-500 to-orange-500',
      popular: false
    }
  ];

  const interactionPackages = [
    { amount: 100, price: 'R$ 9,90' },
    { amount: 200, price: 'R$ 17,90' },
    { amount: 500, price: 'R$ 39,90' },
    { amount: 1000, price: 'R$ 69,90' }
  ];

  const faqs = [
    {
      question: 'Posso cancelar a qualquer momento?',
      answer: 'Sim, você pode cancelar sua assinatura a qualquer momento sem taxas de cancelamento.'
    },
    {
      question: 'Como funciona o período de teste?',
      answer: 'Oferecemos 3 dias gratuitos para você testar todos os recursos do plano escolhido após o cadastro do e-mail.'
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
    // Handle subscription cancellation
    console.log('Cancelar assinatura');
  };

  const handleUpgradePlan = (planName: string) => {
    // Handle plan upgrade
    console.log('Upgrade para:', planName);
  };

  const handlePurchaseInteractions = (amount: number, price: string) => {
    // Handle interaction package purchase
    console.log('Comprar', amount, 'interações por', price);
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Planos e Assinatura</h1>
          <p className="text-muted-foreground mt-2">Gerencie sua assinatura e faça upgrades</p>
        </div>

        {/* Current Subscription Status */}
        <Card className="border-purple-primary">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Star className="w-6 h-6 text-purple-primary" />
              <span>Sua Assinatura Atual</span>
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
              <div className="flex justify-between text-sm">
                <span>Período de assinatura</span>
                <span>{Math.round((daysRemaining / 30) * 100)}% restante</span>
              </div>
              <Progress value={(daysRemaining / 30) * 100} className="h-2" />
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                className="bg-purple-primary hover:bg-purple-hover text-white"
                onClick={() => console.log('Gerenciar assinatura')}
              >
                <CreditCard className="w-4 h-4 mr-2" />
                Gerenciar Pagamento
              </Button>
              <Button 
                variant="outline" 
                className="text-red-600 hover:text-red-700 border-red-200 hover:border-red-300"
                onClick={handleCancelSubscription}
              >
                <Calendar className="w-4 h-4 mr-2" />
                Cancelar Assinatura
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Upgrade Plans */}
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-6">Fazer Upgrade</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan) => {
              const Icon = plan.icon;
              const isCurrentPlan = plan.name === currentPlan;
              
              return (
                <Card key={plan.name} className={`relative ${plan.popular ? 'ring-2 ring-purple-primary' : ''} ${isCurrentPlan ? 'border-purple-primary bg-purple-50 dark:bg-purple-900/20' : ''}`}>
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-purple-primary text-white px-4 py-1">
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
                    <div className={`w-16 h-16 bg-gradient-to-br ${plan.color} rounded-lg flex items-center justify-center mx-auto mb-4`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <p className="text-muted-foreground">{plan.description}</p>
                    <div className="flex items-baseline justify-center mt-4">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      <span className="text-muted-foreground ml-1">{plan.period}</span>
                    </div>
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
                            ? 'bg-purple-primary hover:bg-purple-hover text-white' 
                            : 'bg-muted hover:bg-muted/80 text-foreground hover:text-foreground'
                      }`}
                      disabled={isCurrentPlan}
                      onClick={() => !isCurrentPlan && handleUpgradePlan(plan.name)}
                    >
                      {isCurrentPlan ? 'Plano Atual' : 'Escolher Plano'}
                    </Button>
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
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Plus className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold">+{pkg.amount}</h3>
                  <p className="text-sm text-muted-foreground mb-4">Interações</p>
                  <div className="text-lg font-bold text-purple-primary mb-4">{pkg.price}</div>
                  <Button 
                    className="w-full bg-purple-primary hover:bg-purple-hover text-white"
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
                <h4 className="font-medium text-foreground mb-2">{faq.question}</h4>
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
