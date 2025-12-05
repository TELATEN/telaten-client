"use client";

import "../app/globals.css";
import { Inter } from "next/font/google";
import { usePathname } from "next/navigation";
import { BottomNav } from "@/components/BottomNav";
import { CollapsibleSidebar } from "@/components/CollapsibleSidebar";
import { Toaster } from "@/components/ui/toaster";
import { QueryProvider } from "@/components/provider/QueryProvider";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AppLoader } from "@/components/AppLoader";
import AuthGuard from "@/components/AuthGuard";
import BusinessProfileGuard from "@/components/BusinessProfileGuard";
import SeoMeta from "@/components/SeoMeta";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isAuthPage =
    pathname === "/login" ||
    pathname === "/register" ||
    pathname === "/forgot-password" ||
    pathname === "/onboarding" ||
    pathname === "/unauthorized" ||
    pathname === "/";

  const shouldShowBottomNav =
    !isAuthPage &&
    ["/dashboard", "/misi", "/keuangan", "/profil"].includes(pathname);
  return (
    <QueryProvider>
      <html lang="id" suppressHydrationWarning className="overflow-x-hidden">
        <SeoMeta />
        <body className={inter.className} suppressHydrationWarning>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={false}
            disableTransitionOnChange
          >
            <AppLoader>
              <AuthGuard>
                <BusinessProfileGuard>
                  {isAuthPage ? (
                    <>
                      {children}
                      <Toaster />
                    </>
                  ) : (
                    <>
                      <div className="flex min-h-screen">
                        <CollapsibleSidebar />
                        <main
                          className={[
                            "flex-1 md:pb-0 min-w-0 max-w-screen",
                            shouldShowBottomNav ? "pb-16" : "",
                          ].join(" ")}
                        >
                          {children}
                        </main>
                      </div>
                      {shouldShowBottomNav && <BottomNav />}
                      <Toaster />
                    </>
                  )}
                </BusinessProfileGuard>
              </AuthGuard>
            </AppLoader>
          </ThemeProvider>
        </body>
      </html>
    </QueryProvider>
  );
}
