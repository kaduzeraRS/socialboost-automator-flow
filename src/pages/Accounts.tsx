
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
import { useSocialAccounts } from '@/hooks/useSocialAccounts';
import { useScheduledPosts } from '@/hooks/useScheduledPosts';

const Accounts = () => {
  const { toast } = useToast();
  const [performancePeriod, setPerformancePeriod] = useState('30');
  const { accounts, loading: accountsLoading, refetch: refetchAccounts } = useSocialAccounts();
  const { posts, loading: postsLoading } = useScheduledPosts();

  const handleAccountAction = async (account: any, action: string) => {
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
          refetchAccounts();
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

  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'instagram':
        return Instagram;
      case 'tiktok':
        return Play;
      default:
        return Users;
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'instagram':
        return 'from-purple-500 to-pink-500';
      case 'tiktok':
        return 'from-black to-gray-800';
      default:
        return 'from-blue-500 to-blue-600';
    }
  };

  const getAccountStatus = (account: any) => {
    // Simulate random status for demo
    const random = Math.random();
    if (random > 0.8) {
      return { status: 'Reconectar', color: 'bg-orange-500 hover:bg-orange-600', needsReconnect: true };
    }
    return { status: 'Conectado', color: 'bg-green-500 hover:bg-green-600', needsReconnect: false };
  };

  if (accountsLoading || postsLoading) {
    return (
      <DashboardLayout>
        <div className="space-y-6">
          <div className="flex justify-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-primary"></div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

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

        {/* Contas Conectadas */}
        {accounts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {accounts.map((account) => {
              const Icon = getPlatformIcon(account.platform);
              const color = getPlatformColor(account.platform);
              const statusData = getAccountStatus(account);
              
              return (
                <Card key={account.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-12 h-12 bg-gradient-to-br ${color} rounded-lg flex items-center justify-center`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold capitalize">{account.platform}</h3>
                          <p className="text-sm text-muted-foreground">{account.username}</p>
                        </div>
                      </div>
                      <Badge className={`${statusData.color} text-white`}>
                        {statusData.status}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Seguidores</span>
                      <span className="font-semibold">{account.followers_count.toLocaleString()}</span>
                    </div>
                    <div className="flex space-x-2">
                      <AccountConfigDialog account={account}>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1"
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
        ) : (
          <Card>
            <CardContent className="text-center py-8">
              <Users className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Nenhuma conta conectada</h3>
              <p className="text-muted-foreground mb-4">
                Conecte suas contas de redes sociais para começar a gerenciar seus posts
              </p>
              <ConnectAccountDialog>
                <Button className="bg-purple-primary hover:bg-purple-hover">
                  <Plus className="w-4 h-4 mr-2" />
                  Conectar Primeira Conta
                </Button>
              </ConnectAccountDialog>
            </CardContent>
          </Card>
        )}

        {/* Performance Geral */}
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
                    {accounts.map((account) => (
                      <SelectItem key={account.id} value={account.id}>
                        {account.username} ({account.platform})
                      </SelectItem>
                    ))}
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
                <TabsTrigger value="rascunhos">Rascunhos</TabsTrigger>
              </TabsList>
              
              <TabsContent value="todos" className="space-y-4">
                {posts.length > 0 ? (
                  posts.map((post) => {
                    const Icon = getPlatformIcon(post.platform);
                    const isScheduled = post.status === 'scheduled' || post.status === 'draft';
                    
                    return (
                      <div
                        key={post.id}
                        className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                            <Icon className="w-6 h-6 text-purple-500" />
                          </div>
                          <div>
                            <h4 className="font-medium">{post.title || post.content.substring(0, 50) + '...'}</h4>
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                              <span className="flex items-center space-x-1">
                                <Calendar className="w-3 h-3" />
                                <span>{new Date(post.scheduled_for).toLocaleDateString()}</span>
                              </span>
                              <span>{new Date(post.scheduled_for).toLocaleTimeString()}</span>
                              <span className="capitalize">{post.platform}</span>
                              <Badge variant={post.status === 'published' ? 'default' : 'outline'}>
                                {post.status === 'draft' ? 'Rascunho' :
                                 post.status === 'scheduled' ? 'Agendado' :
                                 post.status === 'published' ? 'Publicado' :
                                 post.status === 'failed' ? 'Falhou' : post.status}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {!isScheduled && (
                            <PostAnalyticsDialog post={post}>
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
                    );
                  })
                ) : (
                  <div className="text-center py-8">
                    <Calendar className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Nenhum post encontrado</h3>
                    <p className="text-muted-foreground">
                      Você ainda não tem posts agendados ou publicados.
                    </p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="agendados">
                <div className="space-y-4">
                  {posts.filter(post => post.status === 'scheduled').length > 0 ? (
                    posts.filter(post => post.status === 'scheduled').map((post) => (
                      <div key={post.id} className="p-4 border rounded-lg">
                        <p className="font-medium">{post.title || post.content.substring(0, 100) + '...'}</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          {post.platform} • {new Date(post.scheduled_for).toLocaleString()}
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">Nenhum post agendado.</p>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="publicados">
                <div className="space-y-4">
                  {posts.filter(post => post.status === 'published').length > 0 ? (
                    posts.filter(post => post.status === 'published').map((post) => (
                      <div key={post.id} className="p-4 border rounded-lg">
                        <p className="font-medium">{post.title || post.content.substring(0, 100) + '...'}</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          {post.platform} • Publicado em {new Date(post.scheduled_for).toLocaleString()}
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">Nenhum post publicado.</p>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="rascunhos">
                <div className="space-y-4">
                  {posts.filter(post => post.status === 'draft').length > 0 ? (
                    posts.filter(post => post.status === 'draft').map((post) => (
                      <div key={post.id} className="p-4 border rounded-lg">
                        <p className="font-medium">{post.title || post.content.substring(0, 100) + '...'}</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          {post.platform} • Criado em {new Date(post.created_at).toLocaleString()}
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">Nenhum rascunho salvo.</p>
                    </div>
                  )}
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
