'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Menu, X, Terminal } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Top reading progress bar setup
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Empresa', href: '#sobre' },
    { name: 'Serviços', href: '#servicos' },
    { name: 'Projetos', href: '#projetos' },
    { name: 'Processo', href: '#processo' },
    { name: 'Diferenciais', href: '#diferenciais' },
    { name: 'FAQ', href: '#faq' },
  ];

  return (
    <>
      {/* Top Reading Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-accent-blue via-accent-purple to-accent-blue-2 origin-left z-[1000]"
        style={{ scaleX }}
      />

      <header
        className={`fixed top-[3px] left-0 right-0 z-[999] transition-all duration-500 ${
          scrolled
            ? 'h-14 bg-bg-base/70 backdrop-blur-xl border-b border-white/5 shadow-[0_8px_32px_rgba(0,0,0,0.5)]'
            : 'h-20 bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto h-full px-6 md:px-12 flex items-center justify-between">
          {/* Logo brand */}
          <a
            href="#"
            className="flex items-center font-sans font-black text-xl tracking-tight select-none"
          >
            <span className="text-white">Y&M</span>
            <span className="text-accent-blue ml-1">Systems</span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors relative group py-2"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-accent-blue group-hover:w-full transition-all duration-300 ease-out" />
              </a>
            ))}
          </nav>

          {/* Desktop Budget CTA */}
          <div className="hidden lg:block">
            <a
              href="#contato"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-full text-xs font-semibold text-white bg-gradient-primary hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Solicitar orçamento
            </a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-white/5 transition-all"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute top-full left-0 right-0 bg-bg-base/95 backdrop-blur-2xl border-b border-white/5 py-6 px-8 flex flex-col gap-5 lg:hidden shadow-2xl"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-semibold text-text-secondary hover:text-text-primary transition-colors py-1.5"
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contato"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center px-6 py-3 rounded-full text-sm font-semibold text-white bg-gradient-primary hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] transition-all"
            >
              Solicitar orçamento
            </a>
          </motion.div>
        )}
      </header>
    </>
  );
}
