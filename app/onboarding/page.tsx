'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Store, MapPin, Package, ChevronRight, ChevronLeft, Loader2, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function OnboardingPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    businessName: '',
    businessType: '',
    customBusinessType: '',
    address: '',
  });

  const businessTypes = [
    'Warung Makan',
    'Toko Kelontong',
    'Kafe',
    'Online Shop',
    'Jasa',
    'Lainnya',
  ];

  const handleNext = () => {
    if (step === 1 && !formData.businessName) {
      toast({
        title: 'Mohon Isi Nama Usaha',
        description: 'Nama usaha diperlukan untuk melanjutkan.',
        variant: 'destructive',
      });
      return;
    }

    if (step === 2) {
      if (!formData.businessType) {
        toast({
          title: 'Pilih Jenis Usaha',
          description: 'Silakan pilih jenis usaha Anda.',
          variant: 'destructive',
        });
        return;
      }
      
      if (formData.businessType === 'Lainnya' && !formData.customBusinessType) {
        toast({
          title: 'Sebutkan Jenis Usaha',
          description: 'Mohon sebutkan jenis usaha Anda.',
          variant: 'destructive',
        });
        return;
      }
    }

    if (step === 3 && !formData.address) {
      toast({
        title: 'Mohon Isi Alamat',
        description: 'Alamat usaha diperlukan untuk melanjutkan.',
        variant: 'destructive',
      });
      return;
    }

    if (step < 3) {
      setStep(step + 1);
    } else {
      handleComplete();
    }
  };

  const handleComplete = () => {
    setIsProcessing(true);

    // Simulate AI processing
    setTimeout(() => {
      toast({
        title: 'Selamat Datang di TELATEN!',
        description: 'Profil usaha Anda sudah tersimpan. Mari mulai berjualan!',
      });

      router.push('/dashboard');
    }, 3000); // 3 seconds to simulate AI processing
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-cyan-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {isProcessing ? (
          <div className="text-center">
            <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-lg overflow-hidden bg-white animate-pulse">
              <Image 
                src="/images/logo-telaten.png" 
                alt="TELATEN Logo" 
                width={80} 
                height={80}
                className="object-cover"
              />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Memproses Informasi Anda</h1>
            <div className="flex items-center justify-center mb-6">
              <Loader2 className="w-8 h-8 animate-spin text-pink-500 mr-3" />
              <div className="text-left">
                <p className="text-gray-700 dark:text-gray-300 font-medium">Menganalisis data usaha Anda...</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Membuat milestone personal dengan AI</p>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
              <div className="bg-gradient-to-r from-pink-500 to-purple-500 h-2 rounded-full animate-pulse" style={{ width: '70%' }}></div>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Mohon tunggu sebentar...</p>
          </div>
        ) : (
          <>
            <div className="text-center mb-8">
              <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg overflow-hidden bg-white">
                <Image 
                  src="/images/logo-telaten.png" 
                  alt="TELATEN Logo" 
                  width={80} 
                  height={80}
                  className="object-cover"
                />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Mari Kenalan Dulu!</h1>
              <p className="text-gray-600 dark:text-gray-400">Ceritakan sedikit tentang usaha Anda</p>

              <div className="flex items-center justify-center gap-2 mt-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className={`h-2 rounded-full transition-all ${i === step
                        ? 'w-8 bg-gradient-to-r from-pink-500 to-purple-500'
                        : i < step
                          ? 'w-2 bg-pink-300 dark:bg-pink-700'
                          : 'w-2 bg-gray-300 dark:bg-gray-700'
                      }`}
                  />
                ))}
              </div>
            </div>

            <Card className="shadow-xl border-2 border-pink-100 dark:border-pink-900/30">
              <CardContent className="p-6 md:p-8">
                {step === 1 && (
                  <div className="space-y-6">
                    <div className="text-center mb-8">
                      <div className="w-20 h-20 bg-gradient-to-br from-pink-100 to-purple-100 dark:from-pink-900/30 dark:to-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Store className="w-10 h-10 text-pink-600 dark:text-pink-400" />
                      </div>
                      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Apa nama usaha Anda?</h2>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">Nama ini akan muncul di dashboard Anda</p>
                    </div>

                    <div className="space-y-4">
                      <Input
                        type="text"
                        placeholder="Contoh: Warung Siti"
                        value={formData.businessName}
                        onChange={(e) =>
                          setFormData({ ...formData, businessName: e.target.value })
                        }
                        className="h-16 text-lg text-center font-medium border-2 border-gray-200 dark:border-gray-700/30 focus:border-pink-500 rounded-xl"
                        autoFocus
                      />
                      <p className="text-xs text-gray-500 dark:text-gray-400 text-center">Ketik nama usaha Anda di atas</p>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-6">
                    <div className="text-center mb-8">
                      <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-cyan-100 dark:from-purple-900/30 dark:to-cyan-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Package className="w-10 h-10 text-purple-600 dark:text-purple-400" />
                      </div>
                      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Jenis usaha apa yang Anda jalankan?</h2>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">Pilih yang paling sesuai dengan bisnis Anda</p>
                    </div>

                    <div className="space-y-4">
                      <div className="grid grid-cols-1 gap-4">
                        {businessTypes.map((type) => (
                          <Button
                            key={type}
                            type="button"
                            variant="outline"
                            className={`h-16 text-base font-medium border-2 rounded-xl transition-all ${formData.businessType === type
                                ? 'border-pink-500 bg-pink-50 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300 shadow-lg transform scale-105'
                                : 'border-gray-300 dark:border-gray-600 hover:border-pink-300 dark:hover:border-pink-700 hover:bg-pink-50 dark:hover:bg-pink-900/20'
                              }`}
                            onClick={() => setFormData({ ...formData, businessType: type, customBusinessType: '' })}
                          >
                            {type}
                          </Button>
                        ))}
                      </div>

                      {/* Custom Business Type Input */}
                      {formData.businessType === 'Lainnya' && (
                        <div className="space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
                          <Label htmlFor="customBusinessType" className="text-base font-medium dark:text-white">
                            Sebutkan jenis usaha Anda
                          </Label>
                          <Input
                            id="customBusinessType"
                            type="text"
                            placeholder="Contoh: Laundry, Barbershop, Salon, dll"
                            value={formData.customBusinessType}
                            onChange={(e) => setFormData({ ...formData, customBusinessType: e.target.value })}
                            className="h-14 text-base border-2 border-gray-200 dark:border-gray-700/30 focus:border-pink-500 rounded-xl dark:bg-gray-700 dark:text-white"
                            autoFocus
                          />
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-6">
                    <div className="text-center mb-8">
                      <div className="w-20 h-20 bg-gradient-to-br from-cyan-100 to-pink-100 dark:from-cyan-900/30 dark:to-pink-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                        <MapPin className="w-10 h-10 text-cyan-600 dark:text-cyan-400" />
                      </div>
                      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Di mana lokasi usaha Anda?</h2>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">Masukkan alamat lengkap usaha Anda</p>
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="address" className="text-base font-medium dark:text-white">
                        Alamat Lengkap
                      </Label>
                      <textarea
                        id="address"
                        placeholder="Masukkan alamat lengkap usaha Anda&#10;&#10;Contoh: Jl. Merdeka No. 123, Kelurahan Sukamaju, Kecamatan Bandung Barat, Kota Bandung, Jawa Barat 40123"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className="w-full min-h-[140px] p-4 text-base rounded-xl border-2 border-gray-200 dark:border-gray-700/30 bg-white dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-500 dark:focus:ring-pink-400 focus:border-transparent resize-none transition-all"
                        rows={5}
                      />
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        💡 Tips: Masukkan alamat selengkap mungkin termasuk nama jalan, nomor, kelurahan, kecamatan, kota, dan provinsi
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex gap-4 mt-10">
                  {step > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setStep(step - 1)}
                      className="h-14 px-8 text-base font-medium border-2 rounded-xl"
                    >
                      <ChevronLeft className="w-5 h-5 mr-2" />
                      Kembali
                    </Button>
                  )}
                  <Button
                    type="button"
                    onClick={handleNext}
                    className="flex-1 h-14 text-lg font-semibold bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 shadow-lg rounded-xl"
                  >
                    {step === 3 ? 'Selesai' : 'Lanjut'}
                    {step < 3 && <ChevronRight className="w-5 h-5 ml-2" />}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
              Langkah {step} dari 3
            </p>
          </>
        )}
      </div>
    </div>
  );
}
