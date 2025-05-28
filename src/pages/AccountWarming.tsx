
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { User, Heart, MessageCircle, UserPlus, Target, BarChart3, UserMinus, Play, Pause, Square } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useSocialAccounts } from '@/hooks/useSocialAccounts';
import { useTargetProfiles } from '@/hooks/useTargetProfiles';
import { useWarmingCampaigns } from '@/hooks/useWarmingCampaigns';
import TargetProfileDialog from '@/components/TargetProfileDialog';
import UnfollowDialog from '@/components/UnfollowDialog';

const AccountWarming = () => {
  const [selectedAccount, setSelectedAccount] = useState('');
  const [selectedTargetProfiles, setSelectedTargetProfiles] = useState<string[]>([]);
  const [followEnabled, setFollowEnabled] = useState(true);
  const [likeEnabled, setLikeEnabled] = useState(true);
  const [commentEnabled, setCommentEnabled] = useState(false);
  const [followLimit, setFollowLimit] = useState([50]);
  const [likeLimit, setLikeLimit] = useState([100]);
  const [commentLimit, setCommentLimit] = useState([10]);
  const [isWarmingActive, setIsWarmingActive] = useState(false);

  const { accounts } = useSocialAccounts();
  const { targetProfiles, analyzeProfile, removeTargetProfile, refetch: refetchProfiles } = useTargetProfiles(selectedAccount);
  const { campaigns, createCampaign, updateCampaign } = useWarmingCampaigns();

  const activeCampaign = campaigns.find(c => c.social_account_id === selectedAccount && c.status === 'active');

  useEffect(() => {
    if (accounts.length > 0 && !selectedAccount) {
      setSelectedAccount(accounts[0].id);
    }
  }, [accounts, selectedAccount]);

  useEffect(() => {
    setIsWarmingActive(!!activeCampaign);
  }, [activeCampaign]);

  const handleStartWarming = async () => {
    if (!selectedAccount || selectedTargetProfiles.length === 0) return;

    const warmingTypes = [];
    if (followEnabled) warmingTypes.push('followers');
    if (likeEnabled) warmingTypes.push('likes');
    if (commentEnabled) warmingTypes.push('comments');

    for (const type of warmingTypes) {
      await createCampaign({
        social_account_id: selectedAccount,
        name: `Aquecimento ${type}`,
        description: `Campanha automática de ${type}`,
        warming_type: type as any,
        target_amount: type === 'followers' ? followLimit[0] : type === 'likes' ? likeLimit[0] : commentLimit[0],
        daily_limit: type === 'followers' ? followLimit[0] : type === 'likes' ? likeLimit[0] : commentLimit[0],
        start_date: new Date().toISOString().split('T')[0],
        settings: {
          target_profiles: selectedTargetProfiles,
          enabled_actions: { follow: followEnabled, like: likeEnabled, comment: commentEnabled }
        }
      });
    }

    setIsWarmingActive(true);
  };

  const handlePauseWarming = async () => {
    if (!activeCampaign) return;
    
    await updateCampaign(activeCampaign.id, { status: 'paused' });
    setIsWarmingActive(false);
  };

  const handleStopWarming = async () => {
    if (!activeCampaign) return;
    
    await updateCampaign(activeCampaign.id, { status: 'completed' });
    setIsWarmingActive(false);
  };

  const selectedAccountData = accounts.find(acc => acc.id === selectedAccount);
  const accountTargetProfiles = targetProfiles.filter(tp => tp.social_account_id === selectedAccount);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Aquecimento de Conta</h1>
          <p className="text-muted-foreground">Configure automações inteligentes para aquecer suas contas</p>
        </div>

        <Tabs defaultValue="aquecimento" className="space-y-6">
          <TabsList>
            <TabsTrigger value="aquecimento">Aquecimento</TabsTrigger>
            <TabsTrigger value="unfollow">Unfollow</TabsTrigger>
          </TabsList>

          <TabsContent value="aquecimento" className="space-y-6">
            {/* Seleção de Conta */}
            <Card>
              <CardHeader>
                <CardTitle>Selecionar Conta</CardTitle>
              </CardHeader>
              <CardContent>
                <Select value={selectedAccount} onValueChange={setSelectedAccount}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma conta" />
                  </SelectTrigger>
                  <SelectContent>
                    {accounts.map((account) => (
                      <SelectItem key={account.id} value={account.id}>
                        {account.platform} - {account.username}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            {/* Perfis Alvo */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Target className="w-5 h-5" />
                    <span>Perfis Alvo</span>
                  </div>
                  <TargetProfileDialog 
                    socialAccounts={accounts}
                    onProfileAdded={refetchProfiles}
                  />
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {accountTargetProfiles.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">
                    Nenhum perfil alvo adicionado. Adicione perfis para começar o aquecimento.
                  </p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {accountTargetProfiles.map((profile) => (
                      <div key={profile.id} className="border rounded-lg p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">{profile.username}</h4>
                            <p className="text-sm text-muted-foreground capitalize">{profile.platform}</p>
                          </div>
                          <Badge variant={profile.is_active ? "default" : "secondary"}>
                            {profile.is_active ? "Ativo" : "Inativo"}
                          </Badge>
                        </div>
                        
                        {profile.last_analyzed_at && (
                          <div className="text-xs text-muted-foreground grid grid-cols-3 gap-2">
                            <span>Seguidores: {profile.followers_count}</span>
                            <span>Seguindo: {profile.following_count}</span>
                            <span>Posts: {profile.posts_count}</span>
                          </div>
                        )}

                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => analyzeProfile(profile.id)}
                            className="flex-1"
                          >
                            <BarChart3 className="w-4 h-4 mr-1" />
                            Analisar
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => removeTargetProfile(profile.id)}
                          >
                            Remover
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Seleção de Perfis para Aquecimento */}
            {accountTargetProfiles.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Selecionar Perfis para Aquecimento</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {accountTargetProfiles.map((profile) => (
                      <div key={profile.id} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={profile.id}
                          checked={selectedTargetProfiles.includes(profile.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedTargetProfiles([...selectedTargetProfiles, profile.id]);
                            } else {
                              setSelectedTargetProfiles(selectedTargetProfiles.filter(id => id !== profile.id));
                            }
                          }}
                          className="rounded"
                        />
                        <label htmlFor={profile.id} className="flex-1">
                          {profile.username} ({profile.platform})
                        </label>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Configurações de Aquecimento */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <UserPlus className="w-5 h-5 text-purple-primary" />
                      <span>Seguir</span>
                    </div>
                    <Switch
                      checked={followEnabled}
                      onCheckedChange={setFollowEnabled}
                    />
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Limite diário: {followLimit[0]} follows</Label>
                    <Slider
                      value={followLimit}
                      onValueChange={setFollowLimit}
                      max={100}
                      min={10}
                      step={5}
                      className="mt-2"
                      disabled={!followEnabled}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Heart className="w-5 h-5 text-red-500" />
                      <span>Curtir</span>
                    </div>
                    <Switch
                      checked={likeEnabled}
                      onCheckedChange={setLikeEnabled}
                    />
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Limite diário: {likeLimit[0]} curtidas</Label>
                    <Slider
                      value={likeLimit}
                      onValueChange={setLikeLimit}
                      max={200}
                      min={20}
                      step={10}
                      className="mt-2"
                      disabled={!likeEnabled}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <MessageCircle className="w-5 h-5 text-blue-500" />
                      <span>Comentar</span>
                    </div>
                    <Switch
                      checked={commentEnabled}
                      onCheckedChange={setCommentEnabled}
                    />
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Limite diário: {commentLimit[0]} comentários</Label>
                    <Slider
                      value={commentLimit}
                      onValueChange={setCommentLimit}
                      max={50}
                      min={5}
                      step={1}
                      className="mt-2"
                      disabled={!commentEnabled}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Controles de Aquecimento */}
            <Card>
              <CardContent className="pt-6">
                {!isWarmingActive ? (
                  <Button 
                    className="w-full bg-purple-primary hover:bg-purple-hover"
                    onClick={handleStartWarming}
                    disabled={!selectedAccount || selectedTargetProfiles.length === 0}
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Iniciar Aquecimento
                  </Button>
                ) : (
                  <div className="flex space-x-2">
                    <Button 
                      className="flex-1 bg-orange-500 hover:bg-orange-600"
                      onClick={handlePauseWarming}
                    >
                      <Pause className="w-4 h-4 mr-2" />
                      Pausar Aquecimento
                    </Button>
                    <Button 
                      className="flex-1 bg-red-500 hover:bg-red-600"
                      onClick={handleStopWarming}
                    >
                      <Square className="w-4 h-4 mr-2" />
                      Parar Aquecimento
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="unfollow">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <UserMinus className="w-5 h-5" />
                  <span>Gerenciar Unfollow</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <UnfollowDialog>
                  <Button className="w-full bg-red-500 hover:bg-red-600">
                    <UserMinus className="w-4 h-4 mr-2" />
                    Abrir Gerenciador de Unfollow
                  </Button>
                </UnfollowDialog>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default AccountWarming;
