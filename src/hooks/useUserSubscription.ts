
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

export interface UserSubscription {
  id: string;
  user_id: string;
  plan_id: string;
  status: 'active' | 'inactive' | 'canceled' | 'past_due' | 'trialing';
  current_period_start: string;
  current_period_end: string;
  trial_start?: string;
  trial_end?: string;
  current_accounts_used: number;
  current_posts_used: number;
  current_interactions_used: number;
  current_automations_used: number;
  plan: {
    name: string;
    type: string;
    price: number;
    billing_period: string;
    reports_type?: string;
    automations_limit?: number;
  };
}

export const useUserSubscription = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['user-subscription', user?.id],
    queryFn: async () => {
      if (!user) return null;

      const { data, error } = await supabase
        .from('user_subscriptions')
        .select(`
          *,
          plan:subscription_plans(
            name,
            type,
            price,
            billing_period,
            reports_type,
            automations_limit
          )
        `)
        .eq('user_id', user.id)
        .eq('status', 'active')
        .maybeSingle();

      if (error) {
        console.error('Error fetching user subscription:', error);
        throw error;
      }

      return data as UserSubscription | null;
    },
    enabled: !!user,
  });
};
