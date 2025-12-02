'use client';

import './globals.css';
import { Inter } from 'next/font/google';
import { usePathname } from 'next/navigation';
import { BottomNav } from '@/components/BottomNav';
import { CollapsibleSidebar } from '@/components/CollapsibleSidebar';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/ThemeProvider';

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
    <html lang="id" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/images/logo-telaten.png" type="image/png" />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
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
        </ThemeProvider>
      </body>
    </html>
  );
}
