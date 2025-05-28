
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface WarmingCampaign {
  id: string;
  name: string;
  description?: string;
  warming_type: 'likes' | 'comments' | 'views' | 'followers' | 'shares';
  target_amount: number;
  current_amount: number;
  daily_limit?: number;
  status: 'active' | 'paused' | 'completed' | 'failed';
  start_date: string;
  end_date?: string;
  is_active: boolean;
  settings?: any;
  social_account_id: string;
  user_id: string;
  created_at: string;
  updated_at: string;
}

export const useWarmingCampaigns = () => {
  const [campaigns, setCampaigns] = useState<WarmingCampaign[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchCampaigns = async () => {
    try {
      const { data, error } = await supabase
        .from('warming_campaigns')
        .select(`
          *,
          social_accounts!inner(platform, username)
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching warming campaigns:', error);
        toast({
          title: "Erro ao carregar campanhas",
          description: "Não foi possível carregar as campanhas de aquecimento.",
          variant: "destructive"
        });
        return;
      }

      setCampaigns(data || []);
    } catch (error) {
      console.error('Error in fetchCampaigns:', error);
    } finally {
      setLoading(false);
    }
  };

  const createCampaign = async (campaignData: {
    social_account_id: string;
    name: string;
    description?: string;
    warming_type: 'likes' | 'comments' | 'views' | 'followers' | 'shares';
    target_amount: number;
    daily_limit?: number;
    start_date: string;
    end_date?: string;
    settings?: any;
  }) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Erro de autenticação",
          description: "Você precisa estar logado para criar campanhas.",
          variant: "destructive"
        });
        return null;
      }

      const { data, error } = await supabase
        .from('warming_campaigns')
        .insert([{
          user_id: user.id,
          status: 'active' as const,
          ...campaignData
        }])
        .select()
        .single();

      if (error) {
        console.error('Error creating campaign:', error);
        toast({
          title: "Erro ao criar campanha",
          description: "Não foi possível criar a campanha. Tente novamente.",
          variant: "destructive"
        });
        return null;
      }

      toast({
        title: "Campanha criada!",
        description: "Sua campanha de aquecimento foi criada com sucesso.",
      });

      await fetchCampaigns();
      return data;
    } catch (error) {
      console.error('Error in createCampaign:', error);
      return null;
    }
  };

  const updateCampaign = async (campaignId: string, updates: Partial<Omit<WarmingCampaign, 'id' | 'created_at' | 'updated_at'>>) => {
    try {
      const { error } = await supabase
        .from('warming_campaigns')
        .update(updates)
        .eq('id', campaignId);

      if (error) {
        console.error('Error updating campaign:', error);
        toast({
          title: "Erro ao atualizar campanha",
          description: "Não foi possível atualizar a campanha.",
          variant: "destructive"
        });
        return;
      }

      toast({
        title: "Campanha atualizada!",
        description: "A campanha foi atualizada com sucesso.",
      });

      await fetchCampaigns();
    } catch (error) {
      console.error('Error in updateCampaign:', error);
    }
  };

  const deleteCampaign = async (campaignId: string) => {
    try {
      const { error } = await supabase
        .from('warming_campaigns')
        .delete()
        .eq('id', campaignId);

      if (error) {
        console.error('Error deleting campaign:', error);
        toast({
          title: "Erro ao excluir campanha",
          description: "Não foi possível excluir a campanha.",
          variant: "destructive"
        });
        return;
      }

      toast({
        title: "Campanha excluída!",
        description: "A campanha foi excluída com sucesso.",
      });

      await fetchCampaigns();
    } catch (error) {
      console.error('Error in deleteCampaign:', error);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  return {
    campaigns,
    loading,
    createCampaign,
    updateCampaign,
    deleteCampaign,
    refetch: fetchCampaigns
  };
};
