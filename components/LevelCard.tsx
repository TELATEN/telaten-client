import { Trophy } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { User } from '@/lib/mockData';

interface LevelCardProps {
  user: User;
}

export function LevelCard({ user }: LevelCardProps) {
  const progressPercentage = (user.xp / user.xpToNextLevel) * 100;

  return (
    <Card className="bg-gradient-to-br from-pink-400 via-pink-500 to-purple-500 border-0 shadow-lg">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-pink-100 text-sm font-medium">Level {user.level}</p>
            <h3 className="text-white text-xl font-bold">{user.levelTitle}</h3>
          </div>
          <div className="w-14 h-14 bg-white dark:bg-gray-800/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <Trophy className="w-8 h-8 text-white" fill="white" />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-pink-100">Progres XP</span>
            <span className="text-white font-semibold">
              {user.xp} / {user.xpToNextLevel}
            </span>
          </div>
          <div className="relative h-2 w-full overflow-hidden rounded-full bg-white dark:bg-gray-800/20">
            <div
              className="h-full bg-white dark:bg-gray-800 transition-all"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
