'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Target, Wallet, User, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

export function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { href: '/dashboard', label: 'Beranda', icon: Home },
    { href: '/misi', label: 'Misi', icon: Target },
    { href: '/keuangan', label: 'Keuangan', icon: Wallet },
    { href: '/profil', label: 'Profil', icon: User },
  ];

  const centerItem = { href: '/assistant', label: 'AI', icon: Sparkles };

  const CenterIcon = centerItem.icon;
  const isCenterActive = pathname === centerItem.href;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 md:hidden">
      <div className="flex items-center justify-around h-16 safe-area-bottom relative">
        {navItems.slice(0, 2).map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center justify-center flex-1 h-full transition-colors',
                isActive
                  ? 'text-pink-600'
                  : 'text-gray-500 hover:text-pink-500'
              )}
            >
              <Icon className="w-6 h-6 mb-1" />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}

        <Link
          href={centerItem.href}
          className="flex flex-col items-center justify-center flex-1 h-full relative -top-4"
        >
          <div className={cn(
            "w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all",
            isCenterActive
              ? "bg-gradient-to-br from-pink-500 to-purple-600"
              : "bg-gradient-to-br from-pink-400 to-purple-500 hover:from-pink-500 hover:to-purple-600"
          )}>
            <CenterIcon className="w-7 h-7 text-white" />
          </div>
          <span className={cn(
            "text-xs font-medium mt-1",
            isCenterActive ? "text-pink-600" : "text-gray-500"
          )}>
            {centerItem.label}
          </span>
        </Link>

        {navItems.slice(2).map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center justify-center flex-1 h-full transition-colors',
                isActive
                  ? 'text-pink-600'
                  : 'text-gray-500 hover:text-pink-500'
              )}
            >
              <Icon className="w-6 h-6 mb-1" />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
