
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { UserMinus, Users, List } from 'lucide-react';
import { useUnfollow } from '@/hooks/useUnfollow';
import { useSocialAccounts } from '@/hooks/useSocialAccounts';

interface UnfollowDialogProps {
  children: React.ReactNode;
}

const UnfollowDialog = ({ children }: UnfollowDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProfiles, setSelectedProfiles] = useState<string[]>([]);
  const [nonFollowers, setNonFollowers] = useState<any[]>([]);
  const { addToUnfollowQueue, getNonFollowers, processUnfollowQueue } = useUnfollow();
  const { accounts } = useSocialAccounts();

  const handleLoadNonFollowers = async (accountId: string) => {
    const data = await getNonFollowers(accountId);
    setNonFollowers(data);
  };

  const handleUnfollowNonFollowers = async (accountId: string) => {
    const items = selectedProfiles.map(username => ({
      social_account_id: accountId,
      target_username: username,
      unfollow_type: 'non_follower' as const
    }));

    await addToUnfollowQueue(items);
    setSelectedProfiles([]);
  };

  const handleMassUnfollow = async (accountId: string, count: number) => {
    const items = Array.from({ length: count }, (_, i) => ({
      social_account_id: accountId,
      target_username: `@user${i + 1}`,
      unfollow_type: 'mass' as const
    }));

    await addToUnfollowQueue(items);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Gerenciar Unfollow</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="non-followers" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="non-followers">Não me seguem</TabsTrigger>
            <TabsTrigger value="mass">Unfollow em massa</TabsTrigger>
            <TabsTrigger value="queue">Fila de unfollow</TabsTrigger>
          </TabsList>

          <TabsContent value="non-followers" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <UserMinus className="w-5 h-5" />
                  <span>Usuários que não me seguem</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {accounts.length > 0 && (
                  <div className="space-y-2">
                    {accounts.map((account) => (
                      <Button
                        key={account.id}
                        variant="outline"
                        onClick={() => handleLoadNonFollowers(account.id)}
                        className="w-full justify-start"
                      >
                        Carregar não seguidores - {account.platform} ({account.username})
                      </Button>
                    ))}
                  </div>
                )}

                {nonFollowers.length > 0 && (
                  <div className="space-y-2">
                    <div className="grid grid-cols-1 gap-2 max-h-60 overflow-y-auto">
                      {nonFollowers.map((profile, index) => (
                        <div key={index} className="flex items-center space-x-2 p-2 border rounded">
                          <Checkbox
                            checked={selectedProfiles.includes(profile.username)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedProfiles([...selectedProfiles, profile.username]);
                              } else {
                                setSelectedProfiles(selectedProfiles.filter(u => u !== profile.username));
                              }
                            }}
                          />
                          <span>{profile.username}</span>
                          <span className="text-sm text-muted-foreground">
                            {profile.followers} seguidores
                          </span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex justify-between items-center pt-4">
                      <span className="text-sm text-muted-foreground">
                        {selectedProfiles.length} selecionados
                      </span>
                      <Button
                        onClick={() => handleUnfollowNonFollowers(accounts[0]?.id)}
                        disabled={selectedProfiles.length === 0}
                        className="bg-red-500 hover:bg-red-600"
                      >
                        Deixar de seguir selecionados
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="mass" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="w-5 h-5" />
                  <span>Unfollow em massa</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {accounts.map((account) => (
                  <div key={account.id} className="flex items-center justify-between p-4 border rounded">
                    <div>
                      <h4 className="font-medium">{account.platform} - {account.username}</h4>
                      <p className="text-sm text-muted-foreground">
                        Seguindo: {account.followers_count || 0}
                      </p>
                    </div>
                    <div className="space-x-2">
                      <Button
                        variant="outline"
                        onClick={() => handleMassUnfollow(account.id, 50)}
                        className="text-orange-600 hover:text-orange-700"
                      >
                        Unfollow 50
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => handleMassUnfollow(account.id, 100)}
                        className="text-red-600 hover:text-red-700"
                      >
                        Unfollow 100
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="queue" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <List className="w-5 h-5" />
                  <span>Fila de unfollow</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {accounts.map((account) => (
                  <div key={account.id} className="flex items-center justify-between p-4 border rounded mb-2">
                    <div>
                      <h4 className="font-medium">{account.platform} - {account.username}</h4>
                      <p className="text-sm text-muted-foreground">
                        Fila de unfollow ativa
                      </p>
                    </div>
                    <Button
                      onClick={() => processUnfollowQueue(account.id)}
                      className="bg-purple-primary hover:bg-purple-hover"
                    >
                      Processar Fila
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default UnfollowDialog;
