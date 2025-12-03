"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Home, Target, User, Wallet } from "lucide-react";
import { cn } from "@/lib/utils";
import NavProfile from "./NavProfile";
import { useAuthStore } from "@/hooks/stores/use-auth.store";
import UserAvatar from "./UserAvatar";

export function Sidebar() {
  const pathname = usePathname();
  const user = useAuthStore((state) => state.user);

  const navItems = [
    { href: "/", label: "Beranda", icon: Home },
    { href: "/misi", label: "Misi", icon: Target },
    { href: "/keuangan", label: "Keuangan", icon: Wallet },
    { href: "/profil", label: "Profil", icon: User },
  ];

  return (
    <aside className="hidden md:flex md:flex-col w-64 bg-white border-r border-gray-200/50 dark:border-gray-700/50 h-screen sticky top-0">
      <div className="p-6 border-b border-gray-200/50 dark:border-gray-700/50">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center overflow-hidden">
            <Image
              src="/images/logo-telaten.png"
              alt="TELATEN Logo"
              width={24}
              height={24}
              className="object-contain"
              priority
            />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">TELATEN</h1>
            <p className="text-xs text-gray-500">
              Maju Pelan-pelan, Usaha Jadi Mapapan
            </p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                    isActive
                      ? "text-orange-600 font-medium"
                      : "text-gray-700 hover:text-orange-600"
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t border-gray-200/50 dark:border-gray-700/50 p-4">
        <NavProfile>
          <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <UserAvatar user={user}></UserAvatar>
            <div className="flex-1 min-w-0 text-left">
              <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
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
