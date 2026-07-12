'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CloudLightning, Code, Compass, Eye, HeartHandshake, Palette } from 'lucide-react';

export default function Processo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Register ScrollTrigger plugin in browser environment
    gsap.registerPlugin(ScrollTrigger);

    const isMobile = window.matchMedia('(max-width: 1024px)').matches;

    if (isMobile) {
      // Mobile-optimized animations: simple entrance fade-in only, no movement/translations, no scroll-linked timeline
      const stepElements = gsap.utils.toArray('.process-step');
      const stepAnims = stepElements.map((step: any) => {
        return gsap.fromTo(step,
          { opacity: 0.15 },
          {
            opacity: 1,
            duration: 0.5,
            ease: 'power1.out',
            scrollTrigger: {
              trigger: step,
              start: 'top 90%',
              toggleActions: 'play none none none',
            }
          }
        );
      });

      return () => {
        stepAnims.forEach((anim: any) => anim.scrollTrigger?.kill());
      };
    } else {
      // Animate the vertical line scaleY from 0 to 1 based on scroll (Desktop only)
      const lineAnim = gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 40%',
            end: 'bottom 60%',
            scrub: 1,
          },
        }
      );

      // Animate the steps' entrance and illumination (highlight active, fade out inactive) (Desktop only)
      const stepElements = gsap.utils.toArray('.process-step');
      const stepAnims = stepElements.map((step: any) => {
        return gsap.timeline({
          scrollTrigger: {
            trigger: step,
            start: 'top 85%',
            end: 'bottom 15%',
            scrub: 0.5,
          }
        })
        .fromTo(step, 
          { opacity: 0.15, y: 40, scale: 0.98 }, 
          { opacity: 1, y: 0, scale: 1, duration: 0.3 }
        )
        .to(step, 
          { opacity: 0.15, y: -45, scale: 0.98, duration: 0.3 }, 
          '+=0.4'
        );
      });

      return () => {
        // Clean up GSAP instances
        lineAnim.scrollTrigger?.kill();
        stepAnims.forEach((tl: any) => tl.scrollTrigger?.kill());
      };
    }
  }, []);

  const steps = [
    {
      step: '01',
      title: 'Planejamento & Escopo',
      desc: 'Mapeamento detalhado dos fluxos, definição de regras de negócio, escolha da arquitetura técnica e alinhamento de entregáveis.',
      icon: Compass,
      color: 'from-accent-blue to-accent-blue-2',
      glow: 'shadow-accent-blue/10',
    },
    {
      step: '02',
      title: 'UX/UI Design de Interface',
      desc: 'Criação de protótipos interativos de alta fidelidade no Figma, estruturando fluxos fluidos, densos em microinterações.',
      icon: Palette,
      color: 'from-accent-purple to-accent-purple-2',
      glow: 'shadow-accent-purple/10',
    },
    {
      step: '03',
      title: 'Desenvolvimento e Código',
      desc: 'Implementação de front-ends ultra rápidos em Next.js e back-ends escaláveis em nuvem, seguindo padrões Clean Architecture.',
      icon: Code,
      color: 'from-accent-blue to-accent-purple',
      glow: 'shadow-accent-purple/10',
    },
    {
      step: '04',
      title: 'Testes de Integridade (Q&A)',
      desc: 'Testes de estresse, unitários e de integração automática. Revisão geral de acessibilidade, SEO e auditoria de vulnerabilidades.',
      icon: Eye,
      color: 'from-accent-blue-2 to-accent-blue',
      glow: 'shadow-accent-blue/10',
    },
    {
      step: '05',
      title: 'Deploy e Distribuição Edge',
      desc: 'Lançamento na Vercel CDN com setups robustos de CI/CD. Otimização final de latência e conexões com bancos de dados.',
      icon: CloudLightning,
      color: 'from-accent-purple-2 to-accent-blue',
      glow: 'shadow-accent-blue/10',
    },
    {
      step: '06',
      title: 'Suporte & Evolução',
      desc: 'Monitoramento real-time de erros e tráfego, manutenções evolutivas, otimizações contínuas de custos de infraestrutura.',
      icon: HeartHandshake,
      color: 'from-accent-purple to-accent-purple-2',
      glow: 'shadow-accent-purple/10',
    },
  ];

  return (
    <section id="processo" className="relative py-24 md:py-32 bg-bg-base overflow-hidden">
      {/* Background aurora */}
      <div className="absolute top-[30%] right-[-15%] w-[40vw] h-[40vw] rounded-full bg-accent-blue/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-24">
          <span className="text-xs font-bold text-accent-purple tracking-widest uppercase mb-4">
            Como trabalhamos
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-text-primary tracking-tight mb-6 font-sans">
            Nossa linha de produção tecnológica.
          </h2>
          <p className="text-base text-text-secondary leading-relaxed">
            Processo ágil e transparente estruturado do planejamento ao suporte contínuo para garantir estabilidade e previsibilidade.
          </p>
        </div>

        {/* Timeline container */}
        <div ref={containerRef} className="relative max-w-4xl mx-auto">
          {/* Vertical base line path */}
          <div className="absolute left-[30px] md:left-1/2 top-4 bottom-4 w-[2px] bg-white/5 -translate-x-1/2 pointer-events-none z-0" />
          
          {/* Active scroll-progress colored line */}
          <div
            ref={lineRef}
            className="absolute left-[30px] md:left-1/2 top-4 bottom-4 w-[2px] bg-gradient-primary origin-top -translate-x-1/2 pointer-events-none z-10 shadow-[0_0_15px_rgba(139,92,246,0.3)]"
          />

          {/* Timeline Steps */}
          <div className="flex flex-col gap-12 md:gap-16">
            {steps.map((step, index) => {
              const isEven = index % 2 === 0;
              return (
                <div
                  key={index}
                  className={`process-step flex flex-col md:flex-row items-start relative z-20 ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Bullet Node */}
                  <div className="absolute left-[30px] md:left-1/2 top-6 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-bg-base border-2 border-white/10 flex items-center justify-center z-30 transition-colors duration-500 group-hover:border-accent-blue">
                    <div className="w-2.5 h-2.5 rounded-full bg-white/30" />
                  </div>

                  {/* Spacer Column for Desktop */}
                  <div className="hidden md:block w-1/2" />

                  {/* Content Column */}
                  <div className="w-full md:w-1/2 pl-16 md:pl-0 md:px-10">
                    <div className="p-6 rounded-2xl glass-card border-white/5 bg-black/45 hover:border-white/10 relative overflow-hidden group">
                      {/* Subtly glow top border */}
                      <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${step.color} opacity-30`} />

                      <div className="flex items-center justify-between mb-4">
                        {/* Step number badge */}
                        <span className="text-[10px] font-mono text-text-muted uppercase tracking-wider">
                          Fase {step.step}
                        </span>
                        
                        {/* Icon */}
                        <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${step.color} flex items-center justify-center text-white shadow-lg ${step.glow}`}>
                          <step.icon className="w-4.5 h-4.5" />
                        </div>
                      </div>

                      <h3 className="text-base font-bold text-text-primary mb-2">
                        {step.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-medium">
                        {step.desc}
                      </p>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
