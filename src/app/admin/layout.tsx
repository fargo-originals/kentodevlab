import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../globals.css';
import { AdminHeader } from '@/components/admin/AdminHeader';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Admin | Kento DevLab',
  description: 'Panel de administración de Kento DevLab',
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.className} min-h-screen bg-background text-foreground`}>
        <AdminHeader />
        <main className="pt-24 pb-16">{children}</main>
      </body>
    </html>
  );
}