"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
import { Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import useLogin from "@/hooks/services/auth/use-login";
import Spinner from "@/components/Spinner";
import { LoginParams } from "@/types";

const loginSchema = z.object({
  email: z.string().min(1, "Email wajib diisi").email("Format email tidak valid"),
  password: z.string().min(1, "Password wajib diisi").min(6, "Password minimal 6 karakter"),
});

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginParams>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutateAsync, isPending, error } = useLogin();

  const onSubmit = async (data: LoginParams) => {
    await mutateAsync({
      ...data,
    });

    if (error?.message) {
      toast({
        title: "Terjadi Kesalahan",
        description: error.message,
        variant: "destructive",
      });

      return;
    }

    toast({
      title: "Selamat Datang Kembali!",
      description: "Anda berhasil masuk.",
    });

    router.push("/dashboard");
  };

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
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">TELATEN</h1>
          <p className="text-gray-600 dark:text-gray-400">Maju Pelan-pelan, Usaha Jadi Mapapan</p>
        </div>

        <Card className="shadow-xl border-2 border-pink-100 dark:border-pink-900/30">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              Masuk
            </CardTitle>
            <CardDescription className="text-center">
              Masukkan email dan password Anda
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="nama@contoh.com"
                  {...register("email")}
                  className="h-12"
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Masukkan password"
                    {...register("password")}
                    className="h-12 pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-12 px-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                    )}
                  </Button>
                </div>
                {errors.password && (
                  <p className="text-sm text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-end">
                <Link
                  href="/forgot-password"
                  className="text-sm text-pink-600 dark:text-pink-400 hover:text-pink-700 dark:hover:text-pink-300 font-medium"
                >
                  Lupa password?
                </Link>
              </div>

              <Button
                type="submit"
                disabled={isPending}
                className="w-full h-12 text-base font-semibold bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
              >
                {isPending && <Spinner />}
                Masuk
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Belum punya akun?{' '}
                <Link
                  href="/register"
                  className="text-pink-600 dark:text-pink-400 hover:text-pink-700 dark:hover:text-pink-300 font-semibold"
                >
                  Daftar Sekarang
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-6">
          Dengan masuk, Anda menyetujui Syarat & Ketentuan dan Kebijakan Privasi kami
        </p>
      </div>
    </div>
  );
}
