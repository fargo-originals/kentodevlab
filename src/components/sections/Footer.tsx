'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { RedSocial } from '@/types/content';

interface FooterProps {
  redes?: RedSocial[];
}

const footerLinks = {
  servicios: [
    { href: '#servicios', label: 'Desarrollo Web' },
    { href: '#servicios', label: 'SaaS / WebApp' },
    { href: '#servicios', label: 'E-commerce' },
    { href: '#servicios', label: 'Mantenimiento' },
  ],
  empresa: [
    { href: '#portfolio', label: 'Portfolio' },
    { href: '#proceso', label: 'Proceso' },
    { href: '#contacto', label: 'Contacto' },
  ],
  legal: [
    { href: '/privacidad', label: 'Política de Privacidad' },
    { href: '/cookies', label: 'Política de Cookies' },
    { href: '/aviso-legal', label: 'Aviso Legal' },
  ],
};

export function Footer({ redes = [] }: FooterProps) {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  const redesPredeterminadas = [
    { nombre: 'Twitter', icono: '𝕏', url: 'https://twitter.com' },
    { nombre: 'LinkedIn', icono: 'in', url: 'https://linkedin.com' },
    { nombre: 'Instagram', icono: '📷', url: 'https://instagram.com' },
  ];

  const redesAMostrar = redes.length > 0 ? redes : redesPredeterminadas;

  useEffect(() => {
    const saved = localStorage.getItem('theme') as 'dark' | 'light' | null;
    setTheme(saved || 'dark');
    
    const observer = new MutationObserver(() => {
      const t = document.documentElement.getAttribute('data-theme');
      setTheme(t === 'light' ? 'light' : 'dark');
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    
    return () => observer.disconnect();
  }, []);

  return (
    <footer className="py-16 bg-muted/30 border-t border-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Image
                src={theme === 'light' ? '/logo-light.png' : '/logo-dark.png'}
                alt="Kento DevLab"
                width={140}
                height={40}
                className="h-10 w-auto"
              />
            </Link>
            <p className="text-muted-foreground mb-4 max-w-xs">
              Construimos páginas web, SaaS, WebApps y E-commerce para comercios pequeños, PYMES y autónomos en Madrid.
            </p>
            <div className="flex gap-4">
              {redesAMostrar.map((red) => (
                <a
                  key={red.nombre}
                  href={red.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-lg bg-background border border-border flex items-center justify-center hover:border-primary transition-colors"
                >
                  {red.icono?.startsWith('http') ? (
                    <img src={red.icono} alt={red.nombre} className="w-full h-full object-contain p-1" />
                  ) : (
                    <span className="text-2xl">{red.icono}</span>
                  )}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Servicios</h3>
            <ul className="space-y-2">
              {footerLinks.servicios.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Empresa</h3>
            <ul className="space-y-2">
              {footerLinks.empresa.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Kento DevLab. Todos los derechos reservados.
          </p>
          <p className="text-sm text-muted-foreground">
            Diseñado en Madrid, España
          </p>
        </div>
      </div>
    </footer>
  );
}