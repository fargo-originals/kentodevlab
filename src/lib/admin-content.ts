import { supabaseAdmin } from '@/lib/admin-supabase';
import type { Servicio, Proyecto, Testimonio, HeroContent, Estadistica } from '@/types/content';

export async function getAllServicios(): Promise<Servicio[]> {
  const { data, error } = await supabaseAdmin
    .from('servicios')
    .select('*')
    .order('orden', { ascending: true });
  if (error) throw error;
  return data as Servicio[];
}

export async function createServicio(servicio: Omit<Servicio, 'id'>): Promise<Servicio> {
  const { data, error } = await supabaseAdmin
    .from('servicios')
    .insert(servicio)
    .select()
    .single();
  if (error) throw error;
  return data as Servicio;
}

export async function updateServicio(id: string, servicio: Partial<Servicio>): Promise<Servicio> {
  const { data, error } = await supabaseAdmin
    .from('servicios')
    .update(servicio)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data as Servicio;
}

export async function deleteServicio(id: string): Promise<void> {
  const { error } = await supabaseAdmin
    .from('servicios')
    .delete()
    .eq('id', id);
  if (error) throw error;
}

export async function getAllProyectos(): Promise<Proyecto[]> {
  const { data, error } = await supabaseAdmin
    .from('proyectos')
    .select('*')
    .order('orden', { ascending: true });
  if (error) throw error;
  return data as Proyecto[];
}

export async function createProyecto(proyecto: Omit<Proyecto, 'id'>): Promise<Proyecto> {
  const { data, error } = await supabaseAdmin
    .from('proyectos')
    .insert(proyecto)
    .select()
    .single();
  if (error) throw error;
  return data as Proyecto;
}

export async function updateProyecto(id: string, proyecto: Partial<Proyecto>): Promise<Proyecto> {
  const { data, error } = await supabaseAdmin
    .from('proyectos')
    .update(proyecto)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data as Proyecto;
}

export async function deleteProyecto(id: string): Promise<void> {
  const { error } = await supabaseAdmin
    .from('proyectos')
    .delete()
    .eq('id', id);
  if (error) throw error;
}

export async function getAllTestimonios(): Promise<Testimonio[]> {
  const { data, error } = await supabaseAdmin
    .from('testimonios')
    .select('*')
    .order('orden', { ascending: true });
  if (error) throw error;
  return data as Testimonio[];
}

export async function createTestimonio(testimonio: Omit<Testimonio, 'id'>): Promise<Testimonio> {
  const { data, error } = await supabaseAdmin
    .from('testimonios')
    .insert(testimonio)
    .select()
    .single();
  if (error) throw error;
  return data as Testimonio;
}

export async function updateTestimonio(id: string, testimonio: Partial<Testimonio>): Promise<Testimonio> {
  const { data, error } = await supabaseAdmin
    .from('testimonios')
    .update(testimonio)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data as Testimonio;
}

export async function deleteTestimonio(id: string): Promise<void> {
  const { error } = await supabaseAdmin
    .from('testimonios')
    .delete()
    .eq('id', id);
  if (error) throw error;
}

export async function getHeroContent(): Promise<HeroContent> {
  const { data, error } = await supabaseAdmin
    .from('hero')
    .select('*')
    .limit(1)
    .single();
  if (error) throw error;
  return data as HeroContent;
}

export async function updateHero(hero: Partial<HeroContent>): Promise<HeroContent> {
  const { data, error } = await supabaseAdmin
    .from('hero')
    .update(hero)
    .eq('id', hero.id || '00000000-0000-0000-0000-000000000000')
    .select()
    .single();
  if (error) throw error;
  return data as HeroContent;
}

export async function getAllEstadisticas(): Promise<Estadistica[]> {
  const { data, error } = await supabaseAdmin
    .from('estadisticas')
    .select('*')
    .order('orden', { ascending: true });
  if (error) throw error;
  return data as Estadistica[];
}

export async function updateEstadistica(id: string, estadistica: Partial<Estadistica>): Promise<Estadistica> {
  const { data, error } = await supabaseAdmin
    .from('estadisticas')
    .update(estadistica)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data as Estadistica;
}