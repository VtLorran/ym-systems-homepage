'use client';

import { useEffect, useState, useRef } from 'react';
import { useInView, motion } from 'framer-motion';
import { Activity, Award, Smile, ShieldAlert } from 'lucide-react';
import { fadeInUp, staggerContainer, fadeIn } from '../../lib/motion';

interface StatItemProps {
  value: string;
  targetNumber: number;
  suffix?: string;
  decimals?: number; // Numeric decimals to control precise formatting (Request 3)
  label: string;
  sublabel: string;
  icon: React.ComponentType<any>;
}

function StatCard({ targetNumber, suffix = '', decimals, label, sublabel, icon: Icon, isMobile }: StatItemProps & { isMobile: boolean }) {
  const [count, setCount] = useState(0);
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.3 });

  useEffect(() => {
    if (!isInView) return;

    if (isMobile) {
      setCount(targetNumber);
      return;
    }

    let startTime: number | null = null;
    const duration = 1500; // 1.5 seconds

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // easeOutCubic curve
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      
      const currentVal = easeProgress * targetNumber;
      setCount(currentVal);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, targetNumber, isMobile]);

  const displayValue = decimals !== undefined
    ? count.toFixed(decimals)
    : Math.floor(count).toString();

  return (
    <motion.div
      ref={cardRef}
      variants={isMobile ? fadeIn(0.4) : fadeInUp(20, 0.4)}
      className="p-6 rounded-2xl glass-card flex flex-col justify-between border-white/5 bg-black/30 hover:border-white/10 relative overflow-hidden group min-h-[200px]"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/5 via-transparent to-accent-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      {/* Icon top row */}
      <div className="flex justify-between items-start mb-4">
        <div className="w-10 h-10 rounded-xl bg-white/[0.02] border border-white/10 flex items-center justify-center text-accent-blue group-hover:text-accent-purple transition-colors">
          <Icon className="w-5 h-5" />
        </div>
        <span className="text-[10px] font-mono text-text-muted tracking-wider uppercase">verified</span>
      </div>

      {/* Structured aligned content (Request 3) */}
      <div className="flex flex-col justify-end flex-grow">
        <div className="text-3xl sm:text-4xl font-extrabold font-mono text-text-primary tracking-tight">
          {displayValue}
          {suffix}
        </div>
        <h3 className="text-sm font-bold text-text-primary mt-2 mb-1">{label}</h3>
        <p className="text-xs text-text-secondary leading-normal">{sublabel}</p>
      </div>
    </motion.div>
  );
}

export default function Stats() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    setIsMobile(window.matchMedia('(max-width: 1024px)').matches);
  }, []);

  // Balanced sublabel lengths to prevent cards from wrapping differently (Request 3)
  const statsData: StatItemProps[] = [
    {
      value: '120',
      targetNumber: 120,
      suffix: '+',
      label: 'Sistemas Entregues',
      sublabel: 'Plataformas SaaS e softwares de alto impacto.',
      icon: Award,
    },
    {
      value: '99.2',
      targetNumber: 99.2,
      suffix: '%',
      decimals: 1, // Render 99.2% precisely without extra decimals
      label: 'Taxa de Satisfação',
      sublabel: 'NPS de excelência e relações de longo prazo.',
      icon: Smile,
    },
    {
      value: '99.99',
      targetNumber: 99.99,
      suffix: '%',
      decimals: 2, // Render 99.99% precisely
      label: 'Disponibilidade de Sistemas',
      sublabel: 'Uptime certificado nos servidores de produção.',
      icon: Activity,
    },
    {
      value: '24',
      targetNumber: 24,
      suffix: '/7',
      label: 'Monitoramento & Suporte',
      sublabel: 'Segurança constante e resposta a incidentes.',
      icon: ShieldAlert,
    },
  ];

  return (
    <section className="relative py-16 px-6 md:px-12 bg-bg-base overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={staggerContainer(0.1, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {statsData.map((stat, index) => (
            <StatCard key={index} isMobile={isMobile} {...stat} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
