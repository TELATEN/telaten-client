"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  MessageCircle,
  Target,
  Sparkles,
  Check,
  ArrowRight,
  Zap,
  Shield,
  BarChart3,
} from "lucide-react";
import { useAuthStore } from "@/hooks/stores/use-auth.store";
import NavProfile from "@/components/NavProfile";

export default function LandingPage() {
  const user = useAuthStore((state) => state.user);

  const features = [
    {
      icon: MessageCircle,
      title: "Curhat Keuangan",
      description:
        "Ceritakan transaksi seperti chat biasa. TELATEN akan mencatat dengan sabar dan teliti.",
    },
    {
      icon: Sparkles,
      title: "AI Assistant",
      description:
        "Asisten pintar yang memahami bahasa sehari-hari dan siap membantu kapan saja.",
    },
    {
      icon: Target,
      title: "Misi & Gamifikasi",
      description:
        "Naik level sambil belajar mengelola usaha dengan cara yang menyenangkan.",
    },
    {
      icon: BarChart3,
      title: "Laporan Otomatis",
      description:
        "Lihat performa usaha dalam sekali pandang tanpa ribet hitung manual.",
    },
    {
      icon: Zap,
      title: "Super Cepat",
      description:
        "Input transaksi dalam hitungan detik. Hemat waktu, fokus jualan.",
    },
    {
      icon: Shield,
      title: "Aman Terpercaya",
      description: "Data Anda tersimpan aman dengan enkripsi tingkat bank.",
    },
  ];

  const plans = [
    {
      name: "Gratis",
      price: "0",
      period: "selamanya",
      features: [
        "Pencatatan transaksi unlimited",
        "Laporan keuangan dasar",
        "AI Assistant",
        "Misi dan gamifikasi",
        "Support komunitas",
      ],
      cta: "Mulai Gratis",
      popular: false,
    },
    {
      name: "Pro",
      price: "49.000",
      period: "per bulan",
      features: [
        "Semua fitur Gratis",
        "Laporan advanced & export",
        "Integrasi WhatsApp",
        "Analisis prediktif AI",
        "Priority support 24/7",
        "Multi-user access",
      ],
      cta: "Coba 30 Hari Gratis",
      popular: true,
    },
  ];

  const testimonials = [
    {
      name: "Bu Siti",
      business: "Warung Nasi Padang",
      quote:
        "Dulu ribet banget catat untung rugi. Sekarang tinggal cerita aja, TELATEN yang kerja!",
      avatar: "👩",
    },
    {
      name: "Mas Budi",
      business: "Toko Kelontong",
      quote:
        "Gak nyangka bisa pakai aplikasi modern dengan cara yang gampang banget. Mantap!",
      avatar: "👨",
    },
    {
      name: "Mbak Rina",
      business: "Online Shop Fashion",
      quote:
        "Level sudah 15! Serasa main game tapi yang dicapai adalah omzet naik terus.",
      avatar: "👩‍💼",
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-950/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg overflow-hidden">
                <Image
                  src="/images/logo-telaten.png"
                  alt="TELATEN Logo"
                  width={40}
                  height={40}
                  className="object-cover"
                />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                  TELATEN
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block">
                  Maju Pelan-pelan, Usaha Jadi Mapapan
                </p>
              </div>
            </div>

            {!!user ? (
              <div className="flex items-center gap-3">
                <NavProfile></NavProfile>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link href="/login">
                  <Button variant="ghost" className="font-semibold">
                    Masuk
                  </Button>
                </Link>
                <Link href="/register">
                  <Button className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 font-semibold shadow-lg">
                    Daftar Gratis
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden bg-gradient-to-br from-pink-50 via-purple-50 to-cyan-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900 py-20 md:py-32">
        <div className="absolute inset-0 bg-grid-pattern opacity-5 dark:opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Sparkles className="w-4 h-4" />
              <span>Gratis Selamanya untuk Fitur Dasar</span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              Kelola Usaha dengan{" "}
              <span className="bg-gradient-to-r from-pink-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
                Sabar & Telaten
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
              Aplikasi keuangan UMKM yang inklusif. Cukup ceritakan transaksi
              Anda seperti chat biasa, TELATEN akan mencatatnya dengan sabar.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Link href="/register" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full sm:w-auto h-14 px-8 text-lg font-semibold bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 shadow-xl hover:shadow-2xl transition-all"
                >
                  Mulai Gratis Sekarang
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="#features" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto h-14 px-8 text-lg font-semibold border-2 hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  Lihat Fitur
                </Button>
              </Link>
            </div>

            <div className="flex items-center justify-center gap-8 text-sm text-gray-600 dark:text-gray-300">
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-600 dark:text-green-400" />
                <span>Tanpa Kartu Kredit</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-600 dark:text-green-400" />
                <span>Setup 5 Menit</span>
              </div>
              <div className="hidden sm:flex items-center gap-2">
                <Check className="w-5 h-5 text-green-600 dark:text-green-400" />
                <span>Ramah Pemula</span>
              </div>
            </div>
          </div>

          <div className="mt-16 relative">
            <div className="absolute inset-0 bg-gradient-to-t from-pink-100 dark:from-pink-900/20 to-transparent blur-3xl opacity-30"></div>
            <Card className="max-w-5xl mx-auto shadow-2xl border-4 border-pink-200 dark:border-pink-800 overflow-hidden">
              <div className="bg-gradient-to-br from-pink-500 to-purple-600 p-3">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                  <div className="text-xs text-white/80 dark:text-white/60 ml-2">
                    TELATEN Dashboard
                  </div>
                </div>
              </div>
              <div className="bg-gray-900 p-8 aspect-video flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl animate-pulse overflow-hidden bg-white">
                    <Image
                      src="/images/logo-telaten.png"
                      alt="TELATEN Logo"
                      width={80}
                      height={80}
                      className="object-cover"
                    />
                  </div>
                  <p className="text-white/60 dark:text-white/40 text-sm">
                    Dashboard Preview
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section
        id="features"
        className="py-20 md:py-32 bg-white dark:bg-gray-950"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Fitur yang{" "}
              <span className="text-pink-600 dark:text-pink-400">Powerful</span>{" "}
              tapi{" "}
              <span className="text-purple-600 dark:text-purple-400">
                Mudah
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Dirancang khusus untuk UMKM Indonesia dengan bahasa dan cara yang
              familiar
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={index}
                  className="border-2 border-gray-200 dark:border-gray-800 hover:border-pink-300 dark:hover:border-pink-700 hover:shadow-xl transition-all duration-300 group"
                >
                  <CardContent className="p-8">
                    <div className="w-14 h-14 bg-gradient-to-br from-pink-100 to-purple-100 dark:from-pink-900/30 dark:to-purple-900/30 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <Icon className="w-7 h-7 text-pink-600 dark:text-pink-400" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32 bg-gradient-to-br from-gray-50 to-pink-50 dark:from-gray-900 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Pilih Paket yang Cocok
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Mulai gratis, upgrade kapan saja tanpa ribet
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {plans.map((plan, index) => (
              <Card
                key={index}
                className={`relative border-2 ${
                  plan.popular
                    ? "border-pink-500 dark:border-pink-600 shadow-2xl scale-105"
                    : "border-gray-200 dark:border-gray-800"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg">
                    Paling Populer
                  </div>
                )}
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {plan.name}
                  </h3>
                  <div className="mb-6">
                    <span className="text-5xl font-bold text-gray-900 dark:text-white">
                      Rp {plan.price}
                    </span>
                    <span className="text-gray-600 dark:text-gray-400 ml-2">
                      / {plan.period}
                    </span>
                  </div>

                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 dark:text-gray-300">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Link href="/register">
                    <Button
                      className={`w-full h-12 font-semibold ${
                        plan.popular
                          ? "bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
                          : "bg-gray-900 hover:bg-gray-800"
                      }`}
                    >
                      {plan.cta}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Cerita dari Pengguna TELATEN
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Ribuan UMKM sudah merasakan manfaatnya
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="border-2 border-gray-200 dark:border-gray-800"
              >
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full flex items-center justify-center text-2xl">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {testimonial.business}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 italic leading-relaxed">
                    &quot;{testimonial.quote}&quot;
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32 bg-gradient-to-br from-pink-600 via-purple-600 to-cyan-600 dark:from-pink-700 dark:via-purple-700 dark:to-cyan-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Siap Kelola Usaha dengan Lebih Baik?
          </h2>
          <p className="text-xl mb-10 opacity-90 dark:opacity-80">
            Bergabung dengan ribuan pemilik usaha yang sudah lebih teratur dan
            berkembang bersama TELATEN
          </p>
          <Link href="/register">
            <Button
              size="lg"
              className="h-14 px-8 text-lg font-semibold bg-white text-pink-600 hover:bg-gray-100 shadow-xl"
            >
              Mulai Gratis Sekarang
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      <footer className="bg-gray-900 dark:bg-black text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center overflow-hidden bg-white">
                  <Image
                    src="/images/logo-telaten.png"
                    alt="TELATEN Logo"
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold">TELATEN</h3>
                </div>
              </div>
              <p className="text-gray-400 dark:text-gray-500 text-sm">
                Maju Pelan-pelan, Usaha Jadi Mapapan untuk UMKM Indonesia
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-4">Produk</h4>
              <ul className="space-y-2 text-gray-400 dark:text-gray-500 text-sm">
                <li>
                  <Link href="#features" className="hover:text-white">
                    Fitur
                  </Link>
                </li>
                <li>
                  <Link href="#pricing" className="hover:text-white">
                    Harga
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Tutorial
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Perusahaan</h4>
              <ul className="space-y-2 text-gray-400 dark:text-gray-500 text-sm">
                <li>
                  <Link href="#" className="hover:text-white">
                    Tentang Kami
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Karir
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Bantuan</h4>
              <ul className="space-y-2 text-gray-400 dark:text-gray-500 text-sm">
                <li>
                  <Link href="#" className="hover:text-white">
                    Pusat Bantuan
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Kontak
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 dark:border-gray-900 pt-8 text-center text-gray-400 dark:text-gray-500 text-sm">
            <p>
              &copy; 2025 TELATEN. All rights reserved. Made with love for
              Indonesian UMKM.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
