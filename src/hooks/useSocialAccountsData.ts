
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface SocialAccount {
  id: string;
  platform: string;
  username: string;
  followers_count: number;
  following_count: number;
  posts_count: number;
  is_active: boolean;
  profile_picture_url?: string;
  created_at: string;
}

export const useSocialAccountsData = () => {
  const [accounts, setAccounts] = useState<SocialAccount[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchAccounts = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Fetching social accounts...');
      
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        console.log('No authenticated user found for fetching accounts');
        setAccounts([]);
        setLoading(false);
        return;
      }

      const { data, error: fetchError } = await supabase
        .from('social_accounts')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (fetchError) {
        console.error('Error fetching social accounts:', fetchError);
        setError('Erro ao carregar contas conectadas');
        toast({
          title: "Erro ao carregar contas",
          description: "Não foi possível carregar as contas conectadas.",
          variant: "destructive"
        });
        return;
      }

      console.log('Social accounts loaded:', data);
      setAccounts(data || []);
    } catch (error) {
      console.error('Error in fetchAccounts:', error);
      setError('Erro inesperado ao carregar contas');
    } finally {
      setLoading(false);
    }
  };

  const getAccountsByPlatform = (platform: string) => {
    return accounts.filter(acc => 
      acc.platform.toLowerCase() === platform.toLowerCase() && acc.is_active
    );
  };

  const getAccountsByPeriod = (days?: number) => {
    if (!days) return accounts;
    
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);
    
    return accounts.filter(acc => 
      new Date(acc.created_at) >= cutoffDate
    );
  };

  const getAccountsByPlatformAndPeriod = (platform: string, days?: number) => {
    let filteredAccounts = getAccountsByPlatform(platform);
    
    if (days) {
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - days);
      
      filteredAccounts = filteredAccounts.filter(acc => 
        new Date(acc.created_at) >= cutoffDate
      );
    }

    return filteredAccounts;
  };

  const getAccountById = (accountId: string) => {
    return accounts.find(acc => acc.id === accountId);
  };

  const getTotalAccounts = () => accounts.length;

  const getActiveAccounts = () => accounts.filter(acc => acc.is_active);

  useEffect(() => {
    fetchAccounts();
  }, []);

  return {
    accounts,
    loading,
    error,
    refetch: fetchAccounts,
    getAccountsByPlatform,
    getAccountsByPeriod,
    getAccountsByPlatformAndPeriod,
    getAccountById,
    getTotalAccounts,
    getActiveAccounts
  };
};
