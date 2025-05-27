
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { User, Heart, MessageCircle, UserPlus } from 'lucide-react';
import { useState } from 'react';

const AccountWarming = () => {
  const [targetProfile, setTargetProfile] = useState('');
  const [followEnabled, setFollowEnabled] = useState(true);
  const [likeEnabled, setLikeEnabled] = useState(true);
  const [commentEnabled, setCommentEnabled] = useState(false);
  const [followLimit, setFollowLimit] = useState([50]);
  const [likeLimit, setLikeLimit] = useState([100]);
  const [commentLimit, setCommentLimit] = useState([10]);

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
            <TabsTrigger value="seguidos">Usuários Seguidos</TabsTrigger>
          </TabsList>

          <TabsContent value="aquecimento" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="w-5 h-5" />
                  <span>Perfil Alvo</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="target-profile">Instagram do perfil alvo</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="target-profile"
                      placeholder="@usuario_alvo"
                      value={targetProfile}
                      onChange={(e) => setTargetProfile(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Seguir */}
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

              {/* Curtir */}
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

              {/* Comentar */}
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

            <Card>
              <CardContent className="pt-6">
                <Button className="w-full bg-purple-primary hover:bg-purple-hover">
                  Iniciar Aquecimento
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="seguidos">
            <Card>
              <CardHeader>
                <CardTitle>Usuários Seguidos Recentemente</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-muted-foreground">
                  <UserPlus className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Nenhum usuário seguido ainda</p>
                  <p className="text-sm">Os usuários seguidos aparecerão aqui quando o aquecimento estiver ativo</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default AccountWarming;
