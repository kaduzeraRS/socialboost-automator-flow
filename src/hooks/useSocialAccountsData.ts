
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
  const { toast } = useToast();

  const fetchAccounts = async () => {
    try {
      console.log('Fetching social accounts...');
      
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        console.log('No authenticated user found for fetching accounts');
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('social_accounts')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching social accounts:', error);
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
    } finally {
      setLoading(false);
    }
  };

  const getAccountsByPlatformAndPeriod = (platform: string, days?: number) => {
    let filteredAccounts = accounts.filter(acc => 
      acc.platform.toLowerCase() === platform.toLowerCase() && acc.is_active
    );

    if (days) {
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - days);
      
      filteredAccounts = filteredAccounts.filter(acc => 
        new Date(acc.created_at) >= cutoffDate
      );
    }

    return filteredAccounts;
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  return {
    accounts,
    loading,
    refetch: fetchAccounts,
    getAccountsByPlatformAndPeriod
  };
};
