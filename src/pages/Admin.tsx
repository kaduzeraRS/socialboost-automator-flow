
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { 
  Users, 
  Settings, 
  Pause, 
  Play, 
  AlertTriangle, 
  Database,
  Shield,
  Activity,
  BarChart3,
  UserX,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { useState } from 'react';

const Admin = () => {
  const [automationEnabled, setAutomationEnabled] = useState(true);

  const users = [
    {
      id: 1,
      name: 'João Silva',
      email: 'joao@email.com',
      plan: 'Mensal',
      status: 'Ativo',
      accounts: 3,
      lastActivity: '2 min atrás'
    },
    {
      id: 2,
      name: 'Maria Santos',
      email: 'maria@email.com',
      plan: 'Anual',
      status: 'Ativo',
      accounts: 8,
      lastActivity: '1 hora atrás'
    },
    {
      id: 3,
      name: 'Pedro Costa',
      email: 'pedro@email.com',
      plan: 'Quinzenal',
      status: 'Suspenso',
      accounts: 1,
      lastActivity: '3 dias atrás'
    }
  ];

  const systemStats = [
    { label: 'Usuários Ativos', value: '1,234', icon: Users, color: 'text-green-600' },
    { label: 'Contas Conectadas', value: '3,456', icon: Shield, color: 'text-blue-600' },
    { label: 'Posts Agendados', value: '12,890', icon: Activity, color: 'text-purple-600' },
    { label: 'Interações/Dia', value: '45,678', icon: BarChart3, color: 'text-orange-600' }
  ];

  const handlePauseUser = (userId: number) => {
    console.log('Pausar usuário:', userId);
  };

  const handleResumeUser = (userId: number) => {
    console.log('Reativar usuário:', userId);
  };

  const handleDeleteUser = (userId: number) => {
    console.log('Excluir usuário:', userId);
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Painel Admin</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">Gerenciamento do sistema e usuários</p>
        </div>

        {/* System Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {systemStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{stat.label}</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                    </div>
                    <Icon className={`w-8 h-8 ${stat.color}`} />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* System Controls */}
        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Settings className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              <span className="text-gray-900 dark:text-white">Controles do Sistema</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center space-x-3">
                {automationEnabled ? (
                  <Play className="w-5 h-5 text-green-500" />
                ) : (
                  <Pause className="w-5 h-5 text-red-500" />
                )}
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">Automação Geral</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {automationEnabled ? 'Sistema funcionando normalmente' : 'Sistema pausado para manutenção'}
                  </p>
                </div>
              </div>
              <Switch
                checked={automationEnabled}
                onCheckedChange={setAutomationEnabled}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                <Database className="w-4 h-4 mr-2" />
                Backup Database
              </Button>
              <Button className="bg-yellow-600 hover:bg-yellow-700 text-white">
                <AlertTriangle className="w-4 h-4 mr-2" />
                Modo Manutenção
              </Button>
              <Button className="bg-green-600 hover:bg-green-700 text-white">
                <Activity className="w-4 h-4 mr-2" />
                Ver Logs
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* User Management */}
        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              <span className="text-gray-900 dark:text-white">Gerenciamento de Usuários</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {users.map((user) => (
                <div key={user.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-medium">
                      {user.name[0]}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">{user.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{user.email}</p>
                      <div className="flex items-center space-x-4 mt-1">
                        <Badge className={`${user.status === 'Ativo' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'}`}>
                          {user.status}
                        </Badge>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          Plano: {user.plan} • {user.accounts} contas • {user.lastActivity}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {user.status === 'Ativo' ? (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handlePauseUser(user.id)}
                        className="text-yellow-600 hover:text-yellow-700 border-yellow-300 hover:border-yellow-400"
                      >
                        <Pause className="w-4 h-4 mr-1" />
                        Pausar
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleResumeUser(user.id)}
                        className="text-green-600 hover:text-green-700 border-green-300 hover:border-green-400"
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Reativar
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDeleteUser(user.id)}
                      className="text-red-600 hover:text-red-700 border-red-300 hover:border-red-400"
                    >
                      <UserX className="w-4 h-4 mr-1" />
                      Excluir
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white">Ações Rápidas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button className="bg-purple-600 hover:bg-purple-700 text-white h-20 flex flex-col items-center justify-center">
                <Users className="w-6 h-6 mb-2" />
                Novos Usuários
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white h-20 flex flex-col items-center justify-center">
                <BarChart3 className="w-6 h-6 mb-2" />
                Relatórios
              </Button>
              <Button className="bg-green-600 hover:bg-green-700 text-white h-20 flex flex-col items-center justify-center">
                <Shield className="w-6 h-6 mb-2" />
                Segurança
              </Button>
              <Button className="bg-orange-600 hover:bg-orange-700 text-white h-20 flex flex-col items-center justify-center">
                <Activity className="w-6 h-6 mb-2" />
                Monitoramento
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Admin;
