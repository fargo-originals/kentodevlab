'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import '../globals.css';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [checking, setChecking] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const isLoginPage = pathname === '/admin/login';
    const isLoggedIn = localStorage.getItem('admin_logged_in');

    if (!isLoginPage && !isLoggedIn) {
      router.push('/admin/login');
    } else if (isLoginPage && isLoggedIn) {
      router.push('/admin');
    }
    setChecking(false);
  }, [pathname, router]);

  if (checking) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Cargando...</div>
      </div>
    );
  }

  const isLoginPage = pathname === '/admin/login';

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/admin" className="font-bold text-lg">Kento DevLab Admin</Link>
          <div className="flex items-center gap-8">
            <Link href="/admin/servicios" className="text-sm text-muted-foreground hover:text-foreground">Servicios</Link>
            <Link href="/admin/proyectos" className="text-sm text-muted-foreground hover:text-foreground">Proyectos</Link>
            <Link href="/admin/testimonios" className="text-sm text-muted-foreground hover:text-foreground">Testimonios</Link>
            <Link href="/admin/hero" className="text-sm text-muted-foreground hover:text-foreground">Hero</Link>
            <Link href="/admin/estadisticas" className="text-sm text-muted-foreground hover:text-foreground">Stats</Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">Ver sitio</Link>
            <button onClick={() => { localStorage.removeItem('admin_logged_in'); router.push('/admin/login'); }} className="text-sm text-red-500 hover:text-red-400">Salir</button>
          </div>
        </div>
      </header>
      <main className="pt-24 pb-16">{children}</main>
    </>
  );
}