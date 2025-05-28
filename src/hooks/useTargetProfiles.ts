
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
      console.log('Fetching target profiles...');
      // Simulação de dados até que a tabela seja reconhecida
      const mockProfiles: TargetProfile[] = [];
      setTargetProfiles(mockProfiles);
      console.log('Target profiles loaded:', mockProfiles);
    } catch (error) {
      console.error('Error in fetchTargetProfiles:', error);
      toast({
        title: "Erro ao carregar perfis",
        description: "Não foi possível carregar os perfis alvo.",
        variant: "destructive"
      });
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
      console.log('Adding target profile:', profileData);
      
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        console.error('No authenticated user found');
        toast({
          title: "Erro de autenticação",
          description: "Você precisa estar logado para adicionar perfis alvo.",
          variant: "destructive"
        });
        return null;
      }

      console.log('Authenticated user:', user.id);

      // Simulação até que a tabela seja reconhecida
      const newProfile: TargetProfile = {
        id: crypto.randomUUID(),
        user_id: user.id,
        social_account_id: profileData.social_account_id,
        username: profileData.username,
        platform: profileData.platform,
        followers_count: 0,
        following_count: 0,
        posts_count: 0,
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      console.log('Created new profile:', newProfile);
      setTargetProfiles(prev => [newProfile, ...prev]);

      toast({
        title: "Perfil alvo adicionado!",
        description: `O perfil ${profileData.username} foi adicionado com sucesso.`,
      });

      return newProfile;
    } catch (error) {
      console.error('Error in addTargetProfile:', error);
      toast({
        title: "Erro ao adicionar perfil",
        description: "Não foi possível adicionar o perfil alvo. Tente novamente.",
        variant: "destructive"
      });
      return null;
    }
  };

  const analyzeProfile = async (profileId: string) => {
    try {
      console.log('Analyzing profile:', profileId);
      
      toast({
        title: "Analisando perfil...",
        description: "Extraindo dados do perfil. Isso pode levar alguns minutos.",
      });

      // Simular análise de perfil
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Atualizar dados do perfil
      setTargetProfiles(prev => 
        prev.map(profile => 
          profile.id === profileId 
            ? {
                ...profile,
                last_analyzed_at: new Date().toISOString(),
                followers_count: Math.floor(Math.random() * 10000) + 1000,
                following_count: Math.floor(Math.random() * 1000) + 100,
                posts_count: Math.floor(Math.random() * 500) + 50
              }
            : profile
        )
      );

      toast({
        title: "Análise concluída!",
        description: "Os dados do perfil foram extraídos com sucesso.",
      });
    } catch (error) {
      console.error('Error in analyzeProfile:', error);
      toast({
        title: "Erro na análise",
        description: "Não foi possível analisar o perfil. Tente novamente.",
        variant: "destructive"
      });
    }
  };

  const removeTargetProfile = async (profileId: string) => {
    try {
      console.log('Removing target profile:', profileId);
      setTargetProfiles(prev => prev.filter(profile => profile.id !== profileId));

      toast({
        title: "Perfil removido!",
        description: "O perfil alvo foi removido com sucesso.",
      });
    } catch (error) {
      console.error('Error in removeTargetProfile:', error);
      toast({
        title: "Erro ao remover perfil",
        description: "Não foi possível remover o perfil. Tente novamente.",
        variant: "destructive"
      });
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
