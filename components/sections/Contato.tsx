'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Mail, Phone, MapPin, Send, Check } from 'lucide-react';
import { fadeInUp, staggerContainer, easeCustom } from '../../lib/motion';

export default function Contato() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    budget: '10k-30k',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
      setFormData({
        name: '',
        email: '',
        company: '',
        budget: '10k-30k',
        message: '',
      });
      // Reset success status after a delay
      setTimeout(() => setIsSent(false), 5000);
    }, 1800);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section id="contato" className="relative py-24 md:py-32 bg-bg-base overflow-hidden">
      {/* Background visual components */}
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-accent-purple/10 blur-[130px] pointer-events-none" />
      <div className="absolute top-[10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-accent-blue/5 blur-[110px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column: Headline and detail */}
          <motion.div
            variants={staggerContainer(0.12, 0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="flex flex-col text-left"
          >
            <motion.span
              variants={fadeInUp(20, 0.5)}
              className="text-xs font-bold text-accent-blue tracking-widest uppercase mb-4"
            >
              Vamos conversar
            </motion.span>
            
            <motion.h2
              variants={fadeInUp(20, 0.5)}
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-text-primary tracking-tight leading-[1.12] mb-6 font-sans"
            >
              Pronto para construir o seu próximo sistema?
            </motion.h2>

            <motion.p
              variants={fadeInUp(20, 0.5)}
              className="text-sm sm:text-base text-text-secondary leading-relaxed mb-10 max-w-md font-medium"
            >
              Fale diretamente com nossa equipe de engenharia. Analisamos sua infraestrutura atual, criamos escopos detalhados e tiramos seus planos do papel.
            </motion.p>

            {/* Direct contact nodes */}
            <div className="flex flex-col gap-5">
              {[
                { label: 'E-mail Comercial', val: 'contato@ymsystems.com', icon: Mail },
                { label: 'Telefone comercial', val: '+55 (11) 98765-4321', icon: Phone },
                { label: 'Sede Principal', val: 'Picos, PI - BRASIL', icon: MapPin },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp(20, 0.5, index * 0.1)}
                  className="flex items-center gap-4"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/[0.02] border border-white/10 flex items-center justify-center text-accent-blue">
                    <item.icon className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-mono text-text-muted">{item.label}</span>
                    <h3 className="text-sm font-semibold text-text-primary">{item.val}</h3>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Contact Request Form */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: easeCustom }}
            className="w-full max-w-[540px] mx-auto relative"
          >
            {/* Spotlight glow behind form container */}
            <div className="absolute inset-0 bg-gradient-to-tr from-accent-blue/10 to-accent-purple/10 rounded-3xl blur-[40px] opacity-70 pointer-events-none" />

            <div className="glass-card p-6 md:p-10 border-white/10 bg-black/45 relative z-10 overflow-hidden">
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                
                {/* Name */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className="text-[10px] font-mono text-text-secondary uppercase">Seu Nome</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Ex: Lorran"
                    className="w-full h-11 px-4 rounded-xl bg-black/30 border border-white/5 text-xs text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-blue focus:bg-black/50 transition-all duration-300"
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="text-[10px] font-mono text-text-secondary uppercase">E-mail Corporativo</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Ex: lorran@empresa.com"
                    className="w-full h-11 px-4 rounded-xl bg-black/30 border border-white/5 text-xs text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-blue focus:bg-black/50 transition-all duration-300"
                  />
                </div>

                {/* Grid items */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="company" className="text-[10px] font-mono text-text-secondary uppercase">Empresa</label>
                    <input
                      id="company"
                      name="company"
                      type="text"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder="Ex: Y&M Corp"
                      className="w-full h-11 px-4 rounded-xl bg-black/30 border border-white/5 text-xs text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-blue focus:bg-black/50 transition-all duration-300"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="budget" className="text-[10px] font-mono text-text-secondary uppercase">Orçamento Estimado</label>
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      className="w-full h-11 px-4 rounded-xl bg-black/30 border border-white/5 text-xs text-text-primary focus:outline-none focus:border-accent-blue focus:bg-black/50 transition-all duration-300 appearance-none cursor-pointer"
                    >
                      <option value="10k-30k" className="bg-bg-elevated">R$ 10k - R$ 30k</option>
                      <option value="30k-60k" className="bg-bg-elevated">R$ 30k - R$ 60k</option>
                      <option value="60k+" className="bg-bg-elevated">R$ 60k+</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="message" className="text-[10px] font-mono text-text-secondary uppercase">Fale sobre o projeto</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder="Descreva brevemente sua ideia, integrações necessárias ou problemas a serem resolvidos."
                    className="w-full px-4 py-3 rounded-xl bg-black/30 border border-white/5 text-xs text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-blue focus:bg-black/50 transition-all duration-300 resize-none"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting || isSent}
                  className="w-full h-11 rounded-xl bg-gradient-primary text-xs font-semibold text-white flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 rounded-full border-2 border-white/20 border-t-white animate-spin" />
                      <span>Processando solicitação...</span>
                    </>
                  ) : isSent ? (
                    <>
                      <Check className="w-4 h-4 text-green-400" />
                      <span className="text-green-400">Solicitação enviada com sucesso!</span>
                    </>
                  ) : (
                    <>
                      <span>Enviar mensagem</span>
                      <Send className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
