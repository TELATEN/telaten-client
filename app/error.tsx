"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCw, Home } from "lucide-react";
import { AppConfig } from "@/lib/constants/app";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    console.error("Application Error:", error);
  }, [error]);

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
            {AppConfig.appName}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {AppConfig.appSlogan}
          </p>
        </div>

        <Card className="shadow-xl border-2 border-orange-100 dark:border-orange-900/30">
          <CardContent className="p-8 text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-900/30 dark:to-orange-800/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="w-10 h-10 text-orange-600 dark:text-orange-400" />
            </div>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Terjadi Kesalahan
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-2">
              Maaf, terjadi kesalahan yang tidak terduga.
            </p>
            {error.digest && (
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 font-mono">
                Error ID: {error.digest}
              </p>
            )}

            <div className="space-y-3 mt-6">
              <Button
                onClick={reset}
                className="w-full h-12 text-base font-semibold bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
              >
                <RefreshCw className="w-5 h-5 mr-2" />
                Coba Lagi
              </Button>

              <Button
                variant="outline"
                onClick={() => router.push("/")}
                className="w-full h-12 text-base font-medium border-2"
              >
                <Home className="w-5 h-5 mr-2" />
                Kembali ke Beranda
              </Button>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Jika masalah terus berlanjut, silakan hubungi tim dukungan kami.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
