import { Card } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export default function AchievementSkeletonCards() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 5 }).map((_, index) => (
        <Card
          key={index}
          className={`flex items-center gap-4 p-4 border border-border bg-card`}
        >
          <Skeleton className="w-16 h-16 rounded-full"></Skeleton>
          <div className="flex-1">
            <div
              className={`font-semibold text-lg mb-1 text-gray-900 dark:text-white`}
            >
              <Skeleton className="w-1/2 h-6"></Skeleton>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
              <Skeleton className="w-1/3 h-4"></Skeleton>
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              <Skeleton className="w-1/2 h-4"></Skeleton>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
