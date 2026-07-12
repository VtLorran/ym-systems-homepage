'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function BackgroundEffects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkMobile = window.matchMedia('(max-width: 1024px)').matches;
    setIsMobile(checkMobile);
    
    if (checkMobile) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setCoords({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 -z-50 w-full h-full overflow-hidden bg-bg-base pointer-events-none"
      style={!isMobile ? ({
        '--x': `${coords.x}px`,
        '--y': `${coords.y}px`,
      } as React.CSSProperties) : undefined}
    >
      {/* Infinite Grid with fading mask */}
      <div className="absolute inset-0 infinite-grid infinite-grid-radial opacity-60" />

      {/* Mouse spotlight glow - reacts to mouse on desktop, disabled on mobile */}
      {!isMobile && (
        <div className="absolute inset-0 spotlight-glow transition-opacity duration-300 pointer-events-none" />
      )}

      {/* Aurora Blobs - animated on desktop, static on mobile to preserve GPU performance */}
      {/* Blob 1: Blue (Top Left) */}
      {isMobile ? (
        <div className="absolute -top-[10%] -left-[10%] w-[55vw] h-[55vw] rounded-full bg-accent-blue/7 blur-[60px] pointer-events-none" />
      ) : (
        <motion.div
          className="absolute -top-[10%] -left-[10%] w-[55vw] h-[55vw] rounded-full bg-accent-blue/7 blur-[110px] pointer-events-none"
          animate={{
            x: [0, 45, -25, 0],
            y: [0, -35, 45, 0],
            scale: [1, 1.15, 0.9, 1],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      )}

      {/* Blob 2: Purple (Middle Right) */}
      {isMobile ? (
        <div className="absolute top-[35%] -right-[15%] w-[50vw] h-[50vw] rounded-full bg-accent-purple/7 blur-[70px] pointer-events-none" />
      ) : (
        <motion.div
          className="absolute top-[35%] -right-[15%] w-[50vw] h-[50vw] rounded-full bg-accent-purple/7 blur-[130px] pointer-events-none"
          animate={{
            x: [0, -55, 35, 0],
            y: [0, 45, -35, 0],
            scale: [1, 0.9, 1.15, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      )}

      {/* Blob 3: Mixed (Bottom Left) */}
      {isMobile ? (
        <div className="absolute -bottom-[20%] left-[15%] w-[60vw] h-[45vw] rounded-full bg-gradient-to-r from-accent-blue/3 to-accent-purple/3 blur-[85px] pointer-events-none" />
      ) : (
        <motion.div
          className="absolute -bottom-[20%] left-[15%] w-[60vw] h-[45vw] rounded-full bg-gradient-to-r from-accent-blue/3 to-accent-purple/3 blur-[140px] pointer-events-none"
          animate={{
            x: [0, 35, -35, 0],
            y: [0, -25, 25, 0],
            scale: [1, 1.08, 0.92, 1],
          }}
          transition={{
            duration: 26,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      )}
    </div>
  );
}
