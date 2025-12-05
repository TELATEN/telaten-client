"use client";

import { useAuthStore } from "@/hooks/stores/use-auth.store";
import useBusinessProfile from "@/hooks/services/business/use-business-profile";
import AdminDashboard from "@/components/dashboard/AdminDashboard";
import UserDashboard from "@/components/dashboard/UserDashboard";

export default function DashboardPage() {
  const userData = useAuthStore((state) => state.user);
  const isAdmin = userData?.role === "admin";
  
  // Only fetch business profile for non-admin users
  const { data: businessData } = useBusinessProfile({
    enabled: !isAdmin,
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className={`mx-auto px-4 py-6 md:py-8 ${isAdmin ? "max-w-7xl" : "max-w-2xl"}`}>
        {/* Header */}
        <header className="mb-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                Selamat Datang, {userData?.name || "User"}!
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                {isAdmin 
                  ? "Dashboard Admin - Analisis & Statistik" 
                  : businessData?.business_name || "Belum ada bisnis"}
              </p>
            </div>
          </div>
        </header>

        {/* Conditional Dashboard Content */}
        {isAdmin ? <AdminDashboard /> : <UserDashboard />}
      </div>
    </div>
  );
}
