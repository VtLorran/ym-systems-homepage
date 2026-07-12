'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Code2, HeartHandshake, Lock, ShieldAlert, Sparkles, Zap } from 'lucide-react';
import { easeCustom, fadeIn, fadeInSide, staggerContainer } from '../../lib/motion';

interface CardProps {
  title: string;
  desc: string;
  icon: React.ComponentType<any>;
  index: number;
}

function DiferencialCard({ title, desc, icon: Icon, index, isMobile }: CardProps & { isMobile: boolean }) {
  const [hovered, setHovered] = useState(false);

  // Alternating sliding direction for panels entrance (§4.3)
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      variants={isMobile ? undefined : fadeInSide(isLeft ? 'left' : 'right', 40, 0.7, index * 0.1)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="p-8 rounded-2xl glass-card border-white/5 bg-black/35 hover:border-white/10 hover:bg-white/[0.02] flex flex-col justify-between overflow-hidden relative group cursor-default"
    >
      {/* Background glow overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/5 to-accent-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div>
        {/* Animated Icon container */}
        <div className="w-12 h-12 rounded-xl bg-white/[0.02] border border-white/10 flex items-center justify-center text-text-secondary group-hover:text-accent-purple group-hover:border-accent-purple/30 transition-all duration-500 mb-6 relative">
          <Icon className="w-5 h-5 relative z-10" />
          {hovered && (
            <motion.span
              layoutId={`glow-spark-${index}`}
              className="absolute inset-0 rounded-xl bg-accent-purple/10 blur-[8px]"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1.2, opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          )}
        </div>

        <h3 className="text-base font-bold text-text-primary mb-3 group-hover:text-accent-blue transition-colors duration-300">
          {title}
        </h3>
        
        <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-medium">
          {desc}
        </p>
      </div>

      {/* Reactive Visual Accent on hover */}
      <div className="h-6 mt-6 border-t border-white/5 pt-4 flex items-center justify-between text-[10px] font-mono text-text-muted">
        <span>STATUS_OK</span>
        <div className="flex items-center gap-1">
          <span className={`w-1.5 h-1.5 rounded-full ${hovered ? 'bg-accent-purple animate-pulse' : 'bg-white/10'}`} />
          <span className={hovered ? 'text-accent-purple font-semibold' : ''}>
            {hovered ? 'ACTIVE' : 'IDLE'}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function Diferenciais() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.matchMedia('(max-width: 1024px)').matches);
  }, []);

  const items = [
    {
      title: 'Código Altamente Limpo',
      desc: 'Nossos códigos são desenvolvidos sob rígidos padrões como Clean Code e SOLID, garantindo manutenção simplificada e escalabilidade futura sem retrabalho.',
      icon: Code2,
    },
    {
      title: 'Arquitetura de microsserviços',
      desc: 'Plataformas estruturadas de forma independente, permitindo atualizações parciais sem downtime e distribuição otimizada na nuvem.',
      icon: Sparkles,
    },
    {
      title: 'Performance Extrema',
      desc: 'Carregamento instantâneo de páginas e consumo reduzido de dados de rede, priorizando a experiência em conexões móveis limitadas.',
      icon: Zap,
    },
    {
      title: 'Segurança Criptográfica',
      desc: 'Integração de protocolos avançados de proteção contra ataques (DDoS, XSS, CSRF) e backups de banco automatizados redundantes.',
      icon: Lock,
    },
    {
      title: 'Design de Experiência (UX)',
      desc: 'Interfaces minimalistas desenhadas focando na redução de cliques do usuário, alavancando a taxa de conversão comercial.',
      icon: ShieldAlert,
    },
    {
      title: 'Suporte & Monitoramento',
      desc: 'Equipe técnica disponível para responder chamados operacionais e gerenciar servidores em tempo real com tempos de resposta mínimos.',
      icon: HeartHandshake,
    },
  ];

  return (
    <section id="diferenciais" className="relative py-24 md:py-32 bg-bg-elevated/40 border-y border-white/5 overflow-hidden">
      {/* Background spotlights */}
      <div className="absolute top-[30%] left-[-15%] w-[40vw] h-[40vw] rounded-full bg-accent-purple/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs font-bold text-accent-blue tracking-widest uppercase mb-4">
            Diferenciais
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-text-primary tracking-tight mb-6 font-sans">
            Construído para durar.
          </h2>
          <p className="text-base text-text-secondary leading-relaxed font-medium">
            Não pegamos atalhos no desenvolvimento. Cada linha de código e elemento de interface é planejado para trazer segurança e performance.
          </p>
        </div>

        {/* Differentials Grid (Sliding entrance panels §4.3) */}
         <motion.div
          variants={isMobile ? undefined : staggerContainer(0.08, 0.1)}
          initial={isMobile ? undefined : "hidden"}
          whileInView={isMobile ? undefined : "visible"}
          viewport={isMobile ? undefined : { once: true, amount: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {items.map((item, index) => (
            <DiferencialCard key={index} index={index} isMobile={isMobile} {...item} />
          ))}
        </motion.div>

      </div>
    </section>
  );
}
