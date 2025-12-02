'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Store, MapPin, Package, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { mockUser } from '@/lib/mockData';

export default function EditBusinessPage() {
  const router = useRouter();
  const { toast } = useToast();

  const [businessInfo, setBusinessInfo] = useState({
    name: mockUser.businessName,
    type: 'Warung Makan',
    location: 'Jakarta Selatan',
    mainProduct: 'Nasi goreng, Minuman',
    description: 'Warung makan keluarga dengan cita rasa tradisional',
  });

  const handleSave = () => {
    toast({
      title: 'Informasi Usaha Disimpan',
      description: 'Perubahan telah berhasil disimpan.',
    });
    router.back();
  };

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
          <h1 className="text-lg font-semibold">Edit Usaha</h1>
          <div className="w-16" /> {/* Spacer for centering */}
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 md:py-8">
        {/* Business Info Form */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Store className="w-5 h-5" />
              Informasi Usaha
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="businessName">Nama Usaha</Label>
              <Input
                id="businessName"
                value={businessInfo.name}
                onChange={(e) => setBusinessInfo({ ...businessInfo, name: e.target.value })}
                placeholder="Masukkan nama usaha"
                className="h-12"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="businessType">Jenis Usaha</Label>
              <Input
                id="businessType"
                value={businessInfo.type}
                onChange={(e) => setBusinessInfo({ ...businessInfo, type: e.target.value })}
                placeholder="Contoh: Warung Makan, Toko Kelontong"
                className="h-12"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Lokasi</Label>
              <Input
                id="location"
                value={businessInfo.location}
                onChange={(e) => setBusinessInfo({ ...businessInfo, location: e.target.value })}
                placeholder="Kota/Kabupaten"
                className="h-12"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mainProduct">Produk Utama</Label>
              <Input
                id="mainProduct"
                value={businessInfo.mainProduct}
                onChange={(e) => setBusinessInfo({ ...businessInfo, mainProduct: e.target.value })}
                placeholder="Produk/jasa utama yang dijual"
                className="h-12"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Deskripsi</Label>
              <Textarea
                id="description"
                value={businessInfo.description}
                onChange={(e) => setBusinessInfo({ ...businessInfo, description: e.target.value })}
                placeholder="Deskripsikan usaha Anda"
                rows={4}
                className="resize-none"
              />
            </div>
          </CardContent>
        </Card>

        {/* Preview Card */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Pratinjau</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gradient-to-br from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 rounded-lg p-4 border border-pink-100 dark:border-pink-800/30">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-purple-500 rounded-xl flex items-center justify-center">
                  <Store className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{businessInfo.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{businessInfo.type}</p>
                </div>
              </div>
              <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{businessInfo.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4" />
                  <span>{businessInfo.mainProduct}</span>
                </div>
                <div className="flex items-start gap-2">
                  <FileText className="w-4 h-4 mt-0.5" />
                  <span className="text-xs">{businessInfo.description}</span>
                </div>
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
