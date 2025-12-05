"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Trophy,
  Star,
  ChevronDown,
  ChevronUp,
  Clock,
  CheckCircle2,
  Check,
  Loader2,
} from "lucide-react";
import type { Milestone, MilestoneTask } from "@/types/entity";
import { cn } from "@/lib/utils";
import useMilestone from "@/hooks/services/milestone/use-milestone";

interface MilestoneCardProps {
  milestone: Milestone;
  onStart?: (milestoneId: string) => void;
  onCompleteTask?: (taskId: string) => void;
}

export function MilestoneCard({
  milestone,
  onStart,
  onCompleteTask,
}: MilestoneCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [shouldFetchDetail, setShouldFetchDetail] = useState(false);
  const [cachedTasks, setCachedTasks] = useState<MilestoneTask[]>(
    milestone.tasks || []
  );

  // Fetch milestone detail only when needed (when expanded and tasks not available)
  const { data: milestoneDetail, isLoading: isLoadingDetail } = useMilestone(
    shouldFetchDetail ? milestone.id : null
  );

  // Update cached tasks when detail is fetched or milestone prop changes
  useEffect(() => {
    if (milestoneDetail?.tasks) {
      setCachedTasks(milestoneDetail.tasks);
    } else if (milestone.tasks) {
      setCachedTasks(milestone.tasks);
    }
  }, [milestoneDetail, milestone.tasks]);

  const handleToggleExpand = () => {
    if (!isExpanded && cachedTasks.length === 0) {
      // Fetch detail when expanding for the first time and no tasks available
      setShouldFetchDetail(true);
    }
    setIsExpanded(!isExpanded);
  };

  // Use cached tasks for calculations
  const tasks = cachedTasks;
  const completedTasks = tasks.filter((task) => task.is_completed).length;
  const totalTasks = tasks.length;
  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  const statusConfig = {
    pending: {
      label: "Belum Mulai",
      color: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
      icon: Clock,
    },
    in_progress: {
      label: "Sedang Berjalan",
      color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
      icon: Star,
    },
    completed: {
      label: "Selesai",
      color:
        "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
      icon: CheckCircle2,
    },
  };

  const status = statusConfig[milestone.status] || statusConfig.pending;
  const StatusIcon = status.icon;

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge className={cn("text-xs font-medium", status.color)}>
                <StatusIcon className="w-3 h-3 mr-1" />
                {status.label}
              </Badge>
              <Badge variant="outline" className="text-xs">
                Level {milestone.level}
              </Badge>
            </div>
            <CardTitle className="text-lg md:text-xl mb-1">
              {milestone.title}
            </CardTitle>
            <CardDescription className="text-sm">
              {milestone.description}
            </CardDescription>
          </div>
          <div className="flex flex-col items-end gap-1">
            <div className="flex items-center gap-1 text-yellow-600 dark:text-yellow-500">
              <Trophy className="w-4 h-4" />
              <span className="font-bold text-sm">
                {milestone.reward_points}
              </span>
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              poin
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Progress Bar */}
        {totalTasks > 0 && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Progress</span>
              <span className="font-semibold text-gray-900 dark:text-white">
                {completedTasks}/{totalTasks} tugas
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}

        {/* Tasks List - Collapsible */}
        <div className="space-y-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleToggleExpand}
            className="w-full flex items-center justify-between p-2 h-auto"
            disabled={isLoadingDetail}
          >
            <span className="text-sm font-medium">
              {totalTasks > 0
                ? `Daftar Tugas (${completedTasks}/${totalTasks})`
                : "Lihat Detail Tugas"}
            </span>
            {isLoadingDetail ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : isExpanded ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </Button>

          {isExpanded && (
            <div className="space-y-3 pl-2">
              {isLoadingDetail && tasks.length === 0 ? (
                <div className="flex items-center justify-center py-6">
                  <Loader2 className="w-6 h-6 animate-spin text-pink-500" />
                  <span className="ml-2 text-sm text-gray-500">
                    Memuat detail tugas...
                  </span>
                </div>
              ) : tasks.length > 0 ? (
                tasks
                  .sort((a, b) => a.order - b.order)
                  .map((task, index) => (
                    <div
                      key={task.id}
                      className={cn(
                        "flex items-start gap-3 p-3 rounded-lg border transition-colors",
                        task.is_completed
                          ? "bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-800"
                          : "bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700"
                      )}
                    >
                      {!task.is_completed && (
                        <Checkbox
                          checked={task.is_completed}
                          onCheckedChange={() =>
                            !task.is_completed && onCompleteTask?.(task.id)
                          }
                          disabled={milestone.status !== "in_progress"}
                          className="mt-0.5"
                        />
                      )}
                      <div className="flex-1">
                        <p className="text-sm text-gray-900 dark:text-white">
                          {index + 1}. {task.title}
                        </p>
                        {task.reward_points > 0 && (
                          <div className="flex items-center gap-1 mt-1 text-xs text-yellow-600 dark:text-yellow-500">
                            <Star className="w-3 h-3" fill="currentColor" />
                            <span>+{task.reward_points} poin</span>
                          </div>
                        )}
                      </div>
                      
                      {/* Complete Button */}
                      {task.is_completed ? (
                        <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-0 flex-shrink-0">
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                          Selesai
                        </Badge>
                      ) : (
                        <Button
                          size="sm"
                          onClick={() => onCompleteTask?.(task.id)}
                          disabled={milestone.status !== 'in_progress'}
                          className={cn(
                            'h-8 px-3 text-xs font-semibold flex-shrink-0',
                            milestone.status === 'in_progress'
                              ? 'bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white'
                              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          )}
                        >
                          <Check className="w-3 h-3 mr-1" />
                          Selesai
                        </Button>
                      )}
                    </div>
                  ))
              ) : (
                <div className="text-center py-4 text-sm text-gray-500 dark:text-gray-400">
                  Tidak ada tugas tersedia
                </div>
              )}
            </div>
          )}
        </div>

        {/* Action Button */}
        <div className="flex gap-2 pt-2">
          {milestone.status === "pending" && (
            <Button
              onClick={() => onStart?.(milestone.id)}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
            >
              Mulai Milestone
            </Button>
          )}
          {milestone.status === "in_progress" && (
            <Button variant="outline" className="w-full" disabled>
              Sedang Dikerjakan
            </Button>
          )}
          {milestone.status === "completed" && (
            <Button variant="outline" className="w-full" disabled>
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Selesai
            </Button>
          )}
        </div>

        {/* Timestamps */}
        {(milestone.started_at || milestone.completed_at) && (
          <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1 pt-2 border-t dark:border-gray-700">
            {milestone.started_at && (
              <p>
                Dimulai:{" "}
                {new Date(milestone.started_at).toLocaleDateString("id-ID")}
              </p>
            )}
            {milestone.completed_at && (
              <p>
                Selesai:{" "}
                {new Date(milestone.completed_at).toLocaleDateString("id-ID")}
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
