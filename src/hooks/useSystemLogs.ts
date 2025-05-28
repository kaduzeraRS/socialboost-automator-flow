
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface SystemLog {
  id: string;
  user_id: string;
  social_account_id?: string;
  target_profile_id?: string;
  warming_campaign_id?: string;
  action: 'follow' | 'unfollow' | 'like' | 'comment' | 'view' | 'extract_profile' | 'analyze_profile' | 'start_campaign' | 'pause_campaign' | 'stop_campaign';
  status: 'success' | 'failed' | 'pending' | 'skipped';
  target_username?: string;
  target_post_url?: string;
  details?: any;
  error_message?: string;
  executed_at: string;
}

export const useSystemLogs = () => {
  const [logs, setLogs] = useState<SystemLog[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchLogs = async () => {
    try {
      const { data, error } = await supabase
        .from('system_logs')
        .select('*')
        .order('executed_at', { ascending: false })
        .limit(100);

      if (error) {
        console.error('Error fetching system logs:', error);
        return;
      }

      setLogs(data || []);
    } catch (error) {
      console.error('Error in fetchLogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const createLog = async (logData: {
    social_account_id?: string;
    target_profile_id?: string;
    warming_campaign_id?: string;
    action: SystemLog['action'];
    status: SystemLog['status'];
    target_username?: string;
    target_post_url?: string;
    details?: any;
    error_message?: string;
  }) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) return;

      await supabase
        .from('system_logs')
        .insert([{
          user_id: user.id,
          ...logData
        }]);

      await fetchLogs();
    } catch (error) {
      console.error('Error creating log:', error);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  return {
    logs,
    loading,
    createLog,
    refetch: fetchLogs
  };
};
