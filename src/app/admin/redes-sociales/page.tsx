'use client';

import { useEffect, useState } from 'react';
import { getAllRedesSociales, createRedSocial, updateRedSocial, deleteRedSocial } from '@/lib/admin-content';
import type { RedSocial } from '@/types/content';
import ImageUpload from '@/components/admin/ImageUpload';

export default function AdminRedesSociales() {
  const [redes, setRedes] = useState<RedSocial[]>([]);
  const [loading, setLoading] = useState(true);
  const [editando, setEditando] = useState<RedSocial | null>(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [iconoUrl, setIconoUrl] = useState('');

  useEffect(() => { loadRedes(); }, []);

  async function loadRedes() {
    try {
      const data = await getAllRedesSociales();
      setRedes(data);
    } catch (error) { console.error('Error:', error); }
    finally { setLoading(false); }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const icon = iconoUrl || formData.get('icono') as string;
    const red = {
      nombre: formData.get('nombre') as string,
      url: formData.get('url') as string,
      icono: icon,
      orden: parseInt(formData.get('orden') as string) || 0,
      activo: formData.get('activo') === 'on',
    };
    try {
      if (editando?.id) await updateRedSocial(editando.id, red);
      else await createRedSocial(red);
      await loadRedes();
      setMostrarFormulario(false);
      setEditando(null);
      setIconoUrl('');
    } catch (error) { console.error('Error:', error); }
  }

  async function handleDelete(id: string) {
    if (confirm('¿Eliminar esta red social?')) {
      try { await deleteRedSocial(id); await loadRedes(); }
      catch (error) { console.error('Error:', error); }
    }
  }

  function handleEditar(red: RedSocial) {
    setEditando(red);
    setIconoUrl(red.icono || '');
    setMostrarFormulario(true);
  }

  function handleNuevo() {
    setEditando(null);
    setIconoUrl('');
    setMostrarFormulario(true);
  }

  if (loading) return <div className="max-w-7xl mx-auto px-6">Cargando...</div>;

  return (
    <div className="max-w-7xl mx-auto px-6">
      <div className="flex justify-between mb-8">
        <div><h1 className="text-3xl font-bold mb-2">Redes Sociales</h1><p className="text-muted-foreground">Gestiona los enlaces a redes sociales</p></div>
        <button onClick={handleNuevo} className="px-4 py-2 rounded-lg bg-primary text-primary-foreground">+ Añadir</button>
      </div>

      {mostrarFormulario && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <form onSubmit={handleSubmit} className="bg-card p-6 rounded-2xl w-full max-w-lg border border-border">
            <h2 className="text-xl font-bold mb-4">{editando ? 'Editar' : 'Nueva'} red social</h2>
            <div className="space-y-4">
              <div><label className="block text-sm mb-1">Nombre</label><input name="nombre" defaultValue={editando?.nombre} required className="w-full px-4 py-2 rounded-lg bg-muted border border-border" placeholder="Twitter, LinkedIn, Instagram..." /></div>
              <div><label className="block text-sm mb-1">URL</label><input name="url" type="url" defaultValue={editando?.url} required className="w-full px-4 py-2 rounded-lg bg-muted border border-border" placeholder="https://..." /></div>
              <ImageUpload 
                label="Icono (imagen)" 
                name="icono" 
                defaultValue={editando?.icono}
                maxSizeMB={1}
                onChange={(url) => {
                  console.log('Icono subido:', url);
                  setIconoUrl(url);
                }}
              />
              <div className="text-center text-sm text-muted-foreground">— o usa un emoji —</div>
              <div><label className="block text-sm mb-1">Icono (emoji)</label><input name="icono" defaultValue={editando?.icono} className="w-full px-4 py-2 rounded-lg bg-muted border border-border" placeholder="🐦" /></div>
              <div><label className="block text-sm mb-1">Orden</label><input name="orden" type="number" defaultValue={editando?.orden || 0} className="w-full px-4 py-2 rounded-lg bg-muted border border-border" /></div>
              <div><label className="flex gap-2"><input name="activo" type="checkbox" defaultChecked={editando?.activo ?? true} /><span>Activa</span></label></div>
            </div>
            <div className="flex gap-2 mt-6">
              <button type="submit" className="flex-1 px-4 py-2 rounded-lg bg-primary text-primary-foreground">Guardar</button>
              <button type="button" onClick={() => { setMostrarFormulario(false); setEditando(null); setIconoUrl(''); }} className="px-4 py-2 rounded-lg border border-border">Cancelar</button>
            </div>
          </form>
        </div>
      )}

      <div className="grid gap-4">
        {redes.map((red) => (
          <div key={red.id} className="flex items-center justify-between p-4 rounded-xl bg-card border border-border">
            <div className="flex items-center gap-4">
              {red.icono?.startsWith('http') ? (
                <img src={red.icono} alt={red.nombre} className="w-8 h-8 rounded-lg object-contain" />
              ) : (
                <span className="text-2xl">{red.icono}</span>
              )}
              <div>
                <h3 className="font-semibold">{red.nombre}</h3>
                <p className="text-sm text-muted-foreground">{red.url}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className={`px-2 py-1 rounded text-xs ${red.activo ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>{red.activo ? 'Activa' : 'Inactiva'}</span>
              <button onClick={() => handleEditar(red)} className="px-3 py-1 rounded border border-border hover:bg-muted text-sm">Editar</button>
              <button onClick={() => handleDelete(red.id!)} className="px-3 py-1 rounded border border-border hover:bg-muted text-sm text-red-500">Eliminar</button>
            </div>
          </div>
        ))}
        {redes.length === 0 && (
          <p className="text-center text-muted-foreground py-8">No hay redes sociales configuradas</p>
        )}
      </div>
    </div>
  );
}