import { MetadataRoute } from 'next';

// Required for `output: 'export'`.
export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/_next/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}