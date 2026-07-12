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
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setCoords({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!containerRef.current || e.touches.length === 0) return;
      const rect = containerRef.current.getBoundingClientRect();
      const touch = e.touches[0];
      setCoords({
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top,
      });
    };

    const handleTouchEnd = () => {
      setCoords({ x: -1000, y: -1000 });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 -z-50 w-full h-full overflow-hidden bg-bg-base pointer-events-none"
      style={{
        '--x': `${coords.x}px`,
        '--y': `${coords.y}px`,
      } as React.CSSProperties}
    >
      {/* Infinite Grid with fading mask */}
      <div className="absolute inset-0 infinite-grid infinite-grid-radial opacity-60" />

      {/* Mouse spotlight glow - reacts to mouse on desktop and touch on mobile */}
      <div className="absolute inset-0 spotlight-glow transition-opacity duration-300 pointer-events-none" />

      {/* Aurora Blobs - animated on both screen sizes, using reduced blur radius on mobile to preserve GPU performance */}
      {/* Blob 1: Blue (Top Left) */}
      <motion.div
        className="absolute -top-[10%] -left-[10%] w-[55vw] h-[55vw] rounded-full bg-accent-blue/7 blur-[60px] md:blur-[110px] pointer-events-none"
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

      {/* Blob 2: Purple (Middle Right) */}
      <motion.div
        className="absolute top-[35%] -right-[15%] w-[50vw] h-[50vw] rounded-full bg-accent-purple/7 blur-[70px] md:blur-[130px] pointer-events-none"
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

      {/* Blob 3: Mixed (Bottom Left) */}
      <motion.div
        className="absolute -bottom-[20%] left-[15%] w-[60vw] h-[45vw] rounded-full bg-gradient-to-r from-accent-blue/3 to-accent-purple/3 blur-[85px] md:blur-[140px] pointer-events-none"
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
    </div>
  );
}
