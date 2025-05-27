
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Star, Zap } from 'lucide-react';

const Planos = () => {
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

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground">Planos de Assinatura</h1>
          <p className="text-muted-foreground mt-2">Escolha o plano ideal para suas necessidades</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => {
            const Icon = plan.icon;
            return (
              <Card key={plan.name} className={`relative ${plan.popular ? 'ring-2 ring-purple-primary' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-purple-primary text-white px-4 py-1">
                      Mais Popular
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
                      plan.popular 
                        ? 'bg-purple-primary hover:bg-purple-hover' 
                        : 'bg-muted hover:bg-muted/80 text-foreground'
                    }`}
                  >
                    {plan.popular ? 'Começar Agora' : 'Escolher Plano'}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Perguntas Frequentes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium">Posso cancelar a qualquer momento?</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Sim, você pode cancelar sua assinatura a qualquer momento sem taxas de cancelamento.
              </p>
            </div>
            <div>
              <h4 className="font-medium">Como funciona o período de teste?</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Oferecemos 7 dias gratuitos para você testar todos os recursos do plano escolhido.
              </p>
            </div>
            <div>
              <h4 className="font-medium">Posso alterar meu plano depois?</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Sim, você pode fazer upgrade ou downgrade do seu plano a qualquer momento.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Planos;
