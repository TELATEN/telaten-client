'use client';

import './globals.css';
import { Inter } from 'next/font/google';
import { usePathname } from 'next/navigation';
import { BottomNav } from '@/components/BottomNav';
import { CollapsibleSidebar } from '@/components/CollapsibleSidebar';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAuthPage = pathname === '/login' || pathname === '/register' || pathname === '/forgot-password' || pathname === '/onboarding' || pathname === '/';
  const shouldShowBottomNav = !isAuthPage && pathname !== '/assistant';
  return (
    <html lang="id">
      <body className={inter.className}>
        {isAuthPage ? (
          <>
            {children}
            <Toaster />
          </>
        ) : (
          <>
            <div className="flex min-h-screen">
              <CollapsibleSidebar />
              <main className="flex-1 pb-20 md:pb-0">
                {children}
              </main>
            </div>
            {shouldShowBottomNav && <BottomNav />}
            <Toaster />
          </>
        )}
      </body>
    </html>
  );
}
