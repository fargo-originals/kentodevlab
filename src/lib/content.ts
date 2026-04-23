import { supabase } from '@/lib/supabase';
import type { Servicio, Proyecto, Testimonio, HeroContent, Estadistica } from '@/types/content';

export async function getServicios(): Promise<Servicio[]> {
  const { data, error } = await supabase
    .from('servicios')
    .select('*')
    .eq('activo', true)
    .order('orden', { ascending: true });
  
  if (error) throw error;
  return data as Servicio[];
}

export async function getProyectos(): Promise<Proyecto[]> {
  const { data, error } = await supabase
    .from('proyectos')
    .select('*')
    .eq('activo', true)
    .order('orden', { ascending: true });
  
  if (error) throw error;
  return data as Proyecto[];
}

export async function getTestimonios(): Promise<Testimonio[]> {
  const { data, error } = await supabase
    .from('testimonios')
    .select('*')
    .eq('activo', true)
    .order('orden', { ascending: true });
  
  if (error) throw error;
  return data as Testimonio[];
}

export async function getHero(): Promise<HeroContent> {
  const { data, error } = await supabase
    .from('hero')
    .select('*')
    .limit(1)
    .single();
  
  if (error) throw error;
  return data as HeroContent;
}

export async function getEstadisticas(): Promise<Estadistica[]> {
  const { data, error } = await supabase
    .from('estadisticas')
    .select('*')
    .eq('activo', true)
    .order('orden', { ascending: true });
  
  if (error) throw error;
  return data as Estadistica[];
}

export async function getAllContent() {
  const [servicios, proyectos, testimonios, hero, estadisticas] = await Promise.all([
    getServicios(),
    getProyectos(),
    getTestimonios(),
    getHero(),
    getEstadisticas()
  ]);
  
  return { servicios, proyectos, testimonios, hero, estadisticas };
}