"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import useGetAchievements from "@/hooks/services/achievements/use-get-achievements";
import { Achievement } from "@/types";
import Image from "next/image";
import AchievementSkeletonCards from "@/components/achievement/AchievementSkeletonCards";

export default function AchievementPage() {
  const { data: achievements, isLoading, isError } = useGetAchievements();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-6 md:py-8">
        <header className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center">
              <span className="text-2xl">🏆</span>
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
                className={`flex overflow-hidden relative items-center gap-4 p-4 bg-card border border-border ${ach.is_unlocked ? "ring-2 ring-yellow-400" : ""}`}
              >
                {ach.is_unlocked && (
                  <div className="absolute top-0 bottom-0 right-0 left-0 bg-yellow-400/10 dark:bg-yellow-500/20 -z-1"></div>
                )}
                <div
                  className={`w-16 relative h-16 text-2xl flex items-center justify-center bg-gray-200 to-yellow-400/50 rounded-full ${ach.is_unlocked ? "ring-2 ring-yellow-400 bg-yellow-400/20" : ""}`}
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
                {ach.is_unlocked && (
                  <Badge
                    variant="default"
                    className="ml-2 bg-yellow-400 text-yellow-900"
                  >
                    Selesai
                  </Badge>
                )}
              </Card>
            ))}
        </div>
      </div>
    </div>
  );
}
