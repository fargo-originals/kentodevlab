import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Aviso Legal | Kento DevLab',
  description: 'Aviso legal de Kento DevLab. Información legal sobre los servicios de Kento DevLab.',
};

export default function AvisoLegalPage() {
  return (
    <main className="min-h-screen bg-background py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Aviso Legal</h1>
        
        <p className="text-muted-foreground mb-8">
          Última actualización: {new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
        </p>

        <section className="space-y-6 text-muted-foreground">
          <h2 className="text-xl font-semibold text-foreground">1. Datos del titular</h2>
          <p>
            En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de servicios de la sociedad de la información 
            y de comercio electrónico, se exponen los datos generales:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Titular</strong>: Kento DevLab</li>
            <li><strong>Domicilio</strong>: Madrid, España</li>
            <li><strong>Correo electrónico</strong>: hola@kento-devlab.com</li>
            <li><strong>NIF/CIF</strong>: Por determinar</li>
          </ul>

          <h2 className="text-xl font-semibold text-foreground">2. Objeto</h2>
          <p>
            El presenteAviso Legal regula el acceso, navegación y uso del sitio web <strong>kento-devlab.com</strong> (en adelante, el "Sitio Web"), 
            así como las condiciones de uso de los servicios ofrecidos por Kento DevLab.
          </p>

          <h2 className="text-xl font-semibold text-foreground">3. Acceso y uso del sitio web</h2>
          <p>
            El acceso al Sitio Web es gratuito y no requiere registro previo. El usuario se compromete a hacer un uso lawful y honesto del Sitio Web, 
            conforme a las siguientes condiciones:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>No realizar actividades ilegales o que atenten contra los derechos de terceros.</li>
            <li>No introducir virus, malware o cualquier código dañino.</li>
            <li>No intentar acceder a sistemas no autorizados.</li>
            <li>No reproducir o copiar el contenido sin autorización.</li>
          </ul>

          <h2 className="text-xl font-semibold text-foreground">4. Propiedad intelectual</h2>
          <p>
            Todos los contenidos del Sitio Web (textos, imágenes, logotipos, código fuente, diseño) están protegidos 
            por derechos de propiedad intelectual e industrial correspondientes a Kento DevLab o a sus licenciantes.
          </p>
          <p>
            Queda prohibida la reproducción, distribución, comunicación pública o transformación no autorizada de los contenidos, 
            salvo en los casos expressly разрешены por el titular.
          </p>

          <h2 className="text-xl font-semibold text-foreground">5. Exclusión de garantías y responsabilidad</h2>
          <p>
            Kento DevLab no garantiza la disponibilidad continua del Sitio Web ni la ausencia de errores en los contenidos. 
            El usuario exonera a Kento DevLab de cualquier responsabilidad por daños y perjuicios derivados de:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>La falta de disponibilidad o desconexión del Sitio Web.</li>
            <li>Errores u omisiones en los contenidos.</li>
            <li>Problemas técnicos o de velocidad.</li>
            <li>Daños derivados del uso de información obtenida a través del Sitio Web.</li>
          </ul>

          <h2 className="text-xl font-semibold text-foreground">6. Enlaces externos</h2>
          <p>
            El Sitio Web puede contener enlaces a sitios web de terceros. Kento DevLab no controla estos sitios 
            y no se hace responsable de sus contenidos. La inclusión de enlaces no implica asociación 
            o aprobación de los mismos.
          </p>

          <h2 className="text-xl font-semibold text-foreground">7. Enlaces al Sitio Web</h2>
          <p>
            Está permitido crear enlaces al Sitio Web siempre que sean visibles y no indiquen falsamente 
            una asociación con Kento DevLab. Queda prohibido establecer enlaces desde sitios web ilícitos 
            o que contengan contenidos ofensivos.
          </p>

          <h2 className="text-xl font-semibold text-foreground">8.Legislación aplicable y jurisdicción</h2>
          <p>
            Este Aviso Legal se ruling por la legislación española. Para cualquier disputa derivada del uso del Sitio Web, 
            las partes se someten a los Juzgados y Tribunales de Madrid capital, renunciando a cualquier otro fuero 
            que pudiera corresponderles.
          </p>

          <h2 className="text-xl font-semibold text-foreground">9. Modificaciones</h2>
          <p>
            Kento DevLab se reserva el derecho de modificar este Aviso Legal en cualquier momento. 
            Los usuarios deben revisar periódicamente esta página para verificar posibles cambios.
          </p>
        </section>
      </div>
    </main>
  );
}