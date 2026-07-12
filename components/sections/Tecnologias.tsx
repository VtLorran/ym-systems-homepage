'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Database, Flame, Layers, Server, Terminal, Triangle, Wind } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface TechItem {
  name: string;
  layer: 1 | 2 | 3;
  col: number;
  row: number;
  icon: React.ComponentType<any>;
  glowColor: string;
}

export default function Tecnologias() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  // Mouse coordinate values for hover parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth out coordinate tracking
  const springConfig = { damping: 40, stiffness: 200, mass: 1 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Transforms for mouse hover Parallax depth layers
  const l1X = useTransform(smoothX, [-400, 400], [-8, 8]);
  const l1Y = useTransform(smoothY, [-400, 400], [-8, 8]);

  const l2X = useTransform(smoothX, [-400, 400], [-20, 20]);
  const l2Y = useTransform(smoothY, [-400, 400], [-20, 20]);

  const l3X = useTransform(smoothX, [-400, 400], [-35, 35]);
  const l3Y = useTransform(smoothY, [-400, 400], [-35, 35]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    gsap.registerPlugin(ScrollTrigger);

    // Scroll-linked parallax translations at different speeds (Bug 6)
    const p1 = gsap.to('.tech-layer-1', {
      yPercent: -12,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      }
    });

    const p2 = gsap.to('.tech-layer-2', {
      yPercent: -24,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      }
    });

    const p3 = gsap.to('.tech-layer-3', {
      yPercent: -40,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      }
    });

    return () => {
      p1.scrollTrigger?.kill();
      p1.kill();
      p2.scrollTrigger?.kill();
      p2.kill();
      p3.scrollTrigger?.kill();
      p3.kill();
    };
  }, [mounted]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const x = e.clientX - rect.left - width / 2;
    const y = e.clientY - rect.top - height / 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!containerRef.current || e.touches.length === 0) return;
    const rect = containerRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    const width = rect.width;
    const height = rect.height;
    const x = touch.clientX - rect.left - width / 2;
    const y = touch.clientY - rect.top - height / 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleTouchEnd = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Technologies aligned on a 12 columns x 4 rows grid (Bug 6)
  const technologies: TechItem[] = [
    // Layer 1 - Deep Background
    { name: 'PostgreSQL', layer: 1, col: 2, row: 0, icon: Database, glowColor: 'rgba(59,130,246,0.1)' },
    { name: 'MongoDB', layer: 1, col: 3, row: 3, icon: Database, glowColor: 'rgba(34,197,94,0.1)' },
    { name: 'Docker', layer: 1, col: 9, row: 0, icon: Layers, glowColor: 'rgba(59,130,246,0.1)' },
    { name: 'Kubernetes', layer: 1, col: 8, row: 3, icon: Server, glowColor: 'rgba(59,130,246,0.1)' },

    // Layer 2 - Midground
    { name: 'React', layer: 2, col: 1, row: 2, icon: Layers, glowColor: 'rgba(59,130,246,0.15)' },
    { name: 'Node.js', layer: 2, col: 5, row: 0, icon: Terminal, glowColor: 'rgba(34,197,94,0.15)' },
    { name: 'AWS', layer: 2, col: 10, row: 2, icon: Server, glowColor: 'rgba(249,115,22,0.15)' },
    { name: 'Java / Spring', layer: 2, col: 6, row: 3, icon: Flame, glowColor: 'rgba(239,68,68,0.15)' },

    // Layer 3 - Foreground
    { name: 'Next.js', layer: 3, col: 3, row: 1, icon: Triangle, glowColor: 'rgba(255,255,255,0.2)' },
    { name: 'NestJS', layer: 3, col: 8, row: 2, icon: Terminal, glowColor: 'rgba(239,68,68,0.2)' },
    { name: 'Redis', layer: 3, col: 8, row: 0, icon: Database, glowColor: 'rgba(239,68,68,0.2)' },
    { name: 'Flutter', layer: 3, col: 5, row: 2, icon: Wind, glowColor: 'rgba(59,130,246,0.2)' },
  ];

  if (!mounted) return null;

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="relative py-24 md:py-32 bg-bg-base border-t border-white/5 overflow-hidden"
    >
      {/* Background spotlights */}
      <div className="absolute top-[40%] left-[20%] w-[30vw] h-[30vw] rounded-full bg-accent-blue/5 blur-[90px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[20%] w-[35vw] h-[35vw] rounded-full bg-accent-purple/5 blur-[90px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 pointer-events-none">
        
        {/* Title overlay */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-28">
          <span className="text-xs font-bold text-accent-purple tracking-widest uppercase mb-4 pointer-events-auto">
            Nossa Stack
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-text-primary tracking-tight mb-6 font-sans pointer-events-auto">
            Tecnologias de vanguarda.
          </h2>
          <p className="text-sm sm:text-base text-text-secondary leading-relaxed pointer-events-auto font-medium">
            Desenvolvemos usando ferramentas modernas, otimizadas para performance, segurança de dados e alta escalabilidade.
          </p>
        </div>

        {/* Desktop Layout: Height container for floating badges workspace with 3D Parallax */}
        <div className="hidden md:block relative w-full h-[580px] overflow-hidden rounded-3xl border border-white/5 bg-black/10 select-none">
          {/* Inner Grid Layer */}
          <div className="absolute inset-0 bg-grid-fade opacity-30 infinite-grid pointer-events-none" />

          {/* Floating Badges */}
          {technologies.map((tech, index) => {
            let styleX = l1X;
            let styleY = l1Y;
            let zIndex = 'z-10';
            let opacity = 'opacity-40 scale-[0.88]';

            if (tech.layer === 2) {
              styleX = l2X;
              styleY = l2Y;
              zIndex = 'z-20';
              opacity = 'opacity-85 scale-[0.96]';
            } else if (tech.layer === 3) {
              styleX = l3X;
              styleY = l3Y;
              zIndex = 'z-35';
              opacity = 'opacity-100 scale-100';
            }

            // Calculate deterministic offset: max offset +/-9px (Bug 6)
            const offsetX = ((index * 7) % 19) - 9;
            const offsetY = ((index * 13) % 19) - 9;

            // Responsive grid positioning (percentage maps to col/row coords) (Bug 6)
            const leftPct = (tech.col / 11) * 80 + 10;
            const topPct = (tech.row / 3) * 66 + 17;

            // Hide background layer 1 elements on mobile to prevent clutter and collision (Bug 6)
            const displayClass = tech.layer === 1 ? 'hidden md:flex' : 'flex';

            return (
              <div
                key={index}
                className={`absolute tech-layer-${tech.layer} ${zIndex} ${displayClass} pointer-events-none`}
                style={{
                  left: `calc(${leftPct}% + ${offsetX}px)`,
                  top: `calc(${topPct}% + ${offsetY}px)`,
                }}
              >
                <motion.div
                  className={opacity}
                  style={{
                    x: styleX,
                    y: styleY,
                  }}
                >
                  <div 
                    className="flex items-center gap-2.5 px-4.5 py-2.5 rounded-xl border border-white/5 bg-[#05060A]/85 backdrop-blur-md hover:border-white/15 hover:bg-white/[0.04] transition-all duration-300 shadow-xl group cursor-pointer pointer-events-auto"
                    style={{
                      boxShadow: `0 8px 30px ${tech.glowColor}`
                    }}
                  >
                    <div className="w-6 h-6 rounded-md bg-white/5 flex items-center justify-center text-text-secondary group-hover:text-accent-blue transition-colors">
                      <tech.icon className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs font-semibold font-sans tracking-tight text-text-primary">
                      {tech.name}
                    </span>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>

        {/* Mobile & Tablet Layout: Clean responsive grid list */}
        <div className="block md:hidden max-w-lg mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {technologies.map((tech, index) => (
              <div 
                key={index} 
                className="flex items-center gap-2.5 px-4 py-3 rounded-xl border border-white/5 bg-[#05060A]/80 backdrop-blur-sm shadow-md"
                style={{
                  boxShadow: `0 4px 15px ${tech.glowColor}`
                }}
              >
                <div className="w-6 h-6 rounded-md bg-white/5 flex items-center justify-center text-text-secondary">
                  <tech.icon className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-semibold font-sans text-text-primary">
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
