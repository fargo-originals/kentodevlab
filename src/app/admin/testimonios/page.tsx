'use client';

import { useEffect, useState } from 'react';
import { getAllTestimonios, createTestimonio, updateTestimonio, deleteTestimonio } from '@/lib/admin-content';
import type { Testimonio } from '@/types/content';

export default function AdminTestimonios() {
  const [testimonios, setTestimonios] = useState<Testimonio[]>([]);
  const [loading, setLoading] = useState(true);
  const [editando, setEditando] = useState<Testimonio | null>(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  useEffect(() => { loadTestimonios(); }, []);

  async function loadTestimonios() {
    try {
      const data = await getAllTestimonios();
      setTestimonios(data);
    } catch (error) { console.error('Error:', error); }
    finally { setLoading(false); }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const testimonio = {
      nombre: formData.get('nombre') as string,
      empresa: formData.get('empresa') as string,
      mensaje: formData.get('mensaje') as string,
      rating: parseInt(formData.get('rating') as string) || 5,
      orden: parseInt(formData.get('orden') as string) || 0,
      activo: formData.get('activo') === 'on',
    };
    try {
      if (editando?.id) await updateTestimonio(editando.id, testimonio);
      else await createTestimonio(testimonio);
      await loadTestimonios();
      setMostrarFormulario(false);
      setEditando(null);
    } catch (error) { console.error('Error:', error); }
  }

  async function handleDelete(id: string) {
    if (confirm('¿Eliminar testimonio?')) {
      try { await deleteTestimonio(id); await loadTestimonios(); }
      catch (error) { console.error('Error:', error); }
    }
  }

  if (loading) return <div className="max-w-7xl mx-auto px-6">Cargando...</div>;

  return (
    <div className="max-w-7xl mx-auto px-6">
      <div className="flex justify-between mb-8">
        <div><h1 className="text-3xl font-bold mb-2">Testimonios</h1><p className="text-muted-foreground">Gestiona los testimonios de clientes</p></div>
        <button onClick={() => { setMostrarFormulario(true); setEditando(null); }} className="px-4 py-2 rounded-lg bg-primary text-primary-foreground">+ Añadir</button>
      </div>

      {mostrarFormulario && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <form onSubmit={handleSubmit} className="bg-card p-6 rounded-2xl w-full max-w-lg border border-border">
            <h2 className="text-xl font-bold mb-4">{editando ? 'Editar' : 'Nuevo'} testimonio</h2>
            <div className="space-y-4">
              <div><label className="block text-sm mb-1">Nombre</label><input name="nombre" defaultValue={editando?.nombre} required className="w-full px-4 py-2 rounded-lg bg-muted border border-border" /></div>
              <div><label className="block text-sm mb-1">Empresa</label><input name="empresa" defaultValue={editando?.empresa} className="w-full px-4 py-2 rounded-lg bg-muted border border-border" /></div>
              <div><label className="block text-sm mb-1">Mensaje</label><textarea name="mensaje" defaultValue={editando?.mensaje} required className="w-full px-4 py-2 rounded-lg bg-muted border border-border" /></div>
              <div><label className="block text-sm mb-1">Rating</label><input name="rating" type="number" min="1" max="5" defaultValue={editando?.rating || 5} className="w-full px-4 py-2 rounded-lg bg-muted border border-border" /></div>
              <div><label className="block text-sm mb-1">Orden</label><input name="orden" type="number" defaultValue={editando?.orden || 0} className="w-full px-4 py-2 rounded-lg bg-muted border border-border" /></div>
              <div><label className="flex gap-2"><input name="activo" type="checkbox" defaultChecked={editando?.activo ?? true} /><span>Activo</span></label></div>
            </div>
            <div className="flex gap-2 mt-6">
              <button type="submit" className="flex-1 px-4 py-2 rounded-lg bg-primary text-primary-foreground">Guardar</button>
              <button type="button" onClick={() => { setMostrarFormulario(false); setEditando(null); }} className="px-4 py-2 rounded-lg border border-border">Cancelar</button>
            </div>
          </form>
        </div>
      )}

      <div className="grid gap-4">
        {testimonios.map((t) => (
          <div key={t.id} className="flex justify-between p-4 rounded-xl bg-card border border-border">
            <div><h3 className="font-semibold">{t.nombre}</h3><p className="text-sm text-muted-foreground">{t.empresa}</p></div>
            <div className="flex gap-2">
              <span className={`px-2 py-1 rounded text-xs ${t.activo ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>{t.activo ? 'Activo' : 'Inactivo'}</span>
              <button onClick={() => { setEditando(t); setMostrarFormulario(true); }} className="px-3 py-1 rounded border border-border hover:bg-muted text-sm">Editar</button>
              <button onClick={() => handleDelete(t.id!)} className="px-3 py-1 rounded border border-border hover:bg-muted text-sm text-red-500">Eliminar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}