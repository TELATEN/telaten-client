import RootLayout from "@/components/RootLayout";
import { AppConfig } from "@/lib/constants/app";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: AppConfig.appName + " - " + AppConfig.appSlogan,
  description: AppConfig.appSlogan,
};

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <RootLayout>{children}</RootLayout>
    </>
  );
}
