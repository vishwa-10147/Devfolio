import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Github, Linkedin, Mail, Heart, Code } from 'lucide-react';

const socialLinks = [
  { name: 'GitHub', href: 'https://github.com/vishwa-10147', icon: Github, label: 'GitHub' },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/vishwa-kokkireni-7081152ba/', icon: Linkedin, label: 'LinkedIn' },
  { name: 'Email', href: 'mailto:vishwakokkireni@gmail.com', icon: Mail, label: 'Email' },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface/50" role="contentinfo">
      <div className="container-main py-12 lg:py-16">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 font-semibold text-heading-sm text-foreground" aria-label="Devfolio Home">
              <span className="text-accent">█</span>
              Devfolio
            </Link>
            <p className="mt-4 max-w-xs text-body text-muted-foreground">
              Vishwa Kokkireni — Computer Science Engineering student building security-focused AI/ML and backend systems.
            </p>
            <div className="mt-6 flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground transition-colors hover:text-accent"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-heading-sm font-semibold text-foreground">Quick Links</h3>
            <nav aria-label="Footer navigation">
              <ul className="mt-4 space-y-3">
                <li>
                  <Link href="/projects" className="text-body-sm text-muted-foreground transition-colors hover:text-foreground">
                    Projects
                  </Link>
                </li>
                <li>
                  <Link href="/skills" className="text-body-sm text-muted-foreground transition-colors hover:text-foreground">
                    Skills
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-body-sm text-muted-foreground transition-colors hover:text-foreground">
                    About
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <p className="text-body-sm text-muted-foreground text-center md:text-left">
            © {currentYear} Vishwa Kokkireni. Built with Next.js, React, TypeScript, and Tailwind CSS.
          </p>
          <p className="flex items-center gap-1.5 text-body-sm text-muted-foreground text-center md:text-right">
            Made with
            <Heart className="h-4 w-4 text-destructive" aria-hidden="true" />
            and
            <Code className="h-4 w-4 text-accent" aria-hidden="true" />
          </p>
        </div>
      </div>
    </footer>
  );
}