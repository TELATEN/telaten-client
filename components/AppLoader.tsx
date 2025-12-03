'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface AppLoaderProps {
  children: React.ReactNode;
  onReady?: () => void;
}

export function AppLoader({ children, onReady }: AppLoaderProps) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Small delay to ensure all client-side states are initialized
    const timer = setTimeout(() => {
      setIsReady(true);
      onReady?.();
    }, 100);

    return () => clearTimeout(timer);
  }, [onReady]);

  if (!isReady) {
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
            <div className="h-2 w-2 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="h-2 w-2 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="h-2 w-2 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
