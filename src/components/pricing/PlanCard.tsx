
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface PlanCardProps {
  plan: {
    name: string;
    price: string;
    period: string;
    originalPrice?: string;
    features: string[];
    automations: string;
    reports: string;
    popular: boolean;
    isCurrent: boolean;
  };
  onChoosePlan: (planName: string) => void;
  onUpgrade: (planName: string) => void;
  isLoggedIn: boolean;
}

const PlanCard = ({ plan, onChoosePlan, onUpgrade, isLoggedIn }: PlanCardProps) => {
  return (
    <Card 
      className={`relative transition-all duration-300 hover:shadow-lg dark:bg-card bg-white ${
        plan.isCurrent ? 'border-2 border-green-500 scale-105 shadow-lg' : 'border-border'
      }`}
    >
      {plan.isCurrent && (
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
              plan.name === 'Trimestral' ? 'text-lg' : plan.name === 'Anual' ? 'text-xl' : 'text-2xl'
            }`}>
              {plan.price}
            </span>
            <span className="text-muted-foreground ml-1 text-sm">/{plan.period}</span>
          </div>
          {plan.originalPrice && (
            <div className="text-sm text-muted-foreground mt-1">
              {plan.originalPrice}
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
              {plan.automations}
            </div>
          </div>
          
          <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <div className="text-xs font-medium text-purple-800 dark:text-purple-200 mb-1">
              Relatórios
            </div>
            <div className="text-sm text-purple-600 dark:text-purple-300">
              {plan.reports}
            </div>
          </div>
        </div>

        <ul className="space-y-3 mb-6">
          {plan.features.map((feature, featureIndex) => (
            <li key={featureIndex} className="flex items-center text-sm">
              <svg className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-foreground">{feature}</span>
            </li>
          ))}
        </ul>

        {plan.isCurrent ? (
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
            {isLoggedIn && (
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
