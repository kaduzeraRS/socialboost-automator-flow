
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Lock, Bell, Settings as SettingsIcon } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

const Settings = () => {
  const { toast } = useToast();
  const [profile, setProfile] = useState({
    name: 'João Silva',
    email: 'joao@email.com',
    bio: 'Social media manager e influenciador digital',
    avatar: ''
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: true,
    weeklyReports: false
  });

  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [preferences, setPreferences] = useState({
    darkMode: false,
    autoSave: true,
    timezone: 'America/Sao_Paulo'
  });

  // Check for connected accounts in cookies
  useEffect(() => {
    const accountsCookie = document.cookie
      .split('; ')
      .find(row => row.startsWith('connected_accounts='))
      ?.split('=')[1];

    if (accountsCookie) {
      try {
        const accounts = JSON.parse(decodeURIComponent(accountsCookie));
        if (accounts.length > 0) {
          setProfile(prev => ({ ...prev, avatar: accounts[0].avatar || '' }));
        }
      } catch (e) {
        console.log('Error parsing accounts cookie');
      }
    }

    // Check current theme
    const isDark = document.documentElement.classList.contains('dark');
    setPreferences(prev => ({ ...prev, darkMode: isDark }));
  }, []);

  const handleSaveProfile = () => {
    // Save profile changes
    toast({
      title: "Perfil atualizado",
      description: "Suas informações foram salvas com sucesso.",
    });
  };

  const handleChangePassword = () => {
    if (passwords.newPassword !== passwords.confirmPassword) {
      toast({
        title: "Erro",
        description: "As senhas não coincidem.",
        variant: "destructive",
      });
      return;
    }

    if (passwords.newPassword.length < 6) {
      toast({
        title: "Erro",
        description: "A nova senha deve ter pelo menos 6 caracteres.",
        variant: "destructive",
      });
      return;
    }

    // Change password logic here
    toast({
      title: "Senha alterada",
      description: "Sua senha foi atualizada com sucesso.",
    });

    setPasswords({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };

  const handleSaveNotifications = () => {
    // Save notification preferences
    toast({
      title: "Preferências salvas",
      description: "Suas configurações de notificação foram atualizadas.",
    });
  };

  const handleSavePreferences = () => {
    // Save general preferences
    toast({
      title: "Preferências salvas",
      description: "Suas configurações gerais foram atualizadas.",
    });
  };

  const handleChangeAvatar = () => {
    // Handle avatar change
    toast({
      title: "Avatar",
      description: "Funcionalidade de alteração de avatar em desenvolvimento.",
    });
  };

  const toggleDarkMode = (enabled: boolean) => {
    setPreferences(prev => ({ ...prev, darkMode: enabled }));
    document.documentElement.classList.toggle('dark', enabled);
    localStorage.setItem('theme', enabled ? 'dark' : 'light');
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Configurações</h1>
          <p className="text-muted-foreground">Gerencie sua conta e preferências</p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-muted">
            <TabsTrigger value="profile" className="text-foreground data-[state=active]:bg-background data-[state=active]:text-foreground">Perfil</TabsTrigger>
            <TabsTrigger value="password" className="text-foreground data-[state=active]:bg-background data-[state=active]:text-foreground">Senha</TabsTrigger>
            <TabsTrigger value="notifications" className="text-foreground data-[state=active]:bg-background data-[state=active]:text-foreground">Notificações</TabsTrigger>
            <TabsTrigger value="preferences" className="text-foreground data-[state=active]:bg-background data-[state=active]:text-foreground">Preferências</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="w-5 h-5" />
                  <span>Informações do Perfil</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-6">
                  <Avatar className="w-20 h-20">
                    {profile.avatar ? (
                      <AvatarImage src={profile.avatar} alt={profile.name} />
                    ) : (
                      <AvatarFallback className="bg-purple-primary text-white text-xl">
                        <User className="w-10 h-10" />
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <Button 
                    variant="outline" 
                    onClick={handleChangeAvatar}
                    className="border-input hover:bg-accent hover:text-accent-foreground"
                  >
                    Alterar Avatar
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="text-foreground">Nome</Label>
                    <Input
                      id="name"
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      className="bg-background border-input text-foreground"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-foreground">E-mail</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      readOnly
                      className="bg-muted border-input text-muted-foreground"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="bio" className="text-foreground">Bio</Label>
                  <Input
                    id="bio"
                    value={profile.bio}
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                    placeholder="Conte um pouco sobre você..."
                    className="bg-background border-input text-foreground"
                  />
                </div>

                {/* Post Frequency Section */}
                <div className="space-y-4">
                  <Label className="text-foreground">Frequência de Posts</Label>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-foreground">Baixa</span>
                      <span className="text-foreground">Moderada</span>
                      <span className="text-foreground">Alta</span>
                    </div>
                    <Progress value={65} className="h-3" />
                    <p className="text-sm text-muted-foreground">
                      Configure a frequência ideal para seus posts baseada em suas metas
                    </p>
                  </div>
                </div>

                <Button 
                  className="bg-purple-primary hover:bg-purple-hover text-white"
                  onClick={handleSaveProfile}
                >
                  Salvar Alterações
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="password">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Lock className="w-5 h-5" />
                  <span>Alterar Senha</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="current-password" className="text-foreground">Senha Atual</Label>
                  <Input 
                    id="current-password" 
                    type="password" 
                    value={passwords.currentPassword}
                    onChange={(e) => setPasswords({ ...passwords, currentPassword: e.target.value })}
                    className="bg-background border-input text-foreground"
                  />
                </div>
                <div>
                  <Label htmlFor="new-password" className="text-foreground">Nova Senha</Label>
                  <Input 
                    id="new-password" 
                    type="password" 
                    value={passwords.newPassword}
                    onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
                    className="bg-background border-input text-foreground"
                  />
                </div>
                <div>
                  <Label htmlFor="confirm-password" className="text-foreground">Confirmar Nova Senha</Label>
                  <Input 
                    id="confirm-password" 
                    type="password" 
                    value={passwords.confirmPassword}
                    onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
                    className="bg-background border-input text-foreground"
                  />
                </div>
                <Button 
                  className="bg-purple-primary hover:bg-purple-hover text-white"
                  onClick={handleChangePassword}
                >
                  Atualizar Senha
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bell className="w-5 h-5" />
                  <span>Preferências de Notificação</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Notificações por E-mail</p>
                    <p className="text-sm text-muted-foreground">
                      Receba atualizações sobre posts e campanhas
                    </p>
                  </div>
                  <Switch
                    checked={notifications.emailNotifications}
                    onCheckedChange={(checked) =>
                      setNotifications({ ...notifications, emailNotifications: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Notificações Push</p>
                    <p className="text-sm text-muted-foreground">
                      Alertas em tempo real no navegador
                    </p>
                  </div>
                  <Switch
                    checked={notifications.pushNotifications}
                    onCheckedChange={(checked) =>
                      setNotifications({ ...notifications, pushNotifications: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Relatórios Semanais</p>
                    <p className="text-sm text-muted-foreground">
                      Resumo semanal de performance
                    </p>
                  </div>
                  <Switch
                    checked={notifications.weeklyReports}
                    onCheckedChange={(checked) =>
                      setNotifications({ ...notifications, weeklyReports: checked })
                    }
                  />
                </div>

                <Button 
                  className="bg-purple-primary hover:bg-purple-hover text-white"
                  onClick={handleSaveNotifications}
                >
                  Salvar Preferências
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preferences">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <SettingsIcon className="w-5 h-5" />
                  <span>Preferências Gerais</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Modo Escuro</p>
                    <p className="text-sm text-muted-foreground">
                      Alternar entre tema claro e escuro
                    </p>
                  </div>
                  <Switch 
                    checked={preferences.darkMode}
                    onCheckedChange={toggleDarkMode}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Auto-save</p>
                    <p className="text-sm text-muted-foreground">
                      Salvar automaticamente rascunhos de posts
                    </p>
                  </div>
                  <Switch 
                    checked={preferences.autoSave}
                    onCheckedChange={(checked) =>
                      setPreferences({ ...preferences, autoSave: checked })
                    }
                  />
                </div>

                <div>
                  <Label htmlFor="timezone" className="text-foreground">Fuso Horário</Label>
                  <Input
                    id="timezone"
                    value={preferences.timezone}
                    onChange={(e) => setPreferences({ ...preferences, timezone: e.target.value })}
                    className="bg-background border-input text-foreground"
                  />
                </div>

                <Button 
                  className="bg-purple-primary hover:bg-purple-hover text-white"
                  onClick={handleSavePreferences}
                >
                  Salvar Preferências
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
