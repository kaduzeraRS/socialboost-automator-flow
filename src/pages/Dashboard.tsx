
import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Calendar, TrendingUp, Instagram, Play, Plus, Zap, Link2, Clock, BarChart3, Eye, Heart, MessageCircle, Users, Share2, UserPlus, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
import AccountSelector from '@/components/AccountSelector';

const Dashboard = () => {
  const [selectedInstagramAccount, setSelectedInstagramAccount] = useState<string>('');
  const [selectedTikTokAccount, setSelectedTikTokAccount] = useState<string>('');

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-in fade-in-0 duration-500">
        {/* Status da Assinatura */}
        <Card className="bg-gradient-to-r from-slate-900 to-slate-800 border-slate-700 text-white transition-all duration-300 hover:shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="text-xl">Plano Profissional</span>
              <Badge className="bg-green-500 hover:bg-green-600 text-white transition-colors duration-200">Ativo</Badge>
            </CardTitle>
            <p className="text-slate-300">Renovação em 23 dias</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-slate-300">Contas conectadas: 8/15</span>
                <span className="text-white font-semibold">53%</span>
              </div>
              <Progress value={53} className="h-2 bg-slate-700 transition-all duration-300" />
            </div>
          </CardContent>
        </Card>

        {/* Ações Rápidas */}
        <Card className="transition-all duration-300 hover:shadow-md">
          <CardHeader>
            <CardTitle>Ações Rápidas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <Button asChild className="bg-purple-primary hover:bg-purple-hover transition-all duration-200 hover:scale-105">
                <Link to="/agendamento">
                  <Plus className="w-4 h-4 mr-2" />
                  Novo Post
                </Link>
              </Button>
              <Button asChild variant="outline" className="transition-all duration-200 hover:scale-105">
                <Link to="/aquecimento">
                  <Zap className="w-4 h-4 mr-2" />
                  Iniciar Aquecimento
                </Link>
              </Button>
              <Button asChild variant="secondary" className="bg-gradient-to-br from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 transition-all duration-200 hover:scale-105">
                <Link to="/contas">
                  <Instagram className="w-4 h-4 mr-2" />
                  Conectar Instagram
                </Link>
              </Button>
              <Button asChild variant="secondary" className="bg-black text-white hover:bg-gray-800 transition-all duration-200 hover:scale-105">
                <Link to="/contas">
                  <Link2 className="w-4 h-4 mr-2" />
                  Conectar TikTok
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Instagram e TikTok lado a lado */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Card de Estatísticas do Instagram */}
          <Card className="transition-all duration-300 hover:shadow-md">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center">
                  <Instagram className="w-5 h-5 mr-2 text-purple-500" />
                  Instagram - Últimos 7 dias
                </CardTitle>
                <AccountSelector 
                  platform="instagram"
                  selectedAccountId={selectedInstagramAccount}
                  onAccountChange={setSelectedInstagramAccount}
                />
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 transition-all duration-200 hover:scale-105">
                  <div className="flex items-center justify-center mb-2">
                    <Eye className="w-4 h-4 mr-1 text-blue-600" />
                    <span className="text-sm font-medium text-blue-700 dark:text-blue-300">Visualizações</span>
                  </div>
                  <p className="text-2xl font-bold text-blue-800 dark:text-blue-200">24.8K</p>
                  <p className="text-xs text-green-600">+18.2%</p>
                </div>

                <div className="text-center p-3 rounded-lg bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 transition-all duration-200 hover:scale-105">
                  <div className="flex items-center justify-center mb-2">
                    <Heart className="w-4 h-4 mr-1 text-red-600" />
                    <span className="text-sm font-medium text-red-700 dark:text-red-300">Curtidas</span>
                  </div>
                  <p className="text-2xl font-bold text-red-800 dark:text-red-200">1.2K</p>
                  <p className="text-xs text-green-600">+24.1%</p>
                </div>

                <div className="text-center p-3 rounded-lg bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 transition-all duration-200 hover:scale-105">
                  <div className="flex items-center justify-center mb-2">
                    <MessageCircle className="w-4 h-4 mr-1 text-green-600" />
                    <span className="text-sm font-medium text-green-700 dark:text-green-300">Comentários</span>
                  </div>
                  <p className="text-2xl font-bold text-green-800 dark:text-green-200">186</p>
                  <p className="text-xs text-green-600">+31.5%</p>
                </div>

                <div className="text-center p-3 rounded-lg bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 transition-all duration-200 hover:scale-105">
                  <div className="flex items-center justify-center mb-2">
                    <Share2 className="w-4 h-4 mr-1 text-orange-600" />
                    <span className="text-sm font-medium text-orange-700 dark:text-orange-300">Shares</span>
                  </div>
                  <p className="text-2xl font-bold text-orange-800 dark:text-orange-200">89</p>
                  <p className="text-xs text-green-600">+12.3%</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 rounded-lg bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 transition-all duration-200 hover:scale-105">
                  <div className="flex items-center justify-center mb-2">
                    <Users className="w-4 h-4 mr-1 text-purple-600" />
                    <span className="text-sm font-medium text-purple-700 dark:text-purple-300">Seguidores</span>
                  </div>
                  <p className="text-2xl font-bold text-purple-800 dark:text-purple-200">+127</p>
                  <p className="text-xs text-green-600">+8.3%</p>
                </div>

                <div className="text-center p-3 rounded-lg bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/20 transition-all duration-200 hover:scale-105">
                  <div className="flex items-center justify-center mb-2">
                    <TrendingUp className="w-4 h-4 mr-1 text-indigo-600" />
                    <span className="text-sm font-medium text-indigo-700 dark:text-indigo-300">Alcance</span>
                  </div>
                  <p className="text-2xl font-bold text-indigo-800 dark:text-indigo-200">18.5K</p>
                  <p className="text-xs text-blue-600">+15.2%</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-center p-2 rounded-lg bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20">
                  <div className="flex items-center justify-center mb-1">
                    <Zap className="w-4 h-4 mr-1 text-yellow-600" />
                    <span className="text-sm font-medium text-yellow-700 dark:text-yellow-300">Automações Realizadas</span>
                  </div>
                  <p className="text-lg font-bold text-yellow-800 dark:text-yellow-200">1.247</p>
                  <p className="text-xs text-green-600">Este mês</p>
                </div>
              </div>

              <Button asChild variant="outline" className="w-full transition-all duration-200 hover:scale-105">
                <Link to="/contas">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Ver Relatório Completo
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Card de Estatísticas do TikTok */}
          <Card className="transition-all duration-300 hover:shadow-md">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center">
                  <Play className="w-5 h-5 mr-2" />
                  TikTok - Últimos 7 dias
                </CardTitle>
                <AccountSelector 
                  platform="tiktok"
                  selectedAccountId={selectedTikTokAccount}
                  onAccountChange={setSelectedTikTokAccount}
                />
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 transition-all duration-200 hover:scale-105">
                  <div className="flex items-center justify-center mb-2">
                    <Eye className="w-4 h-4 mr-1 text-blue-600" />
                    <span className="text-sm font-medium text-blue-700 dark:text-blue-300">Views</span>
                  </div>
                  <p className="text-2xl font-bold text-blue-800 dark:text-blue-200">89.3K</p>
                  <p className="text-xs text-green-600">+45.2%</p>
                </div>

                <div className="text-center p-3 rounded-lg bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 transition-all duration-200 hover:scale-105">
                  <div className="flex items-center justify-center mb-2">
                    <Heart className="w-4 h-4 mr-1 text-red-600" />
                    <span className="text-sm font-medium text-red-700 dark:text-red-300">Likes</span>
                  </div>
                  <p className="text-2xl font-bold text-red-800 dark:text-red-200">3.2K</p>
                  <p className="text-xs text-green-600">+28.7%</p>
                </div>

                <div className="text-center p-3 rounded-lg bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 transition-all duration-200 hover:scale-105">
                  <div className="flex items-center justify-center mb-2">
                    <MessageCircle className="w-4 h-4 mr-1 text-green-600" />
                    <span className="text-sm font-medium text-green-700 dark:text-green-300">Comentários</span>
                  </div>
                  <p className="text-2xl font-bold text-green-800 dark:text-green-200">412</p>
                  <p className="text-xs text-green-600">+52.1%</p>
                </div>

                <div className="text-center p-3 rounded-lg bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 transition-all duration-200 hover:scale-105">
                  <div className="flex items-center justify-center mb-2">
                    <Share2 className="w-4 h-4 mr-1 text-orange-600" />
                    <span className="text-sm font-medium text-orange-700 dark:text-orange-300">Shares</span>
                  </div>
                  <p className="text-2xl font-bold text-orange-800 dark:text-orange-200">234</p>
                  <p className="text-xs text-green-600">+67.3%</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 rounded-lg bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 transition-all duration-200 hover:scale-105">
                  <div className="flex items-center justify-center mb-2">
                    <Users className="w-4 h-4 mr-1 text-purple-600" />
                    <span className="text-sm font-medium text-purple-700 dark:text-purple-300">Seguidores</span>
                  </div>
                  <p className="text-2xl font-bold text-purple-800 dark:text-purple-200">+89</p>
                  <p className="text-xs text-green-600">+12.8%</p>
                </div>

                <div className="text-center p-3 rounded-lg bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/20 transition-all duration-200 hover:scale-105">
                  <div className="flex items-center justify-center mb-2">
                    <Activity className="w-4 h-4 mr-1 text-indigo-600" />
                    <span className="text-sm font-medium text-indigo-700 dark:text-indigo-300">Engajamento</span>
                  </div>
                  <p className="text-2xl font-bold text-indigo-800 dark:text-indigo-200">5.7%</p>
                  <p className="text-xs text-green-600">+1.2%</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-center p-2 rounded-lg bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20">
                  <div className="flex items-center justify-center mb-1">
                    <Zap className="w-4 h-4 mr-1 text-yellow-600" />
                    <span className="text-sm font-medium text-yellow-700 dark:text-yellow-300">Automações Realizadas</span>
                  </div>
                  <p className="text-lg font-bold text-yellow-800 dark:text-yellow-200">892</p>
                  <p className="text-xs text-green-600">Este mês</p>
                </div>
              </div>

              <Button asChild variant="outline" className="w-full transition-all duration-200 hover:scale-105">
                <Link to="/contas">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Ver Relatório Completo
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Próximos Posts */}
        <Card className="transition-all duration-300 hover:shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              Próximos Posts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-3 p-3 border rounded-lg transition-all duration-200 hover:bg-accent">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Instagram className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-medium">Post promocional - Black Friday</p>
                <p className="text-sm text-muted-foreground">Hoje às 18:00</p>
              </div>
              <Badge variant="outline">Agendado</Badge>
            </div>

            <div className="flex items-center space-x-3 p-3 border rounded-lg transition-all duration-200 hover:bg-accent">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-500 rounded-lg flex items-center justify-center">
                <Play className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-medium">Vídeo tutorial - Como usar</p>
                <p className="text-sm text-muted-foreground">Amanhã às 14:30</p>
              </div>
              <Badge variant="outline">Agendado</Badge>
            </div>

            <div className="flex items-center space-x-3 p-3 border rounded-lg transition-all duration-200 hover:bg-accent">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <Instagram className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-medium">Stories - Bastidores</p>
                <p className="text-sm text-muted-foreground">Amanhã às 20:00</p>
              </div>
              <Badge variant="outline">Agendado</Badge>
            </div>

            <Button asChild variant="outline" className="w-full transition-all duration-200 hover:scale-105">
              <Link to="/agendamento">
                Ver todos os posts
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
