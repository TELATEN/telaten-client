'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { ArrowLeft, Bell, Moon, Sun, Globe, Shield, HelpCircle, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

export default function SettingsPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [settings, setSettings] = useState({
    notifications: true,
    language: 'id',
    privacy: true,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSettingChange = (key: string, value: boolean | string) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    toast({
      title: 'Pengaturan Disimpan',
      description: 'Perubahan pengaturan telah disimpan.',
    });
  };

  const handleThemeToggle = (checked: boolean) => {
    setTheme(checked ? 'dark' : 'light');
    toast({
      title: checked ? 'Mode Gelap Aktif' : 'Mode Terang Aktif',
      description: `Tema aplikasi diubah ke mode ${checked ? 'gelap' : 'terang'}.`,
    });
  };

  const handleLogout = () => {
    toast({
      title: 'Keluar',
      description: 'Anda telah berhasil keluar dari akun.',
    });
    router.push('/');
  };

  if (!mounted) {
    return null;
  }

  const isDarkMode = theme === 'dark';

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Mobile Header */}
      <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200/50 dark:border-gray-700/50 z-10 md:hidden">
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
          <h1 className="text-lg font-semibold dark:text-white">Pengaturan</h1>
          <div className="w-16" /> {/* Spacer for centering */}
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 md:py-8">
        {/* Desktop Header */}
        <div className="hidden md:flex items-center gap-3 mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.back()}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali
          </Button>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Pengaturan</h1>
        </div>

        {/* Notifications */}
        <Card className="mb-4 dark:bg-gray-800 dark:border-gray-700">
          <CardContent className="p-0">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <div>
                  <p className="font-medium dark:text-white">Notifikasi</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Terima notifikasi dari TELATEN</p>
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
        <Card className="mb-4 dark:bg-gray-800 dark:border-gray-700">
          <CardContent className="p-0">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                {isDarkMode ? (
                  <Moon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                ) : (
                  <Sun className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                )}
                <div>
                  <p className="font-medium dark:text-white">Mode Gelap</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Aktifkan tampilan gelap</p>
                </div>
              </div>
              <Switch
                checked={isDarkMode}
                onCheckedChange={handleThemeToggle}
              />
            </div>
          </CardContent>
        </Card>

        {/* Language */}
        <Card className="mb-4 dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 dark:text-white">
              <Globe className="w-5 h-5" />
              Bahasa
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label className="dark:text-gray-300">Bahasa Aplikasi</Label>
              <select
                value={settings.language}
                onChange={(e) => handleSettingChange('language', e.target.value)}
                className="w-full h-12 px-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="id">Bahasa Indonesia</option>
                <option value="en">English</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Privacy */}
        <Card className="mb-4 dark:bg-gray-800 dark:border-gray-700">
          <CardContent className="p-0">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <div>
                  <p className="font-medium dark:text-white">Privasi Data</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Lindungi data pribadi Anda</p>
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
        <Card className="mb-4 dark:bg-gray-800 dark:border-gray-700">
          <CardContent className="p-0">
            <Button
              variant="ghost"
              className="w-full justify-start h-14 px-5 text-base dark:text-white dark:hover:bg-gray-700"
              onClick={() => router.push('/help')}
            >
              <HelpCircle className="w-5 h-5 mr-3 text-gray-600 dark:text-gray-400" />
              Pusat Bantuan
            </Button>
          </CardContent>
        </Card>

        {/* Logout */}
        <Card className="mb-6 dark:bg-gray-800 dark:border-gray-700">
          <CardContent className="p-0">
            <Button
              variant="ghost"
              onClick={handleLogout}
              className="w-full justify-start h-14 px-5 text-base text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
            >
              <LogOut className="w-5 h-5 mr-3" />
              Keluar dari Akun
            </Button>
          </CardContent>
        </Card>

        {/* App Info */}
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardContent className="p-6 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">TELATEN v1.0.0</p>
            <p className="text-xs text-gray-400 dark:text-gray-500">Maju Pelan-pelan, Usaha Jadi Mapapan.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
