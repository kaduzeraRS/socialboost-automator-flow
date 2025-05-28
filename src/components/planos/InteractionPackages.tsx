
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface InteractionPackage {
  amount: number;
  price: string;
}

interface InteractionPackagesProps {
  packages: InteractionPackage[];
  onBuyInteractions: (amount: number, price: string) => void;
}

const InteractionPackages = ({ packages, onBuyInteractions }: InteractionPackagesProps) => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-foreground mb-6">Pacotes de Interações</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {packages.map((pkg, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow dark:bg-card bg-white border-2 border-gray-200 dark:border-gray-700">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Plus className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-foreground">+{pkg.amount.toLocaleString()}</h3>
              <p className="text-sm text-muted-foreground mb-4">Interações</p>
              <div className="text-lg font-bold text-purple-primary mb-4">{pkg.price}</div>
              <Button 
                className="w-full bg-purple-primary hover:bg-purple-hover text-white border-2 border-purple-primary" 
                onClick={() => onBuyInteractions(pkg.amount, pkg.price)}
              >
                Comprar
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default InteractionPackages;
