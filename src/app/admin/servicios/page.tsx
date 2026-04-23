'use client';

import { useEffect, useState } from 'react';
import { getAllServicios, createServicio, updateServicio, deleteServicio } from '@/lib/admin-content';
import type { Servicio } from '@/types/content';

export default function AdminServicios() {
  const [servicios, setServicios] = useState<Servicio[]>([]);
  const [loading, setLoading] = useState(true);
  const [editando, setEditando] = useState<Servicio | null>(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  useEffect(() => {
    loadServicios();
  }, []);

  async function loadServicios() {
    try {
      const data = await getAllServicios();
      setServicios(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const servicio = {
      titulo: formData.get('titulo') as string,
      descripcion: formData.get('descripcion') as string,
      icono: formData.get('icono') as string,
      caracteristicas: (formData.get('caracteristicas') as string).split(',').map(s => s.trim()),
      col_span: formData.get('col_span') as string,
      orden: parseInt(formData.get('orden') as string) || 0,
      activo: formData.get('activo') === 'on',
    };

    try {
      if (editando?.id) {
        await updateServicio(editando.id, servicio);
      } else {
        await createServicio(servicio);
      }
      await loadServicios();
      setMostrarFormulario(false);
      setEditando(null);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  async function handleDelete(id: string) {
    if (confirm('¿Estás seguro de que quieres eliminar este servicio?')) {
      try {
        await deleteServicio(id);
        await loadServicios();
      } catch (error) {
        console.error('Error:', error);
      }
    }
  }

  if (loading) {
    return <div className="max-w-7xl mx-auto px-6">Cargando...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Servicios</h1>
          <p className="text-muted-foreground">Gestiona los servicios que ofreces</p>
        </div>
        <button
          onClick={() => { setMostrarFormulario(true); setEditando(null); }}
          className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90"
        >
          + Añadir servicio
        </button>
      </div>

      {mostrarFormulario && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <form onSubmit={handleSubmit} className="bg-card p-6 rounded-2xl w-full max-w-lg border border-border">
            <h2 className="text-xl font-bold mb-4">{editando ? 'Editar' : 'Nuevo'} servicio</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-1">Título</label>
                <input name="titulo" defaultValue={editando?.titulo} required className="w-full px-4 py-2 rounded-lg bg-muted border border-border" />
              </div>
              <div>
                <label className="block text-sm mb-1">Descripción</label>
                <textarea name="descripcion" defaultValue={editando?.descripcion} required className="w-full px-4 py-2 rounded-lg bg-muted border border-border" />
              </div>
              <div>
                <label className="block text-sm mb-1">Icono (emoji)</label>
                <input name="icono" defaultValue={editando?.icono} required className="w-full px-4 py-2 rounded-lg bg-muted border border-border" />
              </div>
              <div>
                <label className="block text-sm mb-1">Características (separadas por coma)</label>
                <input name="caracteristicas" defaultValue={editando?.caracteristicas?.join(', ')} required className="w-full px-4 py-2 rounded-lg bg-muted border border-border" />
              </div>
              <div>
                <label className="block text-sm mb-1">Ancho</label>
                <select name="col_span" defaultValue={editando?.col_span || 'md:col-span-1'} className="w-full px-4 py-2 rounded-lg bg-muted border border-border">
                  <option value="md:col-span-1">1 columna</option>
                  <option value="md:col-span-2">2 columnas</option>
                  <option value="md:col-span-3">3 columnas</option>
                </select>
              </div>
              <div>
                <label className="block text-sm mb-1">Orden</label>
                <input name="orden" type="number" defaultValue={editando?.orden || 0} className="w-full px-4 py-2 rounded-lg bg-muted border border-border" />
              </div>
              <div>
                <label className="flex items-center gap-2">
                  <input name="activo" type="checkbox" defaultChecked={editando?.activo ?? true} />
                  <span className="text-sm">Activo</span>
                </label>
              </div>
            </div>

            <div className="flex gap-2 mt-6">
              <button type="submit" className="flex-1 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90">
                Guardar
              </button>
              <button type="button" onClick={() => { setMostrarFormulario(false); setEditando(null); }} className="px-4 py-2 rounded-lg border border-border hover:bg-muted">
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid gap-4">
        {servicios.map((servicio) => (
          <div key={servicio.id} className="flex items-center justify-between p-4 rounded-xl bg-card border border-border">
            <div className="flex items-center gap-4">
              <span className="text-3xl">{servicio.icono}</span>
              <div>
                <h3 className="font-semibold">{servicio.titulo}</h3>
                <p className="text-sm text-muted-foreground">{servicio.descripcion}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className={`px-2 py-1 rounded text-xs ${servicio.activo ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>
                {servicio.activo ? 'Activo' : 'Inactivo'}
              </span>
              <button onClick={() => { setEditando(servicio); setMostrarFormulario(true); }} className="px-3 py-1 rounded border border-border hover:bg-muted text-sm">
                Editar
              </button>
              <button onClick={() => handleDelete(servicio.id!)} className="px-3 py-1 rounded border border-border hover:bg-muted text-sm text-red-500">
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}