
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Instagram, 
  Play, 
  Users, 
  Heart, 
  MessageCircle, 
  Eye, 
  TrendingUp, 
  Calendar,
  Settings,
  Plus,
  Link2
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import ConnectAccountDialog from '@/components/ConnectAccountDialog';
import AccountConfigDialog from '@/components/AccountConfigDialog';
import PostAnalyticsDialog from '@/components/PostAnalyticsDialog';
import EditPostDialog from '@/components/EditPostDialog';

const Accounts = () => {
  const { toast } = useToast();
  const [performancePeriod, setPerformancePeriod] = useState('30');

  // Simulate account status checking
  const checkAccountStatus = (accountId: number) => {
    // In a real app, this would check the actual connection status
    const random = Math.random();
    if (random > 0.8) {
      return { status: 'Reconectar', color: 'bg-orange-500 hover:bg-orange-600', needsReconnect: true };
    }
    return { status: 'Conectado', color: 'bg-green-500 hover:bg-green-600', needsReconnect: false };
  };

  const accounts = [
    {
      id: 1,
      platform: 'Instagram',
      username: '@minha_conta',
      followers: '12.5K',
      icon: Instagram,
      color: 'from-purple-500 to-pink-500',
      ...checkAccountStatus(1)
    },
    {
      id: 2,
      platform: 'TikTok',
      username: '@minha_conta_tt',
      followers: '8.2K',
      icon: Play,
      color: 'from-black to-gray-800',
      ...checkAccountStatus(2)
    }
  ];

  const postsData = [
    {
      id: 1,
      date: '2024-02-20',
      time: '18:00',
      platform: 'Instagram',
      caption: 'Post promocional - Black Friday 🔥',
      status: 'Agendado',
      isScheduled: true
    },
    {
      id: 2,
      date: '2024-02-19',
      time: '14:30',
      platform: 'TikTok',
      caption: 'Vídeo tutorial - Como usar ✨',
      status: 'Agendado',
      isScheduled: true
    },
    {
      id: 3,
      date: '2024-02-14',
      time: '20:00',
      platform: 'Instagram',
      caption: 'Stories - Bastidores 🎬',
      status: 'Publicado',
      engagement: '5.1%',
      isScheduled: false
    },
    {
      id: 4,
      date: '2024-02-14',
      time: '16:45',
      platform: 'TikTok',
      caption: 'Trend dance challenge 💃',
      status: 'Publicado',
      engagement: '8.3%',
      isScheduled: false
    }
  ];

  const handleConnectAccount = () => {
    // Simulate opening browser for login
    toast({
      title: "Abrindo navegador",
      description: "Redirecionando para autenticação...",
    });
    
    // Simulate login process
    setTimeout(() => {
      // Save to cookies simulation
      document.cookie = `connected_accounts=${JSON.stringify(accounts)}; path=/`;
      toast({
        title: "Conta conectada",
        description: "Nova conta foi conectada com sucesso!",
      });
    }, 2000);
  };

  const handleAccountAction = (account: any, action: string) => {
    if (account.needsReconnect && action !== 'reconnect') {
      toast({
        title: "Reconexão necessária",
        description: `A conta ${account.username} precisa ser reconectada antes de ${action}.`,
        variant: "destructive"
      });
      return;
    }

    switch (action) {
      case 'reconnect':
        toast({
          title: "Reconectando conta",
          description: `Reconectando ${account.username}...`,
        });
        // Simulate reconnection
        setTimeout(() => {
          toast({
            title: "Conta reconectada",
            description: `${account.username} foi reconectada com sucesso!`,
          });
          // Update account status
          account.status = 'Conectado';
          account.color = 'bg-green-500 hover:bg-green-600';
          account.needsReconnect = false;
        }, 1500);
        break;
      case 'configure':
        console.log('Configuring account:', account.id);
        break;
    }
  };

  const getPerformanceData = (period: string) => {
    const data = {
      '7': { views: '45.2K', likes: '3.1K', comments: '428', followers: '+156' },
      '15': { views: '89.7K', likes: '5.8K', comments: '742', followers: '+298' },
      '30': { views: '127.5K', likes: '8.2K', comments: '1.1K', followers: '+524' }
    };
    return data[period as keyof typeof data] || data['30'];
  };

  const performanceData = getPerformanceData(performancePeriod);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Contas Conectadas</h1>
            <p className="text-muted-foreground">Gerencie todas as suas contas de redes sociais em um só lugar</p>
          </div>
          <ConnectAccountDialog>
            <Button 
              className="bg-purple-primary hover:bg-purple-hover"
              onClick={handleConnectAccount}
            >
              <Plus className="w-4 h-4 mr-2" />
              Conectar Nova Conta
            </Button>
          </ConnectAccountDialog>
        </div>

        {/* Contas Conectadas - Movido para o topo */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {accounts.map((account) => {
            const Icon = account.icon;
            return (
              <Card key={account.id}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-12 h-12 bg-gradient-to-br ${account.color} rounded-lg flex items-center justify-center`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{account.platform}</h3>
                        <p className="text-sm text-muted-foreground">{account.username}</p>
                      </div>
                    </div>
                    <Badge className={`${account.color} text-white`}>
                      {account.status}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Seguidores</span>
                    <span className="font-semibold">{account.followers}</span>
                  </div>
                  <div className="flex space-x-2">
                    <AccountConfigDialog account={account}>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1"
                        onClick={() => handleAccountAction(account, 'configure')}
                      >
                        <Settings className="w-4 h-4 mr-2" />
                        Configurar
                      </Button>
                    </AccountConfigDialog>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => handleAccountAction(account, 'reconnect')}
                    >
                      <Link2 className="w-4 h-4 mr-2" />
                      Reconectar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Performance Geral com seletor de período e filtros integrados */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Performance Geral</CardTitle>
              <div className="flex space-x-4">
                <Select defaultValue="all">
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filtrar por conta" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas as contas</SelectItem>
                    <SelectItem value="instagram">@minha_conta (Instagram)</SelectItem>
                    <SelectItem value="tiktok">@minha_conta_tt (TikTok)</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={performancePeriod} onValueChange={setPerformancePeriod}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7">7 dias</SelectItem>
                    <SelectItem value="15">15 dias</SelectItem>
                    <SelectItem value="30">30 dias</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Eye className="w-5 h-5 mr-1 text-blue-500" />
                  <span className="text-sm font-medium">Visualizações</span>
                </div>
                <p className="text-3xl font-bold">{performanceData.views}</p>
                <p className="text-sm text-green-600">+23.4%</p>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Heart className="w-5 h-5 mr-1 text-red-500" />
                  <span className="text-sm font-medium">Curtidas</span>
                </div>
                <p className="text-3xl font-bold">{performanceData.likes}</p>
                <p className="text-sm text-green-600">+18.7%</p>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <MessageCircle className="w-5 h-5 mr-1 text-green-500" />
                  <span className="text-sm font-medium">Comentários</span>
                </div>
                <p className="text-3xl font-bold">{performanceData.comments}</p>
                <p className="text-sm text-green-600">+31.2%</p>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Users className="w-5 h-5 mr-1 text-purple-500" />
                  <span className="text-sm font-medium">Novos Seguidores</span>
                </div>
                <p className="text-3xl font-bold">{performanceData.followers}</p>
                <p className="text-sm text-green-600">+12.8%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Posts Detalhados */}
        <Card>
          <CardHeader>
            <CardTitle>Todos os Posts</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="todos" className="space-y-4">
              <TabsList>
                <TabsTrigger value="todos">Todos</TabsTrigger>
                <TabsTrigger value="agendados">Agendados</TabsTrigger>
                <TabsTrigger value="publicados">Publicados</TabsTrigger>
                <TabsTrigger value="instagram">Instagram</TabsTrigger>
                <TabsTrigger value="tiktok">TikTok</TabsTrigger>
              </TabsList>
              
              <TabsContent value="todos" className="space-y-4">
                {postsData.map((post) => (
                  <div
                    key={post.id}
                    className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                        {post.platform === 'Instagram' ? (
                          <Instagram className="w-6 h-6 text-purple-500" />
                        ) : (
                          <Play className="w-6 h-6 text-black dark:text-white" />
                        )}
                      </div>
                      <div>
                        <h4 className="font-medium">{post.caption}</h4>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                          <span className="flex items-center space-x-1">
                            <Calendar className="w-3 h-3" />
                            <span>{post.date}</span>
                          </span>
                          <span>{post.time}</span>
                          <span>{post.platform}</span>
                          {post.isScheduled ? (
                            <span className="text-orange-600 font-medium">Aguardando Postagem</span>
                          ) : (
                            <span>Engajamento: {post.engagement}</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={post.status === 'Publicado' ? 'default' : 'outline'}>
                        {post.status}
                      </Badge>
                      {!post.isScheduled && post.engagement && (
                        <PostAnalyticsDialog post={{ id: post.id, caption: post.caption, platform: post.platform, engagement: post.engagement }}>
                          <Button variant="ghost" size="sm">
                            <TrendingUp className="w-4 h-4 mr-1" />
                            Analisar
                          </Button>
                        </PostAnalyticsDialog>
                      )}
                      <EditPostDialog post={post}>
                        <Button variant="ghost" size="sm">
                          Editar
                        </Button>
                      </EditPostDialog>
                    </div>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="agendados">
                <div className="space-y-4">
                  {postsData.filter(post => post.status === 'Agendado').map((post) => (
                    <div key={post.id} className="p-4 border rounded-lg">
                      <p>{post.caption} - {post.platform}</p>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="publicados">
                <div className="space-y-4">
                  {postsData.filter(post => post.status === 'Publicado').map((post) => (
                    <div key={post.id} className="p-4 border rounded-lg">
                      <p>{post.caption} - {post.platform}</p>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="instagram">
                <div className="space-y-4">
                  {postsData.filter(post => post.platform === 'Instagram').map((post) => (
                    <div key={post.id} className="p-4 border rounded-lg">
                      <p>{post.caption}</p>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="tiktok">
                <div className="space-y-4">
                  {postsData.filter(post => post.platform === 'TikTok').map((post) => (
                    <div key={post.id} className="p-4 border rounded-lg">
                      <p>{post.caption}</p>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Accounts;
