import { getHero, getEstadisticas, getServicios, getProyectos, getTestimonios } from '@/lib/content';
import { Hero } from '@/components/sections/Hero';
import { Servicios } from '@/components/sections/Servicios';
import { Portfolio } from '@/components/sections/Portfolio';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const [hero, estadisticas, servicios, proyectos, testimonios] = await Promise.all([
    getHero().catch(() => null),
    getEstadisticas().catch(() => []),
    getServicios().catch(() => []),
    getProyectos().catch(() => []),
    getTestimonios().catch(() => []),
  ]);

  return (
    <>
      <Hero hero={hero} estadisticas={estadisticas} />
      <Servicios servicios={servicios} />
      <Portfolio proyectos={proyectos} testimonios={testimonios} />
    </>
  );
}