
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Calendar, TrendingUp, Instagram, Play, Plus, Zap, Link2, Clock, BarChart3, Eye, Heart, MessageCircle, Users, Share2, UserPlus, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Status da Assinatura */}
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

        {/* Métricas Unificadas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Posts Total</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">168</div>
              <p className="text-xs text-muted-foreground">12 agendados + 156 publicados</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Engajamento</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4.2%</div>
              <p className="text-xs text-muted-foreground">+0.5% este mês</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Alcance Total</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">43.2K</div>
              <p className="text-xs text-muted-foreground">+18% esta semana</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Novos Seguidores</CardTitle>
              <UserPlus className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+327</div>
              <p className="text-xs text-muted-foreground">esta semana</p>
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
              <Button asChild className="bg-purple-primary hover:bg-purple-hover">
                <Link to="/agendamento">
                  <Plus className="w-4 h-4 mr-2" />
                  Novo Post
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/aquecimento">
                  <Zap className="w-4 h-4 mr-2" />
                  Iniciar Aquecimento
                </Link>
              </Button>
              <Button asChild variant="secondary" className="bg-gradient-to-br from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600">
                <Link to="/contas">
                  <Instagram className="w-4 h-4 mr-2" />
                  Conectar Instagram
                </Link>
              </Button>
              <Button asChild variant="secondary" className="bg-black text-white hover:bg-gray-800">
                <Link to="/contas">
                  <Link2 className="w-4 h-4 mr-2" />
                  Conectar TikTok
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Próximos Posts e Estatísticas Detalhadas */}
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

              <Button asChild variant="outline" className="w-full">
                <Link to="/agendamento">
                  Ver todos os posts
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Card de Estatísticas Detalhadas do Instagram */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Instagram className="w-5 h-5 mr-2 text-purple-500" />
                Instagram - Últimos 7 dias
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
                    <Share2 className="w-4 h-4 mr-1 text-orange-500" />
                    <span className="text-sm font-medium">Shares</span>
                  </div>
                  <p className="text-2xl font-bold">89</p>
                  <p className="text-xs text-green-600">+12.3%</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Seguidores: +127</span>
                  <span className="font-medium text-green-600">+8.3%</span>
                </div>
                <Progress value={83} className="h-2" />
                
                <div className="flex justify-between text-sm">
                  <span>Alcance: 18.5K</span>
                  <span className="font-medium text-blue-600">+15.2%</span>
                </div>
                <Progress value={74} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Estatísticas do TikTok */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Play className="w-5 h-5 mr-2" />
              TikTok - Últimos 7 dias
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Eye className="w-4 h-4 mr-1 text-blue-500" />
                  <span className="text-sm font-medium">Views</span>
                </div>
                <p className="text-xl font-bold">89.3K</p>
                <p className="text-xs text-green-600">+45.2%</p>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Heart className="w-4 h-4 mr-1 text-red-500" />
                  <span className="text-sm font-medium">Likes</span>
                </div>
                <p className="text-xl font-bold">3.2K</p>
                <p className="text-xs text-green-600">+28.7%</p>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <MessageCircle className="w-4 h-4 mr-1 text-green-500" />
                  <span className="text-sm font-medium">Comentários</span>
                </div>
                <p className="text-xl font-bold">412</p>
                <p className="text-xs text-green-600">+52.1%</p>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Share2 className="w-4 h-4 mr-1 text-orange-500" />
                  <span className="text-sm font-medium">Shares</span>
                </div>
                <p className="text-xl font-bold">234</p>
                <p className="text-xs text-green-600">+67.3%</p>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Users className="w-4 h-4 mr-1 text-purple-500" />
                  <span className="text-sm font-medium">Seguidores</span>
                </div>
                <p className="text-xl font-bold">+89</p>
                <p className="text-xs text-green-600">+12.8%</p>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Activity className="w-4 h-4 mr-1 text-indigo-500" />
                  <span className="text-sm font-medium">Engajamento</span>
                </div>
                <p className="text-xl font-bold">5.7%</p>
                <p className="text-xs text-green-600">+1.2%</p>
              </div>
            </div>

            <div className="mt-6">
              <Button asChild variant="outline" className="w-full">
                <Link to="/contas">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Ver relatório completo
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
