'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Bell, Moon, Globe, Shield, HelpCircle, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

export default function SettingsPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    language: 'id',
    privacy: true,
  });

  const handleSettingChange = (key: string, value: boolean | string) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    toast({
      title: 'Pengaturan Disimpan',
      description: 'Perubahan pengaturan telah disimpan.',
    });
  };

  const handleLogout = () => {
    toast({
      title: 'Keluar',
      description: 'Anda telah berhasil keluar dari akun.',
    });
    router.push('/');
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
          <h1 className="text-lg font-semibold">Pengaturan</h1>
          <div className="w-16" /> {/* Spacer for centering */}
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 md:py-8">
        {/* Notifications */}
        <Card className="mb-4">
          <CardContent className="p-0">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-gray-600" />
                <div>
                  <p className="font-medium">Notifikasi</p>
                  <p className="text-sm text-gray-500">Terima notifikasi dari TLATEN</p>
                </div>
              </div>
              <Switch
                checked={settings.notifications}
                onCheckedChange={(checked) => handleSettingChange('notifications', checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Dark Mode */}
        <Card className="mb-4">
          <CardContent className="p-0">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <Moon className="w-5 h-5 text-gray-600" />
                <div>
                  <p className="font-medium">Mode Gelap</p>
                  <p className="text-sm text-gray-500">Aktifkan tampilan gelap</p>
                </div>
              </div>
              <Switch
                checked={settings.darkMode}
                onCheckedChange={(checked) => handleSettingChange('darkMode', checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Language */}
        <Card className="mb-4">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5" />
              Bahasa
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label>Bahasa Aplikasi</Label>
              <select
                value={settings.language}
                onChange={(e) => handleSettingChange('language', e.target.value)}
                className="w-full h-12 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              >
                <option value="id">Bahasa Indonesia</option>
                <option value="en">English</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Privacy */}
        <Card className="mb-4">
          <CardContent className="p-0">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-gray-600" />
                <div>
                  <p className="font-medium">Privasi Data</p>
                  <p className="text-sm text-gray-500">Lindungi data pribadi Anda</p>
                </div>
              </div>
              <Switch
                checked={settings.privacy}
                onCheckedChange={(checked) => handleSettingChange('privacy', checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Support */}
        <Card className="mb-4">
          <CardContent className="p-0">
            <Button
              variant="ghost"
              className="w-full justify-start h-14 px-5 text-base"
              onClick={() => toast({
                title: 'Pusat Bantuan',
                description: 'Fitur ini akan segera tersedia.',
              })}
            >
              <HelpCircle className="w-5 h-5 mr-3 text-gray-600" />
              Pusat Bantuan
            </Button>
          </CardContent>
        </Card>

        {/* Logout */}
        <Card className="mb-6">
          <CardContent className="p-0">
            <Button
              variant="ghost"
              onClick={handleLogout}
              className="w-full justify-start h-14 px-5 text-base text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <LogOut className="w-5 h-5 mr-3" />
              Keluar dari Akun
            </Button>
          </CardContent>
        </Card>

        {/* App Info */}
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-sm text-gray-500 mb-2">TLATEN v1.0.0</p>
            <p className="text-xs text-gray-400">Teknologi yang Sabar</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
