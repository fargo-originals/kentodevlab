'use client';

import { motion } from 'framer-motion';

const values = [
  {
    title: 'Transparencia total',
    description: 'Sin sorpresas. Siempre sabes en qué punto está tu proyecto y qué viene下一个.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: 'Calidad Premium',
    description: 'Código limpio, escalable y mantenible. Nada de atajos.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
  },
  {
    title: 'Resultados concretos',
    description: 'No construimos por construir. Construimos para que tu negocio crezca.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
  },
];

export function SobreNos() {
  return (
    <section className="py-24 md:py-32 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-sm font-mono text-primary">SOBRE NOSOTROS</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
              Construimos digital,{' '}
              <span className="text-primary">hablamos claro</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              En Kento DevLab somos desarrolladores y diseñadores que cree en el trabajo bien hecho. 
              No usamos excusas ni tecnicismos confusos. Te explicamos todo en plata.
            </p>
            <p className="text-lg text-muted-foreground mb-8">
              Nos enfocamos en comercios pequeños, PYMES y autónomos que necesitan 
              presencia digital seria pero sin presupuestos de enterprise.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-4 rounded-xl bg-card border border-border"
                >
                  <div className="text-primary mb-2">{value.icon}</div>
                  <h3 className="font-semibold mb-1">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-3xl blur-3xl opacity-20" />
            <div className="relative p-8 rounded-2xl bg-card border border-border">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-6 rounded-xl bg-muted">
                  <div className="text-4xl font-bold text-primary mb-2">50+</div>
                  <div className="text-sm text-muted-foreground">Proyectos</div>
                </div>
                <div className="text-center p-6 rounded-xl bg-muted">
                  <div className="text-4xl font-bold text-primary mb-2">100%</div>
                  <div className="text-sm text-muted-foreground">Entregados</div>
                </div>
                <div className="text-center p-6 rounded-xl bg-muted">
                  <div className="text-4xl font-bold text-primary mb-2">24h</div>
                  <div className="text-sm text-muted-foreground">Respuesta</div>
                </div>
                <div className="text-center p-6 rounded-xl bg-muted">
                  <div className="text-4xl font-bold text-primary mb-2">5★</div>
                  <div className="text-sm text-muted-foreground">Valoración</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}