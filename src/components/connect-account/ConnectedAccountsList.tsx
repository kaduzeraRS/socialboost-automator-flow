
import ConnectedAccountCard from './ConnectedAccountCard';
import { useLanguage } from '@/contexts/LanguageContext';

interface Account {
  id: string;
  platform: string;
  username: string;
  profile_picture_url?: string;
  followers_count?: number;
  is_active?: boolean;
}

interface ConnectedAccountsListProps {
  accounts: Account[];
  onDisconnect: (accountId: string, platform: string) => void;
}

const ConnectedAccountsList = ({ accounts, onDisconnect }: ConnectedAccountsListProps) => {
  const { t } = useLanguage();

  if (accounts.length === 0) {
    return null;
  }

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">{t('connected_accounts')}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {accounts.map((account) => (
          <ConnectedAccountCard
            key={account.id}
            account={account}
            onDisconnect={onDisconnect}
          />
        ))}
      </div>
    </div>
  );
};

export default ConnectedAccountsList;
