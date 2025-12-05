"use client";

import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { MilestoneCard } from "@/components/MilestoneCard";
import CelebrationModal from "@/components/CelebrationModal";
import { useToast } from "@/hooks/use-toast";
import { Sun, Moon, Trophy, Star, Target as TargetIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import useBusinessProfile from "@/hooks/services/business/use-business-profile";
import useMilestones from "@/hooks/services/milestone/use-milestones";
import useStartMilestone from "@/hooks/services/milestone/use-start-milestone";
import useCompleteTask from "@/hooks/services/milestone/use-complete-task";
import Link from "next/link";

interface CelebrationData {
  type: "task" | "milestone";
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
  const [isBusinessOpen, setIsBusinessOpen] = useState(true);
  const [celebrationData, setCelebrationData] =
    useState<CelebrationData | null>(null);
  const { toast } = useToast();

  // Get current active milestone (in_progress) or first pending
  const currentMilestone =
    milestones?.find((m) => m.status === "in_progress") ||
    milestones?.find((m) => m.status === "pending");

  const handleToggleBusiness = () => {
    const newStatus = !isBusinessOpen;
    setIsBusinessOpen(newStatus);

    toast({
      title: newStatus ? "Warung Dibuka" : "Warung Ditutup",
      description: newStatus
        ? "Semangat berjualan hari ini!"
        : "Semoga dapat istirahat yang cukup!",
    });
  };

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
      onSuccess: (data) => {
        // Show task celebration
        setCelebrationData({
          type: "task",
          title: data.title,
          points: data.reward_points,
          level: businessData?.level_name,
          message: "Kerja bagus! Terus semangat menyelesaikan misi!",
        });

        // Check if all tasks in current milestone are completed after a delay
        // This gives time for the query to refetch and update
        setTimeout(() => {
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
        }, 1500);
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
        {/* Business Status Toggle */}
        <div className="bg-card border border-border rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {isBusinessOpen ? (
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <Sun className="w-5 h-5 text-green-600" />
                </div>
              ) : (
                <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                  <Moon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </div>
              )}
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">
                  Status Warung
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {isBusinessOpen ? "Buka" : "Tutup"}
                </p>
              </div>
            </div>
            <Switch
              checked={isBusinessOpen}
              onCheckedChange={handleToggleBusiness}
              className="data-[state=checked]:bg-green-600"
            />
          </div>
        </div>

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
                  <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <Trophy className="w-8 h-8 text-white" fill="white" />
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
