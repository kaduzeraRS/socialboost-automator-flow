
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
      // Temporariamente usando warming_logs até que system_logs seja reconhecida
      const { data, error } = await supabase
        .from('warming_logs')
        .select('*')
        .order('executed_at', { ascending: false })
        .limit(100);

      if (error) {
        console.error('Error fetching system logs:', error);
        return;
      }

      // Mapear os dados para o formato esperado
      const mappedData = data?.map(log => ({
        id: log.id,
        user_id: log.user_id,
        warming_campaign_id: log.warming_campaign_id,
        action: log.action as SystemLog['action'],
        status: log.success ? 'success' : 'failed' as SystemLog['status'],
        error_message: log.error_message,
        executed_at: log.executed_at,
        details: { amount: log.amount, target_post_id: log.target_post_id }
      })) || [];

      setLogs(mappedData);
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

      // Temporariamente usando warming_logs
      if (logData.warming_campaign_id) {
        await supabase
          .from('warming_logs')
          .insert([{
            user_id: user.id,
            warming_campaign_id: logData.warming_campaign_id,
            action: logData.action,
            success: logData.status === 'success',
            error_message: logData.error_message,
            amount: logData.details?.amount || 1,
            target_post_id: logData.target_post_url
          }]);
      }

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
