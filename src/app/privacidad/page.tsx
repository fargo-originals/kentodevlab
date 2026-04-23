import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Política de Privacidad | Kento DevLab',
  description: 'Política de privacidad de Kento DevLab. Información sobre cómo protegemos tus datos personales.',
};

export default function PrivacidadPage() {
  return (
    <main className="min-h-screen bg-background py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Política de Privacidad</h1>
        
        <p className="text-muted-foreground mb-8">
         Última actualización: {new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
        </p>

        <section className="space-y-6 text-muted-foreground">
          <h2 className="text-xl font-semibold text-foreground">1. Responsable del tratamiento</h2>
          <p>
            Kento DevLab, con domicilio en Madrid, España, y correo electrónico de contacto: 
            <strong> hola@kento-devlab.com</strong>.
          </p>

          <h2 className="text-xl font-semibold text-foreground">2. Finalidad del tratamiento</h2>
          <p>
            Los datos personales que nos proporciones se utilizarán para:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Atender tu solicitud de contacto y предоставление información sobre nuestros servicios.</li>
            <li>Gestionar la relación comercial contigo.</li>
            <li>Enviarte comunicaciones comerciales sobre nuestros servicios, siempre que nos autorices.</li>
          </ul>

          <h2 className="text-xl font-semibold text-foreground">3. Base legal</h2>
          <p>
            El tratamiento de tus datos se basa en tu consentimiento (art. 6.1.a RGPD) para las finalidades указаны arriba. 
            Para la gestión de la relación comercial, el tratamiento es necesario para la ejecución de un contrato (art. 6.1.b RGPD).
          </p>

          <h2 className="text-xl font-semibold text-foreground">4. Destinatarios</h2>
          <p>
            Tus datos no serán cedidos a terceros, salvo obligación legal. Podremos compartir datos con 
            proveedores de servicios que nos ayudan en nuestra actividad (hosting, email marketing), 
            quienes estarán sujetos a obligaciones de confidencialidad.
          </p>

          <h2 className="text-xl font-semibold text-foreground">5. Transferencias internacionales</h2>
          <p>
            Algunos de nuestros proveedores están ubicados en países fuera del Espacio Económico Europeo. 
            En estos casos, garantizamos que las transferencias se realizan con las garantías adecuadas según el RGPD.
          </p>

          <h2 className="text-xl font-semibold text-foreground">6. Plazo de conservación</h2>
          <p>
            Conservaremos tus datos durante el tiempo necesario para gestionar tu solicitud y, posteriormente, 
            selama un máximo de 2 años para enviarte información comercial, a menos que nos revoques el consentimiento.
          </p>

          <h2 className="text-xl font-semibold text-foreground">7. Tus derechos</h2>
          <p>
            Tienes derecho a:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Acceder</strong> a tus datos personales.</li>
            <li><strong>Rectificar</strong> datos inexactos o incompletos.</li>
            <li><strong>Suprimir</strong> tus datos cuando lo desees.</li>
            <li><strong>Limitar</strong> el tratamiento en ciertas circunstancias.</li>
            <li><strong>Oponerte</strong> al tratamiento para fines comerciales.</li>
            <li><strong>Portabilidad</strong> de tus datos en formato estructurado.</li>
          </ul>
          <p>
            Para ejercer cualquiera de estos derechos, escribe a <strong>hola@kento-devlab.com</strong>.
          </p>

          <h2 className="text-xl font-semibold text-foreground">8. Reclamación ante la autoridad de control</h2>
          <p>
            Si consideras que no hemos tratado tus datos correctamente, puedes presentar una reclamación 
            ante la Agencia Española de Protección de Datos (AEPD): <strong>www.aepd.es</strong>.
          </p>

          <h2 className="text-xl font-semibold text-foreground">9. Datos de navegación</h2>
          <p>
            Recopilamos datos técnicos como dirección IP, tipo de navegador y sistema operativo mediante cookies 
            y tecnologías similares. Consulta nuestra Política de Cookies para más información.
          </p>

          <h2 className="text-xl font-semibold text-foreground">10. Menores de edad</h2>
          <p>
            Nuestros servicios no están dirigidos a menores de 14 años. No recopilamos conscientemente 
            datos de menores sin el consentimiento de sus representantes legales.
          </p>

          <h2 className="text-xl font-semibold text-foreground">11. Cambios en la política</h2>
          <p>
            Podremos modificar esta política периодически. Cualquier cambio será publicado en esta página 
            y, si es sustancial, te notificaremos por email.
          </p>
        </section>
      </div>
    </main>
  );
}