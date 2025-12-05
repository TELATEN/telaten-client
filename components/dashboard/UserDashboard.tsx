"use client";

import { useState } from "react";
import { MilestoneCard } from "@/components/MilestoneCard";
import CelebrationModal from "@/components/CelebrationModal";
import { useToast } from "@/hooks/use-toast";
import { Trophy, Star, Target as TargetIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import useBusinessProfile from "@/hooks/services/business/use-business-profile";
import useMilestones from "@/hooks/services/milestone/use-milestones";
import useStartMilestone from "@/hooks/services/milestone/use-start-milestone";
import useCompleteTask from "@/hooks/services/milestone/use-complete-task";
import Link from "next/link";

interface CelebrationData {
  type: "task" | "milestone" | "achievement";
  title: string;
  points: number;
  level?: string;
  message?: string;
}

export default function UserDashboard() {
  const { data: businessData } = useBusinessProfile();
  const { data: milestones } = useMilestones();
  const startMilestone = useStartMilestone();
  const completeTask = useCompleteTask();
  const [celebrationData, setCelebrationData] =
    useState<CelebrationData | null>(null);
  const { toast } = useToast();

  // Get current active milestone (in_progress) or first pending
  const currentMilestone =
    milestones?.find((m) => m.status === "in_progress") ||
    milestones?.find((m) => m.status === "pending");

  const handleStartMilestone = (milestoneId: string) => {
    startMilestone.mutate(milestoneId, {
      onSuccess: (data) => {
        toast({
          title: "Milestone Dimulai!",
          description: `Anda mulai mengerjakan: ${data.title}`,
        });
      },
      onError: (error: any) => {
        toast({
          title: "Gagal Memulai Milestone",
          description: error?.response?.data?.message || "Terjadi kesalahan",
          variant: "destructive",
        });
      },
    });
  };

  const handleCompleteTask = (taskId: string) => {
    completeTask.mutate(taskId, {
      onSuccess: (data: any) => {
        // Show task celebration
        setCelebrationData({
          type: "task",
          title: data.title,
          points: data.reward_points,
          level: businessData?.level_name,
          message: "Kerja bagus! Terus semangat menyelesaikan misi!",
        });

        // Check if achievement was unlocked
        if (data.unlocked_achievement) {
          setTimeout(() => {
            setCelebrationData({
              type: "achievement",
              title: data.unlocked_achievement.title,
              points: data.unlocked_achievement.required_points,
              level: businessData?.level_name,
              message: `${data.unlocked_achievement.badge_icon} ${data.unlocked_achievement.description}`,
            });
          }, 2000);
        }

        // Check if all tasks in current milestone are completed after a delay
        // This gives time for the query to refetch and update
        setTimeout(
          () => {
            const milestone = milestones?.find(
              (m) => m.status === "completed" && m.id === currentMilestone?.id
            );
            if (milestone) {
              setCelebrationData({
                type: "milestone",
                title: milestone.title,
                points: milestone.reward_points,
                level: businessData?.level_name,
                message: "Luar biasa! Kamu telah menyelesaikan milestone ini!",
              });
            }
          },
          data.unlocked_achievement ? 4000 : 1500
        );
      },
      onError: (error: any) => {
        toast({
          title: "Gagal Menyelesaikan Tugas",
          description: error?.response?.data?.message || "Terjadi kesalahan",
          variant: "destructive",
        });
      },
    });
  };

  return (
    <>
      <CelebrationModal
        isOpen={!!celebrationData}
        onClose={() => setCelebrationData(null)}
        type={celebrationData?.type || "task"}
        title={celebrationData?.title || ""}
        points={celebrationData?.points || 0}
        level={celebrationData?.level}
        message={celebrationData?.message}
      />

      <div className="space-y-6">
        {/* Level & Points Card */}
        {businessData && (
          <Link href="/leaderboard" className="block">
            <Card className="bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-pink-100 text-sm font-medium">
                      Level Bisnis
                    </p>
                    <h3 className="text-white text-2xl font-bold">
                      {businessData.level_name || "Pemula"}
                    </h3>
                  </div>
                  <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center backdrop-blur-sm text-2xl">
                    {businessData.level_icon || "🏆"}
                  </div>
                </div>

                <div className="flex items-center justify-between bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
                      <Star className="w-5 h-5 text-white" fill="white" />
                    </div>
                    <div>
                      <p className="text-white text-sm">Total Points</p>
                      <p className="text-white text-2xl font-bold">
                        {businessData.total_points || 0}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-pink-100 text-xs">Terus kumpulkan</p>
                    <p className="text-white text-sm font-semibold flex items-center gap-1">
                      points!
                      <TargetIcon className="w-4 h-4" />
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        )}

        {/* Current Milestone */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Milestone Saat Ini
            </h2>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {milestones?.filter((m) => m.status === "pending").length || 0}{" "}
              milestone tersedia
            </span>
          </div>

          {currentMilestone ? (
            <MilestoneCard
              milestone={currentMilestone}
              onStart={handleStartMilestone}
              onCompleteTask={handleCompleteTask}
            />
          ) : (
            <div className="bg-card rounded-lg p-8 text-center border border-border">
              <p className="text-gray-500 dark:text-gray-400">
                Belum ada milestone baru hari ini.
              </p>
              <p className="text-sm text-gray-400 mt-2">
                Periksa kembali nanti atau selesaikan milestone yang sudah ada.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
