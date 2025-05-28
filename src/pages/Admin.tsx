
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { 
  Users, 
  Pause, 
  Play, 
  Settings, 
  Shield, 
  Activity, 
  AlertTriangle,
  Search,
  Ban,
  CheckCircle,
  XCircle,
  Eye,
  Edit,
  Database,
  Server,
  UserX,
  UserCheck,
  Crown,
  Mail,
  MessageCircle,
  BarChart3,
  Calendar,
  FileText,
  Trash2,
  Download,
  Upload,
  RefreshCw,
  Globe,
  Lock,
  Unlock
} from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

const Admin = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTab, setSelectedTab] = useState('users');
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [systemNotifications, setSystemNotifications] = useState(true);
  const { toast } = useToast();
  
  // Mock data for users
  const users = [
    {
      id: 1,
      name: 'João Silva',
      email: 'joao@email.com',
      plan: 'Mensal',
      status: 'Ativo',
      accounts: 3,
      interactions: 1500,
      automationActive: true,
      lastActivity: '2 horas atrás',
      role: 'user',
      joinDate: '2024-01-15',
      totalSpent: 150.00
    },
    {
      id: 2,
      name: 'Maria Santos',
      email: 'maria@email.com',
      plan: 'Anual',
      status: 'Ativo',
      accounts: 8,
      interactions: 5200,
      automationActive: false,
      lastActivity: '1 dia atrás',
      role: 'admin',
      joinDate: '2023-12-01',
      totalSpent: 890.00
    },
    {
      id: 3,
      name: 'Pedro Costa',
      email: 'pedro@email.com',
      plan: 'Quinzenal',
      status: 'Suspenso',
      accounts: 1,
      interactions: 200,
      automationActive: false,
      lastActivity: '5 dias atrás',
      role: 'user',
      joinDate: '2024-02-20',
      totalSpent: 75.00
    }
  ];

  const systemStats = [
    { title: 'Usuários Ativos', value: '2.847', change: '+12%', icon: Users, color: 'text-green-500' },
    { title: 'Automações Rodando', value: '1.923', change: '+8%', icon: Activity, color: 'text-blue-500' },
    { title: 'Contas Pausadas', value: '124', change: '-5%', icon: Pause, color: 'text-yellow-500' },
    { title: 'Alertas Críticos', value: '3', change: '+1', icon: AlertTriangle, color: 'text-red-500' }
  ];

  const recentActivities = [
    { id: 1, user: 'João Silva', action: 'Conectou conta Instagram', time: '2 min atrás', type: 'success' },
    { id: 2, user: 'Maria Santos', action: 'Pausou automação', time: '5 min atrás', type: 'warning' },
    { id: 3, user: 'Pedro Costa', action: 'Falha no login', time: '10 min atrás', type: 'error' },
    { id: 4, user: 'Ana Lima', action: 'Atualizou plano', time: '15 min atrás', type: 'info' }
  ];

  const systemAlerts = [
    { id: 1, title: 'Alto uso de CPU', description: 'Servidor principal usando 85% da CPU', severity: 'high', time: '5 min atrás' },
    { id: 2, title: 'Falhas de conexão', description: '12 falhas de conexão com Instagram API', severity: 'medium', time: '15 min atrás' },
    { id: 3, title: 'Backup concluído', description: 'Backup diário executado com sucesso', severity: 'low', time: '1 hora atrás' }
  ];

  const handleAction = (action: string, userId?: number) => {
    toast({
      title: "Ação executada",
      description: `${action} ${userId ? `para usuário ${userId}` : ''}`,
    });
  };

  const toggleMaintenanceMode = () => {
    setMaintenanceMode(!maintenanceMode);
    toast({
      title: maintenanceMode ? "Modo de manutenção desativado" : "Modo de manutenção ativado",
      description: maintenanceMode ? "Sistema disponível para usuários" : "Sistema em manutenção",
      variant: maintenanceMode ? "default" : "destructive"
    });
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center">
              <Shield className="w-8 h-8 mr-3 text-purple-primary" />
              Painel Administrativo
            </h1>
            <p className="text-muted-foreground mt-2">Gerencie usuários, automações e monitore o sistema</p>
          </div>
          <div className="flex items-center space-x-4">
            <Badge variant={maintenanceMode ? "destructive" : "default"} className="px-4 py-2">
              {maintenanceMode ? "Modo Manutenção" : "Sistema Online"}
            </Badge>
            <Badge className="bg-purple-primary text-white px-4 py-2">
              Admin Access
            </Badge>
          </div>
        </div>

        {/* System Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {systemStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="dark:bg-card bg-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.title}</p>
                      <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                      <p className={`text-sm ${stat.color}`}>{stat.change}</p>
                    </div>
                    <Icon className={`w-8 h-8 ${stat.color}`} />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Main Content Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="users">Usuários</TabsTrigger>
            <TabsTrigger value="system">Sistema</TabsTrigger>
            <TabsTrigger value="monitoring">Monitoramento</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Configurações</TabsTrigger>
            <TabsTrigger value="maintenance">Manutenção</TabsTrigger>
          </TabsList>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <Card className="dark:bg-card bg-white">
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-foreground">
                  <div className="flex items-center">
                    <Users className="w-6 h-6 mr-2" />
                    Gerenciamento de Usuários
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="relative">
                      <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                      <Input
                        placeholder="Buscar usuários..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-64"
                      />
                    </div>
                    <Button className="bg-purple-primary hover:bg-purple-hover text-white">
                      <Users className="w-4 h-4 mr-2" />
                      Novo Usuário
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-4 font-medium text-foreground">Usuário</th>
                        <th className="text-left py-3 px-4 font-medium text-foreground">Plano</th>
                        <th className="text-left py-3 px-4 font-medium text-foreground">Status</th>
                        <th className="text-left py-3 px-4 font-medium text-foreground">Função</th>
                        <th className="text-left py-3 px-4 font-medium text-foreground">Gasto Total</th>
                        <th className="text-left py-3 px-4 font-medium text-foreground">Última Atividade</th>
                        <th className="text-left py-3 px-4 font-medium text-foreground">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.map((user) => (
                        <tr key={user.id} className="border-b border-border hover:bg-muted/50">
                          <td className="py-3 px-4">
                            <div>
                              <p className="font-medium text-foreground">{user.name}</p>
                              <p className="text-sm text-muted-foreground">{user.email}</p>
                              <p className="text-xs text-muted-foreground">Desde {user.joinDate}</p>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <Badge variant="outline" className="text-foreground">
                              {user.plan}
                            </Badge>
                          </td>
                          <td className="py-3 px-4">
                            <Badge 
                              className={
                                user.status === 'Ativo' 
                                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                                  : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                              }
                            >
                              {user.status}
                            </Badge>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center">
                              {user.role === 'admin' && <Crown className="w-4 h-4 mr-1 text-yellow-500" />}
                              <Badge 
                                variant={user.role === 'admin' ? "default" : "outline"}
                                className={user.role === 'admin' ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200" : ""}
                              >
                                {user.role === 'admin' ? 'Admin' : 'Usuário'}
                              </Badge>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-foreground">
                            R$ {user.totalSpent.toFixed(2)}
                          </td>
                          <td className="py-3 px-4 text-sm text-muted-foreground">
                            {user.lastActivity}
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center space-x-1">
                              <Button size="sm" variant="ghost" onClick={() => handleAction('Visualizar', user.id)}>
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="ghost" onClick={() => handleAction('Editar', user.id)}>
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="ghost" onClick={() => handleAction('Enviar email', user.id)}>
                                <Mail className="w-4 h-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleAction('Alternar função', user.id)}
                                className="text-yellow-500 hover:text-yellow-600"
                              >
                                {user.role === 'admin' ? <UserX className="w-4 h-4" /> : <UserCheck className="w-4 h-4" />}
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleAction('Suspender', user.id)}
                                className="text-red-500 hover:text-red-600"
                              >
                                <Ban className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* System Tab */}
          <TabsContent value="system" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="dark:bg-card bg-white">
                <CardHeader>
                  <CardTitle className="flex items-center text-foreground">
                    <Server className="w-6 h-6 mr-2" />
                    Ações Rápidas do Sistema
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-4">
                    <Button 
                      variant={maintenanceMode ? "default" : "destructive"}
                      onClick={toggleMaintenanceMode}
                    >
                      {maintenanceMode ? <Unlock className="w-4 h-4 mr-2" /> : <Lock className="w-4 h-4 mr-2" />}
                      {maintenanceMode ? 'Desativar Manutenção' : 'Ativar Modo Manutenção'}
                    </Button>
                    <Button className="bg-red-500 hover:bg-red-600 text-white" onClick={() => handleAction('Pausar todas automações')}>
                      <Pause className="w-4 h-4 mr-2" />
                      Pausar Todas Automações
                    </Button>
                    <Button className="bg-green-500 hover:bg-green-600 text-white" onClick={() => handleAction('Reativar automações')}>
                      <Play className="w-4 h-4 mr-2" />
                      Reativar Automações
                    </Button>
                    <Button className="bg-blue-500 hover:bg-blue-600 text-white" onClick={() => handleAction('Backup do sistema')}>
                      <Database className="w-4 h-4 mr-2" />
                      Backup Manual
                    </Button>
                    <Button className="bg-purple-primary hover:bg-purple-hover text-white" onClick={() => handleAction('Reiniciar serviços')}>
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Reiniciar Serviços
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="dark:bg-card bg-white">
                <CardHeader>
                  <CardTitle className="flex items-center text-foreground">
                    <Globe className="w-6 h-6 mr-2" />
                    Status dos Serviços
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h4 className="font-medium text-foreground">Hostinger</h4>
                        <p className="text-sm text-muted-foreground">Servidor principal</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                        Online
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h4 className="font-medium text-foreground">Supabase</h4>
                        <p className="text-sm text-muted-foreground">Banco de dados</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                        Conectado
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h4 className="font-medium text-foreground">Instagram API</h4>
                        <p className="text-sm text-muted-foreground">Integração social</p>
                      </div>
                      <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                        Limitado
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Monitoring Tab */}
          <TabsContent value="monitoring" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="dark:bg-card bg-white">
                <CardHeader>
                  <CardTitle className="flex items-center text-foreground">
                    <Activity className="w-6 h-6 mr-2" />
                    Atividades Recentes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentActivities.map((activity) => (
                      <div key={activity.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium text-foreground">{activity.user}</p>
                          <p className="text-sm text-muted-foreground">{activity.action}</p>
                        </div>
                        <div className="text-right">
                          <Badge 
                            variant={activity.type === 'success' ? 'default' : 'outline'}
                            className={
                              activity.type === 'success' ? 'bg-green-100 text-green-800' :
                              activity.type === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                              activity.type === 'error' ? 'bg-red-100 text-red-800' :
                              'bg-blue-100 text-blue-800'
                            }
                          >
                            {activity.type}
                          </Badge>
                          <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="dark:bg-card bg-white">
                <CardHeader>
                  <CardTitle className="flex items-center text-foreground">
                    <AlertTriangle className="w-6 h-6 mr-2" />
                    Alertas do Sistema
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {systemAlerts.map((alert) => (
                      <div key={alert.id} className="p-3 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-foreground">{alert.title}</h4>
                          <Badge 
                            variant={alert.severity === 'high' ? 'destructive' : 'outline'}
                            className={
                              alert.severity === 'high' ? '' :
                              alert.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-green-100 text-green-800'
                            }
                          >
                            {alert.severity}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">{alert.description}</p>
                        <p className="text-xs text-muted-foreground">{alert.time}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <Card className="dark:bg-card bg-white">
              <CardHeader>
                <CardTitle className="flex items-center text-foreground">
                  <BarChart3 className="w-6 h-6 mr-2" />
                  Analytics e Relatórios
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button variant="outline" className="h-20 flex flex-col items-center justify-center" onClick={() => handleAction('Gerar relatório de usuários')}>
                    <Users className="w-6 h-6 mb-2" />
                    Relatório de Usuários
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col items-center justify-center" onClick={() => handleAction('Gerar relatório financeiro')}>
                    <BarChart3 className="w-6 h-6 mb-2" />
                    Relatório Financeiro
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col items-center justify-center" onClick={() => handleAction('Gerar relatório de sistema')}>
                    <Server className="w-6 h-6 mb-2" />
                    Relatório de Sistema
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col items-center justify-center" onClick={() => handleAction('Exportar dados')}>
                    <Download className="w-6 h-6 mb-2" />
                    Exportar Dados
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col items-center justify-center" onClick={() => handleAction('Logs de auditoria')}>
                    <FileText className="w-6 h-6 mb-2" />
                    Logs de Auditoria
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col items-center justify-center" onClick={() => handleAction('Análise de performance')}>
                    <Activity className="w-6 h-6 mb-2" />
                    Performance
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card className="dark:bg-card bg-white">
              <CardHeader>
                <CardTitle className="flex items-center text-foreground">
                  <Settings className="w-6 h-6 mr-2" />
                  Configurações do Sistema
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="max-interactions">Limite de Interações por Dia</Label>
                      <Input
                        id="max-interactions"
                        type="number"
                        defaultValue="10000"
                        className="bg-background text-foreground"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="max-accounts">Limite de Contas por Usuário</Label>
                      <Input
                        id="max-accounts"
                        type="number"
                        defaultValue="50"
                        className="bg-background text-foreground"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="session-timeout">Timeout de Sessão (minutos)</Label>
                      <Input
                        id="session-timeout"
                        type="number"
                        defaultValue="60"
                        className="bg-background text-foreground"
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="system-notifications">Notificações do Sistema</Label>
                      <Switch
                        id="system-notifications"
                        checked={systemNotifications}
                        onCheckedChange={setSystemNotifications}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="auto-backup">Backup Automático</Label>
                      <Switch id="auto-backup" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="maintenance-mode-toggle">Modo Manutenção</Label>
                      <Switch
                        id="maintenance-mode-toggle"
                        checked={maintenanceMode}
                        onCheckedChange={setMaintenanceMode}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="log-level">Nível de Log</Label>
                      <Select defaultValue="info">
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o nível" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="debug">Debug</SelectItem>
                          <SelectItem value="info">Info</SelectItem>
                          <SelectItem value="warn">Warning</SelectItem>
                          <SelectItem value="error">Error</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                <div className="pt-4 border-t">
                  <Button className="bg-purple-primary hover:bg-purple-hover text-white" onClick={() => handleAction('Salvar configurações')}>
                    Salvar Configurações
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Maintenance Tab */}
          <TabsContent value="maintenance" className="space-y-6">
            <Card className="dark:bg-card bg-white">
              <CardHeader>
                <CardTitle className="flex items-center text-foreground">
                  <Database className="w-6 h-6 mr-2" />
                  Ferramentas de Manutenção
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Button variant="outline" className="h-20 flex flex-col items-center justify-center" onClick={() => handleAction('Limpar cache')}>
                    <RefreshCw className="w-6 h-6 mb-2" />
                    Limpar Cache
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col items-center justify-center" onClick={() => handleAction('Otimizar banco')}>
                    <Database className="w-6 h-6 mb-2" />
                    Otimizar Banco
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col items-center justify-center" onClick={() => handleAction('Verificar integridade')}>
                    <CheckCircle className="w-6 h-6 mb-2" />
                    Verificar Integridade
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col items-center justify-center" onClick={() => handleAction('Limpar logs')}>
                    <Trash2 className="w-6 h-6 mb-2" />
                    Limpar Logs Antigos
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col items-center justify-center" onClick={() => handleAction('Importar dados')}>
                    <Upload className="w-6 h-6 mb-2" />
                    Importar Dados
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col items-center justify-center" onClick={() => handleAction('Exportar dados')}>
                    <Download className="w-6 h-6 mb-2" />
                    Exportar Dados
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Admin;
