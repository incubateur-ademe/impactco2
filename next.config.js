/* eslint-disable @typescript-eslint/no-var-requires */
const helmet = require('helmet')
const { withSentryConfig } = require('@sentry/nextjs')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const csp = {
  ...helmet.contentSecurityPolicy.getDefaultDirectives(),
  'img-src': ["'self'", 'https:', 'data:'],
  'frame-ancestors': ["'self'", 'https:', 'file:'],
  'connect-src': [
    "'self'",
    process.env.NEXT_PUBLIC_MATOMO_SITE_URL,
    'https://photon.komoot.io',
    'https://sentry.incubateur.net',
    'https://cdn.jsdelivr.net',
  ],
  'script-src': [
    "'self'",
    "'unsafe-inline'",
    'https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/4.3.2/iframeResizer.contentWindow.min.js',
    `${process.env.NEXT_PUBLIC_MATOMO_SITE_URL}/matomo.js`,
    `${process.env.NEXT_PUBLIC_MATOMO_SITE_URL}/plugins/HeatmaSessionRecording/configs.php`,
  ],
}

if (process.env.UNSAFE_EVAL === 'true') {
  csp['script-src'].push("'unsafe-eval'")
}

const securityHeaders = [
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },
  {
    key: 'Content-Security-Policy',
    value: Object.keys(csp)
      .map((key) => `${key} ${csp[key].join(' ')}`)
      .join(';'),
  },
]

const securityHeadersIFramable = [
  {
    key: 'Content-Security-Policy',
    value: Object.keys(csp)
      .filter((key) => key !== 'frame-ancestors')
      .map((key) => `${key} ${csp[key].join(' ')}`)
      .join(';'),
  },
]

const images = process.env.NEXT_PUBLIC_IMAGE_URL?.startsWith('https')
  ? {
      protocol: 'https',
      hostname: process.env.NEXT_PUBLIC_IMAGE_URL.split('https://')[1],
      port: '',
      pathname: '/api/dynamics/**',
    }
  : {
      protocol: 'http',
      hostname: 'localhost',
      port: '3000',
      pathname: '/api/dynamics/**',
    }

const nextConfig = {
  transpilePackages: ['@tanstack/react-query', '@tanstack/query-core'],
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [images],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
      {
        source: '/iframes/:path*',
        headers: securityHeadersIFramable,
      },
      {
        source: '/api/v1/:path*',
        headers: [{ key: 'Access-Control-Allow-Origin', value: '*' }],
      },
    ]
  },
  async redirects() {
    return [
      {
        source: '/detecteur-co2',
        destination: '/contenu/detecteur-co2',
        permanent: true,
      },
      {
        source: '/guide-utilisation',
        destination: '/doc/guide-utilisation',
        permanent: true,
      },
      {
        source: '/api-doc',
        destination: '/doc/api',
        permanent: true,
      },
      {
        source: '/categories',
        destination: '/thematiques',
        permanent: true,
      },
      {
        source: '/convertisseur',
        destination: '/outils/comparateur',
        permanent: true,
      },
      {
        source: '/categories/:slug*',
        destination: '/:slug*',
        permanent: true,
      },
      {
        source: '/iframes/categories/:slug*',
        destination: '/iframes/:slug*',
        permanent: true,
      },
      {
        source: '/iframes/transport/teletravail',
        destination: '/iframes/teletravail',
        permanent: true,
      },
      {
        source: '/iframes/convertisseur',
        destination: '/iframes/comparateur',
        permanent: true,
      },
      {
        source: '/iframelivraison.js',
        destination: '/iframe.js',
        permanent: true,
      },
      { source: '/comparateur', destination: '/outils/comparateur', permanent: true },
      { source: '/caspratiques/:slug*', destination: '/outils/caspratiques/:slug*', permanent: true },
      { source: '/usagenumerique/:slug*', destination: '/outils/usagenumerique/:slug*', permanent: true },
      { source: '/livraison/:slug*', destination: '/outils/livraison/:slug*', permanent: true },
      { source: '/chauffage/:slug*', destination: '/outils/chauffage/:slug*', permanent: true },
      { source: '/transport/teletravail', destination: '/outils/teletravail', permanent: true },
      { source: '/transport/:slug*', destination: '/outils/transport/:slug*', permanent: true },
      { source: '/fruitsetlegumes/:slug*', destination: '/outils/fruitsetlegumes/:slug*', permanent: true },
      { source: '/numerique/:slug*', destination: '/outils/numerique/:slug*', permanent: true },
      { source: '/repas/:slug*', destination: '/outils/repas/:slug*', permanent: true },
      { source: '/habillement/:slug*', destination: '/outils/habillement/:slug*', permanent: true },
      { source: '/mobilier/:slug*', destination: '/outils/mobilier/:slug*', permanent: true },
      { source: '/electromenager/:slug*', destination: '/outils/electromenager/:slug*', permanent: true },
      { source: '/boisson/:slug*', destination: '/outils/boisson/:slug*', permanent: true },
    ]
  },
}

// For all available options, see:
// https://github.com/getsentry/sentry-webpack-plugin#options.
const sentryWebpackPluginOptions = {
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options

  // Suppresses source map uploading logs during build
  silent: true,
  org: process.env.SENTRY_ORG,
  project: 'impact-co2',
  url: process.env.SENTRY_URL,
}

module.exports = () => withBundleAnalyzer(withSentryConfig(nextConfig, sentryWebpackPluginOptions))
