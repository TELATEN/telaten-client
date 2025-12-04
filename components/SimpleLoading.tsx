'use client';

import Image from 'next/image';

interface SimpleLoadingProps {
  isLoading: boolean;
  message?: string;
}

export function SimpleLoading({ 
  isLoading, 
  message = 'Loading...' 
}: SimpleLoadingProps) {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-6">
        {/* Logo */}
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
        
        {/* Message */}
        <p className="text-sm text-gray-600 dark:text-gray-300 font-medium">
          {message}
        </p>

        {/* 3 Bouncing Dots */}
        <div className="flex gap-2">
          <div 
            className="h-3 w-3 bg-pink-500 rounded-full animate-bounce" 
            style={{ animationDelay: '0ms' }}
          ></div>
          <div 
            className="h-3 w-3 bg-pink-500 rounded-full animate-bounce" 
            style={{ animationDelay: '150ms' }}
          ></div>
          <div 
            className="h-3 w-3 bg-pink-500 rounded-full animate-bounce" 
            style={{ animationDelay: '300ms' }}
          ></div>
        </div>
      </div>
    </div>
  );
}
