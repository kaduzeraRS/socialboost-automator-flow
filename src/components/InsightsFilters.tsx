
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { CalendarIcon, Filter, X } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface InsightsFiltersProps {
  onFiltersChange: (filters: any) => void;
}

const InsightsFilters = ({ onFiltersChange }: InsightsFiltersProps) => {
  const [dateRange, setDateRange] = useState<{from?: Date, to?: Date}>({});
  const [selectedAccount, setSelectedAccount] = useState<string>('all');
  const [selectedMetric, setSelectedMetric] = useState<string>('all');

  const accounts = [
    { id: 'all', name: 'Todas as contas' },
    { id: '1', name: '@minha_conta (Instagram)' },
    { id: '2', name: '@minha_conta_tt (TikTok)' }
  ];

  const metrics = [
    { id: 'all', name: 'Todas as métricas' },
    { id: 'engagement', name: 'Engajamento' },
    { id: 'reach', name: 'Alcance' },
    { id: 'views', name: 'Visualizações' },
    { id: 'followers', name: 'Seguidores' }
  ];

  const applyFilters = () => {
    const filters = {
      dateRange,
      account: selectedAccount,
      metric: selectedMetric
    };
    onFiltersChange(filters);
    console.log('Applied filters:', filters);
  };

  const clearFilters = () => {
    setDateRange({});
    setSelectedAccount('all');
    setSelectedMetric('all');
    onFiltersChange({});
  };

  const hasActiveFilters = dateRange.from || selectedAccount !== 'all' || selectedMetric !== 'all';

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5" />
            <span>Filtros de Insights</span>
          </div>
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              <X className="w-4 h-4 mr-1" />
              Limpar
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Filtro de Data */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Período</label>
            <div className="flex space-x-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "flex-1 justify-start text-left font-normal",
                      !dateRange.from && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateRange.from ? format(dateRange.from, "dd/MM") : "De"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={dateRange.from}
                    onSelect={(date) => setDateRange({...dateRange, from: date})}
                    initialFocus
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>

              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "flex-1 justify-start text-left font-normal",
                      !dateRange.to && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateRange.to ? format(dateRange.to, "dd/MM") : "Até"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={dateRange.to}
                    onSelect={(date) => setDateRange({...dateRange, to: date})}
                    initialFocus
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Filtro de Conta */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Conta</label>
            <Select value={selectedAccount} onValueChange={setSelectedAccount}>
              <SelectTrigger>
                <SelectValue placeholder="Selecionar conta" />
              </SelectTrigger>
              <SelectContent>
                {accounts.map((account) => (
                  <SelectItem key={account.id} value={account.id}>
                    {account.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Filtro de Métrica */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Métrica</label>
            <Select value={selectedMetric} onValueChange={setSelectedMetric}>
              <SelectTrigger>
                <SelectValue placeholder="Selecionar métrica" />
              </SelectTrigger>
              <SelectContent>
                {metrics.map((metric) => (
                  <SelectItem key={metric.id} value={metric.id}>
                    {metric.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Filtros Ativos */}
        {hasActiveFilters && (
          <div className="space-y-2">
            <label className="text-sm font-medium">Filtros ativos:</label>
            <div className="flex flex-wrap gap-2">
              {dateRange.from && (
                <Badge variant="secondary">
                  De: {format(dateRange.from, "dd/MM/yyyy")}
                </Badge>
              )}
              {dateRange.to && (
                <Badge variant="secondary">
                  Até: {format(dateRange.to, "dd/MM/yyyy")}
                </Badge>
              )}
              {selectedAccount !== 'all' && (
                <Badge variant="secondary">
                  {accounts.find(a => a.id === selectedAccount)?.name}
                </Badge>
              )}
              {selectedMetric !== 'all' && (
                <Badge variant="secondary">
                  {metrics.find(m => m.id === selectedMetric)?.name}
                </Badge>
              )}
            </div>
          </div>
        )}

        <Button onClick={applyFilters} className="w-full bg-purple-primary hover:bg-purple-hover">
          Aplicar Filtros
        </Button>
      </CardContent>
    </Card>
  );
};

export default InsightsFilters;
