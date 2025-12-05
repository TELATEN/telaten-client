"use client";

import { useState } from "react";
import { MilestoneCard } from "@/components/MilestoneCard";
import CelebrationModal from "@/components/CelebrationModal";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Target, CheckCircle2, Clock, Loader2 } from "lucide-react";
import useMilestones from "@/hooks/services/milestone/use-milestones";
import useStartMilestone from "@/hooks/services/milestone/use-start-milestone";
import useCompleteTask from "@/hooks/services/milestone/use-complete-task";
import useBusinessProfile from "@/hooks/services/business/use-business-profile";

interface CelebrationData {
  type: "task" | "milestone" | "achievement";
  title: string;
  points: number;
  level?: string;
  message?: string;
}

export default function MisiPage() {
  const { toast } = useToast();
  const { data: milestones, isLoading } = useMilestones();
  const { data: businessData } = useBusinessProfile();
  const startMilestone = useStartMilestone();
  const completeTask = useCompleteTask();
  const [celebrationData, setCelebrationData] =
    useState<CelebrationData | null>(null);

  const pendingMilestones =
    milestones?.filter((m) => m.status === "pending") || [];
  const inProgressMilestones =
    milestones?.filter((m) => m.status === "in_progress") || [];
  const completedMilestones =
    milestones?.filter((m) => m.status === "completed") || [];

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
        // Show task celebration modal
        setCelebrationData({
          type: "task",
          title: data.title,
          points: data.reward_points,
          level: businessData?.level_name,
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

        // Check if milestone is completed
        setTimeout(
          () => {
            const completedMilestone = milestones?.find(
              (m) =>
                m.status === "completed" &&
                m.tasks?.some((t: any) => t.id === taskId)
            );

            if (completedMilestone) {
              setCelebrationData({
                type: "milestone",
                title: completedMilestone.title,
                points: completedMilestone.reward_points,
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

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 py-6 md:py-8">
          <header className="mb-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-purple-500 rounded-xl flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                  Misi Saya
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Selesaikan misi untuk naik level
                </p>
              </div>
            </div>
          </header>

          <div className="grid grid-cols-3 gap-3 mb-6">
            <Card>
              <CardContent className="p-4 text-center">
                <Clock className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {isLoading ? "-" : pendingMilestones.length}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Belum Mulai
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Target className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {isLoading ? "-" : inProgressMilestones.length}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Sedang Berjalan
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <CheckCircle2 className="w-6 h-6 text-green-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {isLoading ? "-" : completedMilestones.length}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Selesai
                </p>
              </CardContent>
            </Card>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-pink-500" />
            </div>
          ) : (
            <Tabs defaultValue="in_progress" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="pending">Tersedia</TabsTrigger>
                <TabsTrigger value="in_progress">Sedang Berjalan</TabsTrigger>
                <TabsTrigger value="completed">Selesai</TabsTrigger>
              </TabsList>

              <TabsContent value="pending" className="space-y-4">
                {pendingMilestones.length > 0 ? (
                  pendingMilestones.map((milestone) => (
                    <MilestoneCard
                      key={milestone.id}
                      milestone={milestone}
                      onStart={handleStartMilestone}
                      onCompleteTask={handleCompleteTask}
                    />
                  ))
                ) : (
                  <Card>
                    <CardContent className="p-8 text-center">
                      <p className="text-gray-500 dark:text-gray-400">
                        Tidak ada milestone tersedia
                      </p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="in_progress" className="space-y-4">
                {inProgressMilestones.length > 0 ? (
                  inProgressMilestones.map((milestone) => (
                    <MilestoneCard
                      key={milestone.id}
                      milestone={milestone}
                      onStart={handleStartMilestone}
                      onCompleteTask={handleCompleteTask}
                    />
                  ))
                ) : (
                  <Card>
                    <CardContent className="p-8 text-center">
                      <p className="text-gray-500 dark:text-gray-400">
                        Tidak ada milestone yang sedang berjalan
                      </p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="completed" className="space-y-4">
                {completedMilestones.length > 0 ? (
                  completedMilestones.map((milestone) => (
                    <MilestoneCard
                      key={milestone.id}
                      milestone={milestone}
                      onStart={handleStartMilestone}
                      onCompleteTask={handleCompleteTask}
                    />
                  ))
                ) : (
                  <Card>
                    <CardContent className="p-8 text-center">
                      <p className="text-gray-500 dark:text-gray-400">
                        Belum ada milestone yang selesai
                      </p>
                      <p className="text-sm text-gray-400 mt-2">
                        Mulai kerjakan milestone untuk mendapatkan poin dan naik
                        level!
                      </p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
            </Tabs>
          )}
        </div>
      </div>
    </>
  );
}
