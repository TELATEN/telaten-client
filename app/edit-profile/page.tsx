'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, User, Mail, Phone, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { mockUser } from '@/lib/mockData';

export default function EditProfilePage() {
  const router = useRouter();
  const { toast } = useToast();
  const [user, setUser] = useState(mockUser);
  const [formData, setFormData] = useState({
    name: user.name,
    email: 'user@example.com', // Mock email since it's not in mockUser
    phone: '', // Phone not in User type yet
  });

  const handleSave = () => {
    toast({
      title: 'Profil Disimpan',
      description: 'Perubahan profil Anda telah berhasil disimpan.',
    });
    router.back();
  };

  const handleAvatarChange = () => {
    toast({
      title: 'Fitur Upload Foto',
      description: 'Fitur ini akan segera tersedia.',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 z-10 md:hidden">
        <div className="flex items-center justify-between px-4 py-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.back()}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali
          </Button>
          <h1 className="text-lg font-semibold">Edit Profil</h1>
          <div className="w-16" /> {/* Spacer for centering */}
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 md:py-8">
        {/* Avatar Section */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col items-center">
              <div className="relative mb-4">
                <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
                  <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-pink-400 to-purple-500 text-white">
                    {user.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <Button
                  size="sm"
                  className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0 bg-pink-500 hover:bg-pink-600"
                  onClick={handleAvatarChange}
                >
                  <Camera className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-sm text-gray-500 text-center">
                Ketuk ikon kamera untuk mengubah foto profil
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Profile Form */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Informasi Pribadi
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nama Lengkap</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Masukkan nama lengkap"
                className="h-12"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="nama@email.com"
                className="h-12"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Nomor WhatsApp</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="08xx xxxx xxxx"
                className="h-12"
              />
            </div>
          </CardContent>
        </Card>

        {/* Level Info */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Informasi Level</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Level {user.level}</p>
                <p className="text-sm text-gray-600">{user.levelTitle}</p>
                <p className="text-xs text-gray-500 mt-1">{user.xp} XP terkumpul</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-pink-600">{user.xp}</p>
                <p className="text-xs text-gray-500">Total XP</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => router.back()}
            className="flex-1 h-12"
          >
            Batal
          </Button>
          <Button
            onClick={handleSave}
            className="flex-1 h-12 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
          >
            Simpan Perubahan
          </Button>
        </div>
      </div>
    </div>
  );
}
