'use client';

import { useEffect, useState } from 'react';

interface ProgressBarProps {
  isLoading: boolean;
  duration?: number; // Duration to reach 90% in milliseconds
}

export function ProgressBar({ isLoading, duration = 3000 }: ProgressBarProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isLoading) {
      // Complete the progress bar immediately when loading is done
      setProgress(100);
      return;
    }

    // Reset to 0 when starting
    setProgress(0);

    // Simulate smooth progress from 0 to 90%
    const interval = 50; // Update every 50ms for smooth animation
    const increment = (90 / duration) * interval; // Calculate increment per interval
    
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(timer);
          return 90; // Stay at 90% until loading completes
        }
        return Math.min(prev + increment, 90);
      });
    }, interval);

    return () => clearInterval(timer);
  }, [isLoading, duration]);

  // Hide progress bar after completion animation
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (progress === 100) {
      const timeout = setTimeout(() => {
        setVisible(false);
      }, 500); // Hide after 500ms
      return () => clearTimeout(timeout);
    } else {
      setVisible(true);
    }
  }, [progress]);

  if (!visible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-gray-200 dark:bg-gray-800">
      <div
        className="h-full bg-gradient-to-r from-pink-500 to-purple-500 transition-all duration-300 ease-out"
        style={{ 
          width: `${progress}%`,
          boxShadow: progress > 0 ? '0 0 10px rgba(236, 72, 153, 0.5)' : 'none'
        }}
      />
    </div>
  );
}
