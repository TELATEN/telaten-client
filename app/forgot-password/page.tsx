"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { AppConfig } from "@/lib/constants/app";

export default function ForgotPasswordPage() {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    toast({
      title: "Link Reset Terkirim!",
      description: "Silakan cek email Anda untuk instruksi reset password.",
    });

    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-cyan-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900 flex items-center justify-center">
      <div className="w-full max-w-md p-4">
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
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {AppConfig.appName}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {AppConfig.appSlogan}
          </p>
        </div>

        <Card className="shadow-xl border-2 border-pink-100 dark:border-pink-900/30">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              Lupa Password?
            </CardTitle>
            <CardDescription className="text-center">
              {isSubmitted
                ? "Kami sudah mengirim link reset ke email Anda"
                : "Masukkan email untuk reset password"}
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
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 text-center">
                  <p className="text-sm text-green-700 dark:text-green-400">
                    Periksa inbox email Anda. Jika tidak menemukan email, cek
                    folder spam.
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
                className="inline-flex items-center text-sm text-pink-600 dark:text-pink-400 hover:text-pink-700 dark:hover:text-pink-300 font-medium"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Kembali ke halaman masuk
              </Link>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-6">
          Butuh bantuan? Hubungi tim support TELATEN
        </p>
      </div>
    </div>
  );
}
