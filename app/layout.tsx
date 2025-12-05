import RootLayout from "@/components/RootLayout";
import { AppConfig } from "@/lib/constants/app";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: AppConfig.appName + " - " + AppConfig.appSlogan,
  description: AppConfig.appSlogan,
  icons: {
    icon: '/images/logo-telaten.png',
    shortcut: '/images/logo-telaten.png',
    apple: '/images/logo-telaten.png',
  },
};

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <RootLayout>{children}</RootLayout>
    </>
  );
}
