
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

export const useSocialAccounts = () => {
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

      console.log('Authenticated user found:', user.id);
      
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

  const connectAccount = async (accountData: {
    platform: string;
    username: string;
    account_id?: string;
    access_token?: string;
    refresh_token?: string;
    followers_count?: number;
    following_count?: number;
    posts_count?: number;
    profile_picture_url?: string;
  }) => {
    try {
      console.log('Connecting account:', accountData);
      
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        console.error('No authenticated user found for account connection');
        toast({
          title: "Erro de autenticação",
          description: "Você precisa estar logado para conectar uma conta.",
          variant: "destructive"
        });
        return null;
      }

      console.log('Authenticated user for account connection:', user.id);

      const { data, error } = await supabase
        .from('social_accounts')
        .insert([{
          user_id: user.id,
          ...accountData
        }])
        .select()
        .single();

      if (error) {
        console.error('Error connecting account:', error);
        toast({
          title: "Erro ao conectar conta",
          description: "Não foi possível conectar a conta. Tente novamente.",
          variant: "destructive"
        });
        return null;
      }

      console.log('Account connected successfully:', data);

      // Log the connection
      await logConnection(data.id, accountData.platform, 'connect', 'success');

      toast({
        title: "Conta conectada!",
        description: `Sua conta ${accountData.platform} foi conectada com sucesso.`,
      });

      await fetchAccounts(); // Refresh the list
      return data;
    } catch (error) {
      console.error('Error in connectAccount:', error);
      return null;
    }
  };

  const disconnectAccount = async (accountId: string, platform: string) => {
    try {
      console.log('Disconnecting account:', accountId);
      
      const { error } = await supabase
        .from('social_accounts')
        .delete()
        .eq('id', accountId);

      if (error) {
        console.error('Error disconnecting account:', error);
        toast({
          title: "Erro ao desconectar",
          description: "Não foi possível desconectar a conta.",
          variant: "destructive"
        });
        return;
      }

      // Log the disconnection
      await logConnection(accountId, platform, 'disconnect', 'success');

      toast({
        title: "Conta desconectada",
        description: `Conta ${platform} foi desconectada com sucesso.`,
      });

      await fetchAccounts(); // Refresh the list
    } catch (error) {
      console.error('Error in disconnectAccount:', error);
    }
  };

  const logConnection = async (
    socialAccountId: string,
    platform: string,
    action: string,
    status: string,
    errorMessage?: string
  ) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) return;

      await supabase
        .from('connection_logs')
        .insert([{
          user_id: user.id,
          social_account_id: socialAccountId,
          platform,
          action,
          status,
          error_message: errorMessage,
          ip_address: null,
          user_agent: navigator.userAgent,
          metadata: {
            timestamp: new Date().toISOString(),
            browser: navigator.userAgent
          }
        }]);
    } catch (error) {
      console.error('Error logging connection:', error);
    }
  };

  // Função para filtrar contas por período (útil para TikTok últimos 7 dias)
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
    connectAccount,
    disconnectAccount,
    refetch: fetchAccounts,
    getAccountsByPlatformAndPeriod
  };
};
