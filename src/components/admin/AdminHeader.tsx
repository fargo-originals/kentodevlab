'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const navItems = [
  { href: '/admin', label: 'Dashboard' },
  { href: '/admin/servicios', label: 'Servicios' },
  { href: '/admin/proyectos', label: 'Proyectos' },
  { href: '/admin/testimonios', label: 'Testimonios' },
  { href: '/admin/hero', label: ' Hero' },
];

export function AdminHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/80 backdrop-blur-lg border-b border-border'
          : 'bg-background border-b border-border'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/admin" className="flex items-center gap-2">
          <span className="font-bold text-lg">Kento DevLab Admin</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Ver sitio →
        </Link>
      </div>
    </header>
  );
}