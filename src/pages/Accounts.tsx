import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
import ConnectAccountDialog from '@/components/ConnectAccountDialog';
import AccountConfigDialog from '@/components/AccountConfigDialog';
import PostAnalyticsDialog from '@/components/PostAnalyticsDialog';
import EditPostDialog from '@/components/EditPostDialog';
import InsightsFilters from '@/components/InsightsFilters';

const Accounts = () => {
  const { toast } = useToast();

  const accounts = [
    {
      id: 1,
      platform: 'Instagram',
      username: '@minha_conta',
      followers: '12.5K',
      status: 'Conectado',
      icon: Instagram,
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 2,
      platform: 'TikTok',
      username: '@minha_conta_tt',
      followers: '8.2K',
      status: 'Conectado',
      icon: Play,
      color: 'from-black to-gray-800'
    }
  ];

  const postsData = [
    {
      id: 1,
      date: '2024-02-15',
      time: '18:00',
      platform: 'Instagram',
      caption: 'Post promocional - Black Friday 🔥',
      status: 'Agendado',
      engagement: '4.2%'
    },
    {
      id: 2,
      date: '2024-02-15',
      time: '14:30',
      platform: 'TikTok',
      caption: 'Vídeo tutorial - Como usar ✨',
      status: 'Agendado',
      engagement: '6.8%'
    },
    {
      id: 3,
      date: '2024-02-14',
      time: '20:00',
      platform: 'Instagram',
      caption: 'Stories - Bastidores 🎬',
      status: 'Publicado',
      engagement: '5.1%'
    },
    {
      id: 4,
      date: '2024-02-14',
      time: '16:45',
      platform: 'TikTok',
      caption: 'Trend dance challenge 💃',
      status: 'Publicado',
      engagement: '8.3%'
    }
  ];

  const handleReconnect = (account: any) => {
    toast({
      title: "Reconectando conta",
      description: `Reconectando ${account.username}...`,
    });
    console.log('Reconnecting account:', account.id);
  };

  const handleFiltersChange = (filters: any) => {
    console.log('Filters changed:', filters);
    toast({
      title: "Filtros aplicados",
      description: "Os insights foram atualizados com os novos filtros.",
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Contas Conectadas</h1>
            <p className="text-muted-foreground">Gerencie todas as suas contas de redes sociais em um só lugar</p>
          </div>
          <ConnectAccountDialog>
            <Button className="bg-purple-primary hover:bg-purple-hover">
              <Plus className="w-4 h-4 mr-2" />
              Conectar Nova Conta
            </Button>
          </ConnectAccountDialog>
        </div>

        {/* Filtros de Insights */}
        <InsightsFilters onFiltersChange={handleFiltersChange} />

        {/* Contas Conectadas */}
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
                    <Badge className="bg-green-500 hover:bg-green-600 text-white">
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
                      <Button variant="outline" size="sm" className="flex-1">
                        <Settings className="w-4 h-4 mr-2" />
                        Configurar
                      </Button>
                    </AccountConfigDialog>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => handleReconnect(account)}
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

        {/* Performance Geral */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Geral (Últimos 30 dias)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Eye className="w-5 h-5 mr-1 text-blue-500" />
                  <span className="text-sm font-medium">Visualizações</span>
                </div>
                <p className="text-3xl font-bold">127.5K</p>
                <p className="text-sm text-green-600">+23.4%</p>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Heart className="w-5 h-5 mr-1 text-red-500" />
                  <span className="text-sm font-medium">Curtidas</span>
                </div>
                <p className="text-3xl font-bold">8.2K</p>
                <p className="text-sm text-green-600">+18.7%</p>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <MessageCircle className="w-5 h-5 mr-1 text-green-500" />
                  <span className="text-sm font-medium">Comentários</span>
                </div>
                <p className="text-3xl font-bold">1.1K</p>
                <p className="text-sm text-green-600">+31.2%</p>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Users className="w-5 h-5 mr-1 text-purple-500" />
                  <span className="text-sm font-medium">Novos Seguidores</span>
                </div>
                <p className="text-3xl font-bold">+524</p>
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
                          <span>Engajamento: {post.engagement}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={post.status === 'Publicado' ? 'default' : 'outline'}>
                        {post.status}
                      </Badge>
                      <PostAnalyticsDialog post={post}>
                        <Button variant="ghost" size="sm">
                          <TrendingUp className="w-4 h-4 mr-1" />
                          Analisar
                        </Button>
                      </PostAnalyticsDialog>
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
