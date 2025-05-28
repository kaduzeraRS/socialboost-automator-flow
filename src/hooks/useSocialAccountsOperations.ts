
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface SocialAccountData {
  platform: string;
  username: string;
  account_id?: string;
  access_token?: string;
  refresh_token?: string;
  followers_count?: number;
  following_count?: number;
  posts_count?: number;
  profile_picture_url?: string;
}

interface ConnectionLogData {
  socialAccountId: string;
  platform: string;
  action: 'connect' | 'disconnect';
  status: 'success' | 'error';
  errorMessage?: string;
}

export const useSocialAccountsOperations = () => {
  const { toast } = useToast();

  const validateAccountData = (accountData: SocialAccountData): boolean => {
    if (!accountData.platform || !accountData.username) {
      toast({
        title: "Dados incompletos",
        description: "Plataforma e nome de usuário são obrigatórios.",
        variant: "destructive"
      });
      return false;
    }
    return true;
  };

  const checkExistingAccount = async (platform: string, userId: string) => {
    const { data: existingAccounts, error } = await supabase
      .from('social_accounts')
      .select('id, platform, username')
      .eq('user_id', userId)
      .eq('platform', platform)
      .eq('is_active', true);

    if (error) {
      console.error('Error checking existing accounts:', error);
      return { exists: false, error };
    }

    return { 
      exists: existingAccounts && existingAccounts.length > 0, 
      accounts: existingAccounts 
    };
  };

  const logConnection = async (logData: ConnectionLogData) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) return;

      await supabase
        .from('connection_logs')
        .insert([{
          user_id: user.id,
          social_account_id: logData.socialAccountId,
          platform: logData.platform,
          action: logData.action,
          status: logData.status,
          error_message: logData.errorMessage,
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

  const connectAccount = async (accountData: SocialAccountData) => {
    try {
      console.log('Connecting account:', accountData);
      
      if (!validateAccountData(accountData)) {
        return null;
      }

      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        console.error('No authenticated user found for account connection');
        toast({
          title: "Erro de autenticação",
          description: "Sessão expirada. Faça login novamente para conectar uma conta.",
          variant: "destructive"
        });
        setTimeout(() => {
          window.location.href = '/auth';
        }, 2000);
        return null;
      }

      // Check for existing accounts
      const { exists, error: checkError } = await checkExistingAccount(accountData.platform, user.id);
      
      if (checkError) {
        toast({
          title: "Erro ao verificar contas",
          description: "Não foi possível verificar contas existentes.",
          variant: "destructive"
        });
        return null;
      }

      if (exists) {
        toast({
          title: "Conta já conectada",
          description: `Você já possui uma conta ${accountData.platform} conectada.`,
          variant: "destructive"
        });
        return null;
      }

      // Insert new account
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
        await logConnection({
          socialAccountId: 'unknown',
          platform: accountData.platform,
          action: 'connect',
          status: 'error',
          errorMessage: error.message
        });
        
        toast({
          title: "Erro ao conectar conta",
          description: "Não foi possível conectar a conta. Tente novamente.",
          variant: "destructive"
        });
        return null;
      }

      await logConnection({
        socialAccountId: data.id,
        platform: accountData.platform,
        action: 'connect',
        status: 'success'
      });

      toast({
        title: "Conta conectada!",
        description: `Sua conta ${accountData.platform} foi conectada com sucesso.`,
      });

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

  const disconnectAccount = async (accountId: string, platform: string) => {
    try {
      console.log('Disconnecting account:', accountId);
      
      const { error } = await supabase
        .from('social_accounts')
        .delete()
        .eq('id', accountId);

      if (error) {
        console.error('Error disconnecting account:', error);
        await logConnection({
          socialAccountId: accountId,
          platform,
          action: 'disconnect',
          status: 'error',
          errorMessage: error.message
        });
        
        toast({
          title: "Erro ao desconectar",
          description: "Não foi possível desconectar a conta.",
          variant: "destructive"
        });
        return false;
      }

      await logConnection({
        socialAccountId: accountId,
        platform,
        action: 'disconnect',
        status: 'success'
      });

      toast({
        title: "Conta desconectada",
        description: `Conta ${platform} foi desconectada com sucesso.`,
      });

      return true;
    } catch (error) {
      console.error('Error in disconnectAccount:', error);
      toast({
        title: "Erro inesperado",
        description: "Ocorreu um erro inesperado ao desconectar a conta.",
        variant: "destructive"
      });
      return false;
    }
  };

  const updateAccountStats = async (accountId: string, stats: {
    followers_count?: number;
    following_count?: number;
    posts_count?: number;
  }) => {
    try {
      const { error } = await supabase
        .from('social_accounts')
        .update({
          ...stats,
          last_sync_at: new Date().toISOString()
        })
        .eq('id', accountId);

      if (error) {
        console.error('Error updating account stats:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error in updateAccountStats:', error);
      return false;
    }
  };

  const toggleAccountStatus = async (accountId: string, isActive: boolean) => {
    try {
      const { error } = await supabase
        .from('social_accounts')
        .update({ is_active: isActive })
        .eq('id', accountId);

      if (error) {
        console.error('Error toggling account status:', error);
        return false;
      }

      toast({
        title: isActive ? "Conta ativada" : "Conta desativada",
        description: `A conta foi ${isActive ? 'ativada' : 'desativada'} com sucesso.`,
      });

      return true;
    } catch (error) {
      console.error('Error in toggleAccountStatus:', error);
      return false;
    }
  };

  return {
    connectAccount,
    disconnectAccount,
    updateAccountStats,
    toggleAccountStatus,
    logConnection
  };
};
