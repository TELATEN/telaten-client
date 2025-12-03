'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthStore } from '@/hooks/stores/use-auth.store';
import { Loader2 } from 'lucide-react';

interface AuthGuardProps {
  children: React.ReactNode;
}

const publicRoutes = [
  '/',
  '/login',
  '/register',
  '/forgot-password',
  '/unauthorized',
  '/onboarding', // Allow onboarding for both logged-in and new users
];

export default function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const token = useAuthStore((state) => state.token);
  const [isChecking, setIsChecking] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const checkAuth = () => {
      const isPublicRoute = publicRoutes.includes(pathname);

      // Allow public routes without authentication
      if (isPublicRoute) {
        setIsChecking(false);
        return;
      }

      // Protected routes require authentication
      if (!token) {
        router.replace('/unauthorized');
        return;
      }

      setIsChecking(false);
    };

    // Small delay to ensure zustand hydration is complete
    const timer = setTimeout(checkAuth, 100);

    return () => clearTimeout(timer);
  }, [token, pathname, router, isMounted]);

  if (!isMounted || isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-pink-500 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Memuat...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
