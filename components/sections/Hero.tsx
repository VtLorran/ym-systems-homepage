'use client';

import { useState, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';
import { ArrowRight, Code } from 'lucide-react';
import HeroParticles from '../ui/HeroParticles';

interface HeroProps {
  heroMediaVariant?: 'background' | 'sideShowcase';
  videoUrl?: string;
  posterUrl?: string;
}

export default function Hero({
  heroMediaVariant = 'sideShowcase',
  videoUrl = '',
  posterUrl = '',
}: HeroProps) {
  const isVideoActive = !!videoUrl;

  // Custom motion variants for cinematic entry (Section 3)
  const containerFade: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
        staggerChildren: 0.1,
        delayChildren: 0.05
      }
    }
  };

  const itemFadeUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  };

  // clip-path curtain opening upwards (Section 3)
  const clipPathReveal: Variants = {
    hidden: { clipPath: 'inset(100% 0% 0% 0%)', opacity: 0.3, y: 60 },
    visible: {
      clipPath: 'inset(0% 0% 0% 0%)',
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.1,
        ease: [0.16, 1, 0.3, 1], // Cinematic cubic-bezier ease
        delay: 0.25
      }
    }
  };

  // Subtle indicator scroll down
  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden pt-28 pb-16 px-6 md:px-12 bg-bg-base">
      {/* Background elements */}
      <HeroParticles />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center relative z-20">
        
        {/* Left Side: Headline and Content */}
        <motion.div
          variants={containerFade}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-start text-left max-w-2xl"
        >
          {/* Tag badge */}
          <motion.div
            variants={itemFadeUp}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/10 text-xs font-semibold text-accent-blue tracking-wide uppercase mb-6"
          >
            <Code className="w-3.5 h-3.5" />
            <span>Sistemas Sob Medida & SaaS</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={itemFadeUp}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-text-primary leading-[1.08] mb-6 font-sans"
          >
            Criamos plataformas{' '}
            <span className="bg-clip-text text-transparent bg-gradient-primary">
              tecnológicas
            </span>{' '}
            de altíssimo impacto.
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemFadeUp}
            className="text-base sm:text-lg text-text-secondary leading-relaxed mb-8 max-w-lg font-medium"
          >
            Desenvolvimento de sistemas robustos, SaaS escaláveis e aplicações web premium.
            Código limpo, arquitetura sólida e design que converte.
          </motion.p>

          {/* Call to action buttons */}
          <motion.div
            variants={itemFadeUp}
            className="flex flex-wrap gap-4 w-full sm:w-auto"
          >
            <a
              href="#contato"
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-7 py-3.5 rounded-full text-sm font-semibold text-white bg-gradient-primary hover:shadow-[0_0_25px_rgba(139,92,246,0.4)] transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Solicitar orçamento</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="#processo"
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-7 py-3.5 rounded-full text-sm font-semibold text-text-primary bg-white/[0.03] border border-white/10 hover:bg-white/[0.07] hover:border-white/20 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Como trabalhamos</span>
            </a>
          </motion.div>
        </motion.div>

        {/* Right Side: Media Showcase (clip-path reveal entrance animation) */}
        <motion.div
          variants={clipPathReveal}
          initial="hidden"
          animate="visible"
          className="w-full flex items-center justify-center relative"
        >
          {isVideoActive && heroMediaVariant === 'sideShowcase' ? (
            <div className="w-full max-w-[580px] aspect-video rounded-2xl overflow-hidden glass-card p-1 bg-white/[0.01] border-white/10 relative group">
              <video
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className="w-full h-full object-cover rounded-xl"
                poster={posterUrl}
              >
                <source src={videoUrl} type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-bg-base/30 to-transparent pointer-events-none" />
            </div>
          ) : (
            <div className="w-full relative flex justify-center">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] rounded-full bg-accent-blue/10 blur-[60px] pointer-events-none" />
              
              <div className="relative z-10 flex flex-col items-center justify-center font-sans font-black text-5xl sm:text-7xl md:text-8xl tracking-tight select-none">
                <span className="text-white bg-clip-text text-transparent from-white to-gray-400">Y&M</span>
                <span className="text-accent-blue ml-3 sm:ml-4 ">Systems</span>
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Subtle indicator scroll down */}
      <div className="hero-scroll-indicator absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-text-muted text-[10px] uppercase tracking-widest pointer-events-none z-30">
        <span>Scroll down</span>
        <div className="w-1.5 h-6 rounded-full bg-white/10 p-0.5 flex items-start justify-center">
          <motion.div
            className="w-1 h-1.5 rounded-full bg-accent-blue"
            animate={{
              y: [0, 10, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </div>
      </div>

      {/* Ticker tape curtain at the bottom of the hero */}
      <div className="hero-ticker-curtain absolute bottom-0 left-0 w-full z-30 py-4 border-y border-white/5 bg-bg-base/90 backdrop-blur-md overflow-hidden transform">
        <div className="flex whitespace-nowrap animate-marquee">
          <div className="flex gap-12 text-[10px] md:text-xs font-mono font-bold tracking-widest text-text-secondary uppercase select-none">
            <span>Next.js</span> <span className="text-accent-blue">•</span>
            <span>Node.js</span> <span className="text-accent-purple">•</span>
            <span>TypeScript</span> <span className="text-accent-blue">•</span>
            <span>NestJS</span> <span className="text-accent-purple">•</span>
            <span>Docker</span> <span className="text-accent-blue">•</span>
            <span>AWS Cloud</span> <span className="text-accent-purple">•</span>
            <span>PostgreSQL</span> <span className="text-accent-blue">•</span>
            <span>GraphQL</span> <span className="text-accent-purple">•</span>
            <span>SaaS Platforms</span> <span className="text-accent-blue">•</span>
            <span>Clean Architecture</span> <span className="text-accent-purple">•</span>
            
            <span>Next.js</span> <span className="text-accent-blue">•</span>
            <span>Node.js</span> <span className="text-accent-purple">•</span>
            <span>TypeScript</span> <span className="text-accent-blue">•</span>
            <span>NestJS</span> <span className="text-accent-purple">•</span>
            <span>Docker</span> <span className="text-accent-blue">•</span>
            <span>AWS Cloud</span> <span className="text-accent-purple">•</span>
            <span>PostgreSQL</span> <span className="text-accent-blue">•</span>
            <span>GraphQL</span> <span className="text-accent-purple">•</span>
            <span>SaaS Platforms</span> <span className="text-accent-blue">•</span>
            <span>Clean Architecture</span> <span className="text-accent-purple">•</span>
          </div>
        </div>
      </div>
    </section>
  );
}
