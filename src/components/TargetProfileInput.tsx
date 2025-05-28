
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UserPlus, Link2, Instagram, Play } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface TargetProfileInputProps {
  onAddTarget: (profile: { platform: string; username: string; url: string }) => void;
}

const TargetProfileInput = ({ onAddTarget }: TargetProfileInputProps) => {
  const [profileUrl, setProfileUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const extractProfileInfo = (url: string) => {
    // Detectar Instagram
    if (url.includes('instagram.com')) {
      const match = url.match(/instagram\.com\/([^/?]+)/);
      if (match) {
        return {
          platform: 'instagram',
          username: match[1],
          url: url
        };
      }
    }

    // Detectar TikTok
    if (url.includes('tiktok.com')) {
      const match = url.match(/tiktok\.com\/@([^/?]+)/);
      if (match) {
        return {
          platform: 'tiktok',
          username: match[1],
          url: url
        };
      }
    }

    // Se não for URL, assumir que é username
    if (!url.includes('.com') && url.trim()) {
      return {
        platform: 'instagram', // Default para Instagram
        username: url.replace('@', ''),
        url: `https://instagram.com/${url.replace('@', '')}`
      };
    }

    return null;
  };

  const handleAddTarget = async () => {
    if (!profileUrl.trim()) {
      toast({
        title: "Campo obrigatório",
        description: "Digite o link ou username do perfil alvo.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);

    try {
      const profileInfo = extractProfileInfo(profileUrl);
      
      if (!profileInfo) {
        toast({
          title: "URL inválida",
          description: "Digite uma URL válida do Instagram ou TikTok, ou apenas o username.",
          variant: "destructive"
        });
        return;
      }

      onAddTarget(profileInfo);
      setProfileUrl('');
      
      toast({
        title: "Perfil adicionado!",
        description: `@${profileInfo.username} foi adicionado aos alvos de aquecimento.`,
      });
    } catch (error) {
      console.error('Error adding target profile:', error);
      toast({
        title: "Erro",
        description: "Não foi possível adicionar o perfil. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddTarget();
    }
  };

  return (
    <Card className="transition-all duration-300 hover:shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-lg">
          <UserPlus className="w-5 h-5 text-primary" />
          <span>Adicionar Perfil Alvo</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex space-x-2">
          <div className="flex-1 relative">
            <Input
              placeholder="https://instagram.com/username ou @username"
              value={profileUrl}
              onChange={(e) => setProfileUrl(e.target.value)}
              onKeyPress={handleKeyPress}
              className="transition-all duration-200 focus:ring-2 focus:ring-primary"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex space-x-1">
              <Instagram className="w-4 h-4 text-purple-500" />
              <Play className="w-4 h-4 text-black" />
            </div>
          </div>
          <Button 
            onClick={handleAddTarget} 
            disabled={loading}
            className="bg-primary hover:bg-primary/90 transition-all duration-200 hover:scale-105"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <Link2 className="w-4 h-4 mr-1" />
                Adicionar
              </>
            )}
          </Button>
        </div>
        
        <div className="text-sm text-muted-foreground">
          <p>• Cole o link completo do perfil (Instagram ou TikTok)</p>
          <p>• Ou digite apenas o username (ex: @username)</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default TargetProfileInput;
