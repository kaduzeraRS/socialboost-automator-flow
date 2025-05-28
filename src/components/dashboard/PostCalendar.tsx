
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

const PostCalendar = () => {
  return (
    <Card className="transition-all duration-300 hover:shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Calendar className="w-5 h-5 mr-2" />
          Calendário de Posts
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
          {Array.from({ length: 7 }, (_, i) => (
            <div key={i} className="border rounded-lg p-3 min-h-[120px] transition-all duration-200 hover:bg-accent">
              <div className="text-sm font-medium mb-2">
                {new Date(Date.now() + i * 24 * 60 * 60 * 1000).toLocaleDateString('pt-BR', { 
                  weekday: 'short', 
                  day: 'numeric' 
                })}
              </div>
              {i % 3 === 0 && (
                <div className="space-y-1">
                  <div className="text-xs bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-200 p-1 rounded">
                    18:00 - Instagram
                  </div>
                  {i % 2 === 0 && (
                    <div className="text-xs bg-pink-100 dark:bg-pink-900/20 text-pink-800 dark:text-pink-200 p-1 rounded">
                      20:00 - TikTok
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        <Button asChild variant="outline" className="w-full transition-all duration-200 hover:scale-105">
          <Link to="/agendamento">
            <Plus className="w-4 h-4 mr-2" />
            Agendar Novo Post
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default PostCalendar;
