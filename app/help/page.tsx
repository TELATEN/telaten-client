'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Search, BookOpen, MessageCircle, Mail, Phone, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export default function HelpPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      category: 'Umum',
      question: 'Apa itu TELATEN?',
      answer: 'TELATEN adalah aplikasi keuangan UMKM yang inklusif dan mudah digunakan. Anda bisa mencatat transaksi dengan cara bercerita seperti chat biasa, dan TELATEN akan mencatatnya dengan sabar.',
    },
    {
      category: 'Umum',
      question: 'Apakah TELATEN gratis?',
      answer: 'Ya! TELATEN menyediakan fitur dasar secara gratis selamanya. Anda bisa mencatat transaksi, melihat laporan keuangan sederhana, dan menggunakan asisten AI tanpa biaya.',
    },
    {
      category: 'Transaksi',
      question: 'Bagaimana cara mencatat transaksi?',
      answer: 'Ada 2 cara mudah: 1) Gunakan Asisten AI - ceritakan transaksi Anda seperti chat biasa, misalnya "Hari ini jual 10 nasi goreng @15rb". 2) Input manual di halaman Keuangan dengan mengisi form.',
    },
    {
      category: 'Transaksi',
      question: 'Apakah data transaksi saya aman?',
      answer: 'Sangat aman! Data Anda dienkripsi dan disimpan dengan standar keamanan tinggi. Kami tidak akan membagikan data Anda ke pihak ketiga tanpa izin Anda.',
    },
    {
      category: 'Misi',
      question: 'Apa itu Misi dan XP?',
      answer: 'Misi adalah tugas harian yang membantu Anda belajar mengelola keuangan dengan lebih baik. Setiap misi yang diselesaikan memberikan XP (Experience Points) yang akan menaikkan level Anda.',
    },
    {
      category: 'Misi',
      question: 'Apa manfaat naik level?',
      answer: 'Semakin tinggi level Anda, semakin banyak fitur premium dan badge eksklusif yang bisa Anda dapatkan. Anda juga akan mendapat insight bisnis yang lebih advanced.',
    },
    {
      category: 'Laporan',
      question: 'Bagaimana cara melihat laporan keuangan?',
      answer: 'Kunjungi halaman Dashboard untuk melihat ringkasan keuangan Anda, atau halaman Keuangan untuk detail transaksi. Anda bisa filter berdasarkan tanggal dan kategori.',
    },
    {
      category: 'Laporan',
      question: 'Apakah bisa export laporan ke Excel?',
      answer: 'Fitur export laporan akan segera tersedia di versi Pro. Saat ini Anda bisa screenshot atau salin data secara manual.',
    },
    {
      category: 'Akun',
      question: 'Bagaimana cara mengubah profil saya?',
      answer: 'Klik menu Profil di sidebar, lalu klik tombol Edit Profil. Anda bisa mengubah nama, email, nomor telepon, dan informasi bisnis Anda.',
    },
    {
      category: 'Akun',
      question: 'Lupa password, bagaimana?',
      answer: 'Klik "Lupa Password?" di halaman login, masukkan email Anda, dan kami akan mengirimkan link reset password ke email Anda.',
    },
    {
      category: 'Teknis',
      question: 'Aplikasi berjalan lambat, apa yang harus dilakukan?',
      answer: 'Coba clear cache browser Anda, tutup tab lain yang tidak terpakai, atau gunakan browser yang lebih modern seperti Chrome atau Firefox versi terbaru.',
    },
    {
      category: 'Teknis',
      question: 'Apakah TELATEN bisa diakses offline?',
      answer: 'Saat ini TELATEN memerlukan koneksi internet. Namun, kami sedang mengembangkan fitur offline yang akan segera hadir.',
    },
  ];

  const categories = ['Semua', ...Array.from(new Set(faqs.map(faq => faq.category)))];
  const [selectedCategory, setSelectedCategory] = useState('Semua');

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Semua' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleFAQ = (index: number) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
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
          <h1 className="text-lg font-semibold dark:text-white">Pusat Bantuan</h1>
          <div className="w-16" />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6 md:py-8">
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
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Pusat Bantuan</h1>
        </div>

        {/* Hero Section */}
        <Card className="mb-6 bg-gradient-to-br from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 border-pink-200 dark:border-pink-800">
          <CardContent className="p-6 md:p-8 text-center">
            <BookOpen className="w-12 h-12 text-pink-600 dark:text-pink-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Ada yang bisa kami bantu?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Cari jawaban dari pertanyaan yang sering ditanyakan atau hubungi tim support kami
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Cari bantuan... (contoh: cara mencatat transaksi)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
              />
            </div>
          </CardContent>
        </Card>

        {/* Category Filter */}
        <div className="mb-6 flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className={selectedCategory === category 
                ? 'bg-pink-500 hover:bg-pink-600' 
                : 'dark:border-gray-600 dark:text-gray-300'
              }
            >
              {category}
            </Button>
          ))}
        </div>

        {/* FAQ Section */}
        <Card className="mb-6 dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="dark:text-white">Pertanyaan yang Sering Ditanyakan (FAQ)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {filteredFAQs.length > 0 ? (
              filteredFAQs.map((faq, index) => (
                <div
                  key={index}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left"
                  >
                    <div className="flex-1">
                      <Badge
                        variant="outline"
                        className="mb-2 text-xs border-pink-300 dark:border-pink-700 text-pink-700 dark:text-pink-300"
                      >
                        {faq.category}
                      </Badge>
                      <p className="font-medium text-gray-900 dark:text-white">{faq.question}</p>
                    </div>
                    {expandedFAQ === index ? (
                      <ChevronUp className="w-5 h-5 text-gray-500 dark:text-gray-400 flex-shrink-0 ml-4" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400 flex-shrink-0 ml-4" />
                    )}
                  </button>
                  {expandedFAQ === index && (
                    <div className="px-4 pb-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500 dark:text-gray-400">
                  Tidak ada hasil yang cocok dengan pencarian Anda.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Contact Support */}
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="dark:text-white">Masih Butuh Bantuan?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Tim support kami siap membantu Anda 24/7
            </p>

            {/* Chat Support */}
            <Button
              variant="outline"
              className="w-full justify-start h-16 px-5 text-left hover:bg-pink-50 dark:hover:bg-pink-900/20 dark:border-gray-600"
              onClick={() => router.push('/assistant')}
            >
              <MessageCircle className="w-5 h-5 mr-3 text-pink-600 dark:text-pink-400" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Chat dengan Asisten AI</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Respon instan untuk pertanyaan Anda</p>
              </div>
            </Button>

            {/* Email Support */}
            <Button
              variant="outline"
              className="w-full justify-start h-16 px-5 text-left hover:bg-purple-50 dark:hover:bg-purple-900/20 dark:border-gray-600"
              asChild
            >
              <a href="mailto:support@telaten.id">
                <Mail className="w-5 h-5 mr-3 text-purple-600 dark:text-purple-400" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Email Support</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">support@telaten.id</p>
                </div>
              </a>
            </Button>

            {/* Phone Support */}
            <Button
              variant="outline"
              className="w-full justify-start h-16 px-5 text-left hover:bg-cyan-50 dark:hover:bg-cyan-900/20 dark:border-gray-600"
              asChild
            >
              <a href="tel:+628001234567">
                <Phone className="w-5 h-5 mr-3 text-cyan-600 dark:text-cyan-400" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Telepon Support</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">0800-1234-567 (Bebas Pulsa)</p>
                </div>
              </a>
            </Button>
          </CardContent>
        </Card>

        {/* Quick Links */}
        <Card className="mt-6 dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="dark:text-white">Panduan & Tutorial</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button
              variant="ghost"
              className="w-full justify-start text-left dark:text-gray-300 dark:hover:bg-gray-700"
              onClick={() => router.push('/onboarding')}
            >
              <BookOpen className="w-5 h-5 mr-3 text-gray-600 dark:text-gray-400" />
              Panduan Memulai untuk Pemula
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-left dark:text-gray-300 dark:hover:bg-gray-700"
              onClick={() => router.push('/dashboard')}
            >
              <BookOpen className="w-5 h-5 mr-3 text-gray-600 dark:text-gray-400" />
              Cara Membaca Dashboard
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-left dark:text-gray-300 dark:hover:bg-gray-700"
              onClick={() => router.push('/misi')}
            >
              <BookOpen className="w-5 h-5 mr-3 text-gray-600 dark:text-gray-400" />
              Panduan Menyelesaikan Misi
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
