
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Plus } from 'lucide-react';
import ConnectAccountDialog from './ConnectAccountDialog';

const AccountsEmptyState = () => {
  return (
    <Card>
      <CardContent className="flex flex-col items-center justify-center py-12">
        <Users className="w-12 h-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-semibold mb-2">Adicionar Nova Conta</h3>
        <p className="text-muted-foreground text-center mb-4">
          Nenhuma conta conectada ainda. Use o botão abaixo para conectar.
        </p>
        <ConnectAccountDialog>
          <Button className="bg-purple-primary hover:bg-purple-hover">
            <Plus className="w-4 h-4 mr-2" />
            Conectar Primeira Conta
          </Button>
        </ConnectAccountDialog>
      </CardContent>
    </Card>
  );
};

export default AccountsEmptyState;
