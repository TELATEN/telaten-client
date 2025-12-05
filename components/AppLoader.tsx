"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import useMe from "@/hooks/services/auth/use-me";

interface AppLoaderProps {
  children: React.ReactNode;
}

export function AppLoader({ children }: AppLoaderProps) {
  const [isLoading, setIsLoading] = useState(true);
  const { isFetching } = useMe();

  useEffect(() => {
    if (!isFetching) {
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  }, [isFetching]);

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-gray-900">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <Image
              src="/images/logo-telaten.png"
              alt="TELATEN"
              width={80}
              height={80}
              className="animate-pulse"
              priority
            />
          </div>
          <div className="flex gap-1">
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
