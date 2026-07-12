'use client';

import React, { useEffect } from 'react';
import Lenis from 'lenis';

interface LenisProviderProps {
  children: React.ReactNode;
}

export default function LenisProvider({ children }: LenisProviderProps) {
  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 1024px)').matches;
    if (isMobile) return;

    // Initialize Lenis
    const lenis = new Lenis({
      duration: isMobile ? 1.2 : 1.8, // Slightly faster response on mobile
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // smooth scroll curve
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: isMobile ? 1.0 : 0.8,
      touchMultiplier: isMobile ? 1.5 : 1.2,
    });

    // Custom animation frame loop for Lenis
    let animationFrameId: number;
    function raf(time: number) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }
    animationFrameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationFrameId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
