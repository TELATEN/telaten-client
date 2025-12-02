'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Heart, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function ForgotPasswordPage() {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    toast({
      title: 'Link Reset Terkirim!',
      description: 'Silakan cek email Anda untuk instruksi reset password.',
    });

    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-cyan-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-pink-400 via-purple-400 to-cyan-400 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Heart className="w-10 h-10 text-white" fill="white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">TLATEN</h1>
          <p className="text-gray-600">Teknologi yang Sabar</p>
        </div>

        <Card className="shadow-xl border-2 border-pink-100">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Lupa Password?</CardTitle>
            <CardDescription className="text-center">
              {isSubmitted
                ? 'Kami sudah mengirim link reset ke email Anda'
                : 'Masukkan email untuk reset password'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="nama@contoh.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-12"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 text-base font-semibold bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
                >
                  Kirim Link Reset
                </Button>
              </form>
            ) : (
              <div className="space-y-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                  <p className="text-sm text-green-700">
                    Periksa inbox email Anda. Jika tidak menemukan email, cek folder spam.
                  </p>
                </div>

                <Button
                  onClick={() => setIsSubmitted(false)}
                  variant="outline"
                  className="w-full h-12 text-base"
                >
                  Kirim Ulang Email
                </Button>
              </div>
            )}

            <div className="mt-6 text-center">
              <Link
                href="/login"
                className="inline-flex items-center text-sm text-pink-600 hover:text-pink-700 font-medium"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Kembali ke halaman masuk
              </Link>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-gray-500 mt-6">
          Butuh bantuan? Hubungi tim support TLATEN
        </p>
      </div>
    </div>
  );
}
