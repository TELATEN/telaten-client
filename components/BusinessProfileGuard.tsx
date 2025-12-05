"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/hooks/stores/use-auth.store";
import useBusinessProfile from "@/hooks/services/business/use-business-profile";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";

interface BusinessProfileGuardProps {
  children: React.ReactNode;
}

// Routes that don't require auth at all
const publicRoutes = [
  "/",
  "/login",
  "/register",
  "/forgot-password",
  "/unauthorized",
  "/onboarding",
];

// Routes that require business profile check
const businessProfileRequiredRoutes = [
  "/dashboard",
  "/assistant",
  "/misi",
  "/keuangan",
  "/profil",
  "/edit-business",
  "/edit-profile",
  "/settings",
  "/help",
];

export default function BusinessProfileGuard({
  children,
}: BusinessProfileGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();
  const token = useAuthStore((state) => state.token);
  const [isChecking, setIsChecking] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const hasRedirected = useRef(false);
  const user = useAuthStore((state) => state.user);

  // Only fetch business profile if on a route that requires it
  const shouldCheckProfile = businessProfileRequiredRoutes.some((route) =>
    pathname.startsWith(route)
  );

  const {
    data: businessProfile,
    isLoading,
    isError,
    error,
  } = useBusinessProfile({
    enabled: shouldCheckProfile && !!token,
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    // Skip check for public routes or if not logged in
    const isPublicRoute = publicRoutes.includes(pathname);

    if (isPublicRoute || !token) {
      setIsChecking(false);
      return;
    }

    // Skip check if route doesn't require business profile
    if (!shouldCheckProfile) {
      setIsChecking(false);
      return;
    }

    // Admin users don't need business profile check
    if (user?.role === "admin") {
      setIsChecking(false);
      return;
    }

    // Wait for business profile query to complete
    if (isLoading) {
      return;
    }

    // Check if business profile doesn't exist (404 error or no data)
    const errorStatus = (error as any)?.response?.status;
    const hasNoBusinessProfile =
      (isError && errorStatus === 404) || (!isError && !businessProfile);

    if (hasNoBusinessProfile && !hasRedirected.current) {
      hasRedirected.current = true;

      toast({
        title: "Profil Bisnis Belum Lengkap",
        description: "Silakan lengkapi profil bisnis Anda terlebih dahulu.",
        variant: "destructive",
      });

      router.replace("/onboarding");
      return;
    }

    // If there's an error but not 404, let it pass (could be network issue)
    setIsChecking(false);
  }, [
    businessProfile,
    isLoading,
    isError,
    error,
    pathname,
    token,
    router,
    toast,
    isMounted,
    shouldCheckProfile,
    user,
  ]);

  // Reset redirect flag when navigating to onboarding
  useEffect(() => {
    if (pathname === "/onboarding") {
      hasRedirected.current = false;
    }
  }, [pathname]);

  // Show loading state while checking
  if (
    !isMounted ||
    (isChecking &&
      shouldCheckProfile &&
      !publicRoutes.includes(pathname) &&
      token)
  ) {
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
