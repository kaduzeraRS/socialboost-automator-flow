
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Eye, Heart, MessageCircle, Share, TrendingUp } from 'lucide-react';

interface PostAnalyticsDialogProps {
  children: React.ReactNode;
  post: {
    id: number;
    caption: string;
    platform: string;
    engagement: string;
  };
}

const PostAnalyticsDialog = ({ children, post }: PostAnalyticsDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const analytics = {
    views: 12500,
    likes: 820,
    comments: 110,
    shares: 45,
    reach: 9800,
    impressions: 15200,
    saveRate: 6.5,
    clickRate: 2.3
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Análise Detalhada do Post</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="bg-muted p-4 rounded-lg">
            <h3 className="font-medium mb-2">Post</h3>
            <p className="text-sm">{post.caption}</p>
            <p className="text-xs text-muted-foreground mt-2">Plataforma: {post.platform}</p>
          </div>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Visão Geral</TabsTrigger>
              <TabsTrigger value="engagement">Engajamento</TabsTrigger>
              <TabsTrigger value="reach">Alcance</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <Eye className="w-8 h-8 mx-auto text-blue-500 mb-2" />
                    <p className="text-2xl font-bold">{analytics.views.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">Visualizações</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4 text-center">
                    <Heart className="w-8 h-8 mx-auto text-red-500 mb-2" />
                    <p className="text-2xl font-bold">{analytics.likes.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">Curtidas</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 text-center">
                    <MessageCircle className="w-8 h-8 mx-auto text-green-500 mb-2" />
                    <p className="text-2xl font-bold">{analytics.comments}</p>
                    <p className="text-sm text-muted-foreground">Comentários</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 text-center">
                    <Share className="w-8 h-8 mx-auto text-purple-500 mb-2" />
                    <p className="text-2xl font-bold">{analytics.shares}</p>
                    <p className="text-sm text-muted-foreground">Compartilhamentos</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="engagement" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Taxa de Engajamento</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <p className="text-3xl font-bold text-green-600">{post.engagement}</p>
                      <p className="text-sm text-muted-foreground">Taxa total de engajamento</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Métricas Detalhadas</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex justify-between">
                      <span>Taxa de Salvamento:</span>
                      <span className="font-medium">{analytics.saveRate}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Taxa de Clique:</span>
                      <span className="font-medium">{analytics.clickRate}%</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="reach" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <TrendingUp className="w-8 h-8 mx-auto text-blue-500 mb-2" />
                    <p className="text-2xl font-bold">{analytics.reach.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">Alcance</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 text-center">
                    <Eye className="w-8 h-8 mx-auto text-green-500 mb-2" />
                    <p className="text-2xl font-bold">{analytics.impressions.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">Impressões</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PostAnalyticsDialog;
