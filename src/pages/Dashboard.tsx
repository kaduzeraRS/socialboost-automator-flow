
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Calendar, TrendingUp, Instagram, Play, Plus, Zap, Link2, Clock, BarChart3, Eye, Heart, MessageCircle, Users } from 'lucide-react';

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Status da Assinatura - Novo Design */}
        <Card className="bg-gradient-to-r from-slate-900 to-slate-800 border-slate-700 text-white">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="text-xl">Plano Profissional</span>
              <Badge className="bg-green-500 hover:bg-green-600 text-white">Ativo</Badge>
            </CardTitle>
            <p className="text-slate-300">Renovação em 23 dias</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-slate-300">Contas conectadas: 8/15</span>
                <span className="text-white font-semibold">53%</span>
              </div>
              <Progress value={53} className="h-2 bg-slate-700" />
            </div>
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
              <Button variant="secondary" className="bg-gradient-to-br from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600">
                <Instagram className="w-4 h-4 mr-2" />
                Conectar Instagram
              </Button>
              <Button variant="secondary" className="bg-black text-white hover:bg-gray-800">
                <Link2 className="w-4 h-4 mr-2" />
                Conectar TikTok
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Próximos Posts e Performance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Card de Próximos Posts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                Próximos Posts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3 p-3 border rounded-lg">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <Instagram className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Post promocional - Black Friday</p>
                  <p className="text-sm text-muted-foreground">Hoje às 18:00</p>
                </div>
                <Badge variant="outline">Agendado</Badge>
              </div>

              <div className="flex items-center space-x-3 p-3 border rounded-lg">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-500 rounded-lg flex items-center justify-center">
                  <Play className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Vídeo tutorial - Como usar</p>
                  <p className="text-sm text-muted-foreground">Amanhã às 14:30</p>
                </div>
                <Badge variant="outline">Agendado</Badge>
              </div>

              <div className="flex items-center space-x-3 p-3 border rounded-lg">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                  <Instagram className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Stories - Bastidores</p>
                  <p className="text-sm text-muted-foreground">Amanhã às 20:00</p>
                </div>
                <Badge variant="outline">Agendado</Badge>
              </div>

              <Button variant="outline" className="w-full">
                Ver todos os posts
              </Button>
            </CardContent>
          </Card>

          {/* Card de Performance */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="w-5 h-5 mr-2" />
                Performance (Últimos 7 dias)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Eye className="w-4 h-4 mr-1 text-blue-500" />
                    <span className="text-sm font-medium">Visualizações</span>
                  </div>
                  <p className="text-2xl font-bold">24.8K</p>
                  <p className="text-xs text-green-600">+18.2%</p>
                </div>

                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Heart className="w-4 h-4 mr-1 text-red-500" />
                    <span className="text-sm font-medium">Curtidas</span>
                  </div>
                  <p className="text-2xl font-bold">1.2K</p>
                  <p className="text-xs text-green-600">+24.1%</p>
                </div>

                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <MessageCircle className="w-4 h-4 mr-1 text-green-500" />
                    <span className="text-sm font-medium">Comentários</span>
                  </div>
                  <p className="text-2xl font-bold">186</p>
                  <p className="text-xs text-green-600">+31.5%</p>
                </div>

                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Users className="w-4 h-4 mr-1 text-purple-500" />
                    <span className="text-sm font-medium">Seguidores</span>
                  </div>
                  <p className="text-2xl font-bold">+127</p>
                  <p className="text-xs text-green-600">+8.3%</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Taxa de Engajamento</span>
                  <span className="font-medium">4.2%</span>
                </div>
                <Progress value={42} className="h-2" />
                
                <div className="flex justify-between text-sm">
                  <span>Alcance</span>
                  <span className="font-medium">18.5K</span>
                </div>
                <Progress value={74} className="h-2" />
              </div>

              <Button variant="outline" className="w-full">
                <TrendingUp className="w-4 h-4 mr-2" />
                Ver relatório completo
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
