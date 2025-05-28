
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus } from 'lucide-react';
import { useTargetProfiles } from '@/hooks/useTargetProfiles';

interface TargetProfileDialogProps {
  socialAccounts: any[];
  onProfileAdded?: () => void;
}

const TargetProfileDialog = ({ socialAccounts, onProfileAdded }: TargetProfileDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [selectedAccount, setSelectedAccount] = useState('');
  const { addTargetProfile } = useTargetProfiles();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username || !selectedAccount) return;

    const account = socialAccounts.find(acc => acc.id === selectedAccount);
    if (!account) return;

    const result = await addTargetProfile({
      social_account_id: selectedAccount,
      username: username.startsWith('@') ? username : `@${username}`,
      platform: account.platform
    });

    if (result) {
      setUsername('');
      setSelectedAccount('');
      setIsOpen(false);
      onProfileAdded?.();
    }
  };

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
            <Button type="submit" className="bg-purple-primary hover:bg-purple-hover">
              Adicionar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TargetProfileDialog;
