import { getHero, getEstadisticas, getServicios, getProyectos, getTestimonios } from '@/lib/content';
import { Header } from '@/components/sections/Header';
import { Hero } from '@/components/sections/Hero';
import { Servicios } from '@/components/sections/Servicios';
import { Portfolio } from '@/components/sections/Portfolio';
import { Contacto } from '@/components/sections/Contacto';
import { Footer } from '@/components/sections/Footer';

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
      <Header />
      <main>
        <Hero hero={hero} estadisticas={estadisticas} />
        <Servicios servicios={servicios} />
        <Portfolio proyectos={proyectos} testimonios={testimonios} />
        <Contacto />
      </main>
      <Footer />
    </>
  );
}