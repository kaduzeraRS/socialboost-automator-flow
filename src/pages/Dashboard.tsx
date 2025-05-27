
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, TrendingUp, Instagram, Play, Plus, Zap, Link2 } from 'lucide-react';

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Status da Assinatura */}
        <Card className="border-purple-primary/20 bg-gradient-to-r from-purple-primary/10 to-purple-hover/10">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Plano Mensal</span>
              <span className="text-sm font-normal text-muted-foreground">15 dias restantes</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div className="bg-purple-primary h-2 rounded-full" style={{ width: '60%' }}></div>
            </div>
            <p className="text-sm text-muted-foreground mt-2">Renovação em 15/02/2024</p>
          </CardContent>
        </Card>

        {/* Métricas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Posts Agendados</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">+2 desde ontem</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Posts Publicados</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">156</div>
              <p className="text-xs text-muted-foreground">+12% este mês</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Estatísticas IG</CardTitle>
              <Instagram className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2.3K</div>
              <p className="text-xs text-muted-foreground">seguidores ganhos</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Estatísticas TikTok</CardTitle>
              <Play className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1.8K</div>
              <p className="text-xs text-muted-foreground">visualizações</p>
            </CardContent>
          </Card>
        </div>

        {/* Ações Rápidas */}
        <Card>
          <CardHeader>
            <CardTitle>Ações Rápidas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <Button className="bg-purple-primary hover:bg-purple-hover">
                <Plus className="w-4 h-4 mr-2" />
                Novo Post
              </Button>
              <Button variant="outline">
                <Zap className="w-4 h-4 mr-2" />
                Iniciar Aquecimento
              </Button>
              <Button variant="secondary" className="bg-black text-white hover:bg-gray-800">
                <Link2 className="w-4 h-4 mr-2" />
                Conectar TikTok
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
