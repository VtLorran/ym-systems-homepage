'use client';

import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import LenisProvider from '../components/ui/LenisProvider';
import CustomCursor from '../components/ui/CustomCursor';
import BackgroundEffects from '../components/ui/BackgroundEffects';
import Navbar from '../components/sections/Navbar';
import Hero from '../components/sections/Hero';
import Sobre from '../components/sections/Sobre';
import Stats from '../components/sections/Stats';
import Servicos from '../components/sections/Servicos';
import Processo from '../components/sections/Processo';
import Portfolio from '../components/sections/Portfolio';
import Tecnologias from '../components/sections/Tecnologias';
import Diferenciais from '../components/sections/Diferenciais';
import Depoimentos from '../components/sections/Depoimentos';
import FAQ from '../components/sections/FAQ';
import Contato from '../components/sections/Contato';
import Footer from '../components/sections/Footer';

export default function Home() {
  const [introFinished, setIntroFinished] = useState(false);

  useEffect(() => {
    // Register GSAP ScrollTrigger plugin on client mount
    gsap.registerPlugin(ScrollTrigger);

    // Initial position setups for animated layers to prevent layout shifts & Tailwind conflicts
    gsap.set('.hero-ticker-curtain', { yPercent: 100 });
    gsap.set('.billboard-swipe-bg', { yPercent: 100, opacity: 0 });
    gsap.set('.poster-swipe-bg', { yPercent: 100, opacity: 0 });

    // 1. Intro Reveal (Scene 1)
    const introTl = gsap.timeline({
      onComplete: () => {
        setIntroFinished(true);
      }
    });

    introTl.to('.preloader-logo', {
      clipPath: 'inset(0% 0% 0% 0%)',
      duration: 1.0,
      delay: 0.3,
      ease: 'power4.out',
    })
    .to('.preloader-overlay', {
      yPercent: -100,
      duration: 0.9,
      ease: 'power3.inOut',
    }, '+=0.2');

    // 2. Hero Scene Pin & Zoom Timeline (Scene 2, 3, 4)
    // Reduced height (180vh) and end coordinate (+=80%) to avoid dead scroll (Bug 3)
    const heroTl = gsap.timeline({
      scrollTrigger: {
        trigger: '.hero-scene',
        start: 'top top',
        end: '+=80%',
        pin: '.hero-pin',
        scrub: 1.2,
      }
    });

    heroTl.to('.hero-ticker-curtain', {
      yPercent: 0, // Slides up to bottom of viewport
      ease: 'power3.inOut',
    }, 0.15)
    .to('.hero-scroll-indicator', {
      opacity: 0,
      y: -20,
      ease: 'power2.out',
    }, 0)
    .to('.hero-scene .max-w-7xl', {
      scale: 0.94,
      opacity: 0.1,
      y: -60,
      ease: 'power2.out',
    }, 0.4);

    // 3. Sobre Scene Pin & Stagger Entrance (Scene 4)
    // Removed Stats from the pin container to fix overlapping (Bug 1) and dead scroll (Bug 3)
    const sobreTl = gsap.timeline({
      scrollTrigger: {
        trigger: '.sobre-scene',
        start: 'top top',
        end: '+=80%',
        pin: '.sobre-pin',
        scrub: 1.2,
      }
    });

    sobreTl.fromTo('.sobre-left', {
      xPercent: -30,
      opacity: 0,
    }, {
      xPercent: 0,
      opacity: 1,
      ease: 'power3.out',
    }, 0)
    .fromTo('.sobre-right', {
      xPercent: 30,
      opacity: 0,
    }, {
      xPercent: 0,
      opacity: 1,
      ease: 'power3.out',
    }, 0)
    .fromTo('.sobre-point', {
      y: 35,
      opacity: 0,
    }, {
      y: 0,
      opacity: 1,
      stagger: 0.08,
      ease: 'back.out(1.2)',
    }, 0.25)
    .fromTo('.pipeline-node', {
      y: 25,
      opacity: 0,
    }, {
      y: 0,
      opacity: 1,
      stagger: 0.08,
      ease: 'power3.out',
    }, 0.35);

    // 4. Billboard Swipe Scene (Scene 5)
    // White swipe color curtain animation (Request 2)
    const billboardTl = gsap.timeline({
      scrollTrigger: {
        trigger: '.billboard-scene',
        start: 'top top',
        end: '+=50%',
        pin: '.billboard-pin',
        scrub: 1.2,
      }
    });

    billboardTl.fromTo('.billboard-swipe-bg', {
      yPercent: 100,
      opacity: 1,
    }, {
      yPercent: 0,
      duration: 0.5,
      ease: 'power3.inOut',
    }, 0)
    .to('.billboard-title', {
      color: '#05060A',
      scale: 1.15,
      duration: 0.4,
      ease: 'power2.out',
    }, 0.2)
    .to('.billboard-tag', {
      color: '#2563EB',
      duration: 0.4,
      ease: 'power2.out',
    }, 0.2);

    // 5. Services Card Non-Scrubbed Staggered Entrance (Bug 4)
    gsap.fromTo('.services-card-wrap', {
      y: 45,
      opacity: 0,
    }, {
      y: 0,
      opacity: 1,
      stagger: 0.08,
      duration: 0.6,
      ease: 'back.out(1.2)',
      scrollTrigger: {
        trigger: '.services-scene',
        start: 'top 70%',
        toggleActions: 'play none none none',
      }
    });

    // 6. Poster Reveal Scene (Scene 8)
    const posterTl = gsap.timeline({
      scrollTrigger: {
        trigger: '.poster-scene',
        start: 'top top',
        end: '+=160%',
        pin: '.poster-pin',
        scrub: 1.2,
        anticipatePin: 1,
      }
    });

    // ESTÁGIO 1 — Entrada: deslizar o fundo branco de baixo para cima
    posterTl.fromTo('.poster-swipe-bg', {
      yPercent: 100,
      opacity: 1,
    }, {
      yPercent: 0,
      duration: 0.35,
      ease: 'power3.inOut',
    })
    // ESTÁGIO 2 — Entrada do conteúdo (entra depois que o fundo estiver cobrindo a tela)
    .to('.poster-circle-bg', {
      opacity: 0.08,
      duration: 0.3,
      ease: 'power2.out',
    }, 0.35)
    .to('.poster-glow-bg', {
      opacity: 1,
      duration: 0.3,
      ease: 'power2.out',
    }, 0.35)
    .fromTo('.poster-content > *', {
      y: 24,
      opacity: 0,
    }, {
      y: 0,
      opacity: 1,
      stagger: 0.08,
      duration: 0.35,
      ease: 'power3.out',
    }, 0.35)
    // ESTÁGIO 3 — Pausa para leitura do poster
    .to({}, { duration: 0.4 })
    // ESTÁGIO 4 — Saída: conteúdo sobe esmaecendo e cortina branca sai pelo topo
    .to('.poster-content > *:not(.poster-button)', {
      y: -30,
      opacity: 0,
      stagger: 0.04,
      duration: 0.3,
      ease: 'power2.in',
    }, 1.1)
    .to('.poster-button', {
      y: -30,
      opacity: 0,
      duration: 0.3,
      ease: 'power2.in',
    }, 0.95)
    .to('.poster-circle-bg', {
      opacity: 0,
      duration: 0.3,
      ease: 'power2.in',
    }, 1.1)
    .to('.poster-glow-bg', {
      opacity: 0,
      duration: 0.3,
      ease: 'power2.in',
    }, 1.1)
    .to('.poster-swipe-bg', {
      yPercent: -100,
      opacity: 0,
      duration: 0.3,
      ease: 'power3.inOut',
    }, 1.3)
    // Pequeno espaço final para transição suave
    .to({}, { duration: 0.15 });

    // Refresh ScrollTrigger on window load to prevent incorrect offsets due to late layout shifts
    const handleLoad = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener('load', handleLoad);

    // Refresh after a small delay in case of late hydration shifts
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 1500);

    // Cleanup triggers on component unmount
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
      window.removeEventListener('load', handleLoad);
      clearTimeout(timer);
    };
  }, []);

  return (
    <LenisProvider>
      {/* 1. Preloader Overlay Intro Curtain (Scene 1) */}
      {!introFinished && (
        <div className="preloader-overlay fixed inset-0 bg-[#05060A] z-[9999] flex items-center justify-center select-none overflow-hidden">
          <div className="relative text-center px-6">
            <h1 
              className="preloader-logo text-4xl sm:text-6xl font-black tracking-widest text-[#F5F6FA] uppercase font-sans select-none"
              style={{ clipPath: 'inset(0 100% 0 0)' }}
            >
              Y&M SYSTEMS
            </h1>
            <p className="text-[9px] font-mono text-accent-blue tracking-[0.25em] uppercase mt-3 opacity-60">
              Technology • Excellence • Impact
            </p>
          </div>
        </div>
      )}

      {/* Visual background layers */}
      <BackgroundEffects />
      
      {/* Interactive custom pointer */}
      <CustomCursor />

      {/* Global shrinking navigation bar */}
      <Navbar />

      {/* Main landing sections structured as cinematic scenes */}
      <main className="flex-1 flex flex-col">
        
        {/* Cena 2, 3, 4: Hero, Ticker Tape and background zoom */}
        <section className="scene hero-scene" style={{ height: '180vh' }}>
          <div className="scene__pin hero-pin">
            <Hero heroMediaVariant="sideShowcase" />
          </div>
        </section>

        {/* Cena 4 (continuation): Pinned About panel (Bug 1 & Bug 3) */}
        <section className="scene sobre-scene" style={{ height: '180vh' }}>
          <div className="scene__pin sobre-pin flex flex-col justify-center bg-[#05060A]/85 backdrop-blur-xl">
            <div className="sobre-container">
              <Sobre />
            </div>
          </div>
        </section>

        {/* Stats Section (Bug 1 & Bug 3) — Unpinned, normal flow section right below About */}
        <Stats />

        {/* Cena 5: Full-bleed billboard curtain swipe (Bug 2) */}
        <section className="scene billboard-scene" style={{ height: '150vh' }}>
          <div className="scene__pin billboard-pin flex items-center justify-center bg-transparent relative overflow-hidden">
            {/* Dark background layer */}
            <div className="absolute inset-0 bg-[#05060A] z-0" />
            
            {/* White curtain slider (Request 2) */}
            <div className="billboard-swipe-bg absolute inset-0 bg-[#F5F6FA] z-10" />
            
            <div className="relative z-20 text-center px-6">
              <span className="billboard-tag text-xs font-bold text-accent-purple tracking-widest uppercase block mb-4">
                Nossa Filosofia
              </span>
              <h2 className="billboard-title text-4xl sm:text-7xl font-black tracking-tighter text-[#F5F6FA] uppercase leading-none font-sans select-none will-change-transform">
                ENGENHARIA DE ELITE
              </h2>
            </div>
          </div>
        </section>

        {/* Cena 6: Services Grid (Bug 4) — Unpinned, normal flow section for better reading experience */}
        <Servicos />

        {/* GSAP Scroll-linked timeline progress (Bug 5) */}
        <Processo />

        {/* Portfolio carousel detailing products (Cena 7) */}
        <Portfolio />

        {/* 3D mouse Parallax tech badges (Bug 6) */}
        <Tecnologias />

        {/* Differentials interactive cards */}
        <Diferenciais />

        {/* Staggered teleprompter testimonies */}
        <Depoimentos />

        {/* Accordions questions */}
        <FAQ />

        {/* Cena 8: Symmetrical Final Poster Reveal (Bug 3) */}
        <section className="scene poster-scene bg-[#05060A]" style={{ height: '180vh' }}>
          <div className="w-full h-screen overflow-hidden poster-pin flex flex-col items-center justify-center bg-transparent relative text-center">
            {/* Dark background layer */}
            <div className="absolute inset-0 bg-[#05060A] z-0" />

            {/* White curtain slider */}
            <div className="poster-swipe-bg absolute inset-0 bg-white pointer-events-none z-10" />

            <div className="poster-circle-bg absolute w-[600px] h-[600px] border border-dashed border-black/5 rounded-full animate-spin-slow pointer-events-none z-20 opacity-0" />
            
            <div className="poster-glow-bg absolute w-[50vw] h-[50vw] rounded-full bg-accent-blue/10 blur-[120px] pointer-events-none z-20 opacity-0" />

            <div className="poster-content relative z-30 max-w-3xl px-6 flex flex-col items-center select-none">
              <span className="text-xs font-bold text-accent-purple tracking-widest uppercase mb-4 opacity-0 block">
                Y&M SYSTEMS
              </span>
              <h2 className="text-4xl sm:text-7xl font-black tracking-tight text-[#05060A] uppercase leading-none font-sans mb-8 opacity-0">
                INNOVATION<br />FOR THE FUTURE
              </h2>
              <p className="text-sm sm:text-base text-gray-600 max-w-md mb-8 leading-relaxed font-medium opacity-0">
                Arquitetura sólida, segurança certificada e interfaces premium de alto impacto comercial.
              </p>
              <a
                href="#contato"
                className="poster-button px-8 py-3.5 rounded-full text-xs font-mono font-bold tracking-widest text-white bg-gradient-primary hover:shadow-[0_0_25px_rgba(139,92,246,0.4)] transition-all duration-200 transform hover:scale-[1.05] opacity-0 inline-block"
              >
                INICIAR PROJETO
              </a>
            </div>
          </div>
        </section>
       
        {/* Contact request form section */}
        <Contato />
      </main>

      {/* Brand footer and details */}
      <Footer />
    </LenisProvider>
  );
}
