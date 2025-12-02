'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Heart, Store, MapPin, Package, ChevronRight, ChevronLeft, Loader2, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function OnboardingPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    businessName: '',
    businessType: '',
    location: '',
    mainProduct: '',
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
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-cyan-50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {isProcessing ? (
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-pink-400 via-purple-400 to-cyan-400 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-lg">
              <Sparkles className="w-10 h-10 text-white animate-pulse" />
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
              <div className="w-20 h-20 bg-gradient-to-br from-pink-400 via-purple-400 to-cyan-400 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Heart className="w-10 h-10 text-white" fill="white" />
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
                          ? 'w-2 bg-pink-300'
                          : 'w-2 bg-gray-300'
                      }`}
                  />
                ))}
              </div>
            </div>

            <Card className="shadow-xl border-2 border-pink-100">
              <CardContent className="p-6 md:p-8">
                {step === 1 && (
                  <div className="space-y-6">
                    <div className="text-center mb-8">
                      <div className="w-20 h-20 bg-gradient-to-br from-pink-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Store className="w-10 h-10 text-pink-600" />
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
                      <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-cyan-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Package className="w-10 h-10 text-purple-600" />
                      </div>
                      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Jenis usaha apa yang Anda jalankan?</h2>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">Pilih yang paling sesuai dengan bisnis Anda</p>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                      {businessTypes.map((type) => (
                        <Button
                          key={type}
                          type="button"
                          variant="outline"
                          className={`h-16 text-base font-medium border-2 rounded-xl transition-all ${formData.businessType === type
                              ? 'border-pink-500 bg-pink-50 text-pink-700 shadow-lg transform scale-105'
                              : 'border-gray-300 dark:border-gray-600 hover:border-pink-300 hover:bg-pink-25'
                            }`}
                          onClick={() => setFormData({ ...formData, businessType: type })}
                        >
                          {type}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-6">
                    <div className="text-center mb-8">
                      <div className="w-20 h-20 bg-gradient-to-br from-cyan-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <MapPin className="w-10 h-10 text-cyan-600" />
                      </div>
                      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Di mana lokasi usaha Anda?</h2>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">Bantu kami memahami area operasi Anda</p>
                    </div>

                    <div className="space-y-6">
                      <div className="space-y-3">
                        <Input
                          type="text"
                          placeholder="Kota/Kabupaten"
                          value={formData.location}
                          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                          className="h-16 text-lg text-center font-medium border-2 border-gray-200 dark:border-gray-700/30 focus:border-pink-500 rounded-xl"
                        />
                        <p className="text-xs text-gray-500 dark:text-gray-400 text-center">Contoh: Jakarta Selatan</p>
                      </div>

                      <div className="space-y-3">
                        <Input
                          type="text"
                          placeholder="Produk/jasa utama"
                          value={formData.mainProduct}
                          onChange={(e) =>
                            setFormData({ ...formData, mainProduct: e.target.value })
                          }
                          className="h-16 text-lg text-center font-medium border-2 border-gray-200 dark:border-gray-700/30 focus:border-pink-500 rounded-xl"
                        />
                        <p className="text-xs text-gray-500 dark:text-gray-400 text-center">Contoh: Nasi goreng, Minuman</p>
                      </div>
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
