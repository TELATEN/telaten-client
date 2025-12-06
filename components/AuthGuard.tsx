"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/hooks/stores/use-auth.store";
import Image from "next/image";

interface AuthGuardProps {
  children: React.ReactNode;
}

const publicRoutes = [
  "/",
  "/login",
  "/register",
  "/forgot-password",
  "/unauthorized",
  "/onboarding", // Allow onboarding for both logged-in and new users
];

export default function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const token = useAuthStore((state) => state.token);
  const isLoggingOut = useAuthStore((state) => state.isLoggingOut);
  const [isChecking, setIsChecking] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const isOnBoardingPage = pathname == "/onboarding";
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const checkAuth = () => {
      const isPublicRoute = publicRoutes.includes(pathname);

      if (isOnBoardingPage && (!user || !!user.business)) {
        router.replace(!user ? "/login" : "/dashboard");
      }

      if (isPublicRoute) {
        setIsChecking(false);
        return;
      }

      if (isLoggingOut) {
        return;
      }

      if (!token) {
        router.replace("/unauthorized");
        return;
      }

      setIsChecking(false);
    };

    const timer = setTimeout(checkAuth, 100);

    return () => clearTimeout(timer);
  }, [token, pathname, router, isMounted, isLoggingOut, isOnBoardingPage]);

  if (!isMounted || isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="relative mb-4">
            <Image
              src="/images/logo-telaten.png"
              alt="TELATEN"
              width={80}
              height={80}
              className="animate-pulse mx-auto"
              priority
            />
          </div>
          <div className="flex gap-1 justify-center">
            <div
              className="h-2 w-2 bg-pink-500 rounded-full animate-bounce"
              style={{ animationDelay: "0ms" }}
            ></div>
            <div
              className="h-2 w-2 bg-pink-500 rounded-full animate-bounce"
              style={{ animationDelay: "150ms" }}
            ></div>
            <div
              className="h-2 w-2 bg-pink-500 rounded-full animate-bounce"
              style={{ animationDelay: "300ms" }}
            ></div>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
