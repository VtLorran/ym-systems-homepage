'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, ExternalLink, Globe, X } from 'lucide-react';
import { easeCustom, scaleUp } from '../../lib/motion';

interface Project {
  id: number;
  title: string;
  category: string;
  desc: string;
  longDesc: string;
  techs: string[];
  metrics: string;
  image: string;
  link: string;
}

interface ProjectCardProps {
  project: Project;
  direction: number;
  onSelect: (project: Project) => void;
}

const ProjectCard = ({ project, direction, onSelect }: ProjectCardProps) => {
  return (
    <motion.div
      custom={direction}
      variants={{
        enter: (dir: number) => ({
          opacity: 0,
          x: dir * 20,
          scale: 0.99,
        }),
        center: {
          opacity: 1,
          x: 0,
          scale: 1,
        },
        exit: (dir: number) => ({
          opacity: 0,
          x: -dir * 20,
          scale: 0.99,
        }),
      }}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.22, ease: "easeInOut" }}
      className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] gap-10 p-8 md:p-12 glass-card border-white/10 bg-black/45 hover:border-white/15"
    >
      {/* Left Column: Visual Mockup */}
      <div className="aspect-[4/3] rounded-xl bg-black/50 border border-white/5 flex flex-col p-4 md:p-6 relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-tr from-accent-blue/10 via-transparent to-accent-purple/10 pointer-events-none" />
        
        {/* Simulated Web View mockup */}
        <div className="w-full h-full rounded-lg border border-white/10 bg-[#05060A]/90 backdrop-blur flex flex-col overflow-hidden relative shadow-2xl">
          {/* Web header */}
          <div className="h-7 border-b border-white/5 bg-black/30 px-3 flex items-center gap-1.5 shrink-0">
            <div className="w-1.5 h-1.5 rounded-full bg-red-500/60" />
            <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/60" />
            <div className="w-1.5 h-1.5 rounded-full bg-green-500/60" />
            <div className="flex-1 text-[9px] font-mono text-text-muted text-center truncate">
              {project.title.toLowerCase().replace(' ', '')}.com
            </div>
          </div>
          
          {/* Web body */}
          <div className="flex-1 flex flex-col p-3 overflow-hidden relative">
            {project.id === 1 && (
              <div className="flex-1 flex flex-col gap-2">
                <div className="flex items-center justify-between border-b border-white/5 pb-1.5">
                  <span className="text-[8px] md:text-[9px] font-mono text-accent-blue font-bold tracking-tight">NEXUS_ANALYTICS // LIVE</span>
                  <span className="text-[7px] md:text-[8px] font-mono text-green-400">● ONLINE</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2 bg-white/[0.02] border border-white/5 rounded-lg">
                    <span className="text-[7px] md:text-[8px] text-text-secondary uppercase">Receita</span>
                    <div className="text-xs md:text-sm font-bold text-text-primary mt-0.5">$45,231</div>
                  </div>
                  <div className="p-2 bg-white/[0.02] border border-white/5 rounded-lg">
                    <span className="text-[7px] md:text-[8px] text-text-secondary uppercase">Uptime</span>
                    <div className="text-xs md:text-sm font-bold text-accent-blue mt-0.5">99.99%</div>
                  </div>
                </div>
                {/* SVG Mini Chart */}
                <div className="flex-grow bg-white/[0.01] border border-white/5 rounded-lg p-1.5 flex flex-col justify-end min-h-[50px] relative">
                  <div className="absolute top-1 left-2 text-[7px] text-text-muted font-mono">Real-time throughput</div>
                  <svg className="w-full h-full min-h-[30px] overflow-visible" viewBox="0 0 100 40">
                    <path
                      d="M0,40 Q15,20 30,30 T60,10 T90,25 T100,15 L100,40 L0,40 Z"
                      fill="rgba(59, 130, 246, 0.05)"
                    />
                    <path
                      d="M0,40 Q15,20 30,30 T60,10 T90,25 T100,15"
                      fill="none"
                      stroke="var(--accent-blue)"
                      strokeWidth="1.5"
                    />
                  </svg>
                </div>
              </div>
            )}
            
            {project.id === 2 && (
              <div className="flex-1 flex flex-col gap-2">
                <div className="flex items-center justify-between border-b border-white/5 pb-1.5">
                  <span className="text-[8px] md:text-[9px] font-mono text-accent-purple font-bold tracking-tight">ATHENA_CRM // PIPELINE</span>
                  <span className="text-[7px] md:text-[8px] font-mono text-accent-purple">● ACTIVE</span>
                </div>
                <div className="flex-grow flex flex-col justify-center gap-1.5">
                  <div className="flex items-center justify-between text-[8px] md:text-[9px] p-1.5 bg-accent-blue/10 border border-accent-blue/20 rounded-md">
                    <span className="font-semibold text-text-primary">1. Novos Leads</span>
                    <span className="font-mono text-accent-blue font-bold">142</span>
                  </div>
                  <div className="flex items-center justify-between text-[8px] md:text-[9px] p-1.5 bg-accent-purple/10 border border-accent-purple/20 rounded-md">
                    <span className="font-semibold text-text-primary">2. Em Negociação</span>
                    <span className="font-mono text-accent-purple font-bold">58</span>
                  </div>
                  <div className="flex items-center justify-between text-[8px] md:text-[9px] p-1.5 bg-green-500/10 border border-green-500/20 rounded-md">
                    <span className="font-semibold text-text-primary">3. Contrato Assinado</span>
                    <span className="font-mono text-green-400 font-bold">19</span>
                  </div>
                </div>
              </div>
            )}

            {project.id === 3 && (
              <div className="flex-1 flex flex-col gap-2">
                <div className="flex items-center justify-between border-b border-white/5 pb-1.5">
                  <span className="text-[8px] md:text-[9px] font-mono text-accent-blue font-bold tracking-tight">VORTEX_LOGISTICS // GPS</span>
                  <span className="text-[7px] md:text-[8px] font-mono text-green-400">● LIVE MAP</span>
                </div>
                <div className="flex-grow bg-white/[0.01] border border-white/5 rounded-lg p-2 flex flex-col justify-between relative overflow-hidden min-h-[60px]">
                  {/* Simulated map lines */}
                  <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <div className="absolute top-2 left-0 right-0 h-[1px] bg-white" />
                    <div className="absolute top-8 left-0 right-0 h-[1px] bg-white" />
                    <div className="absolute bottom-4 left-0 right-0 h-[1px] bg-white" />
                    <div className="absolute left-6 top-0 bottom-0 w-[1px] bg-white" />
                    <div className="absolute left-20 top-0 bottom-0 w-[1px] bg-white" />
                  </div>
                  {/* Tracking marker */}
                  <div className="relative z-10 flex items-center gap-1.5 bg-black/60 border border-white/10 p-1.5 rounded-md self-start max-w-[130px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-blue md:animate-ping shrink-0" />
                    <div className="flex flex-col">
                      <span className="text-[6px] text-text-secondary uppercase leading-none">Veículo TRK-09</span>
                      <span className="text-[7px] md:text-[8px] font-bold text-text-primary leading-tight mt-0.5">Em trânsito</span>
                    </div>
                  </div>
                  <div className="relative z-10 text-[7px] md:text-[8px] font-mono text-text-muted mt-auto leading-none">
                    GPS: -22.9068, -43.1729
                  </div>
                </div>
              </div>
            )}
            
            {/* Glowing effect inside mockup */}
            <div className="absolute bottom-[-10%] w-[50%] h-[30%] bg-accent-purple/10 rounded-full blur-[20px] pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Right Column: Info Panel */}
      <div className="flex flex-col justify-between">
        <div>
          <span className="text-[10px] font-mono text-accent-blue uppercase tracking-widest font-semibold px-2 py-0.5 rounded bg-accent-blue/10 border border-accent-blue/20 self-start inline-block">
            {project.category}
          </span>
          <h3 className="text-2xl font-bold text-text-primary mt-4 mb-3">
            {project.title}
          </h3>
          <p className="text-xs sm:text-sm text-text-secondary leading-relaxed mb-6 font-medium">
            {project.desc}
          </p>
          
          {/* Tech Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.techs.map((tech) => (
              <span key={tech} className="text-[10px] font-mono text-text-primary px-2.5 py-1 rounded-full bg-white/5 border border-white/5">
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-5 mt-auto pt-6 border-t border-white/5">
          <button
            onClick={() => onSelect(project)}
            className="inline-flex items-center gap-2 text-xs font-bold text-accent-purple hover:text-accent-purple-2 transition-colors interactive-hover"
          >
            <span>Ver detalhes do projeto</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default function Portfolio() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1: left, 1: right
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projects: Project[] = [
    {
      id: 1,
      title: 'Nexus Analytics',
      category: 'Plataforma SaaS',
      desc: 'Painel financeiro corporativo com processamento de transações em tempo real e relatórios dinâmicos.',
      longDesc: 'O Nexus Analytics é uma plataforma SaaS completa voltada para o setor financeiro corporativo. O sistema processa milhões de registros diários em pipelines ultra rápidos e disponibiliza dashboards altamente analíticos com taxas de atualização inferiores a 200ms. Possui suporte a multi-tenancy e integrações avançadas com múltiplos gateways de pagamento.',
      techs: ['Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'Docker'],
      metrics: '+45% eficiência operacional, uptime de 99.99%',
      image: '/next.svg', // Fallback, we will style the card nicely so it looks premium
      link: '#',
    },
    {
      id: 2,
      title: 'Athena CRM',
      category: 'Sistemas Empresariais',
      desc: 'Sistema customizado de gestão de vendas para indústrias, com funis e integrações ERP.',
      longDesc: 'O Athena CRM foi desenvolvido sob medida para indústrias que demandavam centralização de leads e funil de vendas complexo. O sistema integra-se diretamente a sistemas ERP de mercado via microsserviços dedicados e fornece predições inteligentes baseadas em histórico de leads, otimizando o fluxo comercial.',
      techs: ['React', 'Spring Boot', 'Java', 'PostgreSQL', 'Kubernetes', 'AWS'],
      metrics: '30% aumento de conversão comercial em 3 meses',
      image: '/globe.svg',
      link: '#',
    },
    {
      id: 3,
      title: 'Vortex Logistics',
      category: 'Aplicações Web',
      desc: 'Plataforma integrada de rastreamento de frotas e otimização de rotas geográficas.',
      longDesc: 'O Vortex é uma solução logística integrada desenvolvida para frotas de distribuição urbana. Utiliza algoritmos avançados para roteirização geográfica que reduzem o consumo de combustível e emissão de poluentes, além de contar com rastreamento de veículos via websockets em tempo real.',
      techs: ['Next.js', 'NestJS', 'Redis', 'Leaflet', 'MongoDB', 'AWS'],
      metrics: 'Redução de 18% nos custos de combustível',
      image: '/window.svg',
      link: '#',
    },
  ];

  const handleNext = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % projects.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  // Radial progress calculations
  const totalProjects = projects.length;
  const radius = 24;
  const strokeWidth = 3;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - ((activeIndex + 1) / totalProjects) * circumference;

  const currentProject = projects[activeIndex];

  return (
    <section id="projetos" className="relative py-24 md:py-32 bg-bg-elevated/40 border-y border-white/5 overflow-hidden">
      {/* Background aurora blur */}
      <div className="absolute bottom-[10%] left-[-15%] w-[45vw] h-[45vw] rounded-full bg-accent-purple/5 blur-[110px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-xl">
            <span className="text-xs font-bold text-accent-blue tracking-widest uppercase mb-4 block">
              Nosso Portfólio
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-text-primary tracking-tight mb-2 font-sans">
              Projetos em destaque.
            </h2>
            <p className="text-sm sm:text-base text-text-secondary leading-relaxed font-medium">
              Sistemas de grande porte desenhados e implementados pela nossa equipe.
            </p>
          </div>
        </div>

        {/* Carousel Slide Area */}
        <div className="relative min-h-[380px] md:min-h-[460px] flex items-center justify-center">
          <AnimatePresence mode="wait" custom={direction}>
            <ProjectCard
              key={activeIndex}
              project={projects[activeIndex]}
              direction={direction}
              onSelect={setSelectedProject}
            />
          </AnimatePresence>
        </div>

        {/* Radial Dial Controller Navigation widget */}
        <div className="flex items-center justify-center gap-6 mt-16">
          {/* Previous Button */}
          <button
            onClick={handlePrev}
            className="w-10 h-10 rounded-full bg-white/[0.02] border border-white/10 flex items-center justify-center text-text-secondary hover:text-text-primary hover:bg-white/5 transition-all duration-300 interactive-hover"
            aria-label="Projeto anterior"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          {/* Radial Progress indicator */}
          <div className="relative w-16 h-16 flex items-center justify-center">
            <svg className="w-full h-full radial-dial">
              {/* Gray track circle */}
              <circle
                cx="32"
                cy="32"
                r={radius}
                fill="transparent"
                stroke="rgba(255, 255, 255, 0.05)"
                strokeWidth={strokeWidth}
              />
              {/* Colored active progress circle */}
              <motion.circle
                cx="32"
                cy="32"
                r={radius}
                fill="transparent"
                stroke="url(#radial-gradient)"
                strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                animate={{ strokeDashoffset }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="radial-gradient" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="var(--accent-blue)" />
                  <stop offset="100%" stopColor="var(--accent-purple)" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute text-[10px] font-bold font-mono text-text-primary">
              {activeIndex + 1}/{totalProjects}
            </div>
          </div>

          {/* Next Button */}
          <button
            onClick={handleNext}
            className="w-10 h-10 rounded-full bg-white/[0.02] border border-white/10 flex items-center justify-center text-text-secondary hover:text-text-primary hover:bg-white/5 transition-all duration-300 interactive-hover"
            aria-label="Próximo projeto"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Project Detail Popup Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center px-6">
            {/* Modal Backdrop Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
            />

            {/* Modal Glass Panel */}
            <motion.div
              variants={scaleUp(0.4)}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="w-full max-w-2xl bg-bg-elevated/95 backdrop-blur-2xl border border-white/10 rounded-2xl p-6 md:p-10 shadow-2xl relative z-10 max-h-[85vh] overflow-y-auto no-scrollbar"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-5 right-5 p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-white/5 transition-colors"
                aria-label="Fechar"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex flex-col gap-6">
                <div>
                  <span className="text-[10px] font-mono text-accent-blue uppercase tracking-widest font-semibold">
                    {selectedProject.category}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-extrabold text-text-primary tracking-tight mt-2">
                    {selectedProject.title}
                  </h3>
                </div>

                {/* Simulated visual or statistics */}
                <div className="p-4 rounded-xl bg-black/40 border border-white/5 flex flex-col gap-2">
                  <div className="text-[10px] text-text-muted uppercase tracking-wider font-semibold">Impacto e Métricas</div>
                  <div className="text-sm font-semibold text-green-400 font-sans">
                    {selectedProject.metrics}
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <h4 className="text-sm font-bold text-text-primary">Visão Geral do Sistema</h4>
                  <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-medium">
                    {selectedProject.longDesc}
                  </p>
                </div>

                <div className="flex flex-col gap-3">
                  <h4 className="text-sm font-bold text-text-primary">Linguagens e Ferramentas</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.techs.map((tech) => (
                      <span key={tech} className="text-xs font-mono text-text-primary px-3 py-1 rounded-full bg-white/5 border border-white/5">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer buttons inside modal */}
                <div className="flex gap-4 pt-6 border-t border-white/5 mt-4">
                  <a
                    href={selectedProject.link}
                    onClick={() => setSelectedProject(null)}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs font-semibold text-white bg-gradient-primary hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] transition-all"
                  >
                    <span>Acessar demonstração</span>
                    <Globe className="w-3.5 h-3.5" />
                  </a>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="px-6 py-3 rounded-full text-xs font-semibold text-text-secondary hover:text-text-primary hover:bg-white/5 transition-colors border border-white/5"
                  >
                    Fechar
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
