import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  preload: true,
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  preload: true,
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Devfolio | Building Intelligent Systems',
    template: '%s | Devfolio',
  },
  description: 'Professional portfolio of a software engineer focused on AI/ML, GenAI, cybersecurity, full-stack engineering, and research. Featuring GitHub-powered project showcase.',
  keywords: [
    'software engineer',
    'portfolio',
    'AI/ML',
    'GenAI',
    'cybersecurity',
    'full-stack',
    'React',
    'Next.js',
    'TypeScript',
    'Python',
    'GitHub',
  ],
  authors: [{ name: 'Devfolio Owner' }],
  creator: 'Devfolio Owner',
  publisher: 'Devfolio',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Devfolio',
    title: 'Devfolio | Building Intelligent Systems',
    description: 'Professional portfolio of a software engineer focused on AI/ML, GenAI, cybersecurity, full-stack engineering, and research.',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'Devfolio Portfolio Preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Devfolio | Building Intelligent Systems',
    description: 'Professional portfolio of a software engineer focused on AI/ML, GenAI, cybersecurity, full-stack engineering, and research.',
    images: ['/og-image.svg'],
    creator: '@github',
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/apple-touch-icon.svg',
  },
  manifest: '/site.webmanifest',
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'hsl(var(--background))' },
    { media: '(prefers-color-scheme: dark)', color: 'hsl(var(--background))' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <link rel="preconnect" href="https://avatars.githubusercontent.com" />
        <link rel="preconnect" href="https://github.com" />
        <link rel="preconnect" href="https://raw.githubusercontent.com" />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        {children}
      </body>
    </html>
  );
}