"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Store,
  MapPin,
  Package,
  ChevronRight,
  ChevronLeft,
  Target,
  CheckCircle2,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import useCreateBusinessProfile from "@/hooks/services/business/use-create-business-profile";
import useCountries from "@/hooks/services/countries/use-countries";
import { LoadingOverlay } from "@/components/LoadingOverlay";
import { useQueryClient } from "@tanstack/react-query";

export default function OnboardingPage() {
  const router = useRouter();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [step, setStep] = useState(1);
  const createBusinessProfile = useCreateBusinessProfile();
  const { data: countries, isLoading: isLoadingCountries } = useCountries();

  const [formData, setFormData] = useState({
    businessName: "",
    businessCategory: "",
    customCategory: "",
    businessDescription: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "Indonesia",
    businessStage: "",
    targetMarket: "",
    primaryGoal: "",
  });

  const businessCategories = [
    "Food & Beverage",
    "Retail",
    "Fashion & Apparel",
    "Health & Beauty",
    "Technology",
    "Services",
    "Lainnya",
  ];

  const businessStages = [
    "Planning",
    "Startup",
    "Operational",
    "Growth",
    "Mature",
  ];

  const handleNext = () => {
    // Step 1: Business Name & Category
    if (step === 1) {
      if (!formData.businessName) {
        toast({
          title: "Mohon Isi Nama Usaha",
          description: "Nama usaha diperlukan untuk melanjutkan.",
          variant: "destructive",
        });
        return;
      }
      if (!formData.businessCategory) {
        toast({
          title: "Pilih Kategori Usaha",
          description: "Silakan pilih kategori usaha Anda.",
          variant: "destructive",
        });
        return;
      }
      if (formData.businessCategory === "Lainnya" && !formData.customCategory) {
        toast({
          title: "Sebutkan Kategori Usaha",
          description: "Mohon sebutkan kategori usaha Anda.",
          variant: "destructive",
        });
        return;
      }
    }

    // Step 2: Address
    if (step === 2) {
      if (
        !formData.street ||
        !formData.city ||
        !formData.state ||
        !formData.zipCode
      ) {
        toast({
          title: "Mohon Lengkapi Alamat",
          description: "Semua field alamat harus diisi.",
          variant: "destructive",
        });
        return;
      }
    }

    // Step 3: Business Details
    if (step === 3) {
      if (
        !formData.businessStage ||
        !formData.targetMarket ||
        !formData.primaryGoal
      ) {
        toast({
          title: "Mohon Lengkapi Detail Bisnis",
          description: "Semua field harus diisi.",
          variant: "destructive",
        });
        return;
      }
    }

    if (step < 4) {
      setStep(step + 1);
    } else {
      handleComplete();
    }
  };

  const handleComplete = async () => {
    const payload = {
      business_name: formData.businessName,
      business_category:
        formData.businessCategory === "Lainnya"
          ? formData.customCategory
          : formData.businessCategory,
      business_description:
        formData.businessDescription ||
        `Bisnis ${formData.businessName} bergerak di bidang ${formData.businessCategory === "Lainnya" ? formData.customCategory : formData.businessCategory}`,
      address: {
        street: formData.street,
        city: formData.city,
        state: formData.state,
        zip_code: formData.zipCode,
        country: formData.country,
      },
      business_stage: formData.businessStage,
      target_market: formData.targetMarket,
      primary_goal: formData.primaryGoal,
    };

    createBusinessProfile.mutate(payload, {
      onSuccess: () => {
        // Invalidate business profile query to refetch
        queryClient.invalidateQueries({ queryKey: ["business-profile"] });

        toast({
          title: "Selamat Datang di TELATEN!",
          description:
            "Profil usaha Anda sudah tersimpan. Mari mulai berjualan!",
        });
        router.push("/dashboard");
      },
      onError: (error: any) => {
        toast({
          title: "Gagal Menyimpan Profil",
          description:
            error?.response?.data?.message ||
            "Terjadi kesalahan. Silakan coba lagi.",
          variant: "destructive",
        });
      },
    });
  };

  return (
    <>
      <LoadingOverlay
        isLoading={createBusinessProfile.isPending}
        message="Mempersiapkan personalisasi untuk bisnis Anda..."
      />
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-cyan-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900 flex items-center justify-center">
        <div className="w-full max-w-lg p-4">
          {!createBusinessProfile.isPending && (
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
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Mari Kenalan Dulu!
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Ceritakan sedikit tentang usaha Anda
                </p>

                <div className="flex items-center justify-center gap-2 mt-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className={`h-2 rounded-full transition-all ${
                        i === step
                          ? "w-8 bg-gradient-to-r from-pink-500 to-purple-500"
                          : i < step
                            ? "w-2 bg-pink-300 dark:bg-pink-700"
                            : "w-2 bg-gray-300 dark:bg-gray-700"
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
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                          Informasi Dasar Usaha
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          Ceritakan tentang bisnis Anda
                        </p>
                      </div>

                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="businessName">Nama Usaha</Label>
                          <Input
                            id="businessName"
                            type="text"
                            placeholder="Contoh: Kopi Telaten"
                            value={formData.businessName}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                businessName: e.target.value,
                              })
                            }
                            className="h-12 border-2"
                            autoFocus
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Kategori Usaha</Label>
                          <div className="grid grid-cols-2 gap-3">
                            {businessCategories.map((cat) => (
                              <Button
                                key={cat}
                                type="button"
                                variant="outline"
                                className={`h-12 text-sm font-medium border-2 rounded-lg transition-all ${
                                  formData.businessCategory === cat
                                    ? "border-pink-500 bg-pink-50 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300"
                                    : "border-gray-300 dark:border-gray-600 hover:border-pink-300"
                                }`}
                                onClick={() =>
                                  setFormData({
                                    ...formData,
                                    businessCategory: cat,
                                    customCategory: "",
                                  })
                                }
                              >
                                {cat}
                              </Button>
                            ))}
                          </div>
                        </div>

                        {formData.businessCategory === "Lainnya" && (
                          <div className="space-y-2 animate-in fade-in">
                            <Label htmlFor="customCategory">
                              Sebutkan Kategori
                            </Label>
                            <Input
                              id="customCategory"
                              placeholder="Contoh: Education, Automotive"
                              value={formData.customCategory}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  customCategory: e.target.value,
                                })
                              }
                              className="h-12 border-2"
                            />
                          </div>
                        )}

                        <div className="space-y-2">
                          <Label htmlFor="businessDescription">
                            Deskripsi Usaha (Opsional)
                          </Label>
                          <Textarea
                            id="businessDescription"
                            placeholder="Ceritakan singkat tentang usaha Anda..."
                            value={formData.businessDescription}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                businessDescription: e.target.value,
                              })
                            }
                            className="min-h-[80px] border-2"
                            rows={3}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="space-y-6">
                      <div className="text-center mb-8">
                        <div className="w-20 h-20 bg-gradient-to-br from-cyan-100 to-pink-100 dark:from-cyan-900/30 dark:to-pink-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                          <MapPin className="w-10 h-10 text-cyan-600 dark:text-cyan-400" />
                        </div>
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                          Alamat Usaha
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          Lokasi bisnis Anda beroperasi
                        </p>
                      </div>

                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="street">Alamat Jalan</Label>
                          <Input
                            id="street"
                            placeholder="Jl. Malioboro No. 123"
                            value={formData.street}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                street: e.target.value,
                              })
                            }
                            className="h-12 border-2"
                            autoFocus
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="city">Kota</Label>
                            <Input
                              id="city"
                              placeholder="Yogyakarta"
                              value={formData.city}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  city: e.target.value,
                                })
                              }
                              className="h-12 border-2"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="state">Provinsi</Label>
                            <Input
                              id="state"
                              placeholder="DIY"
                              value={formData.state}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  state: e.target.value,
                                })
                              }
                              className="h-12 border-2"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="zipCode">Kode Pos</Label>
                            <Input
                              id="zipCode"
                              placeholder="55213"
                              value={formData.zipCode}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  zipCode: e.target.value,
                                })
                              }
                              className="h-12 border-2"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="country">Negara</Label>
                            <Select
                              value={formData.country}
                              onValueChange={(value) =>
                                setFormData({ ...formData, country: value })
                              }
                            >
                              <SelectTrigger className="h-12 border-2">
                                <SelectValue
                                  placeholder={
                                    isLoadingCountries
                                      ? "Memuat negara..."
                                      : "Pilih negara"
                                  }
                                />
                              </SelectTrigger>
                              <SelectContent>
                                {isLoadingCountries ? (
                                  <SelectItem value="loading" disabled>
                                    Memuat data negara...
                                  </SelectItem>
                                ) : countries && countries.length > 0 ? (
                                  countries.map((country) => (
                                    <SelectItem
                                      key={country.cca3}
                                      value={country.name.common}
                                    >
                                      {country.flag} {country.name.common}
                                    </SelectItem>
                                  ))
                                ) : (
                                  <SelectItem value="no-data" disabled>
                                    Tidak ada data negara
                                  </SelectItem>
                                )}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="space-y-6">
                      <div className="text-center mb-8">
                        <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-cyan-100 dark:from-purple-900/30 dark:to-cyan-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                          <Package className="w-10 h-10 text-purple-600 dark:text-purple-400" />
                        </div>
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                          Detail Bisnis
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          Tahap dan tujuan bisnis Anda
                        </p>
                      </div>

                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label>Tahap Bisnis</Label>
                          <div className="grid grid-cols-2 gap-3">
                            {businessStages.map((stage) => (
                              <Button
                                key={stage}
                                type="button"
                                variant="outline"
                                className={`h-12 text-sm font-medium border-2 rounded-lg transition-all ${
                                  formData.businessStage === stage
                                    ? "border-purple-500 bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300"
                                    : "border-gray-300 dark:border-gray-600 hover:border-purple-300"
                                }`}
                                onClick={() =>
                                  setFormData({
                                    ...formData,
                                    businessStage: stage,
                                  })
                                }
                              >
                                {stage}
                              </Button>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="targetMarket">Target Pasar</Label>
                          <Input
                            id="targetMarket"
                            placeholder="Contoh: Mahasiswa dan Pekerja Remote"
                            value={formData.targetMarket}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                targetMarket: e.target.value,
                              })
                            }
                            className="h-12 border-2"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="primaryGoal">Tujuan Utama</Label>
                          <Textarea
                            id="primaryGoal"
                            placeholder="Contoh: Membuka cabang kedua di area kampus UGM"
                            value={formData.primaryGoal}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                primaryGoal: e.target.value,
                              })
                            }
                            className="min-h-[80px] border-2"
                            rows={3}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {step === 4 && (
                    <div className="space-y-6">
                      <div className="text-center mb-8">
                        <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-cyan-100 dark:from-green-900/30 dark:to-cyan-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                          <CheckCircle2 className="w-10 h-10 text-green-600 dark:text-green-400" />
                        </div>
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                          Review & Konfirmasi
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          Pastikan data Anda sudah benar
                        </p>
                      </div>

                      <div className="space-y-4">
                        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                            <Store className="w-5 h-5 mr-2 text-pink-500" />
                            Informasi Usaha
                          </h3>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600 dark:text-gray-400">
                                Nama Usaha:
                              </span>
                              <span className="font-medium text-gray-900 dark:text-white">
                                {formData.businessName}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600 dark:text-gray-400">
                                Kategori:
                              </span>
                              <span className="font-medium text-gray-900 dark:text-white">
                                {formData.businessCategory === "Lainnya"
                                  ? formData.customCategory
                                  : formData.businessCategory}
                              </span>
                            </div>
                            {formData.businessDescription && (
                              <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                                <span className="text-gray-600 dark:text-gray-400">
                                  Deskripsi:
                                </span>
                                <p className="text-gray-900 dark:text-white mt-1">
                                  {formData.businessDescription}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                            <MapPin className="w-5 h-5 mr-2 text-cyan-500" />
                            Alamat
                          </h3>
                          <p className="text-sm text-gray-900 dark:text-white">
                            {formData.street}, {formData.city}, {formData.state}{" "}
                            {formData.zipCode}, {formData.country}
                          </p>
                        </div>

                        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                            <Target className="w-5 h-5 mr-2 text-purple-500" />
                            Detail Bisnis
                          </h3>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600 dark:text-gray-400">
                                Tahap Bisnis:
                              </span>
                              <span className="font-medium text-gray-900 dark:text-white">
                                {formData.businessStage}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600 dark:text-gray-400">
                                Target Pasar:
                              </span>
                              <span className="font-medium text-gray-900 dark:text-white">
                                {formData.targetMarket}
                              </span>
                            </div>
                            <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                              <span className="text-gray-600 dark:text-gray-400">
                                Tujuan Utama:
                              </span>
                              <p className="text-gray-900 dark:text-white mt-1">
                                {formData.primaryGoal}
                              </p>
                            </div>
                          </div>
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
                      {step === 4 ? "Selesai & Simpan" : "Lanjut"}
                      {step < 4 && <ChevronRight className="w-5 h-5 ml-2" />}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
                Langkah {step} dari 4
              </p>
            </>
          )}
        </div>
      </div>
    </>
  );
}
