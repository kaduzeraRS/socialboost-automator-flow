
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus } from 'lucide-react';
import { useTargetProfiles } from '@/hooks/useTargetProfiles';
import { useAuth } from '@/hooks/useAuth';

interface TargetProfileDialogProps {
  socialAccounts: any[];
  onProfileAdded?: () => void;
}

const TargetProfileDialog = ({ socialAccounts, onProfileAdded }: TargetProfileDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [selectedAccount, setSelectedAccount] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addTargetProfile } = useTargetProfiles();
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('Form submitted:', { username, selectedAccount, user: !!user });
    
    if (!user) {
      console.error('User not authenticated');
      return;
    }
    
    if (!username || !selectedAccount) {
      console.log('Missing required fields:', { username, selectedAccount });
      return;
    }

    const account = socialAccounts.find(acc => acc.id === selectedAccount);
    if (!account) {
      console.error('Account not found:', selectedAccount);
      return;
    }

    setIsSubmitting(true);
    console.log('Adding profile with data:', {
      social_account_id: selectedAccount,
      username: username.startsWith('@') ? username : `@${username}`,
      platform: account.platform
    });

    try {
      const result = await addTargetProfile({
        social_account_id: selectedAccount,
        username: username.startsWith('@') ? username : `@${username}`,
        platform: account.platform
      });

      if (result) {
        console.log('Profile added successfully:', result);
        setUsername('');
        setSelectedAccount('');
        setIsOpen(false);
        onProfileAdded?.();
      }
    } catch (error) {
      console.error('Error adding profile:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-purple-primary hover:bg-purple-hover">
          <Plus className="w-4 h-4 mr-2" />
          Adicionar Perfil Alvo
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar Perfil Alvo</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="account">Conta Social</Label>
            <Select value={selectedAccount} onValueChange={setSelectedAccount}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma conta" />
              </SelectTrigger>
              <SelectContent>
                {socialAccounts.map((account) => (
                  <SelectItem key={account.id} value={account.id}>
                    {account.platform} - {account.username}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="username">Username do Perfil Alvo</Label>
            <Input
              id="username"
              placeholder="@username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
              Cancelar
            </Button>
            <Button 
              type="submit" 
              className="bg-purple-primary hover:bg-purple-hover"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Adicionando...' : 'Adicionar'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TargetProfileDialog;
