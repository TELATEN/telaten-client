'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { mockUser, mockMissions } from '@/lib/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  User,
  Store,
  Trophy,
  Target,
  Settings,
  HelpCircle,
  LogOut,
  Crown,
  Sparkles,
  Edit,
  MapPin,
  Package,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function ProfilPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [user] = useState(mockUser);
  const completedMissions = mockMissions.filter((m) => m.status === 'completed').length;
  const totalXP = user.xp;

  const achievements = [
    { id: 1, name: 'Pedagang Pemula', icon: Trophy, unlocked: true, description: 'Mendaftarkan usaha pertama' },
    { id: 2, name: 'Rajin Mencatat', icon: Target, unlocked: completedMissions >= 3, description: 'Menyelesaikan 3 misi pertama' },
    { id: 3, name: 'Master Keuangan', icon: Crown, unlocked: totalXP >= 1000, description: 'Mengumpulkan 1000 XP' },
    { id: 4, name: 'Bisnis Stabil', icon: Sparkles, unlocked: false, description: 'Beroperasi selama 30 hari' },
    { id: 5, name: 'Pelanggan Setia', icon: User, unlocked: false, description: 'Mendapatkan 50 ulasan positif' },
    { id: 6, name: 'Pengusaha Handal', icon: Store, unlocked: false, description: 'Mencapai level 10' },
  ];

  const handleBusinessInfo = () => {
    router.push('/edit-business');
  };

  const handleEditProfile = () => {
    router.push('/edit-profile');
  };

  const handleSettings = () => {
    router.push('/settings');
  };

  const handleHelp = () => {
    toast({
      title: 'Pusat Bantuan',
      description: 'TLATEN siap membantu Anda! Hubungi kami kapan saja.',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-6 md:py-8">
        <header className="mb-6">
          <Card className="bg-gradient-to-br from-pink-400 via-purple-400 to-cyan-400 border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <Avatar className="w-20 h-20 border-4 border-white shadow-md">
                  <AvatarFallback className="text-2xl font-bold bg-white text-pink-600">
                    {user.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h1 className="text-2xl font-bold text-white mb-1">{user.name}</h1>
                  <p className="text-white/90 mb-2">{user.businessName}</p>
                  <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
                    Level {user.level} - {user.levelTitle}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </header>

        <div className="grid grid-cols-3 gap-3 mb-6">
          <Card>
            <CardContent className="p-4 text-center">
              <Trophy className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">{totalXP}</p>
              <p className="text-xs text-gray-600">Total XP</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Target className="w-6 h-6 text-green-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">{completedMissions}</p>
              <p className="text-xs text-gray-600">Misi Selesai</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Sparkles className="w-6 h-6 text-purple-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">{user.level}</p>
              <p className="text-xs text-gray-600">Level Saat Ini</p>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Crown className="w-5 h-5 text-yellow-500" />
              Pencapaian
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {achievements.map((achievement) => {
                const Icon = achievement.icon;
                return (
                  <div
                    key={achievement.id}
                    className={`p-4 rounded-lg text-center transition-all ${
                      achievement.unlocked
                        ? 'bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-300'
                        : 'bg-gray-100 opacity-50'
                    }`}
                  >
                    <Icon
                      className={`w-8 h-8 mx-auto mb-2 ${
                        achievement.unlocked ? 'text-yellow-600' : 'text-gray-400'
                      }`}
                    />
                    <p className="text-sm font-medium text-gray-700 mb-1">{achievement.name}</p>
                    <p className="text-xs text-gray-500">{achievement.description}</p>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-3">
          <Card>
            <CardContent className="p-0">
              <Button
                onClick={handleEditProfile}
                variant="ghost"
                className="w-full justify-start h-14 px-5 text-base"
              >
                <User className="w-5 h-5 mr-3 text-gray-600" />
                Edit Profil
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-0">
              <Button
                onClick={handleBusinessInfo}
                variant="ghost"
                className="w-full justify-start h-14 px-5 text-base"
              >
                <Store className="w-5 h-5 mr-3 text-gray-600" />
                Informasi Usaha
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-0">
              <Button
                onClick={handleSettings}
                variant="ghost"
                className="w-full justify-start h-14 px-5 text-base"
              >
                <Settings className="w-5 h-5 mr-3 text-gray-600" />
                Pengaturan
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-0">
              <Button
                onClick={handleHelp}
                variant="ghost"
                className="w-full justify-start h-14 px-5 text-base"
              >
                <HelpCircle className="w-5 h-5 mr-3 text-gray-600" />
                Pusat Bantuan
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-0">
              <Button
                onClick={() =>
                  toast({
                    title: 'Keluar',
                    description: 'Sampai jumpa lagi!',
                  })
                }
                variant="ghost"
                className="w-full justify-start h-14 px-5 text-base text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <LogOut className="w-5 h-5 mr-3" />
                Keluar
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Mobile-style Business Info Editor - REMOVED: Now uses separate page */}
      </div>
    </div>
  );
}
