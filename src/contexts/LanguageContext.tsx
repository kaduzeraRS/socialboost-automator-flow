import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'pt-BR' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const translations = {
  'pt-BR': {
    // Common
    'dashboard': 'Dashboard',
    'posts_scheduled': 'Posts Agendados',
    'interactions': 'Interações',
    'system': 'Sistema',
    'marketing': 'Marketing',
    'view_all_settings': 'Ver todas as configurações',
    'manage_payment': 'Gerenciar Pagamento',
    'cancel': 'Cancelar',
    'choose_plan': 'Escolher Plano',
    'start_now': 'Começar Agora',
    'current_plan': 'Plano Atual',
    'your_plan': 'Seu Plano',
    'upgrade': 'Fazer Upgrade',
    'manage_subscription': 'Gerenciar Assinatura',
    'loading': 'Carregando',
    'followers': 'seguidores',
    'connected': 'Conectado',
    'connect': 'Conectar',
    
    // User Dropdown
    'my_account': 'Minha Conta',
    'edit_profile': 'Editar Perfil',
    'settings': 'Configurações',
    'help': 'Ajuda',
    'logout': 'Sair',
    
    // Sidebar Menu
    'panel': 'Painel',
    'post_scheduling': 'Agendamento de Posts',
    'account_warming': 'Aquecimento de Conta',
    'accounts': 'Contas',
    'subscription_plans': 'Planos de Assinatura',
    'admin': 'Admin',
    
    // Settings Page
    'profile': 'Perfil',
    'password': 'Senha',
    'notifications': 'Notificações',
    'preferences': 'Preferências',
    'profile_information': 'Informações do Perfil',
    'change_password': 'Alterar Senha',
    'notification_preferences': 'Preferências de Notificação',
    'general_preferences': 'Preferências Gerais',
    'name': 'Nome',
    'email': 'E-mail',
    'bio': 'Bio',
    'post_frequency': 'Frequência de Posts',
    'save_changes': 'Salvar Alterações',
    'current_password': 'Senha Atual',
    'new_password': 'Nova Senha',
    'confirm_password': 'Confirmar Nova Senha',
    'update_password': 'Atualizar Senha',
    'email_notifications': 'Notificações por E-mail',
    'push_notifications': 'Notificações Push',
    'weekly_reports': 'Relatórios Semanais',
    'save_preferences': 'Salvar Preferências',
    'dark_mode': 'Modo Escuro',
    'auto_save': 'Auto-save',
    'timezone': 'Fuso Horário',
    'change_avatar': 'Alterar Avatar',
    
    // Plans Page
    'biweekly': 'Quinzenal',
    'monthly': 'Mensal',
    'quarterly': 'Trimestral',
    'annual': 'Anual',
    'interactions_per_15_days': 'interações/15 dias',
    'interactions_per_month': 'interações/mês',
    'scheduled_posts': 'posts agendados',
    'interaction_packages': 'Pacotes de Interações',
    'additional_interactions': 'interações adicionais',
    
    // Dashboard
    'total_accounts': 'Total de Contas',
    'active_campaigns': 'Campanhas Ativas',
    'scheduled_posts_today': 'Posts Agendados Hoje',
    'engagement_rate': 'Taxa de Engajamento',
    'recent_activity': 'Atividade Recente',
    'account_performance': 'Performance das Contas',
    'quick_actions': 'Ações Rápidas',
    'schedule_post': 'Agendar Post',
    'add_account': 'Adicionar Conta',
    'view_analytics': 'Ver Analytics',
    
    // Account Warming
    'warming_settings': 'Configurações de Aquecimento',
    'warming_status': 'Status do Aquecimento',
    'warming_progress': 'Progresso do Aquecimento',
    'daily_interactions': 'Interações Diárias',
    'warming_schedule': 'Cronograma de Aquecimento',
    
    // Scheduling
    'create_post': 'Criar Post',
    'scheduled_posts_list': 'Lista de Posts Agendados',
    'post_content': 'Conteúdo do Post',
    'schedule_date': 'Data de Agendamento',
    'target_accounts': 'Contas Alvo',
    
    // Accounts
    'connected_accounts': 'Contas Conectadas',
    'add_new_account': 'Adicionar Nova Conta',
    'account_status': 'Status da Conta',
    'last_activity': 'Última Atividade',
    'manage_accounts': 'Gerenciar Contas',
    'connect_new_account': 'Conectar Nova Conta',
    'connect_instagram_desc': 'Conecte sua conta do Instagram para agendar posts e analisar métricas',
    'connect_tiktok_desc': 'Conecte sua conta do TikTok para gerenciar conteúdo e acompanhar performance',
    
    // Admin
    'user_management': 'Gerenciamento de Usuários',
    'system_stats': 'Estatísticas do Sistema',
    'platform_analytics': 'Analytics da Plataforma',
    
    // Auth & Errors
    'auth_error': 'Erro de autenticação',
    'login_required': 'Você precisa estar logado para conectar uma conta',
    'popup_blocked': 'Pop-up bloqueado',
    'enable_popups': 'Permita pop-ups para este site para continuar',
    'connecting_account': 'Conectando conta',
    'simulating_connection': 'Simulando conexão com',
    'account_connected': 'Conta conectada!',
    'your_account': 'Sua conta',
    'connected_successfully': 'foi conectada com sucesso',
    'connection_error': 'Erro na conexão',
    'connection_failed': 'Não foi possível conectar a conta. Tente novamente.'
  },
  'en': {
    // Common
    'dashboard': 'Dashboard',
    'posts_scheduled': 'Scheduled Posts',
    'interactions': 'Interactions',
    'system': 'System',
    'marketing': 'Marketing',
    'view_all_settings': 'View all settings',
    'manage_payment': 'Manage Payment',
    'cancel': 'Cancel',
    'choose_plan': 'Choose Plan',
    'start_now': 'Start Now',
    'current_plan': 'Current Plan',
    'your_plan': 'Your Plan',
    'upgrade': 'Upgrade',
    'manage_subscription': 'Manage Subscription',
    'loading': 'Loading',
    'followers': 'followers',
    'connected': 'Connected',
    'connect': 'Connect',
    
    // User Dropdown
    'my_account': 'My Account',
    'edit_profile': 'Edit Profile',
    'settings': 'Settings',
    'help': 'Help',
    'logout': 'Logout',
    
    // Sidebar Menu
    'panel': 'Panel',
    'post_scheduling': 'Post Scheduling',
    'account_warming': 'Account Warming',
    'accounts': 'Accounts',
    'subscription_plans': 'Subscription Plans',
    'admin': 'Admin',
    
    // Settings Page
    'profile': 'Profile',
    'password': 'Password',
    'notifications': 'Notifications',
    'preferences': 'Preferences',
    'profile_information': 'Profile Information',
    'change_password': 'Change Password',
    'notification_preferences': 'Notification Preferences',
    'general_preferences': 'General Preferences',
    'name': 'Name',
    'email': 'Email',
    'bio': 'Bio',
    'post_frequency': 'Post Frequency',
    'save_changes': 'Save Changes',
    'current_password': 'Current Password',
    'new_password': 'New Password',
    'confirm_password': 'Confirm Password',
    'update_password': 'Update Password',
    'email_notifications': 'Email Notifications',
    'push_notifications': 'Push Notifications',
    'weekly_reports': 'Weekly Reports',
    'save_preferences': 'Save Preferences',
    'dark_mode': 'Dark Mode',
    'auto_save': 'Auto-save',
    'timezone': 'Timezone',
    'change_avatar': 'Change Avatar',
    
    // Plans Page
    'biweekly': 'Biweekly',
    'monthly': 'Monthly',
    'quarterly': 'Quarterly',
    'annual': 'Annual',
    'interactions_per_15_days': 'interactions/15 days',
    'interactions_per_month': 'interactions/month',
    'scheduled_posts': 'scheduled posts',
    'interaction_packages': 'Interaction Packages',
    'additional_interactions': 'additional interactions',
    
    // Dashboard
    'total_accounts': 'Total Accounts',
    'active_campaigns': 'Active Campaigns',
    'scheduled_posts_today': 'Scheduled Posts Today',
    'engagement_rate': 'Engagement Rate',
    'recent_activity': 'Recent Activity',
    'account_performance': 'Account Performance',
    'quick_actions': 'Quick Actions',
    'schedule_post': 'Schedule Post',
    'add_account': 'Add Account',
    'view_analytics': 'View Analytics',
    
    // Account Warming
    'warming_settings': 'Warming Settings',
    'warming_status': 'Warming Status',
    'warming_progress': 'Warming Progress',
    'daily_interactions': 'Daily Interactions',
    'warming_schedule': 'Warming Schedule',
    
    // Scheduling
    'create_post': 'Create Post',
    'scheduled_posts_list': 'Scheduled Posts List',
    'post_content': 'Post Content',
    'schedule_date': 'Schedule Date',
    'target_accounts': 'Target Accounts',
    
    // Accounts
    'connected_accounts': 'Connected Accounts',
    'add_new_account': 'Add New Account',
    'account_status': 'Account Status',
    'last_activity': 'Last Activity',
    'manage_accounts': 'Manage Accounts',
    'connect_new_account': 'Connect New Account',
    'connect_instagram_desc': 'Connect your Instagram account to schedule posts and analyze metrics',
    'connect_tiktok_desc': 'Connect your TikTok account to manage content and track performance',
    
    // Admin
    'user_management': 'User Management',
    'system_stats': 'System Stats',
    'platform_analytics': 'Platform Analytics',
    
    // Auth & Errors
    'auth_error': 'Authentication Error',
    'login_required': 'You need to be logged in to connect an account',
    'popup_blocked': 'Popup blocked',
    'enable_popups': 'Please enable popups for this site to continue',
    'connecting_account': 'Connecting account',
    'simulating_connection': 'Simulating connection with',
    'account_connected': 'Account connected!',
    'your_account': 'Your account',
    'connected_successfully': 'was connected successfully',
    'connection_error': 'Connection error',
    'connection_failed': 'Could not connect the account. Please try again.'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('pt-BR');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
