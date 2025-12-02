import { AlertCircle, Sparkles, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Mission } from '@/lib/mockData';
import { cn } from '@/lib/utils';

interface MissionCardProps {
  mission: Mission;
  onStart?: () => void;
  onSOS?: () => void;
}

export function MissionCard({ mission, onStart, onSOS }: MissionCardProps) {
  const difficultyColors = {
    mudah: 'bg-green-100 text-green-700',
    sedang: 'bg-yellow-100 text-yellow-700',
    sulit: 'bg-red-100 text-red-700',
  };

  return (
    <Card className="border-2 border-pink-200 shadow-md hover:shadow-lg transition-shadow">
      <CardContent className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{mission.title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{mission.description}</p>
          </div>
          {mission.autoGenerate && (
            <Sparkles className="w-5 h-5 text-purple-500 ml-2 flex-shrink-0" />
          )}
        </div>

        <div className="flex items-center gap-2 mb-4">
          <Badge className={cn('text-xs font-medium', difficultyColors[mission.difficulty])}>
            {mission.difficulty.charAt(0).toUpperCase() + mission.difficulty.slice(1)}
          </Badge>
          <Badge variant="outline" className="text-xs">
            {mission.category}
          </Badge>
          <span className="text-xs text-gray-500 ml-auto">+{mission.xpReward} XP</span>
        </div>
      </CardContent>

      <CardFooter className="p-5 pt-0 flex gap-2">
        <Button
          onClick={onStart}
          className="flex-1 bg-pink-500 hover:bg-pink-600 h-12 text-base font-semibold"
        >
          Kerjakan Sekarang
          <ChevronRight className="w-5 h-5 ml-1" />
        </Button>
        <Button
          onClick={onSOS}
          variant="outline"
          className="h-12 px-4 border-2 border-pink-300 text-pink-700 hover:bg-pink-50"
        >
          <AlertCircle className="w-5 h-5" />
        </Button>
      </CardFooter>
    </Card>
  );
}
