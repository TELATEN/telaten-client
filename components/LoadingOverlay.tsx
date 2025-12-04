'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

interface LoadingOverlayProps {
  isLoading: boolean;
  message?: string;
  showLogo?: boolean;
}

export function LoadingOverlay({ 
  isLoading, 
  message = 'Loading...', 
  showLogo = true 
}: LoadingOverlayProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isLoading) {
      // Complete immediately when loading is done
      setProgress(100);
      return;
    }

    // Reset progress
    setProgress(0);

    // Smooth progress animation from 0 to 90%
    const duration = 3000; // 3 seconds to reach 90%
    const interval = 50;
    const increment = (90 / duration) * interval;
    
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(timer);
          return 90;
        }
        return Math.min(prev + increment, 90);
      });
    }, interval);

    return () => clearInterval(timer);
  }, [isLoading]);

  // Auto-hide after completion
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isLoading) {
      setVisible(true);
    } else if (progress === 100) {
      const timeout = setTimeout(() => {
        setVisible(false);
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [isLoading, progress]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm transition-opacity duration-300">
      <div className="flex flex-col items-center gap-6 max-w-sm mx-auto px-4">
        {showLogo && (
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
        )}
        
        {/* Progress Bar */}
        <div className="w-64 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-pink-500 to-purple-500 transition-all duration-300 ease-out rounded-full"
            style={{ 
              width: `${progress}%`,
              boxShadow: '0 0 10px rgba(236, 72, 153, 0.5)'
            }}
          />
        </div>

        {/* Loading Message */}
        <p className="text-sm text-gray-600 dark:text-gray-300 animate-pulse">
          {message}
        </p>

        {/* Percentage */}
        <p className="text-xs text-gray-400 dark:text-gray-500 font-mono">
          {Math.round(progress)}%
        </p>
      </div>
    </div>
  );
}
