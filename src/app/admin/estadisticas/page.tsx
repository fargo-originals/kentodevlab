'use client';

import { useEffect, useState } from 'react';
import { getAllEstadisticas, updateEstadistica } from '@/lib/admin-content';
import type { Estadistica } from '@/types/content';

export default function AdminEstadisticas() {
  const [estadisticas, setEstadisticas] = useState<Estadistica[]>([]);
  const [loading, setLoading] = useState(true);
  const [editando, setEditando] = useState<Estadistica | null>(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  useEffect(() => { loadEstadisticas(); }, []);

  async function loadEstadisticas() {
    try {
      const data = await getAllEstadisticas();
      setEstadisticas(data);
    } catch (error) { console.error('Error:', error); }
    finally { setLoading(false); }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const estadistica = {
      valor: formData.get('valor') as string,
      etiqueta: formData.get('etiqueta') as string,
      orden: parseInt(formData.get('orden') as string) || 0,
      activo: formData.get('activo') === 'on',
    };
    try {
      await updateEstadistica(editando!.id!, estadistica);
      await loadEstadisticas();
      setMostrarFormulario(false);
      setEditando(null);
    } catch (error) { console.error('Error:', error); }
  }

  if (loading) return <div className="max-w-7xl mx-auto px-6">Cargando...</div>;

  return (
    <div className="max-w-7xl mx-auto px-6">
      <div className="flex justify-between mb-8">
        <div><h1 className="text-3xl font-bold mb-2">Estadísticas</h1><p className="text-muted-foreground">Gestiona las estadísticas del hero</p></div>
      </div>

      {mostrarFormulario && editando && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <form onSubmit={handleSubmit} className="bg-card p-6 rounded-2xl w-full max-w-lg border border-border">
            <h2 className="text-xl font-bold mb-4">Editar estadística</h2>
            <div className="space-y-4">
              <div><label className="block text-sm mb-1">Valor</label><input name="valor" defaultValue={editando.valor} required className="w-full px-4 py-2 rounded-lg bg-muted border border-border" /></div>
              <div><label className="block text-sm mb-1">Etiqueta</label><input name="etiqueta" defaultValue={editando.etiqueta} required className="w-full px-4 py-2 rounded-lg bg-muted border border-border" /></div>
              <div><label className="block text-sm mb-1">Orden</label><input name="orden" type="number" defaultValue={editando.orden || 0} className="w-full px-4 py-2 rounded-lg bg-muted border border-border" /></div>
              <div><label className="flex gap-2"><input name="activo" type="checkbox" defaultChecked={editando.activo ?? true} /><span>Activo</span></label></div>
            </div>
            <div className="flex gap-2 mt-6">
              <button type="submit" className="flex-1 px-4 py-2 rounded-lg bg-primary text-primary-foreground">Guardar</button>
              <button type="button" onClick={() => { setMostrarFormulario(false); setEditando(null); }} className="px-4 py-2 rounded-lg border border-border">Cancelar</button>
            </div>
          </form>
        </div>
      )}

      <div className="grid gap-4">
        {estadisticas.map((e) => (
          <div key={e.id} className="flex justify-between items-center p-4 rounded-xl bg-card border border-border">
            <div className="flex items-center gap-4">
              <span className="text-2xl font-bold text-primary w-16">{e.valor}</span>
              <span>{e.etiqueta}</span>
            </div>
            <div className="flex gap-2">
              <span className={`px-2 py-1 rounded text-xs ${e.activo ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>{e.activo ? 'Activo' : 'Inactivo'}</span>
              <button onClick={() => { setEditando(e); setMostrarFormulario(true); }} className="px-3 py-1 rounded border border-border hover:bg-muted text-sm">Editar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}