
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { UserPlus, Link2, Instagram, Play, Users, FileText, Eye, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface TargetProfile {
  id: string;
  username: string;
  platform: string;
  profilePicture?: string;
  followers: number;
  following: number;
  posts: number;
  url: string;
}

interface TargetProfileInputProps {
  onAddTarget: (profile: { platform: string; username: string; url: string }) => void;
  targetProfiles?: TargetProfile[];
  onRemoveTarget?: (id: string) => void;
  selectedProfiles?: string[];
  onToggleProfile?: (id: string) => void;
}

const TargetProfileInput = ({ 
  onAddTarget, 
  targetProfiles = [], 
  onRemoveTarget,
  selectedProfiles = [],
  onToggleProfile
}: TargetProfileInputProps) => {
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
      const username = url.replace('@', '');
      return {
        platform: 'instagram', // Default para Instagram
        username: username,
        url: `https://instagram.com/${username}`
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

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  return (
    <div className="space-y-6">
      {/* Campo para adicionar perfil */}
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

      {/* Lista de perfis alvos */}
      {targetProfiles.length > 0 && (
        <Card className="transition-all duration-300 hover:shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Perfis Alvo ({targetProfiles.length})</span>
              <Badge variant="outline">
                {selectedProfiles.length} selecionados
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {targetProfiles.map((profile) => (
                <div 
                  key={profile.id} 
                  className={`border rounded-lg p-4 space-y-3 transition-all duration-200 cursor-pointer ${
                    selectedProfiles.includes(profile.id) 
                      ? 'ring-2 ring-primary bg-primary/5' 
                      : 'hover:bg-accent'
                  }`}
                  onClick={() => onToggleProfile?.(profile.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={profile.profilePicture} alt={profile.username} />
                        <AvatarFallback>
                          {profile.platform === 'instagram' ? (
                            <Instagram className="w-6 h-6 text-purple-500" />
                          ) : (
                            <Play className="w-6 h-6" />
                          )}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-medium">@{profile.username}</h4>
                        <p className="text-sm text-muted-foreground capitalize flex items-center">
                          {profile.platform === 'instagram' ? (
                            <Instagram className="w-3 h-3 mr-1 text-purple-500" />
                          ) : (
                            <Play className="w-3 h-3 mr-1" />
                          )}
                          {profile.platform}
                        </p>
                      </div>
                    </div>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        onRemoveTarget?.(profile.id);
                      }}
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="space-y-1">
                      <div className="flex items-center justify-center">
                        <Users className="w-3 h-3 mr-1 text-blue-500" />
                        <span className="text-xs text-muted-foreground">Seguidores</span>
                      </div>
                      <p className="text-sm font-medium">{formatNumber(profile.followers)}</p>
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex items-center justify-center">
                        <Eye className="w-3 h-3 mr-1 text-green-500" />
                        <span className="text-xs text-muted-foreground">Seguindo</span>
                      </div>
                      <p className="text-sm font-medium">{formatNumber(profile.following)}</p>
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex items-center justify-center">
                        <FileText className="w-3 h-3 mr-1 text-purple-500" />
                        <span className="text-xs text-muted-foreground">Posts</span>
                      </div>
                      <p className="text-sm font-medium">{formatNumber(profile.posts)}</p>
                    </div>
                  </div>

                  {selectedProfiles.includes(profile.id) && (
                    <div className="flex items-center justify-center pt-2">
                      <Badge className="bg-primary text-primary-foreground">
                        Selecionado para automação
                      </Badge>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {targetProfiles.length > 0 && (
              <div className="text-sm text-muted-foreground text-center pt-4 border-t">
                <p>Clique nos perfis para selecioná-los para automação</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TargetProfileInput;
