
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';

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
  const { user, isAuthenticated } = useAuth();

  const fetchAccounts = async () => {
    try {
      console.log('Fetching social accounts...');
      setLoading(true);

      if (!isAuthenticated || !user) {
        console.log('User not authenticated, loading local accounts only');
        loadLocalAccounts();
        return;
      }

      console.log('Authenticated user found:', user.id);
      
      // Buscar contas do banco de dados
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

      console.log('Social accounts loaded from database:', data);
      
      // Combinar com contas locais se houver
      const localAccounts = getLocalAccounts();
      const combinedAccounts = [...(data || []), ...localAccounts];
      
      setAccounts(combinedAccounts);
    } catch (error) {
      console.error('Error in fetchAccounts:', error);
      loadLocalAccounts();
    } finally {
      setLoading(false);
    }
  };

  const loadLocalAccounts = () => {
    const localAccounts = getLocalAccounts();
    setAccounts(localAccounts);
    setLoading(false);
  };

  const getLocalAccounts = (): SocialAccount[] => {
    try {
      const stored = localStorage.getItem('connectedAccounts');
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error loading local accounts:', error);
      return [];
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

      if (!isAuthenticated || !user) {
        // Salvar localmente se não autenticado
        console.log('User not authenticated, saving locally');
        return saveAccountLocally(accountData);
      }

      console.log('Authenticated user for account connection:', user.id);

      // Verificar se a conta já está conectada
      const { data: existingAccounts, error: checkError } = await supabase
        .from('social_accounts')
        .select('id, platform, username')
        .eq('user_id', user.id)
        .eq('platform', accountData.platform)
        .eq('is_active', true);

      if (checkError) {
        console.error('Error checking existing accounts:', checkError);
      } else if (existingAccounts && existingAccounts.length > 0) {
        console.log('Account already connected:', existingAccounts[0]);
        toast({
          title: "Conta já conectada",
          description: `Você já possui uma conta ${accountData.platform} conectada.`,
          variant: "destructive"
        });
        return null;
      }

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

      toast({
        title: "Conta conectada!",
        description: `Sua conta ${accountData.platform} foi conectada com sucesso.`,
      });

      await fetchAccounts(); // Refresh the list
      return data;
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

  const saveAccountLocally = (accountData: any) => {
    try {
      const localAccounts = getLocalAccounts();
      const newAccount = { 
        ...accountData, 
        id: `local_${Date.now()}`, 
        is_active: true,
        created_at: new Date().toISOString()
      };
      
      localAccounts.push(newAccount);
      localStorage.setItem('connectedAccounts', JSON.stringify(localAccounts));

      toast({
        title: "Conta conectada localmente!",
        description: "Faça login para sincronizar com o servidor.",
      });

      setAccounts(prev => [...prev, newAccount]);
      return newAccount;
    } catch (error) {
      console.error('Error saving account locally:', error);
      return null;
    }
  };

  const disconnectAccount = async (accountId: string, platform: string) => {
    try {
      console.log('Disconnecting account:', accountId);
      
      // Se for conta local
      if (accountId.startsWith('local_')) {
        const localAccounts = getLocalAccounts();
        const filteredAccounts = localAccounts.filter(acc => acc.id !== accountId);
        localStorage.setItem('connectedAccounts', JSON.stringify(filteredAccounts));
        
        toast({
          title: "Conta desconectada",
          description: `Conta ${platform} foi removida com sucesso.`,
        });
        
        await fetchAccounts();
        return;
      }

      // Se for conta do banco de dados
      if (!isAuthenticated) {
        toast({
          title: "Erro",
          description: "É necessário estar logado para desconectar contas do servidor.",
          variant: "destructive"
        });
        return;
      }

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

      toast({
        title: "Conta desconectada",
        description: `Conta ${platform} foi desconectada com sucesso.`,
      });

      await fetchAccounts(); // Refresh the list
    } catch (error) {
      console.error('Error in disconnectAccount:', error);
    }
  };

  // Sincronizar contas locais com o servidor após login
  const syncLocalAccountsWithServer = async () => {
    if (!isAuthenticated || !user) return;

    const localAccounts = getLocalAccounts();
    if (localAccounts.length === 0) return;

    console.log('Syncing local accounts with server:', localAccounts);

    for (const localAccount of localAccounts) {
      try {
        await connectAccount({
          platform: localAccount.platform,
          username: localAccount.username,
          account_id: localAccount.account_id,
          access_token: localAccount.access_token,
          refresh_token: localAccount.refresh_token,
          followers_count: localAccount.followers_count,
          following_count: localAccount.following_count,
          posts_count: localAccount.posts_count,
          profile_picture_url: localAccount.profile_picture_url
        });
      } catch (error) {
        console.error('Error syncing account:', error);
      }
    }

    // Limpar contas locais após sincronização
    localStorage.removeItem('connectedAccounts');
  };

  useEffect(() => {
    fetchAccounts();
  }, [isAuthenticated, user]);

  // Sincronizar contas locais quando o usuário fizer login
  useEffect(() => {
    if (isAuthenticated && user) {
      syncLocalAccountsWithServer();
    }
  }, [isAuthenticated, user]);

  return {
    accounts,
    loading,
    connectAccount,
    disconnectAccount,
    refetch: fetchAccounts,
    syncLocalAccounts: syncLocalAccountsWithServer
  };
};
