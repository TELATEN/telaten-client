'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Target, Wallet, User, Heart, Menu, X, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export function CollapsibleSidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navItems = [
    { href: '/dashboard', label: 'Beranda', icon: Home },
    { href: '/assistant', label: 'AI Assistant', icon: Sparkles },
    { href: '/misi', label: 'Misi', icon: Target },
    { href: '/keuangan', label: 'Keuangan', icon: Wallet },
    { href: '/profil', label: 'Profil', icon: User },
  ];

  return (
    <aside
      className={cn(
        'hidden md:flex md:flex-col bg-white border-r border-gray-200 h-screen sticky top-0 transition-all duration-300',
        isCollapsed ? 'w-20' : 'w-64'
      )}
    >
      <div className="p-6 border-b border-gray-200 flex items-center justify-between">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-pink-400 via-purple-400 to-cyan-400 rounded-lg flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" fill="white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">TLATEN</h1>
              <p className="text-xs text-gray-500">Teknologi yang Sabar</p>
            </div>
          </div>
        )}
        {isCollapsed && (
          <div className="w-10 h-10 bg-gradient-to-br from-pink-400 via-purple-400 to-cyan-400 rounded-lg flex items-center justify-center mx-auto">
            <Heart className="w-6 h-6 text-white" fill="white" />
          </div>
        )}
      </div>

      <div className="flex-1 overflow-hidden">
        <nav className="p-4">
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
                        ? 'bg-pink-50 text-pink-600 font-medium'
                        : 'text-gray-700 hover:bg-gray-50',
                      isCollapsed && 'justify-center'
                    )}
                    title={isCollapsed ? item.label : undefined}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    {!isCollapsed && <span>{item.label}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      <div className="p-4 border-t border-gray-200">
        <Button
          onClick={() => setIsCollapsed(!isCollapsed)}
          variant="ghost"
          size="sm"
          className={cn('w-full justify-start', isCollapsed && 'justify-center px-0')}
        >
          {isCollapsed ? (
            <Menu className="w-5 h-5" />
          ) : (
            <>
              <Menu className="w-5 h-5 mr-2" />
              <span>Sembunyikan</span>
            </>
          )}
        </Button>
      </div>

      {!isCollapsed && (
        <div className="p-4 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">TLATEN v1.0</p>
        </div>
      )}
    </aside>
  );
}
