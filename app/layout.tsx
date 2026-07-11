import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Y&M Systems | Desenvolvimento de Sistemas Premium & SaaS",
  description: "Desenvolvemos sistemas empresariais sob medida, plataformas SaaS escaláveis e aplicações web de alta performance com design moderno, seguro e focado em conversão.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-bg-base text-text-primary selection:bg-accent-purple/30 selection:text-white">
        {/* Grain overlay for paper aesthetic */}
        <div className="grain-overlay" />
        {children}
      </body>
    </html>
  );
}
