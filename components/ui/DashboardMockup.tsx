'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Activity, Cpu, Database, Server, Terminal, User } from 'lucide-react';

export default function DashboardMockup() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  // Mouse positions for 3D tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-300, 300], [10, -10]);
  const rotateY = useTransform(x, [-300, 300], [-10, 10]);

  const springX = useSpring(rotateX, { stiffness: 120, damping: 20 });
  const springY = useSpring(rotateY, { stiffness: 120, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Mouse coordinates relative to card center
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;

    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Mock server log state for active feed
  const [logs, setLogs] = useState<{ id: number; text: string; status: string }[]>([
    { id: 1, text: 'GET /api/v1/auth/session', status: '200 OK' },
    { id: 2, text: 'DB_POOL: Connection established', status: 'SUCCESS' },
    { id: 3, text: 'POST /api/v3/payment/intent', status: '201 CREATED' },
  ]);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      const paths = [
        'GET /api/v1/dashboard/metrics',
        'PATCH /api/v2/users/settings',
        'POST /api/v1/webhooks/stripe',
        'GET /api/v2/analytics/reports',
        'DB_QUERY: SELECT * FROM billing',
      ];
      const statuses = ['200 OK', '201 CREATED', '200 OK', '101 SWITCHING', 'SUCCESS'];
      const randomIndex = Math.floor(Math.random() * paths.length);
      
      setLogs((prev) => [
        {
          id: Date.now(),
          text: paths[randomIndex],
          status: statuses[Math.floor(Math.random() * statuses.length)],
        },
        ...prev.slice(0, 2),
      ]);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  return (
    <div 
      className="w-full flex items-center justify-center py-6 select-none"
      style={{ perspective: 1200 }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: springX,
          rotateY: springY,
        }}
        className="w-full max-w-[620px] aspect-[4/3] glass-card flex flex-col overflow-hidden relative group"
      >
        {/* Border glow shine */}
        <div className="absolute inset-0 bg-gradient-to-tr from-accent-blue/10 via-transparent to-accent-purple/10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        
        {/* Top Header Bar */}
        <div className="h-11 border-b border-white/5 px-4 flex items-center justify-between bg-white/[0.01]">
          {/* Traffic Lights */}
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-[#FF5F56] opacity-70" />
            <div className="w-3 h-3 rounded-full bg-[#FFBD2E] opacity-70" />
            <div className="w-3 h-3 rounded-full bg-[#27C93F] opacity-70" />
          </div>
          
          {/* URL Search bar */}
          <div className="w-[50%] h-6 rounded-md bg-black/40 border border-white/5 flex items-center justify-center text-[10px] text-text-muted font-mono tracking-tight">
            https://api.ymsystems.com/v1/metrics
          </div>

          {/* Connected Beacon */}
          <div className="flex items-center gap-1.5 bg-accent-blue/10 px-2 py-0.5 rounded-full border border-accent-blue/20">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-blue animate-pulse" />
            <span className="text-[9px] font-mono text-accent-blue uppercase tracking-widest font-semibold">Live</span>
          </div>
        </div>

        {/* Dashboard Content Grid */}
        <div className="flex-1 grid grid-cols-[160px_1fr] overflow-hidden">
          {/* Sidebar */}
          <div className="border-r border-white/5 bg-black/20 p-4 flex flex-col items-center justify-between">
            <div className="w-full flex flex-col items-center gap-4 mt-2">
              <div className="w-20 h-20 rounded-xl bg-white/[0.02] border border-white/10 flex items-center justify-center p-2 shadow-inner">
                <img 
                  src="/Logos .png" 
                  alt="Y&M Systems Logo" 
                  className="w-full h-full object-contain opacity-90" 
                />
              </div>
              <span className="text-[9px] font-mono text-text-muted tracking-widest uppercase text-center font-bold">
                Core Platform
              </span>
            </div>

            <div className="mt-auto border-t border-white/5 pt-3 w-full flex items-center justify-center">
              <div className="flex items-center gap-2 text-text-secondary">
                <User className="w-3.5 h-3.5" />
                <span className="text-[10px] font-mono">dev_lorran@ym</span>
              </div>
            </div>
          </div>

          {/* Main Workspace */}
          <div className="p-4 flex flex-col gap-4 overflow-y-auto no-scrollbar">
            {/* Top Cards Row */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-black/35 rounded-xl border border-white/5">
                <div className="text-[10px] text-text-secondary font-semibold uppercase tracking-wider">Requests / min</div>
                <div className="text-xl font-bold font-mono text-text-primary mt-1">4,812</div>
                <span className="text-[9px] text-[#27C93F] font-mono mt-0.5 flex items-center gap-0.5">
                  ↑ +14.2% <span className="text-text-muted">vs last hr</span>
                </span>
              </div>
              <div className="p-3 bg-black/35 rounded-xl border border-white/5">
                <div className="text-[10px] text-text-secondary font-semibold uppercase tracking-wider">Sys Latency</div>
                <div className="text-xl font-bold font-mono text-accent-blue mt-1">18.4ms</div>
                <span className="text-[9px] text-text-muted font-mono mt-0.5">
                  Avg response payload
                </span>
              </div>
            </div>

            {/* Glowing Chart Visual */}
            <div className="flex-1 bg-black/45 rounded-xl border border-white/5 p-3 flex flex-col justify-between min-h-[120px]">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-mono text-text-secondary">Throughput History</span>
                <span className="text-[9px] font-mono text-accent-purple font-semibold">Cluster A-1</span>
              </div>
              
              {/* SVG Line Graph */}
              <div className="flex-1 flex items-end mt-2 h-20 relative">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 300 80">
                  <defs>
                    <linearGradient id="chart-glow" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--accent-blue)" stopOpacity="0.2"/>
                      <stop offset="100%" stopColor="var(--accent-blue)" stopOpacity="0"/>
                    </linearGradient>
                  </defs>
                  {/* Area fill */}
                  <motion.path
                    d="M0,80 Q30,40 60,65 T120,30 T180,55 T240,20 T300,45 L300,80 L0,80 Z"
                    fill="url(#chart-glow)"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                  />
                  {/* Neon line */}
                  <motion.path
                    d="M0,80 Q30,40 60,65 T120,30 T180,55 T240,20 T300,45"
                    fill="none"
                    stroke="var(--accent-blue)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, ease: 'easeInOut' }}
                  />
                  {/* Endpoint glow dot */}
                  <motion.circle
                    cx="300"
                    cy="45"
                    r="4"
                    fill="var(--accent-purple)"
                    className="shadow-md shadow-accent-purple"
                    animate={{
                      r: [3, 5, 3],
                      opacity: [0.7, 1, 0.7],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  />
                </svg>
              </div>
            </div>

            {/* Live Terminal Log feed */}
            <div className="bg-black/50 border border-white/5 rounded-xl p-3 font-mono text-[9px] flex flex-col gap-1.5">
              <div className="flex items-center gap-1.5 text-text-muted border-b border-white/5 pb-1.5 mb-1">
                <Terminal className="w-3.5 h-3.5 text-accent-purple" />
                <span>Console Log Feed</span>
              </div>
              <div className="flex flex-col gap-1">
                {logs.map((log) => (
                  <div key={log.id} className="flex justify-between items-center text-text-secondary leading-normal">
                    <div className="flex items-center gap-1">
                      <span className="text-accent-blue">➔</span>
                      <span className="truncate max-w-[200px]">{log.text}</span>
                    </div>
                    <span className={`px-1 rounded text-[8px] font-semibold ${
                      log.status.includes('OK') || log.status.includes('SUCCESS')
                        ? 'bg-green-500/10 text-green-400' 
                        : 'bg-accent-blue/10 text-accent-blue'
                    }`}>
                      {log.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
