
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Heart, MessageCircle, UserPlus, UserMinus, Play, Pause, Square } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useSocialAccounts } from '@/hooks/useSocialAccounts';
import { useWarmingCampaigns } from '@/hooks/useWarmingCampaigns';
import TargetProfileInput from '@/components/TargetProfileInput';
import UnfollowDialog from '@/components/UnfollowDialog';

// Mock data para perfis alvos
const mockTargetProfiles = [
  {
    id: '1',
    username: 'cristiano',
    platform: 'instagram',
    profilePicture: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    followers: 615000000,
    following: 543,
    posts: 3456,
    url: 'https://instagram.com/cristiano'
  },
  {
    id: '2',
    username: 'therock',
    platform: 'instagram',
    profilePicture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
    followers: 389000000,
    following: 721,
    posts: 7899,
    url: 'https://instagram.com/therock'
  },
  {
    id: '3',
    username: 'charlidamelio',
    platform: 'tiktok',
    profilePicture: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
    followers: 151000000,
    following: 1234,
    posts: 2876,
    url: 'https://tiktok.com/@charlidamelio'
  }
];

const AccountWarming = () => {
  const [selectedAccount, setSelectedAccount] = useState('');
  const [selectedTargetProfiles, setSelectedTargetProfiles] = useState<string[]>([]);
  const [targetProfiles, setTargetProfiles] = useState(mockTargetProfiles);
  const [followEnabled, setFollowEnabled] = useState(true);
  const [likeEnabled, setLikeEnabled] = useState(true);
  const [commentEnabled, setCommentEnabled] = useState(false);
  const [followLimit, setFollowLimit] = useState([50]);
  const [likeLimit, setLikeLimit] = useState([100]);
  const [commentLimit, setCommentLimit] = useState([10]);
  const [isWarmingActive, setIsWarmingActive] = useState(false);

  const { accounts } = useSocialAccounts();
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

  const handleAddTarget = (profileData: { platform: string; username: string; url: string }) => {
    const newProfile = {
      id: Date.now().toString(),
      username: profileData.username,
      platform: profileData.platform,
      profilePicture: `https://images.unsplash.com/photo-${Math.floor(Math.random() * 1000000000000)}?w=150`,
      followers: Math.floor(Math.random() * 1000000) + 10000,
      following: Math.floor(Math.random() * 10000) + 100,
      posts: Math.floor(Math.random() * 5000) + 50,
      url: profileData.url
    };
    
    setTargetProfiles(prev => [newProfile, ...prev]);
  };

  const handleRemoveTarget = (id: string) => {
    setTargetProfiles(prev => prev.filter(profile => profile.id !== id));
    setSelectedTargetProfiles(prev => prev.filter(profileId => profileId !== id));
  };

  const handleToggleProfile = (id: string) => {
    setSelectedTargetProfiles(prev => 
      prev.includes(id) 
        ? prev.filter(profileId => profileId !== id)
        : [...prev, id]
    );
  };

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
            <TargetProfileInput 
              onAddTarget={handleAddTarget}
              targetProfiles={targetProfiles}
              onRemoveTarget={handleRemoveTarget}
              selectedProfiles={selectedTargetProfiles}
              onToggleProfile={handleToggleProfile}
            />

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
