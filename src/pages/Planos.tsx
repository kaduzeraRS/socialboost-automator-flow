
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Check, Star, Zap, Calendar, CreditCard, HelpCircle, Plus, Clock } from 'lucide-react';
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
        '5.000 interações/15 dias',
        'Suporte básico'
      ],
      icon: Clock,
      color: 'from-gray-500 to-gray-600',
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
        '10.000 interações/mês',
        'Analytics avançados',
        'Suporte prioritário'
      ],
      icon: Star,
      color: 'from-purple-500 to-pink-500',
      popular: false
    },
    {
      name: 'Trimestral',
      price: 'R$ 147',
      period: '/mês',
      originalPrice: 'R$ 49',
      description: 'Para crescimento acelerado',
      features: [
        '10 contas Instagram/TikTok',
        '1.500 posts agendados',
        '15.000 interações/mês',
        'Analytics avançados',
        'Suporte VIP',
        'API access'
      ],
      icon: Zap,
      color: 'from-blue-500 to-cyan-500',
      popular: false
    },
    {
      name: 'Anual',
      price: 'R$ 549,90',
      period: '/ano',
      originalPrice: 'R$ 588',
      description: 'Para profissionais',
      features: [
        'Contas ilimitadas',
        'Posts ilimitados',
        '20.000 interações/mês',
        'Tudo do plano anterior',
        'Gerente dedicado',
        'White label'
      ],
      icon: Star,
      color: 'from-yellow-500 to-orange-500',
      popular: false
    }
  ];

  const interactionPackages = [
    { amount: 1000, price: 'R$ 5,90' },
    { amount: 2500, price: 'R$ 9,90' },
    { amount: 5000, price: 'R$ 14,90' },
    { amount: 10000, price: 'R$ 19,90' }
  ];

  return (
    <DashboardLayout>
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
                size="sm"
                className="text-red-600 border-red-300 hover:bg-red-50 dark:text-red-400 dark:border-red-600 dark:hover:bg-red-900/20 text-xs h-8 px-2"
                onClick={() => console.log('Cancelar assinatura')}
              >
                Cancelar
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Upgrade Plans */}
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-6">Fazer Upgrade</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {plans.map((plan) => {
              const Icon = plan.icon;
              const isCurrentPlan = plan.name === currentPlan;
              
              return (
                <Card 
                  key={plan.name} 
                  className={`relative transition-all hover:shadow-lg dark:bg-card bg-white border-2 ${
                    isCurrentPlan ? 'ring-2 ring-purple-primary shadow-lg border-purple-primary bg-purple-50 dark:bg-purple-900/20' : 'border-gray-200 dark:border-gray-700'
                  }`}
                >
                  {isCurrentPlan && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-purple-primary text-white px-4 py-1">
                        Seu Plano
                      </Badge>
                    </div>
                  )}
                  
                  <CardHeader className="text-center pb-4">
                    <div className={`w-16 h-16 bg-gradient-to-br ${plan.color} rounded-lg flex items-center justify-center mx-auto mb-4`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-2xl text-foreground">{plan.name}</CardTitle>
                    <p className="text-muted-foreground">{plan.description}</p>
                    <div className="flex items-baseline justify-center mt-4">
                      <span className="text-4xl font-bold text-foreground">{plan.price}</span>
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
                          <span className="text-sm text-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Button 
                      className={`w-full mt-6 ${
                        isCurrentPlan 
                          ? 'bg-gray-400 text-white cursor-not-allowed dark:bg-gray-600 border-2' 
                          : 'bg-purple-primary hover:bg-purple-hover text-white border-2 border-purple-primary'
                      }`}
                      disabled={isCurrentPlan}
                      onClick={() => !isCurrentPlan && console.log('Upgrade para:', plan.name)}
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
              <Card key={index} className="hover:shadow-lg transition-shadow dark:bg-card bg-white border-2 border-gray-200 dark:border-gray-700">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Plus className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">+{pkg.amount.toLocaleString()}</h3>
                  <p className="text-sm text-muted-foreground mb-4">Interações</p>
                  <div className="text-lg font-bold text-purple-primary mb-4">{pkg.price}</div>
                  <Button 
                    className="w-full bg-purple-primary hover:bg-purple-hover text-white border-2 border-purple-primary"
                    onClick={() => console.log('Comprar', pkg.amount, 'interações por', pkg.price)}
                  >
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
      </div>
    </DashboardLayout>
  );
};

export default Planos;
