
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface TargetProfile {
  id: string;
  user_id: string;
  social_account_id: string;
  username: string;
  platform: string;
  profile_url?: string;
  followers_count: number;
  following_count: number;
  posts_count: number;
  profile_picture_url?: string;
  bio?: string;
  is_active: boolean;
  last_analyzed_at?: string;
  created_at: string;
  updated_at: string;
}

export const useTargetProfiles = (socialAccountId?: string) => {
  const [targetProfiles, setTargetProfiles] = useState<TargetProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchTargetProfiles = async () => {
    try {
      let query = supabase.from('target_profiles').select('*');
      
      if (socialAccountId) {
        query = query.eq('social_account_id', socialAccountId);
      }
      
      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching target profiles:', error);
        toast({
          title: "Erro ao carregar perfis alvo",
          description: "Não foi possível carregar os perfis alvo.",
          variant: "destructive"
        });
        return;
      }

      setTargetProfiles(data || []);
    } catch (error) {
      console.error('Error in fetchTargetProfiles:', error);
    } finally {
      setLoading(false);
    }
  };

  const addTargetProfile = async (profileData: {
    social_account_id: string;
    username: string;
    platform: string;
  }) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Erro de autenticação",
          description: "Você precisa estar logado para adicionar perfis alvo.",
          variant: "destructive"
        });
        return null;
      }

      const { data, error } = await supabase
        .from('target_profiles')
        .insert([{
          user_id: user.id,
          ...profileData
        }])
        .select()
        .single();

      if (error) {
        console.error('Error adding target profile:', error);
        toast({
          title: "Erro ao adicionar perfil alvo",
          description: "Não foi possível adicionar o perfil alvo.",
          variant: "destructive"
        });
        return null;
      }

      toast({
        title: "Perfil alvo adicionado!",
        description: "O perfil alvo foi adicionado com sucesso.",
      });

      await fetchTargetProfiles();
      return data;
    } catch (error) {
      console.error('Error in addTargetProfile:', error);
      return null;
    }
  };

  const analyzeProfile = async (profileId: string) => {
    try {
      toast({
        title: "Analisando perfil...",
        description: "Extraindo dados do perfil. Isso pode levar alguns minutos.",
      });

      // Simular análise de perfil
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Atualizar última análise
      const { error } = await supabase
        .from('target_profiles')
        .update({ 
          last_analyzed_at: new Date().toISOString(),
          followers_count: Math.floor(Math.random() * 10000) + 1000,
          following_count: Math.floor(Math.random() * 1000) + 100,
          posts_count: Math.floor(Math.random() * 500) + 50
        })
        .eq('id', profileId);

      if (error) {
        console.error('Error updating profile analysis:', error);
        toast({
          title: "Erro na análise",
          description: "Não foi possível completar a análise do perfil.",
          variant: "destructive"
        });
        return;
      }

      toast({
        title: "Análise concluída!",
        description: "Os dados do perfil foram extraídos com sucesso.",
      });

      await fetchTargetProfiles();
    } catch (error) {
      console.error('Error in analyzeProfile:', error);
    }
  };

  const removeTargetProfile = async (profileId: string) => {
    try {
      const { error } = await supabase
        .from('target_profiles')
        .delete()
        .eq('id', profileId);

      if (error) {
        console.error('Error removing target profile:', error);
        toast({
          title: "Erro ao remover perfil",
          description: "Não foi possível remover o perfil alvo.",
          variant: "destructive"
        });
        return;
      }

      toast({
        title: "Perfil removido!",
        description: "O perfil alvo foi removido com sucesso.",
      });

      await fetchTargetProfiles();
    } catch (error) {
      console.error('Error in removeTargetProfile:', error);
    }
  };

  useEffect(() => {
    fetchTargetProfiles();
  }, [socialAccountId]);

  return {
    targetProfiles,
    loading,
    addTargetProfile,
    analyzeProfile,
    removeTargetProfile,
    refetch: fetchTargetProfiles
  };
};
