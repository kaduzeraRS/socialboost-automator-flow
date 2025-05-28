
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { useSocialAccounts } from '@/hooks/useSocialAccounts';
import { useScheduledPosts } from '@/hooks/useScheduledPosts';
import { Upload, Calendar, Clock, Zap } from 'lucide-react';

interface CreatePostDialogProps {
  children: React.ReactNode;
}

const CreatePostDialog = ({ children }: CreatePostDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { accounts } = useSocialAccounts();
  const { createPost } = useScheduledPosts();
  
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    scheduledFor: '',
    scheduledTime: '',
    isAutomatic: false,
    selectedPlatforms: [] as string[],
    selectedAccounts: [] as string[],
    hashtags: '',
    mediaFiles: [] as File[]
  });

  const activeAccounts = accounts.filter(acc => acc.is_active);
  const instagramAccounts = activeAccounts.filter(acc => acc.platform === 'instagram');
  const tiktokAccounts = activeAccounts.filter(acc => acc.platform === 'tiktok');

  const handlePlatformChange = (platform: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      selectedPlatforms: checked 
        ? [...prev.selectedPlatforms, platform]
        : prev.selectedPlatforms.filter(p => p !== platform)
    }));
  };

  const handleAccountChange = (accountId: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      selectedAccounts: checked 
        ? [...prev.selectedAccounts, accountId]
        : prev.selectedAccounts.filter(id => id !== accountId)
    }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setFormData(prev => ({
      ...prev,
      mediaFiles: [...prev.mediaFiles, ...files]
    }));
  };

  const removeFile = (index: number) => {
    setFormData(prev => ({
      ...prev,
      mediaFiles: prev.mediaFiles.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (formData.selectedAccounts.length === 0) {
        toast({
          title: "Erro",
          description: "Selecione pelo menos uma conta para publicar.",
          variant: "destructive"
        });
        return;
      }

      const scheduledDateTime = formData.isAutomatic 
        ? new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString() // 2 horas a partir de agora (horário de pico simulado)
        : new Date(`${formData.scheduledFor}T${formData.scheduledTime}`).toISOString();

      const hashtags = formData.hashtags.split('#').filter(tag => tag.trim()).map(tag => tag.trim());

      // Criar post para cada conta selecionada
      for (const accountId of formData.selectedAccounts) {
        const account = accounts.find(acc => acc.id === accountId);
        if (!account) continue;

        await createPost({
          social_account_id: accountId,
          title: formData.title,
          content: formData.content,
          hashtags: hashtags.length > 0 ? hashtags : undefined,
          scheduled_for: scheduledDateTime,
          platform: account.platform,
          media_urls: [] // Por enquanto vazio, implementaremos upload depois
        });
      }

      toast({
        title: "Posts agendados!",
        description: `${formData.selectedAccounts.length} post(s) foram agendados com sucesso.`,
      });

      // Reset form
      setFormData({
        title: '',
        content: '',
        scheduledFor: '',
        scheduledTime: '',
        isAutomatic: false,
        selectedPlatforms: [],
        selectedAccounts: [],
        hashtags: '',
        mediaFiles: []
      });
      
      setIsOpen(false);
    } catch (error) {
      console.error('Error creating post:', error);
      toast({
        title: "Erro",
        description: "Não foi possível agendar o post. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Criar Novo Post</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Título */}
          <div>
            <Label htmlFor="title">Título (opcional)</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Título do post..."
            />
          </div>

          {/* Descrição */}
          <div>
            <Label htmlFor="content">Descrição *</Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
              placeholder="Escreva a descrição do seu post..."
              className="min-h-[120px]"
              required
            />
          </div>

          {/* Hashtags */}
          <div>
            <Label htmlFor="hashtags">Hashtags</Label>
            <Input
              id="hashtags"
              value={formData.hashtags}
              onChange={(e) => setFormData(prev => ({ ...prev, hashtags: e.target.value }))}
              placeholder="#marketing #digital #instagram"
            />
          </div>

          {/* Upload de arquivos */}
          <div>
            <Label>Arquivos de mídia</Label>
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6">
              <div className="text-center">
                <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground mb-2">
                  Clique para fazer upload ou arraste arquivos aqui
                </p>
                <input
                  type="file"
                  multiple
                  accept="image/*,video/*"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="media-upload"
                />
                <Button type="button" variant="outline" onClick={() => document.getElementById('media-upload')?.click()}>
                  Selecionar Arquivos
                </Button>
              </div>
              
              {formData.mediaFiles.length > 0 && (
                <div className="mt-4 space-y-2">
                  {formData.mediaFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                      <span className="text-sm">{file.name}</span>
                      <Button type="button" variant="ghost" size="sm" onClick={() => removeFile(index)}>
                        Remover
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Agendamento */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="automatic"
                checked={formData.isAutomatic}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isAutomatic: checked as boolean }))}
              />
              <Label htmlFor="automatic" className="flex items-center">
                <Zap className="w-4 h-4 mr-1" />
                Automático (horário de pico)
              </Label>
            </div>

            {!formData.isAutomatic && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date">Data</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.scheduledFor}
                    onChange={(e) => setFormData(prev => ({ ...prev, scheduledFor: e.target.value }))}
                    required={!formData.isAutomatic}
                  />
                </div>
                <div>
                  <Label htmlFor="time">Horário</Label>
                  <Input
                    id="time"
                    type="time"
                    value={formData.scheduledTime}
                    onChange={(e) => setFormData(prev => ({ ...prev, scheduledTime: e.target.value }))}
                    required={!formData.isAutomatic}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Seleção de plataformas */}
          <div>
            <Label>Redes Sociais</Label>
            <div className="space-y-2 mt-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="instagram"
                  checked={formData.selectedPlatforms.includes('instagram')}
                  onCheckedChange={(checked) => handlePlatformChange('instagram', checked as boolean)}
                />
                <Label htmlFor="instagram">Instagram</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="tiktok"
                  checked={formData.selectedPlatforms.includes('tiktok')}
                  onCheckedChange={(checked) => handlePlatformChange('tiktok', checked as boolean)}
                />
                <Label htmlFor="tiktok">TikTok</Label>
              </div>
            </div>
          </div>

          {/* Seleção de contas */}
          <div>
            <Label>Contas para publicar</Label>
            <div className="space-y-2 mt-2 max-h-32 overflow-y-auto">
              {formData.selectedPlatforms.includes('instagram') && instagramAccounts.map(account => (
                <div key={account.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={account.id}
                    checked={formData.selectedAccounts.includes(account.id)}
                    onCheckedChange={(checked) => handleAccountChange(account.id, checked as boolean)}
                  />
                  <Label htmlFor={account.id} className="text-sm">
                    Instagram - {account.username}
                  </Label>
                </div>
              ))}
              
              {formData.selectedPlatforms.includes('tiktok') && tiktokAccounts.map(account => (
                <div key={account.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={account.id}
                    checked={formData.selectedAccounts.includes(account.id)}
                    onCheckedChange={(checked) => handleAccountChange(account.id, checked as boolean)}
                  />
                  <Label htmlFor={account.id} className="text-sm">
                    TikTok - {account.username}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
              Cancelar
            </Button>
            <Button 
              type="submit" 
              className="bg-purple-primary hover:bg-purple-hover"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Agendando...' : 'Agendar Post'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePostDialog;
