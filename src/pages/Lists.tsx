
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, Calendar, Users, Clock, Trash2 } from 'lucide-react';
import { useState } from 'react';

const Lists = () => {
  const [lists, setLists] = useState([
    {
      id: '1',
      targetProfile: '@cristiano',
      followersCount: 615000000,
      generatedAt: '2024-01-15T10:30:00Z',
      expiresAt: '2024-01-22T10:30:00Z',
      downloadCount: 3,
      status: 'active'
    },
    {
      id: '2',
      targetProfile: '@therock',
      followersCount: 389000000,
      generatedAt: '2024-01-14T15:45:00Z',
      expiresAt: '2024-01-21T15:45:00Z',
      downloadCount: 1,
      status: 'active'
    },
    {
      id: '3',
      targetProfile: '@selenagomez',
      followersCount: 428000000,
      generatedAt: '2024-01-10T09:20:00Z',
      expiresAt: '2024-01-17T09:20:00Z',
      downloadCount: 5,
      status: 'expired'
    }
  ]);

  const formatNumber = (num: number) => {
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(1) + 'B';
    }
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getDaysRemaining = (expiresAt: string) => {
    const now = new Date();
    const expires = new Date(expiresAt);
    const diffTime = expires.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  };

  const handleDownload = (listId: string, targetProfile: string) => {
    console.log(`Fazendo download da lista de ${targetProfile}`);
    // Aqui você implementaria o download real do arquivo
    alert(`Download iniciado para a lista de seguidores de ${targetProfile}`);
    
    // Atualizar contador de downloads
    setLists(prev => prev.map(list => 
      list.id === listId 
        ? { ...list, downloadCount: list.downloadCount + 1 }
        : list
    ));
  };

  const handleDelete = (listId: string) => {
    if (confirm('Tem certeza que deseja excluir esta lista?')) {
      setLists(prev => prev.filter(list => list.id !== listId));
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Listas de Seguidores</h1>
          <p className="text-muted-foreground">Gerencie suas listas de seguidores capturadas dos perfis alvo</p>
        </div>

        {lists.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <Users className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Nenhuma lista disponível</h3>
              <p className="text-muted-foreground mb-4">
                Vá para o Menu de Aquecimento de Conta para gerar suas primeiras listas de seguidores.
              </p>
              <Button asChild>
                <a href="/aquecimento">Ir para Aquecimento</a>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {lists.map((list) => {
              const daysRemaining = getDaysRemaining(list.expiresAt);
              const isExpired = list.status === 'expired' || daysRemaining <= 0;
              
              return (
                <Card key={list.id} className={`transition-all duration-200 hover:shadow-md ${isExpired ? 'opacity-75' : ''}`}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center space-x-2">
                        <Users className="w-5 h-5" />
                        <span>Lista de {list.targetProfile}</span>
                      </CardTitle>
                      <div className="flex items-center space-x-2">
                        {isExpired ? (
                          <Badge variant="destructive">Expirada</Badge>
                        ) : (
                          <Badge variant="outline" className="text-green-600 border-green-600">
                            {daysRemaining} {daysRemaining === 1 ? 'dia restante' : 'dias restantes'}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                      <div className="text-center p-3 bg-muted rounded-lg">
                        <Users className="w-4 h-4 mx-auto mb-1 text-blue-600" />
                        <p className="text-sm text-muted-foreground">Seguidores</p>
                        <p className="font-semibold">{formatNumber(list.followersCount)}</p>
                      </div>
                      
                      <div className="text-center p-3 bg-muted rounded-lg">
                        <Calendar className="w-4 h-4 mx-auto mb-1 text-green-600" />
                        <p className="text-sm text-muted-foreground">Gerada em</p>
                        <p className="font-semibold text-xs">{formatDate(list.generatedAt)}</p>
                      </div>
                      
                      <div className="text-center p-3 bg-muted rounded-lg">
                        <Clock className="w-4 h-4 mx-auto mb-1 text-orange-600" />
                        <p className="text-sm text-muted-foreground">Expira em</p>
                        <p className="font-semibold text-xs">{formatDate(list.expiresAt)}</p>
                      </div>
                      
                      <div className="text-center p-3 bg-muted rounded-lg">
                        <Download className="w-4 h-4 mx-auto mb-1 text-purple-600" />
                        <p className="text-sm text-muted-foreground">Downloads</p>
                        <p className="font-semibold">{list.downloadCount}</p>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="text-sm text-muted-foreground">
                        {isExpired ? (
                          <span className="text-red-600">Esta lista expirou e não pode mais ser baixada</span>
                        ) : (
                          <span>Você pode baixar esta lista até {formatDate(list.expiresAt)}</span>
                        )}
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDownload(list.id, list.targetProfile)}
                          disabled={isExpired}
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Baixar CSV
                        </Button>
                        
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(list.id)}
                          className="text-red-600 border-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Lists;
