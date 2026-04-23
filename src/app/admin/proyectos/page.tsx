'use client';

import { useEffect, useState } from 'react';
import { getAllProyectos, createProyecto, updateProyecto, deleteProyecto } from '@/lib/admin-content';
import type { Proyecto } from '@/types/content';
import ImageUpload from '@/components/admin/ImageUpload';

export default function AdminProyectos() {
  const [proyectos, setProyectos] = useState<Proyecto[]>([]);
  const [loading, setLoading] = useState(true);
  const [editando, setEditando] = useState<Proyecto | null>(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  useEffect(() => {
    loadProyectos();
  }, []);

  async function loadProyectos() {
    try {
      const data = await getAllProyectos();
      setProyectos(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const proyecto = {
      titulo: formData.get('titulo') as string,
      categoria: formData.get('categoria') as string,
      descripcion: formData.get('descripcion') as string,
      imagen: formData.get('imagen') as string,
      orden: parseInt(formData.get('orden') as string) || 0,
      activo: formData.get('activo') === 'on',
    };

    try {
      if (editando?.id) {
        await updateProyecto(editando.id, proyecto);
      } else {
        await createProyecto(proyecto);
      }
      await loadProyectos();
      setMostrarFormulario(false);
      setEditando(null);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  async function handleDelete(id: string) {
    if (confirm('¿Estás seguro de que quieres eliminar este proyecto?')) {
      try {
        await deleteProyecto(id);
        await loadProyectos();
      } catch (error) {
        console.error('Error:', error);
      }
    }
  }

  if (loading) return <div className="max-w-7xl mx-auto px-6">Cargando...</div>;

  return (
    <div className="max-w-7xl mx-auto px-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Proyectos</h1>
          <p className="text-muted-foreground">Gestiona los proyectos del portfolio</p>
        </div>
        <button onClick={() => { setMostrarFormulario(true); setEditando(null); }} className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90">
          + Añadir proyecto
        </button>
      </div>

      {mostrarFormulario && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <form onSubmit={handleSubmit} className="bg-card p-6 rounded-2xl w-full max-w-lg border border-border">
            <h2 className="text-xl font-bold mb-4">{editando ? 'Editar' : 'Nuevo'} proyecto</h2>
            <div className="space-y-4">
              <div><label className="block text-sm mb-1">Título</label><input name="titulo" defaultValue={editando?.titulo} required className="w-full px-4 py-2 rounded-lg bg-muted border border-border" /></div>
              <div><label className="block text-sm mb-1">Categoría</label><input name="categoria" defaultValue={editando?.categoria} required className="w-full px-4 py-2 rounded-lg bg-muted border border-border" /></div>
              <div><label className="block text-sm mb-1">Descripción</label><textarea name="descripcion" defaultValue={editando?.descripcion} required className="w-full px-4 py-2 rounded-lg bg-muted border border-border" /></div>
              <ImageUpload label="Imagen" name="imagen" defaultValue={editando?.imagen} />
              <div><label className="block text-sm mb-1">Orden</label><input name="orden" type="number" defaultValue={editando?.orden || 0} className="w-full px-4 py-2 rounded-lg bg-muted border border-border" /></div>
              <div><label className="flex items-center gap-2"><input name="activo" type="checkbox" defaultChecked={editando?.activo ?? true} /><span className="text-sm">Activo</span></label></div>
            </div>
            <div className="flex gap-2 mt-6">
              <button type="submit" className="flex-1 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90">Guardar</button>
              <button type="button" onClick={() => { setMostrarFormulario(false); setEditando(null); }} className="px-4 py-2 rounded-lg border border-border hover:bg-muted">Cancelar</button>
            </div>
          </form>
        </div>
      )}

      <div className="grid gap-4">
        {proyectos.map((proyecto) => (
          <div key={proyecto.id} className="flex items-center justify-between p-4 rounded-xl bg-card border border-border">
            <div className="flex items-center gap-4">
              {proyecto.imagen?.startsWith('http') ? (
                <img src={proyecto.imagen} alt={proyecto.titulo} className="w-16 h-16 rounded-lg object-cover" />
              ) : (
                <span className="text-3xl">{proyecto.imagen}</span>
              )}
              <div><h3 className="font-semibold">{proyecto.titulo}</h3><p className="text-sm text-muted-foreground">{proyecto.categoria}</p></div>
            </div>
            <div className="flex items-center gap-2">
              <span className={`px-2 py-1 rounded text-xs ${proyecto.activo ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>{proyecto.activo ? 'Activo' : 'Inactivo'}</span>
              <button onClick={() => { setEditando(proyecto); setMostrarFormulario(true); }} className="px-3 py-1 rounded border border-border hover:bg-muted text-sm">Editar</button>
              <button onClick={() => handleDelete(proyecto.id!)} className="px-3 py-1 rounded border border-border hover:bg-muted text-sm text-red-500">Eliminar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}