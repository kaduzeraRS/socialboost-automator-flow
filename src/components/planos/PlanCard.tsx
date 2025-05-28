
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SubscriptionPlan } from '@/hooks/useSubscriptionPlans';

interface PlanCardProps {
  plan: SubscriptionPlan;
  isCurrentPlan: boolean;
  hasSubscription: boolean;
  onChoosePlan: (planName: string) => void;
  onUpgrade: (planName: string) => void;
}

const PlanCard = ({ plan, isCurrentPlan, hasSubscription, onChoosePlan, onUpgrade }: PlanCardProps) => {
  return (
    <Card 
      className={`relative transition-all duration-300 hover:shadow-lg dark:bg-card bg-white ${
        isCurrentPlan ? 'border-2 border-green-500 scale-105 shadow-lg' : 'border-border'
      } ${plan.is_popular ? 'border-2 border-purple-primary' : ''}`}
    >
      {isCurrentPlan && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
            Seu Plano Atual
          </span>
        </div>
      )}

      {plan.is_popular && !isCurrentPlan && (
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
            <span className="text-2xl font-bold text-foreground">
              R$ {plan.price.toFixed(2).replace('.', ',')}
            </span>
            <span className="text-muted-foreground ml-1 text-sm">/{plan.billing_period}</span>
          </div>
          {plan.original_price && (
            <div className="text-sm text-muted-foreground mt-1 line-through">
              De R$ {plan.original_price.toFixed(2).replace('.', ',')}/mês
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
          {plan.automations_limit && (
            <li className="flex items-center text-sm">
              <svg className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-foreground">{plan.automations_limit} automações</span>
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
          {plan.api_access && (
            <li className="flex items-center text-sm">
              <svg className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-foreground">Acesso à API</span>
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
          {plan.strategic_consulting && (
            <li className="flex items-center text-sm">
              <svg className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-foreground">Consultoria estratégica</span>
            </li>
          )}
          {plan.custom_dashboard && (
            <li className="flex items-center text-sm">
              <svg className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-foreground">Dashboard personalizado</span>
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
              onClick={() => onChoosePlan(plan.name)}
            >
              Escolher Plano
            </Button>
            {hasSubscription && (
              <Button 
                variant="outline"
                className="w-full"
                onClick={() => onUpgrade(plan.name)}
              >
                Fazer Upgrade
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PlanCard;
