'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getAllServicios, getAllProyectos, getAllTestimonios, getAllEstadisticas } from '@/lib/admin-content';

interface Stats {
  servicios: number;
  proyectos: number;
  testimonios: number;
  estadisticas: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({ servicios: 0, proyectos: 0, testimonios: 0, estadisticas: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const [servicios, proyectos, testimonios, estadisticas] = await Promise.all([
          getAllServicios(),
          getAllProyectos(),
          getAllTestimonios(),
          getAllEstadisticas(),
        ]);
        setStats({
          servicios: servicios.length,
          proyectos: proyectos.length,
          testimonios: testimonios.length,
          estadisticas: estadisticas.length,
        });
      } catch (error) {
        console.error('Error loading stats:', error);
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  const sections = [
    { title: 'Servicios', href: '/admin/servicios', count: stats.servicios, description: 'Gestiona los servicios que ofreces' },
    { title: 'Proyectos', href: '/admin/proyectos', count: stats.proyectos, description: 'Gestiona los proyectos del portfolio' },
    { title: 'Testimonios', href: '/admin/testimonios', count: stats.testimonios, description: 'Gestiona los testimonios de clientes' },
    { title: 'Hero', href: '/admin/hero', count: 1, description: 'Edita el contenido principal' },
    { title: 'Estadísticas', href: '/admin/estadisticas', count: stats.estadisticas, description: 'Gestiona las estadísticas del hero' },
  ];

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded w-48"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-32 bg-muted rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6">
      <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
      <p className="text-muted-foreground mb-8">Gestiona el contenido de tu sitio web</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sections.map((section) => (
          <Link
            key={section.href}
            href={section.href}
            className="p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all group"
          >
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-semibold">{section.title}</h2>
              <span className="text-2xl font-bold text-primary">{section.count}</span>
            </div>
            <p className="text-sm text-muted-foreground">{section.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}