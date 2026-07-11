'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, ChevronRight, Cpu, Layers, ShieldCheck, Zap } from 'lucide-react';
import { easeCustom, fadeInSide, staggerContainer } from '../../lib/motion';

export default function Sobre() {
  const points = [
    {
      title: 'Arquiteturas Escaláveis',
      desc: 'Sistemas estruturados em microsserviços ou monolitos modulares de alta performance.',
      icon: Layers,
    },
    {
      title: 'Segurança por Padrão',
      desc: 'Criptografia de ponta a ponta, auditorias de segurança e conformidade com a LGPD.',
      icon: ShieldCheck,
    },
    {
      title: 'Automação & Processo',
      desc: 'Integramos rotinas automatizadas para otimizar fluxos operacionais internos.',
      icon: Zap,
    },
  ];

  return (
    <section id="sobre" className="relative py-24 md:py-32 bg-bg-elevated/40 border-y border-white/5 overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-[20%] left-[-10%] w-[35vw] h-[35vw] rounded-full bg-accent-purple/5 blur-[90px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column: Text (Sliding entrance from Left) */}
          <div className="flex flex-col sobre-left">
            <span className="text-xs font-bold text-accent-purple tracking-widest uppercase mb-4">
              Quem Somos
            </span>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-text-primary tracking-tight mb-6 font-sans">
              Excelência técnica focada em entregar performance comercial.
            </h2>

            <p className="text-text-secondary leading-relaxed mb-8 max-w-lg">
              A Y&M Systems é especializada em transformar desafios complexos em produtos digitais intuitivos e sistemas de alta performance. Não fazemos apenas sites — projetamos soluções digitais de alto nível técnico para acelerar sua empresa.
            </p>

            {/* List of technical characteristics */}
            <div className="flex flex-col gap-6">
              {points.map((point, index) => (
                <div
                  key={index}
                  className="sobre-point flex gap-4 p-4 rounded-xl bg-white/[0.01] border border-white/5 hover:border-white/10 hover:bg-white/[0.02] transition-all duration-300"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-primary/10 border border-accent-purple/20 flex items-center justify-center text-accent-purple">
                    <point.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-text-primary mb-1">{point.title}</h3>
                    <p className="text-xs text-text-secondary leading-relaxed">{point.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Deploy Pipeline Mockup (Anchor element, sliding from Right) */}
          <div className="w-full relative sobre-right">
            {/* Visual glow backdrop */}
            <div className="absolute inset-0 bg-gradient-to-tr from-accent-purple/10 to-accent-blue/10 rounded-2xl filter blur-[40px] opacity-70 pointer-events-none" />

            {/* Pipeline Glass Panel */}
            <div className="w-full max-w-[540px] mx-auto glass-card p-6 border-white/10 relative overflow-hidden bg-black/45">
              
              {/* macOS Style Controls */}
              <div className="flex justify-between items-center mb-6 border-b border-white/5 pb-4">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                  <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                  <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                </div>
                <div className="text-[10px] font-mono text-text-muted">pipeline-runner.yaml</div>
                <div className="w-4 h-4 rounded bg-white/5 flex items-center justify-center text-text-secondary cursor-pointer hover:bg-white/10 transition-colors">
                  <Cpu className="w-2.5 h-2.5 text-accent-blue" />
                </div>
              </div>

              {/* Pipeline Nodes Stack */}
              <div className="flex flex-col gap-4">
                {[
                  { step: '01', name: 'Análise de Arquitetura', status: 'concluído', color: 'text-green-400 border-green-500/30 bg-green-500/5' },
                  { step: '02', name: 'Auditoria de Segurança (SAST)', status: 'concluído', color: 'text-green-400 border-green-500/30 bg-green-500/5' },
                  { step: '03', name: 'Compilação de Assets (Next.js)', status: 'construindo', color: 'text-accent-blue border-accent-blue/30 bg-accent-blue/5 animate-pulse' },
                  { step: '04', name: 'Distribuição na Edge (Vercel CDN)', status: 'pendente', color: 'text-text-muted border-white/5 bg-transparent' },
                ].map((node, i) => (
                  <div
                    key={i}
                    className={`pipeline-node flex items-center justify-between p-3.5 rounded-xl border transition-all duration-500 ${
                      node.status === 'construindo' ? 'bg-white/[0.03] border-white/10 shadow-[0_0_15px_rgba(59,130,246,0.1)]' : 'bg-black/20 border-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <span className="text-xs font-mono text-text-muted">{node.step}</span>
                      <span className="text-xs font-bold text-text-primary">{node.name}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full border ${node.color}`}>
                        {node.status}
                      </span>
                      {node.status === 'concluído' && (
                        <CheckCircle2 className="w-4 h-4 text-green-400" />
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Floating micro stats panel inside this container */}
              <div className="mt-6 p-3 bg-black/40 rounded-xl border border-white/5 flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-[9px] text-text-muted uppercase">Tempo de build</span>
                  <span className="text-xs font-bold font-mono text-text-primary">1m 48s</span>
                </div>
                <div className="h-6 w-[1px] bg-white/10" />
                <div className="flex flex-col">
                  <span className="text-[9px] text-text-muted uppercase">Test Coverage</span>
                  <span className="text-xs font-bold font-mono text-green-400">98.4%</span>
                </div>
                <div className="h-6 w-[1px] bg-white/10" />
                <div className="flex flex-col">
                  <span className="text-[9px] text-text-muted uppercase">Páginas SSG</span>
                  <span className="text-xs font-bold font-mono text-accent-purple">124 estáticas</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
