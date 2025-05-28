
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Zap } from 'lucide-react';

interface AutomationData {
  current: number;
  limit: number;
  todayCount: number;
  monthlyCount: number;
}

interface SubscriptionCardProps {
  automationsData: AutomationData;
}

const SubscriptionCard = ({ automationsData }: SubscriptionCardProps) => {
  const progressPercentage = (automationsData.current / automationsData.limit) * 100;

  return (
    <Card className="bg-gradient-to-r from-slate-900 to-slate-800 border-slate-700 text-white transition-all duration-300 hover:shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl mb-1">Plano Profissional</CardTitle>
            <div className="flex items-center space-x-4">
              <Badge className="bg-green-500 hover:bg-green-600 text-white">Ativo</Badge>
              <span className="text-slate-300 text-sm">Renovação em 23 dias</span>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center space-x-2 mb-2">
              <Zap className="w-5 h-5 text-purple-400" />
              <span className="text-lg font-semibold">Automações Realizadas</span>
            </div>
            <div className="text-2xl font-bold">{automationsData.current}/{automationsData.limit}</div>
            <div className="text-sm text-slate-300">{Math.round(progressPercentage)}%</div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Progress value={progressPercentage} className="h-3 bg-slate-700" />
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-800/50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-purple-400">{automationsData.current}</div>
              <p className="text-sm text-slate-300">Este mês</p>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-green-400">+{automationsData.todayCount}</div>
              <p className="text-sm text-slate-300">Hoje</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SubscriptionCard;
