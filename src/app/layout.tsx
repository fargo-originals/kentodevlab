import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kento DevLab | Desarrollo Web + SaaS + E-commerce",
  description: "Construimos páginas web, SaaS, WebApps y E-commerce para comercios pequeños, PYMES y autónomos en Madrid. Diseño moderno, escalable y con resultados.",
  keywords: ["desarrollo web", "SaaS", "E-commerce", "Madrid", "agencia digital", "PYMES", "autónomos", "web development"],
  authors: [{ name: "Kento DevLab" }],
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "Kento DevLab | Desarrollo Web + SaaS + E-commerce",
    description: "Construimos páginas web, SaaS, WebApps y E-commerce para comercios pequeños, PYMES y autónomos en Madrid.",
    url: "https://kento-devlab.com",
    siteName: "Kento DevLab",
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kento DevLab | Desarrollo Web + SaaS + E-commerce",
    description: "Construimos páginas web, SaaS, WebApps y E-commerce para comercios pequeños, PYMES y autónomos en Madrid.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${jetbrains.variable}`}>
      <body className="min-h-screen flex flex-col bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
