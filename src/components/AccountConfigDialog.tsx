
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

interface AccountConfigDialogProps {
  children: React.ReactNode;
  account: {
    id: number;
    platform: string;
    username: string;
  };
}

const AccountConfigDialog = ({ children, account }: AccountConfigDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  const [config, setConfig] = useState({
    autoPost: true,
    bestTimePost: true,
    hashtagSuggestions: true,
    notifications: true,
    postFrequency: 'daily'
  });

  const handleSave = () => {
    toast({
      title: "Configurações salvas",
      description: `Configurações da conta ${account.username} foram atualizadas.`,
    });
    console.log('Saving config for account:', account.id, config);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Configurações - {account.username}</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="posting" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="posting">Postagem</TabsTrigger>
            <TabsTrigger value="engagement">Engajamento</TabsTrigger>
            <TabsTrigger value="notifications">Notificações</TabsTrigger>
          </TabsList>
          
          <TabsContent value="posting" className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="auto-post">Postagem Automática</Label>
              <Switch
                id="auto-post"
                checked={config.autoPost}
                onCheckedChange={(checked) => setConfig({...config, autoPost: checked})}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="best-time">Melhor Horário para Postar</Label>
              <Switch
                id="best-time"
                checked={config.bestTimePost}
                onCheckedChange={(checked) => setConfig({...config, bestTimePost: checked})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="frequency">Frequência de Posts</Label>
              <select 
                className="w-full p-2 border rounded-md"
                value={config.postFrequency}
                onChange={(e) => setConfig({...config, postFrequency: e.target.value})}
              >
                <option value="daily">Diário</option>
                <option value="weekly">Semanal</option>
                <option value="custom">Personalizado</option>
              </select>
            </div>
          </TabsContent>
          
          <TabsContent value="engagement" className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="hashtag-suggestions">Sugestões de Hashtags</Label>
              <Switch
                id="hashtag-suggestions"
                checked={config.hashtagSuggestions}
                onCheckedChange={(checked) => setConfig({...config, hashtagSuggestions: checked})}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="notifications" className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="notifications">Receber Notificações</Label>
              <Switch
                id="notifications"
                checked={config.notifications}
                onCheckedChange={(checked) => setConfig({...config, notifications: checked})}
              />
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="flex justify-end space-x-2 pt-4">
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSave} className="bg-purple-primary hover:bg-purple-hover">
            Salvar Configurações
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AccountConfigDialog;
