'use client';

import { useEffect, useState } from 'react';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('theme') as 'dark' | 'light' | null;
    if (saved) {
      document.documentElement.setAttribute('data-theme', saved);
    }
  }, []);

  if (!mounted) {
    return <div style={{ visibility: 'hidden' }}>{children}</div>;
  }

  return <>{children}</>;
}