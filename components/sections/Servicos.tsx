'use client';

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Globe, Layers, Layout, LineChart, Rocket } from 'lucide-react';
import { fadeInUp, staggerContainer } from '../../lib/motion';

interface ServiceItem {
  title: string;
  desc: string;
  icon: React.ComponentType<any>;
}

function ServiceCard({ title, desc, icon: Icon }: ServiceItem) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative p-8 rounded-2xl bg-white/[0.01] border border-white/5 overflow-hidden transition-all duration-500 hover:-translate-y-1.5 hover:bg-white/[0.02] hover:border-white/10 group cursor-pointer"
      style={{
        '--mouse-x': `${coords.x}px`,
        '--mouse-y': `${coords.y}px`,
      } as React.CSSProperties}
    >
      {/* Local Spotlight Glow inside the card - Hidden on mobile to save GPU composition resources */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none hidden lg:block"
        style={{
          background: `radial-gradient(350px circle at var(--mouse-x) var(--mouse-y), rgba(59, 130, 246, 0.08), transparent 70%)`
        }}
      />

      {/* Local Border Glow - Hidden on mobile to save GPU composition resources */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl hidden lg:block"
        style={{
          padding: '1px',
          background: `radial-gradient(180px circle at var(--mouse-x) var(--mouse-y), rgba(139, 92, 246, 0.3), transparent 70%)`,
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'exclude',
          WebkitMaskComposite: 'xor',
        }}
      />

      <div className="flex flex-col gap-5 relative z-10">
        {/* Animated Icon container */}
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/10 flex items-center justify-center text-text-secondary group-hover:text-accent-blue group-hover:border-accent-blue/30 transition-all duration-500 transform group-hover:scale-[1.05]">
          <Icon className="w-6 h-6 transition-transform duration-500" />
        </div>

        <div>
          <h3 className="text-lg font-bold text-text-primary mb-2 group-hover:text-accent-blue transition-colors duration-300">
            {title}
          </h3>
          <p className="text-sm text-text-secondary leading-relaxed font-medium">
            {desc}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Servicos() {
  const services: ServiceItem[] = [
    {
      title: 'Desenvolvimento Web',
      desc: 'Portais corporativos rápidos, otimizados para SEO e com interfaces de alta fidelidade visual.',
      icon: Globe,
    },
    {
      title: 'Sistemas Empresariais',
      desc: 'ERP, CRM e painéis de controle customizados integrados ao seu fluxo de trabalho atual.',
      icon: Layout,
    },
    {
      title: 'Plataformas SaaS',
      desc: 'Infraestrutura completa para produtos de software, incluindo cobrança recorrente, APIs e multitenancy.',
      icon: Layers,
    },
    {
      title: 'Integrações & APIs',
      desc: 'Desenvolvimento de APIs robustas com REST/GraphQL e integrações perfeitas com gateways externos.',
      icon: Cpu,
    },
    {
      title: 'Landing Pages Premium',
      desc: 'Páginas de altíssima conversão com microinterações densas focadas em converter visitantes em clientes.',
      icon: Rocket,
    },
    {
      title: 'Consultoria Tecnológica',
      desc: 'Análise técnica de arquitetura de software, otimização de custo de servidores e escolha de stacks.',
      icon: LineChart,
    },
  ];

  return (
    <section id="servicos" className="relative py-24 md:py-32 bg-bg-base overflow-hidden services-scene">
      {/* Background radial highlight */}
      <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] rounded-full bg-accent-blue/5 blur-[120px] pointer-events-none" />

      {/* Continuous loop dotted circles in the background - hidden on mobile */}
      <div className="absolute -right-24 -top-24 w-96 h-96 border border-dashed border-white/5 rounded-full animate-spin-slow pointer-events-none z-0 hidden lg:block" />
      <div className="absolute -left-24 -bottom-24 w-[480px] h-[480px] border border-dashed border-white/5 rounded-full animate-spin-slow pointer-events-none z-0 hidden lg:block" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs font-bold text-accent-blue tracking-widest uppercase mb-4">
            O que fazemos
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-text-primary tracking-tight mb-6 font-sans">
            Soluções completas para estruturar sua tecnologia.
          </h2>
          <p className="text-base text-text-secondary leading-relaxed">
            Unimos engenharia de software de ponta a uma linguagem visual premium para projetar ferramentas seguras, escaláveis e marcantes.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div key={index} className="services-card-wrap">
              <ServiceCard {...service} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
