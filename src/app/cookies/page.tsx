import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Política de Cookies | Kento DevLab',
  description: 'Política de cookies de Kento DevLab. Información sobre las cookies que utilizamos.',
};

export default function CookiesPage() {
  return (
    <main className="min-h-screen bg-background py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Política de Cookies</h1>
        
        <p className="text-muted-foreground mb-8">
          Última actualización: {new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
        </p>

        <section className="space-y-6 text-muted-foreground">
          <h2 className="text-xl font-semibold text-foreground">1. ¿Qué son las cookies?</h2>
          <p>
            Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando visitas un sitio web. 
            Permiten recordar tus preferencias y mejorar tu experiencia de navegación.
          </p>

          <h2 className="text-xl font-semibold text-foreground">2. Tipos de cookies que usamos</h2>
          
          <h3 className="text-lg font-semibold text-foreground">2.1 Cookies técnicas (necesarias)</h3>
          <p>
            Son esenciales para el funcionamiento del sitio web. No requieren tu consentimiento:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Sesión</strong>: Permiten identificarte durante tu visita.</li>
            <li><strong>Preferencias</strong>: Recuerdan tu idioma y configuración.</li>
            <li><strong>Seguridad</strong>: Protegen contra ataques fraudulentos.</li>
          </ul>

          <h3 className="text-lg font-semibold text-foreground">2.2 Cookies analíticas</h3>
          <p>
            Nos ayudan a entender cómo se usa nuestro sitio web:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Google Analytics</strong>: Genera estadísticas anónimas sobre visitas.</li>
            <li>Estas cookies recopilан datos como páginas visitadas, tiempo en el sitio, etc.</li>
          </ul>

          <h3 className="text-lg font-semibold text-foreground">2.3 Cookies de terceros</h3>
          <p>
            Algunos servicios externos pueden instalar cookies:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Google Fonts</strong>: Para carregar fuentes.</li>
            <li><strong>Mapas</strong>: Si integramos mapas interactivos.</li>
          </ul>

          <h2 className="text-xl font-semibold text-foreground">3. Gestión de cookies</h2>
          
          <p>
            Cuando visitas nosso sitio por primera vez, mostramos un banner dónde puedes:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Aceptar todas</strong> las cookies.</li>
            <li><strong>Rechazar</strong> las cookies no necesarias.</li>
            <li><strong>Configurar</strong> tu preferencias manualmente.</li>
          </ul>

          <p>
            También puedes gestionar las cookies desde tu navegador:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Chrome</strong>: Configuración → Privacidad → Cookies</li>
            <li><strong>Firefox</strong>: Opciones → Privacidad</li>
            <li><strong>Safari</strong>: Preferencias → Privacidad</li>
            <li><strong>Edge</strong>: Configuración → Cookies y permisos</li>
          </ul>

          <h2 className="text-xl font-semibold text-foreground">4. Listado de cookies</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2">Cookie</th>
                  <th className="text-left py-2">Tipo</th>
                  <th className="text-left py-2">Duración</th>
                  <th className="text-left py-2">Finalidad</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border">
                  <td className="py-2">session_id</td>
                  <td className="py-2">Técnica</td>
                  <td className="py-2">Sesión</td>
                  <td className="py-2">Identificación</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2">csrf_token</td>
                  <td className="py-2">Técnica</td>
                  <td className="py-2">Sesión</td>
                  <td className="py-2">Seguridad</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2">_ga</td>
                  <td className="py-2">Analítica</td>
                  <td className="py-2">2 años</td>
                  <td className="py-2">Google Analytics</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2">_gid</td>
                  <td className="py-2">Analítica</td>
                  <td className="py-2">24 horas</td>
                  <td className="py-2">Google Analytics</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-xl font-semibold text-foreground">5. Consecuencias de la desactivación</h2>
          <p>
            Si deshabilitas las cookies necesarias, es posible que alcune funciones del sitio no funcionar correctamente. 
            Si deshabilitas las analíticas, no podremos mejorar nuestro sitio basándonos en统计数据.
          </p>

          <h2 className="text-xl font-semibold text-foreground">6. Actualizaciones</h2>
          <p>
            Esta política puede actualizarse periodically. La fecha de última actualización se indica al inicio de esta página.
          </p>

          <h2 className="text-xl font-semibold text-foreground">7. Contacto</h2>
          <p>
            Para preguntas sobre esta política, contacta a <strong>hola@kento-devlab.com</strong>.
          </p>
        </section>
      </div>
    </main>
  );
}