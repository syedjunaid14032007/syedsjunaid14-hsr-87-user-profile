'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BookOpen, ClipboardList, Bookmark, User } from 'lucide-react';

const navItems = [
  { href: '/home',      label: 'Home',      icon: Home          },
  { href: '/study',     label: 'Study',     icon: BookOpen      },
  { href: '/practice',  label: 'Practice',  icon: ClipboardList },
  { href: '/bookmarks', label: 'Bookmarks', icon: Bookmark      },
  { href: '/profile',   label: 'Profile',   icon: User          },
];

export const BottomNavigation: React.FC = () => {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bottom-nav-safe z-40"
      style={{
        background: 'var(--color-surface)',
        borderTop: '1px solid var(--color-border)',
        boxShadow: 'var(--shadow-modal)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
      }}
      aria-label="Bottom navigation"
    >
      <div className="flex items-stretch">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;

          return (
            <Link
              key={href}
              href={href}
              className="flex-1 flex flex-col items-center justify-center py-2.5 gap-[3px] press-effect"
              aria-label={label}
              aria-current={active ? 'page' : undefined}
              style={{ textDecoration: 'none', position: 'relative' }}
            >
              {/* Active indicator dot */}
              {active && (
                <span
                  style={{
                    position: 'absolute',
                    top: 6,
                    width: 20,
                    height: 3,
                    borderRadius: 99,
                    background: 'var(--color-green)',
                    animation: 'fadeSlideDown 0.25s cubic-bezier(0.22,1,0.36,1) both',
                  }}
                />
              )}

              <Icon
                size={22}
                strokeWidth={active ? 2.5 : 1.8}
                color={active ? 'var(--color-green)' : 'var(--color-text-muted)'}
                style={{ transition: 'color 200ms ease, stroke-width 200ms ease' }}
              />
              <span
                style={{
                  fontSize: 10,
                  fontWeight: active ? 700 : 500,
                  lineHeight: 1,
                  color: active ? 'var(--color-green)' : 'var(--color-text-muted)',
                  transition: 'color 200ms ease, font-weight 200ms ease',
                }}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
