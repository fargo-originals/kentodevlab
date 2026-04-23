import { Header } from '@/components/sections/Header';
import { Hero } from '@/components/sections/Hero';
import { Servicios } from '@/components/sections/Servicios';
import { SobreNos } from '@/components/sections/SobreNos';
import { Proceso } from '@/components/sections/Proceso';
import { Portfolio } from '@/components/sections/Portfolio';
import { Contacto } from '@/components/sections/Contacto';
import { Footer } from '@/components/sections/Footer';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Servicios />
        <SobreNos />
        <Proceso />
        <Portfolio />
        <Contacto />
      </main>
      <Footer />
    </>
  );
}