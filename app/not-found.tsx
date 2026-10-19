import { Metadata } from 'next';
import Link from 'next/link';
import { Header, Footer } from '@/components/layout';
import { Button } from '@/components/ui';
import { Home, Search } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Page Not Found',
  description: 'The page you are looking for does not exist.',
  robots: 'noindex',
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-16 flex items-center justify-center" id="main-content">
        <div className="container-main text-center py-16">
          <h1 className="text-display-xl font-medium text-foreground mb-4">404</h1>
          <h2 className="text-heading-xl font-semibold text-foreground mb-4">Page Not Found</h2>
          <p className="text-body-lg text-muted-foreground max-w-md mx-auto mb-8">
            Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been moved or doesn&apos;t exist.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/" className="btn-primary inline-flex items-center gap-2">
              <Home className="h-4 w-4" aria-hidden="true" />
              Go Home
            </Link>
            <Link href="/projects" className="btn-outline inline-flex items-center gap-2">
              <Search className="h-4 w-4" aria-hidden="true" />
              Browse Projects
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}