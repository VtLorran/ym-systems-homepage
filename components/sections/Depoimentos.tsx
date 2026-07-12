'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote } from 'lucide-react';
import { easeCustom, staggerContainer } from '../../lib/motion';

interface Testimonial {
  id: number;
  text: string;
  name: string;
  role: string;
  company: string;
}

function TeleprompterText({ text, isMobile }: { text: string; isMobile: boolean }) {
  const words = text.split(' ');

  if (isMobile) {
    return (
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="text-base sm:text-lg md:text-xl text-text-primary leading-relaxed font-sans font-medium tracking-tight mb-8"
      >
        {text}
      </motion.p>
    );
  }

  return (
    <motion.p
      variants={staggerContainer(0.02, 0.1)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="text-base sm:text-lg md:text-xl text-text-primary leading-relaxed font-sans font-medium tracking-tight mb-8"
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          variants={{
            hidden: { opacity: 0.12, filter: 'blur(3px)', y: 4 },
            visible: { opacity: 1, filter: 'blur(0px)', y: 0 }
          }}
          transition={{ duration: 0.35, ease: easeCustom }}
          className="inline-block mr-1.5"
        >
          {word}
        </motion.span>
      ))}
    </motion.p>
  );
}

export default function Depoimentos() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.matchMedia('(max-width: 1024px)').matches);
  }, []);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      text: '“O sistema de faturamento desenvolvido pela Y&M superou todas as expectativas de performance. Reduzimos a latência de checkout para menos de 100ms e a estabilidade da plataforma sob carga pesada é impecável.”',
      name: 'Thiago Silva',
      role: 'CEO',
      company: 'Nexo Digital',
    },
    {
      id: 2,
      text: '“Precisávamos de um CRM sob medida integrado ao nosso ERP legado. A Y&M Systems entregou uma solução fantástica em tempo recorde, economizando centenas de horas operacionais e unificando nossos dados comerciais.”',
      name: 'Amanda Souza',
      role: 'Diretora de Operações',
      company: 'Athena Corp',
    },
    {
      id: 3,
      text: '“O painel logístico que eles construíram superou nossas metas de entrega. O algoritmo de otimização de rotas e o rastreamento em tempo real permitiram gerenciar a frota com segurança absoluta.”',
      name: 'Gustavo Rocha',
      role: 'CTO',
      company: 'Veloce Logistics',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 9000); // Allow ample reading time for teleprompter animation
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section className="relative py-24 md:py-32 bg-bg-base overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-[40%] right-[10%] w-[35vw] h-[35vw] rounded-full bg-accent-blue/5 blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col items-start mb-16">
          <span className="text-xs font-bold text-accent-purple tracking-widest uppercase mb-4">
            Depoimentos
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-text-primary tracking-tight font-sans">
            O que dizem os nossos parceiros.
          </h2>
        </div>

        {/* Carousel Testimonial Container */}
        <div className="min-h-[280px] flex flex-col justify-center relative">
          
          {/* Quote mark icon background */}
          <div className="absolute -top-10 -left-6 opacity-5 pointer-events-none">
            <Quote className="w-24 h-24 text-white" />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={isMobile ? { opacity: 0 } : { opacity: 0, y: 15 }}
              animate={isMobile ? { opacity: 1 } : { opacity: 1, y: 0 }}
              exit={isMobile ? { opacity: 0 } : { opacity: 0, y: -15 }}
              transition={{ duration: 0.45 }}
              className="p-8 md:p-12 rounded-2xl glass-card border-white/5 bg-black/35 relative overflow-hidden"
            >
              {/* Teleprompter staggered text reveal */}
              <TeleprompterText text={testimonials[activeIndex].text} isMobile={isMobile} />

              {/* Author Details block */}
              <div className="flex items-center gap-4 mt-6 pt-6 border-t border-white/5">
                {/* Simulated clean avatar */}
                <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-xs font-bold text-white shadow-md">
                  {testimonials[activeIndex].name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-text-primary">
                    {testimonials[activeIndex].name}
                  </h4>
                  <p className="text-[11px] text-text-secondary mt-0.5">
                    {testimonials[activeIndex].role} na{' '}
                    <span className="text-accent-blue font-semibold">
                      {testimonials[activeIndex].company}
                    </span>
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel Navigation dots */}
        <div className="flex justify-center gap-3 mt-10">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 interactive-hover ${
                index === activeIndex 
                  ? 'bg-accent-blue w-6 shadow-[0_0_8px_rgba(59,130,246,0.5)]' 
                  : 'bg-white/10 hover:bg-white/30'
              }`}
              aria-label={`Ir para slide ${index + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
