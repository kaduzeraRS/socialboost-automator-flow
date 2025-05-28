
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Trash2, User, Users, FileText, Plus, Target, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface TargetProfile {
  id: string;
  username: string;
  platform: string;
  followers: number;
  posts: number;
  selected: boolean;
  profileUrl?: string;
}

const TargetProfileManager = () => {
  const [profileInput, setProfileInput] = useState('');
  const [targetProfiles, setTargetProfiles] = useState<TargetProfile[]>([
    {
      id: '1',
      username: 'influencer_example',
      platform: 'Instagram',
      followers: 125000,
      posts: 1250,
      selected: false,
      profileUrl: 'https://instagram.com/influencer_example'
    },
    {
      id: '2',
      username: 'tiktoker_viral',
      platform: 'TikTok',
      followers: 890000,
      posts: 340,
      selected: true,
      profileUrl: 'https://tiktok.com/@tiktoker_viral'
    }
  ]);
  const { toast } = useToast();

  const extractUsername = (input: string) => {
    // Remove @ se estiver presente
    input = input.replace(/^@/, '');
    
    // Se for uma URL, extrair o username
    if (input.includes('instagram.com/') || input.includes('tiktok.com/')) {
      const urlPattern = /(?:instagram\.com\/|tiktok\.com\/@?)([^\/\?]+)/;
      const match = input.match(urlPattern);
      return match ? match[1] : input;
    }
    
    return input;
  };

  const detectPlatform = (input: string): string => {
    if (input.includes('instagram.com')) return 'Instagram';
    if (input.includes('tiktok.com')) return 'TikTok';
    return 'Instagram'; // default
  };

  const addTargetProfile = () => {
    if (!profileInput.trim()) return;

    const username = extractUsername(profileInput);
    const platform = detectPlatform(profileInput);

    // Verificar se já existe
    const exists = targetProfiles.some(p => p.username === username && p.platform === platform);
    if (exists) {
      toast({
        title: "Perfil já adicionado",
        description: `O perfil @${username} já está na lista.`,
        variant: "destructive"
      });
      return;
    }

    // Simular dados do perfil
    const newProfile: TargetProfile = {
      id: Date.now().toString(),
      username,
      platform,
      followers: Math.floor(Math.random() * 500000) + 10000,
      posts: Math.floor(Math.random() * 1000) + 50,
      selected: false,
      profileUrl: platform === 'Instagram' 
        ? `https://instagram.com/${username}`
        : `https://tiktok.com/@${username}`
    };

    setTargetProfiles(prev => [newProfile, ...prev]);
    setProfileInput('');
    
    toast({
      title: "Perfil adicionado!",
      description: `@${username} foi adicionado aos perfis alvo.`
    });
  };

  const toggleProfileSelection = (id: string) => {
    setTargetProfiles(prev =>
      prev.map(profile =>
        profile.id === id ? { ...profile, selected: !profile.selected } : profile
      )
    );
  };

  const removeProfile = (id: string) => {
    setTargetProfiles(prev => prev.filter(profile => profile.id !== id));
    toast({
      title: "Perfil removido",
      description: "O perfil foi removido da lista."
    });
  };

  const selectedCount = targetProfiles.filter(p => p.selected).length;

  return (
    <div className="space-y-6">
      {/* Adicionar Perfil */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Target className="w-5 h-5 mr-2" />
            Adicionar Perfil Alvo
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="@username ou https://instagram.com/username"
              value={profileInput}
              onChange={(e) => setProfileInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTargetProfile()}
            />
            <Button onClick={addTargetProfile} className="bg-purple-primary hover:bg-purple-hover">
              <Plus className="w-4 h-4 mr-2" />
              Adicionar
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            Adicione @username ou cole o link completo do perfil (Instagram ou TikTok)
          </p>
        </CardContent>
      </Card>

      {/* Lista de Perfis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center">
              <Users className="w-5 h-5 mr-2" />
              Perfis Alvo ({targetProfiles.length})
            </span>
            {selectedCount > 0 && (
              <Badge className="bg-purple-primary">
                {selectedCount} selecionado{selectedCount > 1 ? 's' : ''}
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {targetProfiles.map((profile) => (
              <div
                key={profile.id}
                className={`p-4 border rounded-lg transition-all duration-200 cursor-pointer hover:shadow-md ${
                  profile.selected ? 'border-purple-primary bg-purple-50 dark:bg-purple-950' : 'hover:border-purple-200'
                }`}
                onClick={() => toggleProfileSelection(profile.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-medium">@{profile.username}</h4>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <Badge variant="outline" className="text-xs">
                          {profile.platform}
                        </Badge>
                        <span className="flex items-center">
                          <Users className="w-3 h-3 mr-1" />
                          {profile.followers.toLocaleString()}
                        </span>
                        <span className="flex items-center">
                          <FileText className="w-3 h-3 mr-1" />
                          {profile.posts} posts
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(profile.profileUrl, '_blank');
                      }}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeProfile(profile.id);
                      }}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}

            {targetProfiles.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <Target className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Nenhum perfil alvo adicionado ainda</p>
                <p className="text-sm">Adicione perfis para começar o aquecimento</p>
              </div>
            )}
          </div>

          {selectedCount > 0 && (
            <div className="mt-6 pt-4 border-t">
              <Button className="w-full bg-purple-primary hover:bg-purple-hover">
                Iniciar Aquecimento com {selectedCount} perfil{selectedCount > 1 ? 's' : ''}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TargetProfileManager;
