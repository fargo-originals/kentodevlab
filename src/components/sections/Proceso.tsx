'use client';

import { motion } from 'framer-motion';

const steps = [
  {
    number: '01',
    title: 'Descubrimiento',
    description: 'Nos reunimos (presencial o videollamada) para entender tu negocio, objetivos y público objetivo.',
    duration: '1-2 días',
  },
  {
    number: '02',
    title: 'Propuesta',
    description: 'Te enviamos una propuesta detallada con alcance, timeline y presupuesto sin compromiso.',
    duration: '2-3 días',
  },
  {
    number: '03',
    title: 'Desarrollo',
    description: 'Trabajamos en sprints ágiles. Recibirás actualizaciones semanales y un entorno de preview.',
    duration: '1-4 semanas',
  },
  {
    number: '04',
    title: 'Lanzamiento',
    description: 'Desplegamos en producción, configuramos analytics y te enseñamos a gestionar el contenido.',
    duration: '1 día',
  },
];

export function Proceso() {
  return (
    <section id="proceso" className="py-24 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-mono text-primary">PROCESO</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-4">
            ¿Cómo trabajamos?
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Proceso claro, sin sorpresas. Siempre sabes en qué punto está tu proyecto.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-[60%] w-[80%] h-px bg-border group-hover:bg-primary/50 transition-colors" />
              )}
              
              <div className="relative p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300 h-full">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-5xl font-bold text-muted/30 group-hover:text-primary/30 transition-colors">
                    {step.number}
                  </span>
                  <span className="text-xs font-mono text-muted-foreground px-2 py-1 rounded-full bg-muted">
                    {step.duration}
                  </span>
                </div>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}