
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Check, X, Instagram, Play, Users } from 'lucide-react';
import { useSocialAccounts } from '@/hooks/useSocialAccounts';
import { useToast } from '@/hooks/use-toast';

const ConnectedAccountsList = () => {
  const { accounts, disconnectAccount, refetch } = useSocialAccounts();
  const { toast } = useToast();

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

  const handleDisconnect = async (accountId: string, platform: string) => {
    console.log('Desconectando conta:', accountId, platform);
    
    // Remover do localStorage (se existir)
    const localAccounts = JSON.parse(localStorage.getItem('connectedAccounts') || '[]');
    const filteredAccounts = localAccounts.filter(acc => acc.id !== accountId);
    localStorage.setItem('connectedAccounts', JSON.stringify(filteredAccounts));
    
    // Se não for conta local, remover do banco também
    if (!accountId.startsWith('local_')) {
      await disconnectAccount(accountId, platform);
    } else {
      toast({
        title: "Conta desconectada",
        description: `Conta ${platform} foi removida com sucesso.`,
      });
    }
    
    await refetch();
  };

  const getConnectedAccounts = () => {
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

  const connectedAccounts = getConnectedAccounts();

  if (connectedAccounts.length === 0) {
    return null;
  }

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Contas Conectadas</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {connectedAccounts.map((account) => {
          const Icon = getPlatformIcon(account.platform);
          
          return (
            <Card key={account.id} className="border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-800">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={account.profile_picture_url} alt={account.username} />
                      <AvatarFallback>
                        <Icon className="w-5 h-5" />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium capitalize">{account.platform}</p>
                      <p className="text-sm text-muted-foreground">{account.username}</p>
                      <p className="text-xs text-muted-foreground">
                        {account.followers_count?.toLocaleString()} seguidores
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="w-5 h-5 text-green-500" />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDisconnect(account.id, account.platform)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default ConnectedAccountsList;
