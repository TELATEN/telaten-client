'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Store, MapPin, Package, FileText, Target, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import useBusinessProfile from '@/hooks/services/business/use-business-profile';

export default function EditBusinessPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { data: businessProfile } = useBusinessProfile();

  const [businessInfo, setBusinessInfo] = useState({
    name: '',
    category: '',
    description: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    stage: '',
    targetMarket: '',
    primaryGoal: '',
  });

  // Populate form when data is loaded
  useEffect(() => {
    if (businessProfile) {
      setBusinessInfo({
        name: businessProfile.business_name || '',
        category: businessProfile.business_category || '',
        description: businessProfile.business_description || '',
        street: businessProfile.address?.street || '',
        city: businessProfile.address?.city || '',
        state: businessProfile.address?.state || '',
        zipCode: businessProfile.address?.zip_code || '',
        country: businessProfile.address?.country || '',
        stage: businessProfile.business_stage || '',
        targetMarket: businessProfile.target_market || '',
        primaryGoal: businessProfile.primary_goal || '',
      });
    }
  }, [businessProfile]);

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
              <Label htmlFor="businessCategory">Kategori Usaha</Label>
              <Input
                id="businessCategory"
                value={businessInfo.category}
                onChange={(e) => setBusinessInfo({ ...businessInfo, category: e.target.value })}
                placeholder="Contoh: Food & Beverage, Retail"
                className="h-12"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Deskripsi Usaha</Label>
              <Textarea
                id="description"
                value={businessInfo.description}
                onChange={(e) => setBusinessInfo({ ...businessInfo, description: e.target.value })}
                placeholder="Deskripsikan usaha Anda"
                rows={4}
                className="resize-none"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="businessStage">Tahap Usaha</Label>
              <Input
                id="businessStage"
                value={businessInfo.stage}
                onChange={(e) => setBusinessInfo({ ...businessInfo, stage: e.target.value })}
                placeholder="Contoh: Operational, Planning, Growth"
                className="h-12"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="targetMarket">Target Market</Label>
              <Input
                id="targetMarket"
                value={businessInfo.targetMarket}
                onChange={(e) => setBusinessInfo({ ...businessInfo, targetMarket: e.target.value })}
                placeholder="Contoh: Mahasiswa, Pekerja Remote"
                className="h-12"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="primaryGoal">Tujuan Utama</Label>
              <Textarea
                id="primaryGoal"
                value={businessInfo.primaryGoal}
                onChange={(e) => setBusinessInfo({ ...businessInfo, primaryGoal: e.target.value })}
                placeholder="Tujuan bisnis Anda"
                rows={3}
                className="resize-none"
              />
            </div>
          </CardContent>
        </Card>

        {/* Address Card */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Alamat Usaha
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="street">Alamat Lengkap</Label>
              <Input
                id="street"
                value={businessInfo.street}
                onChange={(e) => setBusinessInfo({ ...businessInfo, street: e.target.value })}
                placeholder="Jl. Nama Jalan No. XX"
                className="h-12"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">Kota</Label>
                <Input
                  id="city"
                  value={businessInfo.city}
                  onChange={(e) => setBusinessInfo({ ...businessInfo, city: e.target.value })}
                  placeholder="Kota"
                  className="h-12"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">Provinsi</Label>
                <Input
                  id="state"
                  value={businessInfo.state}
                  onChange={(e) => setBusinessInfo({ ...businessInfo, state: e.target.value })}
                  placeholder="Provinsi"
                  className="h-12"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="zipCode">Kode Pos</Label>
                <Input
                  id="zipCode"
                  value={businessInfo.zipCode}
                  onChange={(e) => setBusinessInfo({ ...businessInfo, zipCode: e.target.value })}
                  placeholder="12345"
                  className="h-12"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">Negara</Label>
                <Input
                  id="country"
                  value={businessInfo.country}
                  onChange={(e) => setBusinessInfo({ ...businessInfo, country: e.target.value })}
                  placeholder="Indonesia"
                  className="h-12"
                />
              </div>
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
                  <h3 className="font-semibold text-gray-900 dark:text-white">{businessInfo.name || 'Nama Usaha'}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{businessInfo.category || 'Kategori'}</p>
                </div>
              </div>
              <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <div className="flex items-start gap-2">
                  <FileText className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span className="text-xs">{businessInfo.description || 'Deskripsi usaha'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 flex-shrink-0" />
                  <span className="text-xs">
                    {businessInfo.street || businessInfo.city || businessInfo.state
                      ? `${businessInfo.street ? businessInfo.street + ', ' : ''}${businessInfo.city}${businessInfo.state ? ', ' + businessInfo.state : ''}`
                      : 'Alamat belum diisi'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 flex-shrink-0" />
                  <span className="text-xs">{businessInfo.stage || 'Tahap usaha'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 flex-shrink-0" />
                  <span className="text-xs">{businessInfo.targetMarket || 'Target market'}</span>
                </div>
                {businessInfo.primaryGoal && (
                  <div className="flex items-start gap-2 pt-2 border-t border-pink-200 dark:border-pink-800/50">
                    <Package className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs font-medium mb-1">Tujuan Utama:</p>
                      <p className="text-xs">{businessInfo.primaryGoal}</p>
                    </div>
                  </div>
                )}
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
