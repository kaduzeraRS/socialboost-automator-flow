
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Image, Plus } from 'lucide-react';
import { useState } from 'react';

const Scheduling = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const scheduledPosts = [
    {
      id: 1,
      date: '2024-02-15',
      time: '14:30',
      platform: 'Instagram',
      caption: 'Nova coleção chegando! 🔥 #moda #style',
      status: 'Agendado'
    },
    {
      id: 2,
      date: '2024-02-15',
      time: '18:00',
      platform: 'TikTok',
      caption: 'Tutorial de maquiagem rápida ✨',
      status: 'Agendado'
    },
    {
      id: 3,
      date: '2024-02-16',
      time: '12:00',
      platform: 'Instagram',
      caption: 'Dica do dia: como combinar cores 🎨',
      status: 'Agendado'
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Agendamento de Posts</h1>
            <p className="text-muted-foreground">Gerencie e agende seus posts para Instagram e TikTok</p>
          </div>
          <Button className="bg-purple-primary hover:bg-purple-hover">
            <Plus className="w-4 h-4 mr-2" />
            Novo Post
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendário */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="w-5 h-5" />
                <span>Calendário de Posts</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-muted/30 rounded-lg p-8 text-center">
                <Calendar className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Calendário visual será implementado aqui</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Visualize todos os seus posts agendados em um calendário interativo
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Upload Rápido */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Image className="w-5 h-5" />
                <span>Upload Rápido</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                <Image className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">
                  Arraste arquivos aqui ou clique para fazer upload
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Até 10 arquivos (imagem/vídeo)
                </p>
              </div>
              <Button variant="outline" className="w-full">
                Selecionar Arquivos
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Posts Agendados */}
        <Card>
          <CardHeader>
            <CardTitle>Posts Agendados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {scheduledPosts.map((post) => (
                <div
                  key={post.id}
                  className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                      <Image className="w-6 h-6 text-muted-foreground" />
                    </div>
                    <div>
                      <h4 className="font-medium">{post.caption}</h4>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                        <span className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3" />
                          <span>{post.date}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{post.time}</span>
                        </span>
                        <span>{post.platform}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs rounded-full">
                      {post.status}
                    </span>
                    <Button variant="ghost" size="sm">
                      Editar
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                      Excluir
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Scheduling;
