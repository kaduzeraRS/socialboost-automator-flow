
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
      
      // Simular um usuário temporário para demonstração
      const tempUserId = 'demo-user-' + Date.now();
      
      // Verificar se a conta já está conectada (usando localStorage para demo)
      const existingAccounts = JSON.parse(localStorage.getItem('demo_accounts') || '[]');
      const alreadyExists = existingAccounts.some((acc: any) => 
        acc.platform === accountData.platform && acc.is_active
      );

      if (alreadyExists) {
        console.log('Account already connected');
        toast({
          title: "Conta já conectada",
          description: `Você já possui uma conta ${accountData.platform} conectada.`,
          variant: "destructive"
        });
        return null;
      }

      // Criar nova conta
      const newAccount = {
        id: 'account-' + Date.now(),
        user_id: tempUserId,
        ...accountData,
        is_active: true,
        created_at: new Date().toISOString()
      };

      // Salvar no localStorage para demonstração
      const updatedAccounts = [...existingAccounts, newAccount];
      localStorage.setItem('demo_accounts', JSON.stringify(updatedAccounts));

      console.log('Account connected successfully:', newAccount);

      toast({
        title: "Conta conectada!",
        description: `Sua conta ${accountData.platform} foi conectada com sucesso.`,
      });

      // Atualizar a lista local
      setAccounts(updatedAccounts);
      return newAccount;
    } catch (error) {
      console.error('Error in connectAccount:', error);
      toast({
        title: "Erro inesperado",
        description: "Ocorreu um erro inesperado. Tente novamente.",
        variant: "destructive"
      });
      return null;
    }
  };

  const disconnectAccount = async (accountId: string, platform: string) => {
    try {
      console.log('Disconnecting account:', accountId);
      
      // Remover do localStorage
      const existingAccounts = JSON.parse(localStorage.getItem('demo_accounts') || '[]');
      const updatedAccounts = existingAccounts.filter((acc: any) => acc.id !== accountId);
      localStorage.setItem('demo_accounts', JSON.stringify(updatedAccounts));

      toast({
        title: "Conta desconectada",
        description: `Conta ${platform} foi desconectada com sucesso.`,
      });

      // Atualizar a lista local
      setAccounts(updatedAccounts);
    } catch (error) {
      console.error('Error in disconnectAccount:', error);
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
    // Carregar contas do localStorage para demonstração
    const demoAccounts = JSON.parse(localStorage.getItem('demo_accounts') || '[]');
    setAccounts(demoAccounts);
    setLoading(false);
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
