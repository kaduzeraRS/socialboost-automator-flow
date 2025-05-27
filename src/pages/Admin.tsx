
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Users, 
  Pause, 
  Play, 
  Settings, 
  Shield, 
  Activity, 
  AlertTriangle,
  Search,
  MoreVertical,
  Ban,
  CheckCircle,
  XCircle,
  Eye,
  Edit,
  Database,
  Server,
  UserX,
  UserCheck,
  Crown
} from 'lucide-react';
import { useState } from 'react';

const Admin = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
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
      role: 'user'
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
      role: 'admin'
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
      role: 'user'
    }
  ];

  const systemStats = [
    { title: 'Usuários Ativos', value: '2.847', change: '+12%', icon: Users, color: 'text-green-500' },
    { title: 'Automações Rodando', value: '1.923', change: '+8%', icon: Activity, color: 'text-blue-500' },
    { title: 'Contas Pausadas', value: '124', change: '-5%', icon: Pause, color: 'text-yellow-500' },
    { title: 'Alertas Críticos', value: '3', change: '+1', icon: AlertTriangle, color: 'text-red-500' }
  ];

  const toggleAutomation = (userId: number) => {
    console.log('Toggle automation for user:', userId);
  };

  const suspendUser = (userId: number) => {
    console.log('Suspend user:', userId);
  };

  const viewUserDetails = (userId: number) => {
    console.log('View user details:', userId);
  };

  const editUser = (userId: number) => {
    console.log('Edit user:', userId);
  };

  const toggleUserRole = (userId: number) => {
    console.log('Toggle user role:', userId);
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center">
              <Shield className="w-8 h-8 mr-3 text-purple-primary" />
              Painel Administrativo
            </h1>
            <p className="text-muted-foreground mt-2">Gerencie usuários, automações e monitore o sistema</p>
          </div>
          <Badge className="bg-purple-primary text-white px-4 py-2">
            Admin Access
          </Badge>
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

        {/* Quick Actions */}
        <Card className="dark:bg-card bg-white">
          <CardHeader>
            <CardTitle className="flex items-center text-foreground">
              <Settings className="w-6 h-6 mr-2" />
              Ações Rápidas do Sistema
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button className="bg-red-500 hover:bg-red-600 text-white">
                <Pause className="w-4 h-4 mr-2" />
                Pausar Todas Automações
              </Button>
              <Button className="bg-green-500 hover:bg-green-600 text-white">
                <Play className="w-4 h-4 mr-2" />
                Reativar Automações
              </Button>
              <Button className="bg-purple-primary hover:bg-purple-hover text-white">
                <Activity className="w-4 h-4 mr-2" />
                Relatório do Sistema
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* User Management */}
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
                    <th className="text-left py-3 px-4 font-medium text-foreground">Contas</th>
                    <th className="text-left py-3 px-4 font-medium text-foreground">Automação</th>
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
                        {user.accounts} contas
                      </td>
                      <td className="py-3 px-4">
                        <Button
                          size="sm"
                          variant={user.automationActive ? "default" : "outline"}
                          onClick={() => toggleAutomation(user.id)}
                          className={user.automationActive ? "bg-green-500 hover:bg-green-600" : ""}
                        >
                          {user.automationActive ? (
                            <>
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Ativa
                            </>
                          ) : (
                            <>
                              <XCircle className="w-4 h-4 mr-1" />
                              Pausada
                            </>
                          )}
                        </Button>
                      </td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">
                        {user.lastActivity}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => viewUserDetails(user.id)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => editUser(user.id)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => toggleUserRole(user.id)}
                            className="text-yellow-500 hover:text-yellow-600"
                          >
                            {user.role === 'admin' ? <UserX className="w-4 h-4" /> : <UserCheck className="w-4 h-4" />}
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => suspendUser(user.id)}
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

        {/* System Management */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* System Configuration */}
          <Card className="dark:bg-card bg-white">
            <CardHeader>
              <CardTitle className="flex items-center text-foreground">
                <Settings className="w-6 h-6 mr-2" />
                Configurações do Sistema
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
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
                <Label htmlFor="maintenance-mode">Modo de Manutenção</Label>
                <Button variant="outline" className="w-full">
                  Ativar Modo de Manutenção
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Hosting & Database Management */}
          <Card className="dark:bg-card bg-white">
            <CardHeader>
              <CardTitle className="flex items-center text-foreground">
                <Server className="w-6 h-6 mr-2" />
                Hospedagem & Banco de Dados
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-foreground">Hostinger</h4>
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                      Online
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">Status do servidor de hospedagem</p>
                  <Button size="sm" variant="outline" className="w-full">
                    <Activity className="w-4 h-4 mr-2" />
                    Monitorar Servidor
                  </Button>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-foreground">Supabase</h4>
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                      Conectado
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">Banco de dados principal</p>
                  <div className="grid grid-cols-2 gap-2">
                    <Button size="sm" variant="outline">
                      <Database className="w-4 h-4 mr-2" />
                      Backup
                    </Button>
                    <Button size="sm" variant="outline">
                      <Activity className="w-4 h-4 mr-2" />
                      Status
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Admin;
