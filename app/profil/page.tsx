"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { mockMissions } from "@/lib/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
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
  Mail,
  Calendar,
  Globe,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import useBusinessProfile from "@/hooks/services/business/use-business-profile";
import { useAuthStore } from "@/hooks/stores/use-auth.store";
import useLogout from "@/hooks/services/auth/use-logout";
import Link from "next/link";

export default function ProfilPage() {
  const router = useRouter();
  const { toast } = useToast();
  const userData = useAuthStore((state) => state.user);
  const { data: businessData } = useBusinessProfile();
  const { mutateAsync: logout } = useLogout();

  const handleBusinessInfo = () => {
    router.push("/edit-business");
  };

  const handleEditProfile = () => {
    router.push("/edit-profile");
  };

  const handleSettings = () => {
    router.push("/settings");
  };

  const handleHelp = () => {
    toast({
      title: "Pusat Bantuan",
      description: "TELATEN siap membantu Anda! Hubungi kami kapan saja.",
    });
  };

  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: "Berhasil Logout",
        description: "Anda telah keluar dari sistem.",
      });
    } catch (error: any) {
      toast({
        title: "Logout",
        description: "Anda telah keluar dari sistem.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-2xl mx-auto px-4 py-6 md:py-8">
        <header className="mb-6">
          <Card className="bg-gradient-to-br from-pink-400 via-purple-400 to-cyan-400 border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <Avatar className="w-20 h-20 border-4 border-white shadow-md">
                  <AvatarFallback className="text-2xl font-bold bg-white dark:bg-gray-800 text-pink-600">
                    {userData?.name
                      ? userData.name.charAt(0).toUpperCase()
                      : "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h1 className="text-2xl font-bold text-white mb-1">
                    {userData?.name || "User"}
                  </h1>
                  <p className="text-white/90 mb-2">
                    {businessData?.business_name || "Belum ada bisnis"}
                  </p>
                  <Badge className="bg-white/20 dark:bg-white/10 text-white border-white/30 backdrop-blur-sm">
                    {userData?.email || "No email"}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </header>

        {/* Info Cards */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card className="bg-white dark:bg-gray-800">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Mail className="w-8 h-8 text-pink-500 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                    Email
                  </p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {userData?.email || "-"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-gray-800">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Calendar className="w-8 h-8 text-purple-500 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                    Bergabung
                  </p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {userData?.created_at
                      ? new Date(userData.created_at).toLocaleDateString(
                          "id-ID",
                          {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          }
                        )
                      : "-"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Business Info */}
        {businessData && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Store className="w-5 h-5 text-pink-500" />
                Informasi Bisnis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">
                  Nama Usaha
                </span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {businessData.business_name}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">
                  Kategori
                </span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {businessData.business_category}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Tahap</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {businessData.business_stage}
                </span>
              </div>
              {businessData.address && (
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Lokasi
                  </span>
                  <span className="font-medium text-gray-900 dark:text-white text-right">
                    {businessData.address.city}, {businessData.address.state}
                  </span>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        <div className="space-y-3">
          <Card>
            <CardContent className="p-0">
              <Button
                onClick={handleEditProfile}
                variant="ghost"
                className="w-full justify-start h-14 px-5 text-base"
              >
                <User className="w-5 h-5 mr-3 text-gray-600 dark:text-gray-400" />
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
                <Store className="w-5 h-5 mr-3 text-gray-600 dark:text-gray-400" />
                Edit Informasi Bisnis
              </Button>
            </CardContent>
          </Card>

          <Link href="/achievement" className="block">
            <Card>
              <CardContent className="p-0">
                <Button
                  variant="ghost"
                  className="w-full justify-start h-14 px-5 text-base"
                >
                  <Trophy className="w-5 h-5 mr-3 text-gray-600 dark:text-gray-400" />
                  Pencapaian
                </Button>
              </CardContent>
            </Card>
          </Link>

          <Link href="/leaderboard" className="block">
            <Card>
              <CardContent className="p-0">
                <Button
                  variant="ghost"
                  className="w-full justify-start h-14 px-5 text-base"
                >
                  <Globe className="w-5 h-5 mr-3 text-gray-600 dark:text-gray-400" />
                  Leaderboard
                </Button>
              </CardContent>
            </Card>
          </Link>

          <Card>
            <CardContent className="p-0">
              <Button
                onClick={handleSettings}
                variant="ghost"
                className="w-full justify-start h-14 px-5 text-base"
              >
                <Settings className="w-5 h-5 mr-3 text-gray-600 dark:text-gray-400" />
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
                <HelpCircle className="w-5 h-5 mr-3 text-gray-600 dark:text-gray-400" />
                Pusat Bantuan
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-0">
              <Button
                onClick={() =>
                  toast({
                    title: "Keluar",
                    description: "Sampai jumpa lagi!",
                  })
                }
                variant="ghost"
                className="w-full justify-start h-14 px-5 text-base text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20"
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
