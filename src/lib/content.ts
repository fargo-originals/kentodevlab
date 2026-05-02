import { fetchSnapshot, mapHero, mapServicios, mapProyectos, mapTestimonios } from '@/lib/crm';
import { supabase } from '@/lib/supabase';
import type { Servicio, Proyecto, Testimonio, HeroContent, Estadistica, RedSocial } from '@/types/content';

const LOCALE = process.env.NEXT_PUBLIC_LOCALE ?? 'es';

export async function getServicios(): Promise<Servicio[]> {
  const snap = await fetchSnapshot(LOCALE);
  return mapServicios(snap.services, LOCALE);
}
export async function getProyectos(): Promise<Proyecto[]> {
  const snap = await fetchSnapshot(LOCALE);
  return mapProyectos(snap.portfolio, LOCALE);
}
export async function getTestimonios(): Promise<Testimonio[]> {
  const snap = await fetchSnapshot(LOCALE);
  return mapTestimonios(snap.testimonials, LOCALE);
}
export async function getHero(): Promise<HeroContent> {
  const snap = await fetchSnapshot(LOCALE);
  const hero = mapHero(snap.hero, LOCALE);
  if (!hero) throw new Error('No hero content in CRM');
  return hero;
}
// estadisticas y redes_sociales aún no están en CRM, siguen en Supabase
export async function getEstadisticas(): Promise<Estadistica[]> {
  const { data } = await supabase.from('estadisticas').select('*')
    .eq('activo', true).order('orden', { ascending: true });
  return (data ?? []) as Estadistica[];
}
export async function getRedesSociales(): Promise<RedSocial[]> {
  const { data } = await supabase.from('redes_sociales').select('*')
    .eq('activo', true).order('orden', { ascending: true });
  return (data ?? []) as RedSocial[];
}
export async function getAllContent() {
  const [servicios, proyectos, testimonios, hero, estadisticas, redes] = await Promise.all([
    getServicios(), getProyectos(), getTestimonios(), getHero(),
    getEstadisticas(), getRedesSociales(),
  ]);
  return { servicios, proyectos, testimonios, hero, estadisticas, redes };
}
