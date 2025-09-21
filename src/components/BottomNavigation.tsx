'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface BottomNavigationProps {
  onWriteDiary: () => void;
}

export default function BottomNavigation({ onWriteDiary }: BottomNavigationProps) {
  const pathname = usePathname();
  
  const navItems = [
    {
      name: '日记',
      path: '/',
      icon: '📖'
    },
    {
      name: 'Mira',
      path: '/mira',
      icon: '✨'
    }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={`flex flex-col items-center py-2 px-4 ${
              pathname === item.path
                ? 'text-black font-medium'
                : 'text-gray-500'
            }`}
          >
            <span className="text-xl mb-1">{item.icon}</span>
            <span className="text-xs">{item.name}</span>
          </Link>
        ))}
        
        {/* 写日记按钮 */}
        <button
          onClick={onWriteDiary}
          className="flex flex-col items-center py-2 px-4"
        >
          <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mb-1">
            <span className="text-white text-xl">✍️</span>
          </div>
          <span className="text-xs text-gray-500">写日记</span>
        </button>
      </div>
    </div>
  );
}
