"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShieldAlert, ArrowLeft, LogIn } from "lucide-react";
import { AppConfig } from "@/lib/constants/app";

export default function UnauthorizedPage() {
  const router = useRouter();

  useEffect(() => {
    // Auto redirect after 5 seconds
    const timer = setTimeout(() => {
      router.push("/login");
    }, 5000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-cyan-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
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
            {AppConfig.appName.toUpperCase()}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {AppConfig.appSlogan}
          </p>
        </div>

        <Card className="shadow-xl border-2 border-red-100 dark:border-red-900/30">
          <CardContent className="p-8 text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-red-100 to-red-200 dark:from-red-900/30 dark:to-red-800/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShieldAlert className="w-10 h-10 text-red-600 dark:text-red-400" />
            </div>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Akses Ditolak
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Anda harus login terlebih dahulu untuk mengakses halaman ini.
            </p>

            <div className="space-y-3">
              <Button
                onClick={() => router.push("/login")}
                className="w-full h-12 text-base font-semibold bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
              >
                <LogIn className="w-5 h-5 mr-2" />
                Login Sekarang
              </Button>

              <Button
                variant="outline"
                onClick={() => router.push("/")}
                className="w-full h-12 text-base font-medium border-2"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Kembali ke Beranda
              </Button>
            </div>

            <div className="mt-6 text-sm text-gray-500 dark:text-gray-400">
              Belum punya akun?{" "}
              <Link
                href="/register"
                className="text-pink-600 dark:text-pink-400 hover:text-pink-700 dark:hover:text-pink-300 font-semibold"
              >
                Daftar di sini
              </Link>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Anda akan dialihkan ke halaman login dalam 5 detik...
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
