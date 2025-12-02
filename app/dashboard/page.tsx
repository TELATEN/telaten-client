'use client';

import { useState } from 'react';
import { Switch } from '@/components/ui/switch';
import { LevelCard } from '@/components/LevelCard';
import { MissionCard } from '@/components/MissionCard';
import { mockUser, mockMissions } from '@/lib/mockData';
import { useToast } from '@/hooks/use-toast';
import { Sun, Moon } from 'lucide-react';

export default function DashboardPage() {
  const [user, setUser] = useState(mockUser);
  const { toast } = useToast();

  const currentMission = mockMissions.find((m) => m.status === 'pending');

  const handleToggleBusiness = () => {
    setUser((prev) => ({
      ...prev,
      isBusinessOpen: !prev.isBusinessOpen,
    }));

    toast({
      title: user.isBusinessOpen ? 'Warung Ditutup' : 'Warung Dibuka',
      description: user.isBusinessOpen
        ? 'Semoga dapat istirahat yang cukup!'
        : 'Semangat berjualan hari ini!',
    });
  };

  const handleStartMission = () => {
    toast({
      title: 'Mulai Misi',
      description: 'Fitur ini akan segera tersedia. TELATEN akan membantu Anda!',
    });
  };

  const handleSOS = () => {
    toast({
      title: 'Butuh Bantuan?',
      description: 'TELATEN akan menjelaskan langkah demi langkah dengan sabar.',
      variant: 'default',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-2xl mx-auto px-4 py-6 md:py-8">
        <header className="mb-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                Selamat Datang, {user.name}!
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">{user.businessName}</p>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm dark:border dark:border-gray-700/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {user.isBusinessOpen ? (
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Sun className="w-5 h-5 text-green-600" />
                  </div>
                ) : (
                  <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                    <Moon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  </div>
                )}
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">Status Warung</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {user.isBusinessOpen ? 'Buka' : 'Tutup'}
                  </p>
                </div>
              </div>
              <Switch
                checked={user.isBusinessOpen}
                onCheckedChange={handleToggleBusiness}
                className="data-[state=checked]:bg-green-600"
              />
            </div>
          </div>
        </header>

        <section className="mb-6">
          <LevelCard user={user} />
        </section>

        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Misi Hari Ini</h2>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {mockMissions.filter((m) => m.status === 'pending').length} misi tersedia
            </span>
          </div>

          {currentMission ? (
            <MissionCard
              mission={currentMission}
              onStart={handleStartMission}
              onSOS={handleSOS}
            />
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-lg p-8 text-center dark:border dark:border-gray-700/30">
              <p className="text-gray-500 dark:text-gray-400">Belum ada misi baru hari ini.</p>
              <p className="text-sm text-gray-400 mt-2">
                Periksa kembali nanti atau selesaikan misi yang sudah ada.
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
