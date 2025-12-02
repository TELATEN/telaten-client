'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Home, Target, Wallet, User } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Beranda', icon: Home },
    { href: '/misi', label: 'Misi', icon: Target },
    { href: '/keuangan', label: 'Keuangan', icon: Wallet },
    { href: '/profil', label: 'Profil', icon: User },
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
            <p className="text-xs text-gray-500">Teknologi yang Sabar</p>
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
                    'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors',
                    isActive
                      ? 'text-orange-600 font-medium'
                      : 'text-gray-700 hover:text-orange-600'
                  )}
                >
                  <Icon className="w-6 h-6" />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-200/50 dark:border-gray-700/50">
        <p className="text-xs text-gray-500 text-center">
          TELATEN v1.0 - Dibuat dengan ❤️
        </p>
      </div>
    </aside>
  );
}
