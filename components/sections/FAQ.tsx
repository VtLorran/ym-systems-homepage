'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { easeCustom, staggerContainer } from '../../lib/motion';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

function FAQAccordion({ question, answer, isOpen, onToggle }: FAQItem & { isOpen: boolean; onToggle: () => void }) {
  const [isMobile, setIsMobile] = useState(false);
  const answerWords = answer.split(' ');

  useEffect(() => {
    setIsMobile(window.matchMedia('(max-width: 1024px)').matches);
  }, []);

  return (
    <div className="border-b border-white/5 last:border-0 py-4.5">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-4 text-left font-sans text-base font-bold text-text-primary hover:text-accent-blue transition-colors duration-300 group"
      >
        <span className="pr-6">{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: easeCustom }}
          className="flex-shrink-0 w-8 h-8 rounded-lg bg-white/[0.02] border border-white/10 flex items-center justify-center text-text-secondary group-hover:text-accent-blue group-hover:border-accent-blue/30 transition-colors"
        >
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: easeCustom }}
            className="overflow-hidden"
          >
            <div className="pb-6 pt-2 pr-6">
              {isMobile ? (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.25 }}
                  className="text-xs sm:text-sm text-text-secondary leading-relaxed font-medium"
                >
                  {answer}
                </motion.p>
              ) : (
                <motion.p
                  variants={staggerContainer(0.015, 0.05)}
                  initial="hidden"
                  animate="visible"
                  className="text-xs sm:text-sm text-text-secondary leading-relaxed font-medium"
                >
                  {answerWords.map((word, i) => (
                    <motion.span
                      key={i}
                      variants={{
                        hidden: { opacity: 0.15, filter: 'blur(2px)', y: 3 },
                        visible: { opacity: 1, filter: 'blur(0px)', y: 0 }
                      }}
                      transition={{ duration: 0.3 }}
                      className="inline-block mr-1"
                    >
                      {word}
                    </motion.span>
                  ))}
                </motion.p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      id: 1,
      question: 'Como funciona o processo de escopo e orçamento?',
      answer: 'Iniciamos com uma reunião de diagnóstico técnico para entender suas demandas. A partir disso, desenhamos o escopo funcional e fornecemos a proposta comercial em até 5 dias úteis, dividindo as fases de desenvolvimento por sprints quinzenais transparentes.',
    },
    {
      id: 2,
      question: 'Qual é o prazo médio de entrega para um sistema customizado?',
      answer: 'Isso depende diretamente da complexidade do projeto. Landing Pages Premium estruturadas levam de 10 a 15 dias. Plataformas SaaS robustas, MVPs escaláveis ou sistemas ERP customizados levam entre 8 a 16 semanas para o deploy final.',
    },
    {
      id: 3,
      question: 'Vocês realizam integração com sistemas legados ou ERPs externos?',
      answer: 'Sim, possuímos sólida experiência no desenvolvimento de microsserviços integradores seguros. Conectamos sua nova plataforma com APIs legadas, SAP, Totvs, Salesforce, gateways de pagamento, plataformas CRM e operadoras logísticas.',
    },
    {
      id: 4,
      question: 'Como funcionam os custos de servidores e hospedagem?',
      answer: 'Auxiliamos a estruturar toda a sua infraestrutura técnica na AWS, Vercel ou Google Cloud. Priorizamos sempre arquiteturas Serverless de baixo custo que escalam automaticamente conforme a demanda operacional da sua empresa.',
    },
    {
      id: 5,
      question: 'O código-fonte e propriedade intelectual do sistema serão meus?',
      answer: 'Com certeza. Em todos os nossos projetos customizados sob demanda, a propriedade intelectual completa, as credenciais de infraestrutura e o código-fonte são transferidos inteiramente para o cliente em contrato de forma definitiva.',
    },
  ];

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="relative py-24 md:py-32 bg-[#05060A] overflow-hidden z-20">
      {/* Background spotlights */}
      <div className="absolute top-[30%] left-[-15%] w-[40vw] h-[40vw] rounded-full bg-accent-blue/5 blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold text-accent-blue tracking-widest uppercase mb-4">
            Dúvidas frequentes
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-text-primary tracking-tight mb-4 font-sans">
            Perguntas Frequentes.
          </h2>
          <p className="text-sm text-text-secondary leading-relaxed font-medium">
            Tem dúvidas sobre o desenvolvimento? Confira nossas respostas rápidas ou entre em contato com um especialista.
          </p>
        </div>

        {/* Accordion panel container */}
        <div className="p-6 md:p-8 rounded-2xl glass-card border-white/5 bg-black/35">
          {faqs.map((faq, index) => (
            <FAQAccordion
              key={faq.id}
              {...faq}
              isOpen={openIndex === index}
              onToggle={() => handleToggle(index)}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
