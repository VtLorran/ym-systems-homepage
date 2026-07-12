'use client';

import { useEffect, useRef, useState } from 'react';

export default function HeroParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const isMobile = window.matchMedia('(max-width: 1024px)').matches;

    let animationFrameId: number;
    let particles: Particle[] = [];
    let isVisible = true;
    const mouse = { x: -1000, y: -1000, radius: 150 };

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;

      constructor(w: number, h: number) {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        // Slow drifting velocities
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.size = Math.random() * 2 + 0.8;
        // Soft blue/purple glow particles
        this.color = Math.random() > 0.5 
          ? 'rgba(59, 130, 246, 0.4)' 
          : 'rgba(139, 92, 246, 0.4)';
      }

      update(w: number, h: number) {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce on boundaries
        if (this.x < 0 || this.x > w) this.vx = -this.vx;
        if (this.y < 0 || this.y > h) this.vy = -this.vy;

        // Mouse/Touch interaction
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          // Gently push away from mouse/touch
          this.x -= (dx / dist) * force * 0.5;
          this.y -= (dy / dist) * force * 0.5;
        }
      }

      draw(c: CanvasRenderingContext2D) {
        c.beginPath();
        c.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        c.fillStyle = this.color;
        
        // Slightly softer shadows on mobile to reduce rendering pressure
        c.shadowBlur = isMobile ? 2 : 4;
        c.shadowColor = this.color;
        
        c.fill();
        c.shadowBlur = 0; // reset
      }
    }

    const init = () => {
      const w = canvas.width = canvas.offsetWidth;
      const h = canvas.height = canvas.offsetHeight;
      particles = [];
      
      // Keep constellation aesthetic but reduce counts on mobile for performance
      const maxCount = isMobile ? 12 : 80;
      const count = Math.min(maxCount, Math.floor((w * h) / 15000));
      for (let i = 0; i < count; i++) {
        particles.push(new Particle(w, h));
      }
    };

    const animate = () => {
      if (!isVisible) return; // Stop animation loop when not visible in viewport
      
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < particles.length; i++) {
        particles[i].update(w, h);
        particles[i].draw(ctx);

        if (!isMobile) {
          // Draw connections (only on desktop to preserve performance)
          const connectionLimit = 100;
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < connectionLimit) {
              ctx.beginPath();
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              // Dynamic opacity based on distance
              const opacity = (connectionLimit - dist) / connectionLimit * 0.12;
              ctx.strokeStyle = `rgba(139, 92, 246, ${opacity})`;
              ctx.lineWidth = 0.8;
              ctx.stroke();
            }
          }

          // Draw line to pointer
          const dx = particles[i].x - mouse.x;
          const dy = particles[i].y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(mouse.x, mouse.y);
            const opacity = (mouse.radius - dist) / mouse.radius * 0.15;
            ctx.strokeStyle = `rgba(59, 130, 246, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      init();
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    // Pause animation frame loop when canvas leaves viewport using IntersectionObserver
    const observer = new IntersectionObserver(
      ([entry]) => {
        const wasVisible = isVisible;
        isVisible = entry.isIntersecting;
        if (isVisible && !wasVisible) {
          // Re-trigger loop only when coming back to view
          cancelAnimationFrame(animationFrameId);
          animate();
        } else if (!isVisible) {
          cancelAnimationFrame(animationFrameId);
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    init();
    animate();

    window.addEventListener('resize', handleResize);
    
    if (!isMobile) {
      canvas.parentElement?.addEventListener('mousemove', handleMouseMove, { passive: true });
      canvas.parentElement?.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
      
      if (!isMobile) {
        canvas.parentElement?.removeEventListener('mousemove', handleMouseMove);
        canvas.parentElement?.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  if (!mounted) return null;

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-10"
    />
  );
}
