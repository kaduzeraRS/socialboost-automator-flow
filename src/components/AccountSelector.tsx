
import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useSocialAccounts } from '@/hooks/useSocialAccounts';
import { Instagram, Play } from 'lucide-react';

interface AccountSelectorProps {
  platform: 'instagram' | 'tiktok';
  onAccountChange: (accountId: string) => void;
  selectedAccountId?: string;
}

const AccountSelector = ({ platform, onAccountChange, selectedAccountId }: AccountSelectorProps) => {
  const { accounts } = useSocialAccounts();
  
  const platformAccounts = accounts.filter(account => 
    account.platform.toLowerCase() === platform && account.is_active
  );

  if (platformAccounts.length === 0) {
    return (
      <div className="flex items-center space-x-2 text-muted-foreground">
        {platform === 'instagram' ? 
          <Instagram className="w-4 h-4" /> : 
          <Play className="w-4 h-4" />
        }
        <span className="text-sm">Nenhuma conta {platform} conectada</span>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-2">
      {platform === 'instagram' ? 
        <Instagram className="w-4 h-4 text-purple-500" /> : 
        <Play className="w-4 h-4 text-black" />
      }
      <Select value={selectedAccountId} onValueChange={onAccountChange}>
        <SelectTrigger className="w-48 transition-all duration-200 hover:border-primary">
          <SelectValue placeholder={`Selecionar conta ${platform}`} />
        </SelectTrigger>
        <SelectContent className="animate-in fade-in-0 zoom-in-95">
          {platformAccounts.map((account) => (
            <SelectItem 
              key={account.id} 
              value={account.id}
              className="transition-colors duration-200 hover:bg-accent"
            >
              <div className="flex items-center space-x-2">
                <span className="font-medium">@{account.username}</span>
                <span className="text-muted-foreground text-xs">
                  {account.followers_count} seguidores
                </span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default AccountSelector;
