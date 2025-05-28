
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface SubscriptionPlan {
  id: string;
  name: string;
  type: 'quinzenal' | 'mensal' | 'trimestral' | 'anual';
  price: number;
  original_price?: number;
  billing_period: string;
  max_accounts: number;
  max_posts_per_month?: number;
  max_interactions_per_period: number;
  automations_limit?: number;
  basic_support: boolean;
  priority_support: boolean;
  vip_support: boolean;
  basic_analytics: boolean;
  advanced_analytics: boolean;
  api_access: boolean;
  white_label: boolean;
  dedicated_manager: boolean;
  strategic_consulting: boolean;
  custom_dashboard: boolean;
  reports_type?: string;
  is_popular: boolean;
  is_active: boolean;
  sort_order: number;
}

export const useSubscriptionPlans = () => {
  return useQuery({
    queryKey: ['subscription-plans'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('subscription_plans')
        .select('*')
        .eq('is_active', true)
        .order('sort_order');

      if (error) {
        console.error('Error fetching subscription plans:', error);
        throw error;
      }

      return data as SubscriptionPlan[];
    },
  });
};
