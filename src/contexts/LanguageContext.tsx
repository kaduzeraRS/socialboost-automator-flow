
import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'pt-BR' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const translations = {
  'pt-BR': {
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
    'manage_subscription': 'Gerenciar Assinatura'
  },
  'en': {
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
    'manage_subscription': 'Manage Subscription'
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
