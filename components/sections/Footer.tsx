import { Terminal } from 'lucide-react';

const TwitterIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const sections = [
    {
      title: 'Plataforma',
      links: [
        { label: 'Serviços', href: '#servicos' },
        { label: 'Projetos', href: '#projetos' },
        { label: 'Processo', href: '#processo' },
        { label: 'Diferenciais', href: '#diferenciais' },
      ],
    },
    {
      title: 'Empresa',
      links: [
        { label: 'Sobre nós', href: '#sobre' },
        { label: 'Carreiras', href: '#' },
        { label: 'FAQ', href: '#faq' },
        { label: 'Contato', href: '#contato' },
      ],
    },
    {
      title: 'Jurídico',
      links: [
        { label: 'Termos de Uso', href: '#' },
        { label: 'Privacidade', href: '#' },
        { label: 'Segurança', href: '#' },
      ],
    },
  ];

  return (
    <footer className="relative bg-bg-base border-t border-white/5 py-16 md:py-24 overflow-hidden">
      {/* Background radial overlay */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[50vw] h-[30vw] bg-accent-blue/2 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] gap-12 mb-16">
          
          {/* Brand Info */}
          <div className="flex flex-col items-start text-left max-w-sm">
            <a
              href="#"
              className="flex items-center gap-2 font-sans font-extrabold text-xl tracking-tight text-text-primary mb-6 group"
            >
              <span className="bg-clip-text flex gap-2 text-transparent bg-gradient-to-r from-text-primary via-text-primary to-text-secondary">
                Y&M<span className="text-accent-blue">Systems</span>
              </span>
            </a>

            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed mb-6 font-medium">
              Projetamos e construímos ecossistemas digitais robustos, SaaS escaláveis e integrações sob medida com excelência técnica alemã.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-4">
              {[
                { icon: TwitterIcon, href: '#', label: 'Twitter' },
                { icon: GithubIcon, href: '#', label: 'GitHub' },
                { icon: LinkedinIcon, href: '#', label: 'LinkedIn' },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  className="w-9 h-9 rounded-lg bg-white/[0.02] border border-white/5 flex items-center justify-center text-text-secondary hover:text-text-primary hover:bg-white/5 transition-all duration-300 interactive-hover"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Links Columns */}
          {sections.map((section, idx) => (
            <div key={idx} className="flex flex-col items-start text-left">
              <h4 className="text-xs uppercase font-bold tracking-wider text-text-primary mb-5 font-mono">
                {section.title}
              </h4>
              <div className="flex flex-col gap-3">
                {section.links.map((link, linkIdx) => (
                  <a
                    key={linkIdx}
                    href={link.href}
                    className="text-xs sm:text-sm text-text-secondary hover:text-text-primary transition-colors font-medium"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          ))}

        </div>

        {/* Bottom copyright segment */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] sm:text-xs font-mono text-text-muted">
          <span>
            © {currentYear} Y&M Systems Ltda. Todos os direitos reservados.
          </span>
          <div className="flex gap-6">
            <span>Desenvolvido no Brasil</span>
            <span>CNPJ: 00.000.000/0001-00</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
