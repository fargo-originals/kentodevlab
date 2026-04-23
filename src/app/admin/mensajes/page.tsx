'use client';

import { useEffect, useState } from 'react';
import { supabaseAdmin } from '@/lib/admin-supabase';

interface Mensaje {
  id: string;
  nombre: string;
  email: string;
  telefono: string | null;
  empresa: string | null;
  servicio: string;
  presupuesto: string;
  mensaje: string;
  leido: boolean;
  creado: string;
}

const servicioLabels: Record<string, string> = {
  web: 'Desarrollo Web',
  saas: 'SaaS / WebApp',
  ecommerce: 'E-commerce',
  maintenance: 'Mantenimiento',
  other: 'Otro',
};

export default function AdminMensajes() {
  const [mensajes, setMensajes] = useState<Mensaje[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Mensaje | null>(null);

  useEffect(() => { loadMensajes(); }, []);

  async function loadMensajes() {
    try {
      const { data } = await supabaseAdmin
        .from('mensajes_contacto')
        .select('*')
        .order('creado', { ascending: false });
      setMensajes(data || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  }

  async function markAsRead(id: string) {
    await supabaseAdmin
      .from('mensajes_contacto')
      .update({ leido: true })
      .eq('id', id);
    loadMensajes();
  }

  async function deleteMensaje(id: string) {
    if (confirm('¿Eliminar este mensaje?')) {
      await supabaseAdmin.from('mensajes_contacto').delete().eq('id', id);
      setSelected(null);
      loadMensajes();
    }
  }

  if (loading) return <div className="max-w-7xl mx-auto px-6">Cargando...</div>;

  return (
    <div className="max-w-7xl mx-auto px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Mensajes de Contacto</h1>
        <p className="text-muted-foreground">{mensajes.length} mensajes</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-3">
          {mensajes.map((msg) => (
            <div
              key={msg.id}
              onClick={() => { setSelected(msg); markAsRead(msg.id); }}
              className={`p-4 rounded-xl border cursor-pointer hover:border-primary transition-colors ${
                msg.leido ? 'bg-card border-border' : 'bg-card border-primary/50'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`text-xs px-2 py-0.5 rounded ${msg.leido ? 'bg-muted text-muted-foreground' : 'bg-primary/20 text-primary'}`}>
                  {msg.leido ? 'Leído' : 'Nuevo'}
                </span>
                <span className="text-xs text-muted-foreground">
                  {new Date(msg.creado).toLocaleDateString('es-ES')}
                </span>
              </div>
              <h3 className="font-semibold">{msg.nombre}</h3>
              <p className="text-sm text-muted-foreground">{msg.email}</p>
              <p className="text-xs text-muted-foreground mt-1">{servicioLabels[msg.servicio]} · {msg.presupuesto}</p>
            </div>
          ))}
          {mensajes.length === 0 && (
            <p className="text-center text-muted-foreground py-8">No hay mensajes</p>
          )}
        </div>

        {selected && (
          <div className="p-6 rounded-xl bg-card border border-border">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">{selected.nombre}</h2>
              <button onClick={() => deleteMensaje(selected.id)} className="px-3 py-1 rounded border border-border hover:bg-muted text-sm text-red-500">Eliminar</button>
            </div>
            <div className="space-y-3 text-sm">
              <p><span className="text-muted-foreground">Email:</span> <a href={`mailto:${selected.email}`} className="text-primary">{selected.email}</a></p>
              {selected.telefono && <p><span className="text-muted-foreground">Teléfono:</span> {selected.telefono}</p>}
              {selected.empresa && <p><span className="text-muted-foreground">Empresa:</span> {selected.empresa}</p>}
              <p><span className="text-muted-foreground">Servicio:</span> {servicioLabels[selected.servicio]}</p>
              <p><span className="text-muted-foreground">Presupuesto:</span> {selected.presupuesto}</p>
              <div className="pt-3 border-t border-border">
                <p className="text-muted-foreground mb-1">Mensaje:</p>
                <p className="bg-muted p-3 rounded-lg">{selected.mensaje}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}