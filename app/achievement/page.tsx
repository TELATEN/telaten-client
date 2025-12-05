"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import useGetAchievements from "@/hooks/services/achievements/use-get-achievements";
import { Achievement } from "@/types";
import AchievementSkeletonCards from "@/components/achievement/AchievementSkeletonCards";
import AchievementDialog from "@/components/achievement/AchievementDialog";
import ConfirmDialog from "@/components/ui/confirm-dialog";
import { useAuthStore } from "@/hooks/stores/use-auth.store";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, Trophy } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import useDeleteAchievement from "@/hooks/services/achievements/use-delete-achievement";
import { toast } from "@/hooks/use-toast";

export default function AchievementPage() {
  const { data: achievements, isLoading, isError } = useGetAchievements();
  const user = useAuthStore((state) => state.user);
  const queryClient = useQueryClient();
  const deleteMutation = useDeleteAchievement();

  const handleAchievementCallback = () => {
    queryClient.invalidateQueries({ queryKey: ["get-achievements"] });
  };

  const handleDeleteAchievement = async (id: string) => {
    try {
      await deleteMutation.mutateAsync(id);
      toast({
        title: "Berhasil",
        description: "Achievement berhasil dihapus.",
      });
    } catch (error) {
      toast({
        title: "Gagal",
        description: "Terjadi kesalahan saat menghapus achievement.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-6 md:py-8">
        <header className="mb-6 flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center">
                <span className="text-2xl">
                  <Trophy className="text-white" />
                </span>
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                  Achievement
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Kumpulkan pencapaian untuk naik level
                </p>
              </div>
            </div>
          </div>

          {user?.role == "admin" && (
            <AchievementDialog
              isEdit={false}
              achievement={null}
              callback={handleAchievementCallback}
            >
              <Button type="button" className="flex gap-2">
                <Plus className="size-4"></Plus>
                Tambah Pencapaian
              </Button>
            </AchievementDialog>
          )}
        </header>

        {isLoading && <AchievementSkeletonCards />}
        {isError && (
          <div className="text-center py-8 text-red-500">
            Gagal memuat achievement.
          </div>
        )}

        <div className="space-y-4">
          {Array.isArray(achievements) &&
            achievements.map((ach: Achievement) => (
              <Card
                key={ach.id}
                className={`flex overflow-hidden relative items-center gap-4 transition hover:scale-105 p-4 bg-card border border-border ${ach.is_unlocked ? "!border-yellow-400" : ""}`}
              >
                {ach.is_unlocked && (
                  <div className="absolute top-0 bottom-0 right-0 left-0 bg-yellow-400/10 dark:bg-yellow-500/10 -z-1"></div>
                )}
                <div
                  className={`w-16 relative h-16 text-2xl flex items-center justify-center bg-gray-200 dark:bg-gray-700 to-yellow-400/50 rounded-full ${ach.is_unlocked ? "ring-2 ring-yellow-400 bg-yellow-400/20" : ""}`}
                >
                  {ach.badge_icon}
                </div>
                <div className="flex-1 relative">
                  <div
                    className={`font-semibold text-lg mb-1 ${ach.is_unlocked ? "text-yellow-700 dark:text-yellow-200" : "text-gray-900 dark:text-white"}`}
                  >
                    {ach.title}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    {ach.description}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Poin dibutuhkan: {ach.required_points}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {ach.is_unlocked && (
                    <Badge
                      variant="default"
                      className="bg-yellow-400 text-yellow-900"
                    >
                      Selesai
                    </Badge>
                  )}
                  {user?.role == "admin" && (
                    <div className="flex gap-1">
                      <AchievementDialog
                        isEdit={true}
                        achievement={ach}
                        callback={handleAchievementCallback}
                      >
                        <Button variant="ghost" size="sm">
                          <Edit className="h-5 w-5" />
                        </Button>
                      </AchievementDialog>
                      <ConfirmDialog
                        title="Hapus Achievement"
                        description={`Apakah Anda yakin ingin menghapus achievement "${ach.title}"? Tindakan ini tidak dapat dibatalkan.`}
                        onConfirm={() => handleDeleteAchievement(ach.id)}
                        variant="destructive"
                        confirmText="Hapus"
                      >
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-destructive"
                        >
                          <Trash2 className="h-5 w-5" />
                        </Button>
                      </ConfirmDialog>
                    </div>
                  )}
                </div>
              </Card>
            ))}
        </div>
      </div>
    </div>
  );
}
