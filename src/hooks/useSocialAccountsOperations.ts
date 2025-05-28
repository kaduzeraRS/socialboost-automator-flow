
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

export const useSocialAccountsOperations = () => {
  const { toast } = useToast();

  const connectAccount = async (accountData: SocialAccountData) => {
    try {
      console.log('Connecting account:', accountData);
      
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        console.error('No authenticated user found for account connection');
        toast({
          title: "Erro de autenticação",
          description: "Sessão expirada. Faça login novamente para conectar uma conta.",
          variant: "destructive"
        });
        setTimeout(() => {
          window.location.href = '/';
        }, 2000);
        return null;
      }

      const { data: existingAccounts, error: checkError } = await supabase
        .from('social_accounts')
        .select('id, platform, username')
        .eq('user_id', user.id)
        .eq('platform', accountData.platform)
        .eq('is_active', true);

      if (checkError) {
        console.error('Error checking existing accounts:', checkError);
      } else if (existingAccounts && existingAccounts.length > 0) {
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

      await logConnection(data.id, accountData.platform, 'connect', 'success');

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
        toast({
          title: "Erro ao desconectar",
          description: "Não foi possível desconectar a conta.",
          variant: "destructive"
        });
        return;
      }

      await logConnection(accountId, platform, 'disconnect', 'success');

      toast({
        title: "Conta desconectada",
        description: `Conta ${platform} foi desconectada com sucesso.`,
      });

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

  return {
    connectAccount,
    disconnectAccount
  };
};
