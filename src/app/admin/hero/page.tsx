'use client';

import { useEffect, useState } from 'react';
import { getHeroContent, updateHero } from '@/lib/admin-content';
import type { HeroContent } from '@/types/content';
import ImageUpload from '@/components/admin/ImageUpload';

export default function AdminHero() {
  const [hero, setHero] = useState<HeroContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [guardando, setGuardando] = useState(false);

  useEffect(() => { loadHero(); }, []);

  async function loadHero() {
    try {
      const data = await getHeroContent();
      setHero(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setGuardando(true);
    const formData = new FormData(e.currentTarget);
    const imagenUrl = formData.get('imagen') as string;
    console.log('Guardando hero con imagen:', imagenUrl);
    try {
      await updateHero({
        titulo: formData.get('titulo') as string,
        subtitulo: formData.get('subtitulo') as string,
        descripcion: formData.get('descripcion') as string,
        imagen: imagenUrl,
      });
      alert('Guardado correctamente');
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setGuardando(false);
    }
  }

  if (loading) return <div className="max-w-7xl mx-auto px-6">Cargando...</div>;

  return (
    <div className="max-w-7xl mx-auto px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Hero</h1>
        <p className="text-muted-foreground">Edita el contenido principal (Hero)</p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-lg space-y-4">
        <ImageUpload label="Imagen de fondo" name="imagen" defaultValue={hero?.imagen} />
        <div>
          <label className="block text-sm mb-1">Título principal</label>
          <input name="titulo" defaultValue={hero?.titulo} required className="w-full px-4 py-2 rounded-lg bg-muted border border-border" />
        </div>
        <div>
          <label className="block text-sm mb-1">Subtítulo / Ubicación</label>
          <input name="subtitulo" defaultValue={hero?.subtitulo} required className="w-full px-4 py-2 rounded-lg bg-muted border border-border" />
        </div>
        <div>
          <label className="block text-sm mb-1">Descripción</label>
          <textarea name="descripcion" defaultValue={hero?.descripcion} required rows={4} className="w-full px-4 py-2 rounded-lg bg-muted border border-border" />
        </div>
        <button type="submit" disabled={guardando} className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90">
          {guardando ? 'Guardando...' : 'Guardar cambios'}
        </button>
      </form>
    </div>
  );
}