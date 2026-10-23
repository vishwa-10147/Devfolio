// The site is exported as static files for GitHub Pages. When it is served from
// a subpath (https://<user>.github.io/<repo>), NEXT_PUBLIC_BASE_PATH is that
// subpath, e.g. "/Devfolio"; the deploy workflow sets it automatically.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath,
  trailingSlash: true,
  reactStrictMode: true,
  images: {
    // GitHub Pages has no server to optimize images at request time.
    unoptimized: true,
  },
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
};

module.exports = nextConfig;
