
import DashboardLayout from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus } from 'lucide-react';
import { useSocialAccounts } from '@/hooks/useSocialAccounts';
import { useScheduledPosts } from '@/hooks/useScheduledPosts';
import { useLanguage } from '@/contexts/LanguageContext';
import ConnectAccountDialog from '@/components/ConnectAccountDialog';
import AccountCard from '@/components/AccountCard';
import AccountsEmptyState from '@/components/AccountsEmptyState';

const Accounts = () => {
  const { accounts, loading, disconnectAccount } = useSocialAccounts();
  const { posts } = useScheduledPosts();
  const { t } = useLanguage();

  const getAccountPosts = (accountId: string) => {
    return posts.filter(post => post.social_account_id === accountId);
  };

  const getAccountStats = (accountId: string) => {
    const accountPosts = getAccountPosts(accountId);
    const scheduledPosts = accountPosts.filter(post => post.status === 'scheduled').length;
    const publishedPosts = accountPosts.filter(post => post.status === 'published').length;
    
    return { scheduledPosts, publishedPosts };
  };

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
    const localAccounts = JSON.parse(localStorage.getItem('connectedAccounts') || '[]');
    const filteredAccounts = localAccounts.filter(acc => acc.id !== accountId);
    localStorage.setItem('connectedAccounts', JSON.stringify(filteredAccounts));
    
    if (!accountId.startsWith('local_')) {
      await disconnectAccount(accountId, platform);
    }
    
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
              <AccountsEmptyState />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {allAccounts.map((account) => (
                  <AccountCard
                    key={account.id}
                    account={account}
                    stats={getAccountStats(account.id)}
                    onDisconnect={handleDisconnect}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            {/* Analytics content can be added here */}
            <div className="text-center text-muted-foreground">
              Analytics em desenvolvimento...
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Accounts;
