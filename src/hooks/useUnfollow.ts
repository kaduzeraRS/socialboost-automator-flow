
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface UnfollowItem {
  id: string;
  user_id: string;
  social_account_id: string;
  target_username: string;
  follow_date?: string;
  unfollow_type: 'non_follower' | 'mass' | 'list';
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  created_at: string;
  processed_at?: string;
}

export const useUnfollow = () => {
  const [unfollowQueue, setUnfollowQueue] = useState<UnfollowItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchUnfollowQueue = async () => {
    try {
      // Simulação até que a tabela seja reconhecida
      setUnfollowQueue([]);
    } catch (error) {
      console.error('Error in fetchUnfollowQueue:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToUnfollowQueue = async (items: {
    social_account_id: string;
    target_username: string;
    unfollow_type: 'non_follower' | 'mass' | 'list';
    follow_date?: string;
  }[]) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Erro de autenticação",
          description: "Você precisa estar logado.",
          variant: "destructive"
        });
        return;
      }

      // Simulação até que a tabela seja reconhecida
      const newItems: UnfollowItem[] = items.map(item => ({
        id: crypto.randomUUID(),
        user_id: user.id,
        social_account_id: item.social_account_id,
        target_username: item.target_username,
        unfollow_type: item.unfollow_type,
        follow_date: item.follow_date,
        status: 'pending' as const,
        created_at: new Date().toISOString()
      }));

      setUnfollowQueue(prev => [...newItems, ...prev]);

      toast({
        title: "Adicionado à fila!",
        description: `${items.length} perfis adicionados à fila de unfollow.`,
      });
    } catch (error) {
      console.error('Error in addToUnfollowQueue:', error);
    }
  };

  const processUnfollowQueue = async (socialAccountId: string) => {
    try {
      const pendingItems = unfollowQueue.filter(
        item => item.status === 'pending' && item.social_account_id === socialAccountId
      );

      for (const item of pendingItems.slice(0, 10)) {
        // Simular unfollow
        await new Promise(resolve => setTimeout(resolve, 1000));

        setUnfollowQueue(prev =>
          prev.map(queueItem =>
            queueItem.id === item.id
              ? { ...queueItem, status: 'completed' as const, processed_at: new Date().toISOString() }
              : queueItem
          )
        );
      }

      toast({
        title: "Unfollow processado!",
        description: `${Math.min(pendingItems.length, 10)} perfis foram removidos.`,
      });
    } catch (error) {
      console.error('Error processing unfollow queue:', error);
    }
  };

  const getNonFollowers = async (socialAccountId: string) => {
    // Simular busca de não seguidores
    const mockNonFollowers = [
      { username: '@usuario1', followers: 1500 },
      { username: '@usuario2', followers: 850 },
      { username: '@usuario3', followers: 2300 },
      { username: '@usuario4', followers: 650 },
      { username: '@usuario5', followers: 1200 }
    ];
    
    return mockNonFollowers;
  };

  useEffect(() => {
    fetchUnfollowQueue();
  }, []);

  return {
    unfollowQueue,
    loading,
    addToUnfollowQueue,
    processUnfollowQueue,
    getNonFollowers,
    refetch: fetchUnfollowQueue
  };
};
