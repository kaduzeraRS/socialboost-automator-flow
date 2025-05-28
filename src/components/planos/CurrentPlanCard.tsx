
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Star, CreditCard, Calendar, Users, MessageSquare, Bot, BarChart3, Shield, Zap } from 'lucide-react';
import { UserSubscription } from '@/hooks/useUserSubscription';

interface CurrentPlanCardProps {
  userSubscription: UserSubscription;
  daysRemaining: number;
  renewalDate: string;
  onManagePayment: () => void;
  onCancelSubscription: () => void;
}

const CurrentPlanCard = ({ 
  userSubscription, 
  daysRemaining, 
  renewalDate, 
  onManagePayment, 
  onCancelSubscription 
}: CurrentPlanCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'trialing': return 'bg-blue-500';
      case 'past_due': return 'bg-yellow-500';
      case 'canceled': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Ativo';
      case 'trialing': return 'Período de Teste';
      case 'past_due': return 'Vencido';
      case 'canceled': return 'Cancelado';
      case 'inactive': return 'Inativo';
      default: return status;
    }
  };

  const accountsUsagePercent = userSubscription.plan.max_accounts === 999999 
    ? 0 
    : (userSubscription.current_accounts_used / userSubscription.plan.max_accounts) * 100;

  const interactionsUsagePercent = (userSubscription.current_interactions_used / userSubscription.plan.max_interactions_per_period) * 100;

  const automationsUsagePercent = userSubscription.plan.automations_limit 
    ? (userSubscription.current_automations_used / userSubscription.plan.automations_limit) * 100 
    : 0;

  return (
    <Card className="border-green-500 dark:bg-card bg-white border-2 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Star className="w-6 h-6 text-green-500" />
            <div>
              <h3 className="text-xl font-bold text-foreground">{userSubscription.plan.name}</h3>
              <p className="text-sm text-muted-foreground">Seu plano atual</p>
            </div>
          </div>
          <Badge className={`${getStatusColor(userSubscription.status)} text-white`}>
            {getStatusText(userSubscription.status)}
          </Badge>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Plan Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              R$ {userSubscription.plan.price.toFixed(2).replace('.', ',')}
            </div>
            <p className="text-sm text-muted-foreground">/{userSubscription.plan.billing_period}</p>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{daysRemaining}</div>
            <p className="text-sm text-muted-foreground">dias restantes</p>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg">
            <div className="text-lg font-bold text-purple-600 dark:text-purple-400">{renewalDate}</div>
            <p className="text-sm text-muted-foreground">próxima renovação</p>
          </div>
        </div>

        {/* Usage Statistics */}
        <div className="space-y-4">
          <h4 className="font-semibold text-foreground flex items-center">
            <BarChart3 className="w-4 h-4 mr-2" />
            Uso de Recursos
          </h4>
          
          {/* Accounts Usage */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium">Contas Conectadas</span>
              </div>
              <span className="text-sm text-muted-foreground">
                {userSubscription.current_accounts_used}/{userSubscription.plan.max_accounts === 999999 ? '∞' : userSubscription.plan.max_accounts}
              </span>
            </div>
            {userSubscription.plan.max_accounts !== 999999 && (
              <Progress value={accountsUsagePercent} className="h-2" />
            )}
          </div>

          {/* Interactions Usage */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <MessageSquare className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium">Interações</span>
              </div>
              <span className="text-sm text-muted-foreground">
                {userSubscription.current_interactions_used.toLocaleString()}/{userSubscription.plan.max_interactions_per_period.toLocaleString()}
              </span>
            </div>
            <Progress value={interactionsUsagePercent} className="h-2" />
          </div>

          {/* Posts Usage */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium">Posts Agendados</span>
              </div>
              <span className="text-sm text-muted-foreground">
                {userSubscription.current_posts_used}/{userSubscription.plan.max_posts_per_month === 999999 ? '∞' : userSubscription.plan.max_posts_per_month}
              </span>
            </div>
          </div>

          {/* Automations Usage */}
          {userSubscription.plan.automations_limit && (
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <Bot className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Automações</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {userSubscription.current_automations_used}/{userSubscription.plan.automations_limit}
                </span>
              </div>
              <Progress value={automationsUsagePercent} className="h-2" />
            </div>
          )}
        </div>

        {/* Plan Features */}
        <div className="space-y-4">
          <h4 className="font-semibold text-foreground flex items-center">
            <Shield className="w-4 h-4 mr-2" />
            Recursos do Plano
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {userSubscription.plan.basic_support && (
              <div className="flex items-center space-x-2 text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Suporte básico</span>
              </div>
            )}
            {userSubscription.plan.priority_support && (
              <div className="flex items-center space-x-2 text-sm">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Suporte prioritário</span>
              </div>
            )}
            {userSubscription.plan.vip_support && (
              <div className="flex items-center space-x-2 text-sm">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span>Suporte VIP</span>
              </div>
            )}
            {userSubscription.plan.basic_analytics && (
              <div className="flex items-center space-x-2 text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Analytics básicos</span>
              </div>
            )}
            {userSubscription.plan.advanced_analytics && (
              <div className="flex items-center space-x-2 text-sm">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Analytics avançados</span>
              </div>
            )}
            {userSubscription.plan.api_access && (
              <div className="flex items-center space-x-2 text-sm">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span>Acesso à API</span>
              </div>
            )}
            {userSubscription.plan.white_label && (
              <div className="flex items-center space-x-2 text-sm">
                <div className="w-2 h-2 bg-gold-500 rounded-full"></div>
                <span>White label</span>
              </div>
            )}
            {userSubscription.plan.dedicated_manager && (
              <div className="flex items-center space-x-2 text-sm">
                <div className="w-2 h-2 bg-gold-500 rounded-full"></div>
                <span>Gerente dedicado</span>
              </div>
            )}
            {userSubscription.plan.strategic_consulting && (
              <div className="flex items-center space-x-2 text-sm">
                <div className="w-2 h-2 bg-gold-500 rounded-full"></div>
                <span>Consultoria estratégica</span>
              </div>
            )}
            {userSubscription.plan.custom_dashboard && (
              <div className="flex items-center space-x-2 text-sm">
                <div className="w-2 h-2 bg-gold-500 rounded-full"></div>
                <span>Dashboard personalizado</span>
              </div>
            )}
          </div>
        </div>

        {/* Trial Information */}
        {userSubscription.status === 'trialing' && userSubscription.trial_end && (
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <div className="flex items-center space-x-2 mb-2">
              <Zap className="w-4 h-4 text-blue-600" />
              <span className="font-medium text-blue-600 dark:text-blue-400">Período de Teste</span>
            </div>
            <p className="text-sm text-blue-700 dark:text-blue-300">
              Seu período de teste termina em {new Date(userSubscription.trial_end).toLocaleDateString('pt-BR')}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t">
          <Button 
            className="bg-purple-primary hover:bg-purple-hover text-white flex-1" 
            onClick={onManagePayment}
          >
            <CreditCard className="w-4 h-4 mr-2" />
            Gerenciar Pagamento
          </Button>
          <Button 
            variant="outline" 
            className="text-red-600 border-red-300 hover:bg-red-50 dark:text-red-400 dark:border-red-600 dark:hover:bg-red-900/20" 
            onClick={onCancelSubscription}
          >
            Cancelar Assinatura
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CurrentPlanCard;
