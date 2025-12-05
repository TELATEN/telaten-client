"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileQuestion, Home, ArrowLeft } from "lucide-react";
import { AppConfig } from "@/lib/constants/app";

export default function NotFoundPage() {
  const router = useRouter();

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

        <Card className="shadow-xl border-2 border-purple-100 dark:border-purple-900/30">
          <CardContent className="p-8 text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/30 dark:to-purple-800/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <FileQuestion className="w-10 h-10 text-purple-600 dark:text-purple-400" />
            </div>

            <h2 className="text-6xl font-bold text-gray-900 dark:text-white mb-4">
              404
            </h2>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Halaman Tidak Ditemukan
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Maaf, halaman yang Anda cari tidak dapat ditemukan atau telah
              dipindahkan.
            </p>

            <div className="space-y-3">
              <Button
                onClick={() => router.back()}
                variant="outline"
                className="w-full h-12 text-base font-medium border-2"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Kembali
              </Button>

              <Button
                onClick={() => router.push("/")}
                className="w-full h-12 text-base font-semibold bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
              >
                <Home className="w-5 h-5 mr-2" />
                Kembali ke Beranda
              </Button>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Halaman Populer:
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                <Link
                  href="/login"
                  className="text-sm text-pink-600 dark:text-pink-400 hover:text-pink-700 dark:hover:text-pink-300 font-medium"
                >
                  Login
                </Link>
                <span className="text-gray-400">•</span>
                <Link
                  href="/register"
                  className="text-sm text-pink-600 dark:text-pink-400 hover:text-pink-700 dark:hover:text-pink-300 font-medium"
                >
                  Daftar
                </Link>
                <span className="text-gray-400">•</span>
                <Link
                  href="/dashboard"
                  className="text-sm text-pink-600 dark:text-pink-400 hover:text-pink-700 dark:hover:text-pink-300 font-medium"
                >
                  Dashboard
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
