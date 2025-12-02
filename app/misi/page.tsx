'use client';

import { useState } from 'react';
import { MissionCard } from '@/components/MissionCard';
import { mockMissions } from '@/lib/mockData';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Target, CheckCircle2, Clock } from 'lucide-react';

export default function MisiPage() {
  const { toast } = useToast();
  const [missions] = useState(mockMissions);

  const pendingMissions = missions.filter((m) => m.status === 'pending');
  const inReviewMissions = missions.filter((m) => m.status === 'in-review');
  const completedMissions = missions.filter((m) => m.status === 'completed');

  const handleStartMission = (missionTitle: string) => {
    toast({
      title: 'Mulai Misi',
      description: `Anda akan mulai: ${missionTitle}`,
    });
  };

  const handleSOS = () => {
    toast({
      title: 'Butuh Bantuan?',
      description: 'TLATEN akan menjelaskan langkah demi langkah dengan sabar.',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-6 md:py-8">
        <header className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-purple-500 rounded-xl flex items-center justify-center">
              <Target className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Misi Saya</h1>
              <p className="text-gray-600">Selesaikan misi untuk naik level</p>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-3 gap-3 mb-6">
          <Card>
            <CardContent className="p-4 text-center">
              <Clock className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">{pendingMissions.length}</p>
              <p className="text-xs text-gray-600">Belum Mulai</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Target className="w-6 h-6 text-blue-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">{inReviewMissions.length}</p>
              <p className="text-xs text-gray-600">Dalam Review</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <CheckCircle2 className="w-6 h-6 text-green-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">{completedMissions.length}</p>
              <p className="text-xs text-gray-600">Selesai</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="pending" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="pending">Tersedia</TabsTrigger>
            <TabsTrigger value="in-review">Dalam Review</TabsTrigger>
            <TabsTrigger value="completed">Selesai</TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="space-y-4">
            {pendingMissions.length > 0 ? (
              pendingMissions.map((mission) => (
                <MissionCard
                  key={mission.id}
                  mission={mission}
                  onStart={() => handleStartMission(mission.title)}
                  onSOS={handleSOS}
                />
              ))
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <p className="text-gray-500">Tidak ada misi tersedia</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="in-review" className="space-y-4">
            {inReviewMissions.length > 0 ? (
              inReviewMissions.map((mission) => (
                <MissionCard
                  key={mission.id}
                  mission={mission}
                  onStart={() => handleStartMission(mission.title)}
                  onSOS={handleSOS}
                />
              ))
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <p className="text-gray-500">Tidak ada misi dalam review</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            {completedMissions.length > 0 ? (
              completedMissions.map((mission) => (
                <MissionCard
                  key={mission.id}
                  mission={mission}
                  onStart={() => handleStartMission(mission.title)}
                  onSOS={handleSOS}
                />
              ))
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <p className="text-gray-500">Belum ada misi yang selesai</p>
                  <p className="text-sm text-gray-400 mt-2">
                    Mulai kerjakan misi untuk mendapatkan XP dan naik level!
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
