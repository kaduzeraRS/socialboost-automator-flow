
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Image, Plus, Edit, Trash2 } from 'lucide-react';
import { useState } from 'react';
import CreatePostDialog from '@/components/CreatePostDialog';
import ProtectedRoute from '@/components/ProtectedRoute';

const Scheduling = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [scheduledPosts, setScheduledPosts] = useState([
    {
      id: 1,
      date: '2024-02-15',
      time: '14:30',
      platform: 'Instagram',
      caption: 'Nova coleção chegando! 🔥 #moda #style',
      status: 'Agendado',
      mediaCount: 3
    },
    {
      id: 2,
      date: '2024-02-15',
      time: '18:00',
      platform: 'TikTok',
      caption: 'Tutorial de maquiagem rápida ✨',
      status: 'Agendado',
      mediaCount: 1
    },
    {
      id: 3,
      date: '2024-02-16',
      time: '12:00',
      platform: 'Instagram',
      caption: 'Dica do dia: como combinar cores 🎨',
      status: 'Publicado',
      mediaCount: 2
    },
    {
      id: 4,
      date: '2024-02-16',
      time: '20:30',
      platform: 'TikTok',
      caption: 'Dance challenge! 💃 Vem dançar comigo',
      status: 'Erro',
      mediaCount: 1,
      errorMessage: 'Falha na autenticação'
    }
  ]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Agendado':
        return <Badge className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">Agendado</Badge>;
      case 'Publicado':
        return <Badge className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">Publicado</Badge>;
      case 'Erro':
        return <Badge variant="destructive">Erro</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'Instagram':
        return 'bg-gradient-to-r from-purple-500 to-pink-500';
      case 'TikTok':
        return 'bg-black';
      default:
        return 'bg-gray-500';
    }
  };

  const handleEditPost = (postId: number) => {
    console.log('Editando post:', postId);
    alert('Funcionalidade de edição será implementada');
  };

  const handleDeletePost = (postId: number) => {
    if (confirm('Tem certeza que deseja excluir este post?')) {
      setScheduledPosts(prev => prev.filter(post => post.id !== postId));
    }
  };

  const handleRetryPost = (postId: number) => {
    console.log('Tentando novamente post:', postId);
    setScheduledPosts(prev => prev.map(post => 
      post.id === postId 
        ? { ...post, status: 'Agendado' }
        : post
    ));
  };

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Agendamento de Posts</h1>
              <p className="text-muted-foreground">Gerencie e agende seus posts para Instagram e TikTok</p>
            </div>
            <CreatePostDialog>
              <Button className="bg-purple-primary hover:bg-purple-hover">
                <Plus className="w-4 h-4 mr-2" />
                Novo Post
              </Button>
            </CreatePostDialog>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Calendário Interativo */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5" />
                  <span>Calendário de Posts</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-2 mb-4">
                  {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(day => (
                    <div key={day} className="text-center font-medium text-sm text-muted-foreground p-2">
                      {day}
                    </div>
                  ))}
                </div>
                
                <div className="grid grid-cols-7 gap-2">
                  {Array.from({ length: 35 }, (_, i) => {
                    const date = new Date();
                    date.setDate(date.getDate() - date.getDay() + i);
                    const dayOfMonth = date.getDate();
                    const isToday = date.toDateString() === new Date().toDateString();
                    const hasPost = scheduledPosts.some(post => 
                      new Date(post.date).toDateString() === date.toDateString()
                    );
                    
                    return (
                      <div 
                        key={i}
                        className={`aspect-square p-2 text-center text-sm border rounded-lg cursor-pointer transition-all duration-200 hover:bg-accent
                          ${isToday ? 'bg-purple-primary text-white' : 'bg-background'}
                          ${hasPost ? 'border-purple-primary' : 'border-border'}
                        `}
                        onClick={() => setSelectedDate(date)}
                      >
                        <div className="font-medium">{dayOfMonth}</div>
                        {hasPost && (
                          <div className="w-2 h-2 bg-purple-primary rounded-full mx-auto mt-1"></div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Resumo Rápido */}
            <Card>
              <CardHeader>
                <CardTitle>Resumo de Hoje</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">3</div>
                  <div className="text-sm text-muted-foreground">Posts Agendados</div>
                </div>
                <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">12</div>
                  <div className="text-sm text-muted-foreground">Posts Publicados</div>
                </div>
                <div className="text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">1</div>
                  <div className="text-sm text-muted-foreground">Com Erro</div>
                </div>
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
                {scheduledPosts.map(post => (
                  <div key={post.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-white ${getPlatformColor(post.platform)}`}>
                        {post.platform === 'Instagram' ? (
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                          </svg>
                        ) : (
                          <Image className="w-6 h-6" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium line-clamp-1">{post.caption}</h4>
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
                          <span className="flex items-center space-x-1">
                            <Image className="w-3 h-3" />
                            <span>{post.mediaCount} mídia(s)</span>
                          </span>
                        </div>
                        {post.status === 'Erro' && post.errorMessage && (
                          <div className="text-xs text-red-600 mt-1">{post.errorMessage}</div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusBadge(post.status)}
                      <div className="flex space-x-1">
                        {post.status === 'Agendado' && (
                          <>
                            <Button variant="ghost" size="sm" onClick={() => handleEditPost(post.id)}>
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => handleDeletePost(post.id)} className="text-red-600 hover:text-red-700">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </>
                        )}
                        {post.status === 'Erro' && (
                          <Button variant="ghost" size="sm" onClick={() => handleRetryPost(post.id)} className="text-blue-600 hover:text-blue-700">
                            Tentar Novamente
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
};

export default Scheduling;
