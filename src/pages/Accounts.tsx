
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Instagram, Play, Plus, Settings, Trash2, Users, BarChart3 } from 'lucide-react';
import { useSocialAccounts } from '@/hooks/useSocialAccounts';
import { useScheduledPosts } from '@/hooks/useScheduledPosts';
import { useLanguage } from '@/contexts/LanguageContext';
import { useState } from 'react';
import ConnectAccountDialog from '@/components/ConnectAccountDialog';

const Accounts = () => {
  const { accounts, loading, disconnectAccount } = useSocialAccounts();
  const { posts } = useScheduledPosts();
  const { t } = useLanguage();

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

  const getAccountPosts = (accountId: string) => {
    return posts.filter(post => post.social_account_id === accountId);
  };

  const getAccountStats = (accountId: string) => {
    const accountPosts = getAccountPosts(accountId);
    const scheduledPosts = accountPosts.filter(post => post.status === 'scheduled').length;
    const publishedPosts = accountPosts.filter(post => post.status === 'published').length;
    
    return { scheduledPosts, publishedPosts };
  };

  // Função para obter contas incluindo as locais
  const getAllAccounts = () => {
    const localAccounts = JSON.parse(localStorage.getItem('connectedAccounts') || '[]');
    const bankAccounts = accounts.filter(acc => acc.is_active);
    
    const allAccounts = [...bankAccounts];
    localAccounts.forEach(localAcc => {
      const existsInBank = bankAccounts.some(bankAcc => 
        bankAcc.platform === localAcc.platform && bankAcc.username === localAcc.username
      );
      if (!existsInBank) {
        allAccounts.push(localAcc);
      }
    });
    
    return allAccounts;
  };

  const handleDisconnect = async (accountId: string, platform: string) => {
    // Remover do localStorage
    const localAccounts = JSON.parse(localStorage.getItem('connectedAccounts') || '[]');
    const filteredAccounts = localAccounts.filter(acc => acc.id !== accountId);
    localStorage.setItem('connectedAccounts', JSON.stringify(filteredAccounts));
    
    // Se não for conta local, remover do banco também
    if (!accountId.startsWith('local_')) {
      await disconnectAccount(accountId, platform);
    }
    
    // Recarregar a página para atualizar a lista
    window.location.reload();
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-primary"></div>
        </div>
      </DashboardLayout>
    );
  }

  const allAccounts = getAllAccounts();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">{t('connected_accounts')}</h1>
            <p className="text-muted-foreground">{t('manage_accounts')}</p>
          </div>
          <ConnectAccountDialog>
            <Button className="bg-purple-primary hover:bg-purple-hover">
              <Plus className="w-4 h-4 mr-2" />
              Conectar Conta
            </Button>
          </ConnectAccountDialog>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">{t('dashboard')}</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {allAccounts.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Users className="w-12 h-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">{t('add_new_account')}</h3>
                  <p className="text-muted-foreground text-center mb-4">
                    Nenhuma conta conectada ainda. Use o botão acima para conectar.
                  </p>
                  <ConnectAccountDialog>
                    <Button className="bg-purple-primary hover:bg-purple-hover">
                      <Plus className="w-4 h-4 mr-2" />
                      Conectar Primeira Conta
                    </Button>
                  </ConnectAccountDialog>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {allAccounts.map((account) => {
                  const Icon = getPlatformIcon(account.platform);
                  const stats = getAccountStats(account.id);
                  
                  return (
                    <Card key={account.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <Avatar className="w-12 h-12">
                              <AvatarImage src={account.profile_picture_url} alt={account.username} />
                              <AvatarFallback>
                                <Icon className="w-6 h-6" />
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-semibold capitalize">{account.platform}</h3>
                              <p className="text-sm text-muted-foreground">{account.username}</p>
                            </div>
                          </div>
                          <Badge variant={account.is_active !== false ? "default" : "secondary"}>
                            {account.is_active !== false ? t('connected') : "Inativo"}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-3 gap-2 text-sm">
                          <div className="text-center">
                            <p className="font-medium">{account.followers_count || 0}</p>
                            <p className="text-muted-foreground text-xs">{t('followers')}</p>
                          </div>
                          <div className="text-center">
                            <p className="font-medium">{account.following_count || 0}</p>
                            <p className="text-muted-foreground text-xs">Seguindo</p>
                          </div>
                          <div className="text-center">
                            <p className="font-medium">{account.posts_count || 0}</p>
                            <p className="text-muted-foreground text-xs">Posts</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="text-center p-2 bg-blue-50 dark:bg-blue-900/20 rounded">
                            <p className="font-medium text-blue-600">{stats.scheduledPosts}</p>
                            <p className="text-xs text-blue-600">Agendados</p>
                          </div>
                          <div className="text-center p-2 bg-green-50 dark:bg-green-900/20 rounded">
                            <p className="font-medium text-green-600">{stats.publishedPosts}</p>
                            <p className="text-xs text-green-600">Publicados</p>
                          </div>
                        </div>

                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline" className="flex-1">
                            <Settings className="w-4 h-4 mr-1" />
                            Config
                          </Button>
                          <Button 
                            size="sm" 
                            variant="destructive"
                            onClick={() => handleDisconnect(account.id, account.platform)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {allAccounts.map((account) => {
                const stats = getAccountStats(account.id);
                const Icon = getPlatformIcon(account.platform);
                
                return (
                  <Card key={account.id}>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Icon className="w-5 h-5" />
                        <span>{account.platform} - {account.username}</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-4 border rounded">
                          <BarChart3 className="w-8 h-8 mx-auto mb-2 text-blue-500" />
                          <p className="text-2xl font-bold">{account.followers_count || 0}</p>
                          <p className="text-sm text-muted-foreground">{t('followers')}</p>
                        </div>
                        <div className="text-center p-4 border rounded">
                          <BarChart3 className="w-8 h-8 mx-auto mb-2 text-green-500" />
                          <p className="text-2xl font-bold">{stats.publishedPosts}</p>
                          <p className="text-sm text-muted-foreground">Posts Publicados</p>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>{t('engagement_rate')}</span>
                          <span className="font-medium">4.2%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Alcance Médio</span>
                          <span className="font-medium">1.2K</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Posts Agendados</span>
                          <span className="font-medium">{stats.scheduledPosts}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Accounts;
