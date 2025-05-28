
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface ScheduledPost {
  id: string;
  title?: string;
  content: string;
  media_urls?: string[];
  hashtags?: string[];
  scheduled_for: string;
  status: 'draft' | 'scheduled' | 'published' | 'failed' | 'cancelled';
  platform: string;
  social_account_id: string;
  created_at: string;
  updated_at: string;
}

export const useScheduledPosts = () => {
  const [posts, setPosts] = useState<ScheduledPost[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('scheduled_posts')
        .select(`
          *,
          social_accounts!inner(platform, username)
        `)
        .order('scheduled_for', { ascending: true });

      if (error) {
        console.error('Error fetching scheduled posts:', error);
        toast({
          title: "Erro ao carregar posts",
          description: "Não foi possível carregar os posts agendados.",
          variant: "destructive"
        });
        return;
      }

      setPosts(data || []);
    } catch (error) {
      console.error('Error in fetchPosts:', error);
    } finally {
      setLoading(false);
    }
  };

  const createPost = async (postData: {
    social_account_id: string;
    title?: string;
    content: string;
    media_urls?: string[];
    hashtags?: string[];
    scheduled_for: string;
    platform: string;
  }) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Erro de autenticação",
          description: "Você precisa estar logado para agendar posts.",
          variant: "destructive"
        });
        return null;
      }

      const { data, error } = await supabase
        .from('scheduled_posts')
        .insert([{
          user_id: user.id,
          ...postData,
          status: 'draft' as const
        }])
        .select()
        .single();

      if (error) {
        console.error('Error creating post:', error);
        toast({
          title: "Erro ao agendar post",
          description: "Não foi possível agendar o post. Tente novamente.",
          variant: "destructive"
        });
        return null;
      }

      toast({
        title: "Post agendado!",
        description: "Seu post foi agendado com sucesso.",
      });

      await fetchPosts();
      return data;
    } catch (error) {
      console.error('Error in createPost:', error);
      return null;
    }
  };

  const updatePost = async (postId: string, updates: Partial<Omit<ScheduledPost, 'id' | 'created_at' | 'updated_at'>>) => {
    try {
      const { error } = await supabase
        .from('scheduled_posts')
        .update(updates)
        .eq('id', postId);

      if (error) {
        console.error('Error updating post:', error);
        toast({
          title: "Erro ao atualizar post",
          description: "Não foi possível atualizar o post.",
          variant: "destructive"
        });
        return;
      }

      toast({
        title: "Post atualizado!",
        description: "O post foi atualizado com sucesso.",
      });

      await fetchPosts();
    } catch (error) {
      console.error('Error in updatePost:', error);
    }
  };

  const deletePost = async (postId: string) => {
    try {
      const { error } = await supabase
        .from('scheduled_posts')
        .delete()
        .eq('id', postId);

      if (error) {
        console.error('Error deleting post:', error);
        toast({
          title: "Erro ao excluir post",
          description: "Não foi possível excluir o post.",
          variant: "destructive"
        });
        return;
      }

      toast({
        title: "Post excluído!",
        description: "O post foi excluído com sucesso.",
      });

      await fetchPosts();
    } catch (error) {
      console.error('Error in deletePost:', error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return {
    posts,
    loading,
    createPost,
    updatePost,
    deletePost,
    refetch: fetchPosts
  };
};
