'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

type CookieCategory = {
  id: string;
  name: string;
  description: string;
  required: boolean;
  enabled: boolean;
};

const defaultCategories: CookieCategory[] = [
  {
    id: 'necessary',
    name: 'Necesarias',
    description: 'Cookies técnicas necesarias para el funcionamiento del sitio. No requieren consentimiento.',
    required: true,
    enabled: true,
  },
  {
    id: 'analytics',
    name: 'Analíticas',
    description: 'Cookies que nos permiten analizar el uso de nuestro sitio web para mejorar la experiencia.',
    required: false,
    enabled: false,
  },
  {
    id: 'marketing',
    name: 'Marketing',
    description: 'Cookies utilizadas para mostrar publicidad relevante según tus intereses.',
    required: false,
    enabled: false,
  },
];

interface CookieBannerProps {
  onAccept?: () => void;
  onReject?: () => void;
}

export function CookieBanner({ onAccept, onReject }: CookieBannerProps) {
  const [show, setShow] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [categories, setCategories] = useState<CookieCategory[]>(defaultCategories);

  useEffect(() => {
    const savedConsent = localStorage.getItem('cookie_consent');
    if (!savedConsent) {
      setShow(true);
    }
  }, []);

  function handleAcceptAll() {
    const updated = categories.map((c) => ({ ...c, enabled: true }));
    saveConsent(updated);
    setShow(false);
    onAccept?.();
  }

  function handleRejectAll() {
    const updated = categories.map((c) => ({
      ...c,
      enabled: c.required,
    }));
    saveConsent(updated);
    setShow(false);
    onReject?.();
  }

  function handleSaveSettings() {
    saveConsent(categories);
    setShow(false);
    setShowSettings(false);
  }

  function saveConsent(updated: CookieCategory[]) {
    localStorage.setItem('cookie_consent', JSON.stringify(updated));
    localStorage.setItem('cookie_consent_date', new Date().toISOString());
  }

  function toggleCategory(id: string) {
    setCategories(
      categories.map((c) =>
        c.id === id ? { ...c, enabled: !c.enabled } : c
      )
    );
  }

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-card border border-border rounded-2xl p-6 max-w-lg w-full mx-4 shadow-xl">
        {!showSettings ? (
          <>
            <div className="mb-6">
              <h2 className="text-xl font-bold mb-2">🍪 Uso de Cookies</h2>
              <p className="text-muted-foreground text-sm">
                Utilizamos cookies para mejorar tu experiencia en nuestro sitio web. 
                Puedes aceptar todas las cookies, rechazarlas o configurar tus preferencias.
              </p>
              <Link href="/cookies" className="text-primary text-sm hover:underline">
                Ver Política de Cookies
              </Link>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleAcceptAll}
                className="flex-1 px-4 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
              >
                Aceptar todas
              </button>
              <button
                onClick={handleRejectAll}
                className="flex-1 px-4 py-3 rounded-xl bg-muted border border-border font-medium hover:bg-muted/80 transition-colors"
              >
                Rechazar
              </button>
              <button
                onClick={() => setShowSettings(true)}
                className="flex-1 px-4 py-3 rounded-xl bg-muted border border-border font-medium hover:bg-muted/80 transition-colors"
              >
                Configurar
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="mb-6">
              <button
                onClick={() => setShowSettings(false)}
                className="text-sm text-muted-foreground hover:text-foreground mb-4"
              >
                ← Volver
              </button>
              <h2 className="text-xl font-bold mb-2">Configurar Cookies</h2>
              <p className="text-muted-foreground text-sm">
                Selecciona qué cookies quieres aceptar. Las cookies necesarias siempre están activas.
              </p>
            </div>

            <div className="space-y-4 mb-6">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className={`p-4 rounded-xl border ${
                    category.required ? 'bg-muted/50 border-border' : 'border-border'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="font-medium flex items-center gap-2">
                        {category.name}
                        {category.required && (
                          <span className="text-xs bg-muted px-2 py-0.5 rounded">Necesarias</span>
                        )}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {category.description}
                      </p>
                    </div>
                    {category.required ? (
                      <span className="text-sm text-muted-foreground">Activas</span>
                    ) : (
                      <button
                        onClick={() => toggleCategory(category.id)}
                        className={`w-12 h-6 rounded-full transition-colors ${
                          category.enabled ? 'bg-primary' : 'bg-muted'
                        }`}
                      >
                        <span
                          className={`block w-5 h-5 rounded-full bg-white transition-transform ${
                            category.enabled ? 'translate-x-6' : 'translate-x-0.5'
                          }`}
                        />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleSaveSettings}
                className="flex-1 px-4 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
              >
                Guardar preferencias
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}