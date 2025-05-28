
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Flame, Play, Pause, TrendingUp, Heart, Users, MessageCircle, Calendar, Settings } from 'lucide-react';
import TargetProfileManager from '@/components/TargetProfileManager';

const AccountWarming = () => {
  const campaigns = [
    {
      id: 1,
      name: 'Aquecimento Instagram Principal',
      status: 'Ativo',
      progress: 68,
      dailyActions: 45,
      maxDaily: 60,
      startDate: '2024-02-10',
      endDate: '2024-03-10'
    },
    {
      id: 2,
      name: 'Crescimento TikTok',
      status: 'Pausado',
      progress: 23,
      dailyActions: 0,
      maxDaily: 40,
      startDate: '2024-02-15',
      endDate: '2024-03-15'
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Aquecimento de Contas</h1>
            <p className="text-muted-foreground">Automatize interações para crescimento orgânico</p>
          </div>
          <Button className="bg-purple-primary hover:bg-purple-hover">
            <Flame className="w-4 h-4 mr-2" />
            Nova Campanha
          </Button>
        </div>

        {/* Campanhas Ativas */}
        <Card>
          <CardHeader>
            <CardTitle>Campanhas de Aquecimento</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {campaigns.map((campaign) => (
                <div key={campaign.id} className="p-4 border border-border rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-semibold">{campaign.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {campaign.startDate} - {campaign.endDate}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={campaign.status === 'Ativo' ? 'bg-green-500' : 'bg-yellow-500'}>
                        {campaign.status}
                      </Badge>
                      <Button variant="ghost" size="sm">
                        {campaign.status === 'Ativo' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Settings className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Progresso da campanha</span>
                      <span>{campaign.progress}%</span>
                    </div>
                    <Progress value={campaign.progress} className="h-2" />

                    <div className="flex justify-between text-sm">
                      <span>Ações hoje: {campaign.dailyActions}/{campaign.maxDaily}</span>
                      <span>{Math.round((campaign.dailyActions / campaign.maxDaily) * 100)}%</span>
                    </div>
                    <Progress value={(campaign.dailyActions / campaign.maxDaily) * 100} className="h-2" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Gerenciador de Perfis Alvo */}
        <TargetProfileManager />

        {/* Estatísticas de Desempenho */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Curtidas Automáticas</CardTitle>
              <Heart className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,248</div>
              <p className="text-xs text-muted-foreground">+180 esta semana</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Novos Seguidores</CardTitle>
              <Users className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+89</div>
              <p className="text-xs text-muted-foreground">+12 esta semana</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Taxa de Engajamento</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4.2%</div>
              <p className="text-xs text-muted-foreground">+0.8% esta semana</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AccountWarming;
