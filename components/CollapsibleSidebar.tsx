"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { Home, Target, Wallet, User, PanelLeftClose, PanelLeft, MessageSquare, Settings, LogOut, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';
import NavProfile from "./NavProfile";
import { useAuthStore } from '@/hooks/stores/use-auth.store';
import UserAvatar from "./UserAvatar";
import useMe from '@/hooks/services/auth/use-me';
import useLogout from "@/hooks/services/auth/use-logout";
import { useToast } from "@/hooks/use-toast";

const SIDEBAR_STATE_KEY = 'telaten-sidebar-collapsed';

export function CollapsibleSidebar() {
  const user = useAuthStore((state) => state.user);
  const pathname = usePathname();
  const router = useRouter();
  const { toast } = useToast();
  const { data: userData } = useMe();
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const { mutateAsync: logout } = useLogout();
  
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Initialize from localStorage synchronously on mount
  useEffect(() => {
    const saved = localStorage.getItem(SIDEBAR_STATE_KEY);
    if (saved === 'true') {
      setIsCollapsed(true);
    }
    setIsMounted(true);
  }, []);

  // Persist to localStorage on changes (skip first render)
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem(SIDEBAR_STATE_KEY, String(isCollapsed));
    }
  }, [isCollapsed, isMounted]);

  // Don't render until state is loaded from localStorage
  if (!isMounted) {
    return null;
  }

  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: "Berhasil Logout",
        description: "Anda telah keluar dari sistem.",
      });
    } catch (error: any) {
      toast({
        title: "Logout",
        description: "Anda telah keluar dari sistem.",
      });
    }
  };

  const navItems = [
    { href: "/dashboard", label: "Beranda", icon: Home },
    { href: "/assistant", label: "AI Assistant", icon: MessageSquare },
    { href: "/misi", label: "Misi", icon: Target },
    { href: "/keuangan", label: "Keuangan", icon: Wallet },
  ];

  return (
    <aside
      className={cn(
        "hidden md:flex md:flex-col bg-white dark:bg-gray-800 border-r border-gray-200/50 dark:border-gray-700/50 h-screen sticky top-0 transition-all duration-300",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      {/* Header with Logo and Collapse Button */}
      <div className="flex items-center justify-between p-3 border-b border-gray-200/50 dark:border-gray-700/50">
        {isCollapsed ? (
          // Collapsed mode: Logo becomes collapse button with hover effect
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 relative hover:bg-gray-100 transition-colors group"
            title="Expand sidebar"
          >
            <Image
              src="/images/logo-telaten.png"
              alt="TELATEN Logo"
              width={32}
              height={32}
              className="object-contain transition-opacity duration-200 group-hover:opacity-0"
              priority
            />
            <PanelLeft className="w-6 h-6 text-gray-600 absolute inset-0 m-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
          </button>
        ) : (
          // Extended mode: Logo is clickable link + separate collapse button
          <>
            <Link href="/" className="flex items-center gap-2 overflow-hidden">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 hover:bg-gray-50 transition-colors">
                <Image
                  src="/images/logo-telaten.png"
                  alt="TELATEN Logo"
                  width={32}
                  height={32}
                  className="object-contain"
                  priority
                />
              </div>
              <span className="text-sm font-semibold text-gray-900 dark:text-white whitespace-nowrap">
                TELATEN
              </span>
            </Link>
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors text-gray-600 dark:text-gray-400 flex-shrink-0"
              title="Collapse sidebar"
            >
              <PanelLeftClose className="w-5 h-5" />
            </button>
          </>
        )}
      </div>

      {/* Navigation Items */}
      <div className="flex-1 overflow-y-auto px-2 mt-4">
        <nav>
          <ul className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 px-3 py-3 rounded-lg transition-colors",
                      isActive
                        ? "bg-pink-50 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400 font-medium"
                        : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-pink-600 dark:hover:text-pink-400"
                    )}
                    title={isCollapsed ? item.label : undefined}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    <span
                      className={cn(
                        "truncate text-sm transition-opacity duration-300",
                        isCollapsed ? "opacity-0 w-0" : "opacity-100"
                      )}
                    >
                      {item.label}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* Bottom Section - User Profile with Dropdown */}
      <div className="border-t border-gray-200/50 dark:border-gray-700/50 p-2">
        <NavProfile>
          <button
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors",
              "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-pink-600 dark:hover:text-pink-400"
            )}
          >
            <UserAvatar user={user}></UserAvatar>
            <div
              className={cn(
                "flex-1 overflow-hidden transition-opacity duration-300 text-left",
                isCollapsed ? "opacity-0 w-0" : "opacity-100"
              )}
            >
              <p className="text-sm font-medium truncate dark:text-white">
                {user?.name}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                {user?.email}
              </p>
            </div>
          </button>
        </NavProfile>
      </div>
    </aside>
  );
}
