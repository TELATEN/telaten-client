import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Achievement } from "@/types";

// Data mock achievement format baru
const achievements: Achievement[] = [
  {
    id: "8e4ed99a-0f09-4e7e-937c-8f2c0f9348e0",
    title: "Juragan Baru",
    description: "Menyelesaikan 5 milestone pertama.",
    required_points: 500,
    badge_icon: "https://example.com/badges/juragan-baru.png",
    created_at: "2025-12-04T13:46:29.753792Z",
    is_unlocked: true,
  },
  {
    id: "b1e4ed99a-0f09-4e7e-937c-8f2c0f9348e1",
    title: "Pekerja Keras",
    description: "Login setiap hari selama 10 hari.",
    required_points: 200,
    badge_icon: "https://example.com/badges/pekerja-keras.png",
    created_at: "2025-12-01T10:00:00.000Z",
    is_unlocked: false,
  },
  {
    id: "c2e4ed99a-0f09-4e7e-937c-8f2c0f9348e2",
    title: "Misi Selesai",
    description: "Menyelesaikan 5 misi apapun.",
    required_points: 300,
    badge_icon: "https://example.com/badges/misi-selesai.png",
    created_at: "2025-12-02T12:00:00.000Z",
    is_unlocked: true,
  },
];

export default function AchievementPage() {
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

        {/* List semua achievement */}
        <div className="space-y-4">
          {achievements.map((ach) => (
            <Card
              key={ach.id}
              className={`flex items-center gap-4 p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 ${ach.is_unlocked ? "ring-2 ring-yellow-400 bg-gradient-to-br from-yellow-100 to-yellow-50 dark:from-yellow-900 dark:to-yellow-800" : ""}`}
            >
              <img
                src={ach.badge_icon}
                alt={ach.title}
                className="w-16 h-16 rounded-full object-cover border border-gray-300 dark:border-gray-700 bg-white"
                loading="lazy"
              />
              <div className="flex-1">
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
