/* eslint-disable @typescript-eslint/no-var-requires */
const helmet = require('helmet')
const { PHASE_PRODUCTION_BUILD } = require('next/constants')
const { withSentryConfig } = require('@sentry/nextjs')
const { execSync } = require('child_process')
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
    'https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/4.3.2/iframeResizer.contentWindow.min.js',
    `${process.env.NEXT_PUBLIC_MATOMO_SITE_URL}/matomo.js`,
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
      .filter((key) => key !== 'frame-ancestors')
      .map((key) => `${key} ${csp[key].join(' ')}`)
      .join(';'),
  },
]

const securityHeadersIFramable = [
  {
    key: 'Content-Security-Policy',
    value: Object.keys(csp)
      .map((key) => `${key} ${csp[key].join(' ')}`)
      .join(';'),
  },
]

const getLocalGitCommitHash = function () {
  let res = ''
  try {
    res = execSync('git rev-parse HEAD').toString().trim()
  } catch (e) {
    console.log('Git is not executable here...')
  }
  return res
}

const getShortSha = function (str) {
  let res = ''
  if (typeof str === 'string' && str.length > 0) {
    res = str.substring(0, 7)
  }
  return res
}

const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/
  sentry: {
    autoInstrumentServerFunctions: true,
    autoInstrumentMiddleware: true,
    widenClientFileUpload: true,
    hideSourceMaps: false,
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
        source: '/beta/:slug*',
        destination: '/api/:slug*',
        permanent: true,
      },
      {
        source: '/categories/deplacement/:slug*',
        destination: '/transport/:slug*',
        permanent: true,
      },
      {
        source: '/categories',
        destination: '/thematiques',
        permanent: true,
      },
      {
        source: '/convertisseur',
        destination: '/comparateur',
        permanent: true,
      },
      {
        source: '/categories/:slug*',
        destination: '/:slug*',
        permanent: true,
      },
      {
        source: '/empreinte-carbone/:slug*',
        destination: '/:slug*',
        permanent: true,
      },
      {
        source: '/iframes/categories/:slug*',
        destination: '/iframes/:slug*',
        permanent: true,
      },
      {
        source: '/iframes/empreinte-carbone/:slug*',
        destination: '/iframes/:slug*',
        permanent: true,
      },
      {
        source: '/iframes/tuiles',
        destination: '/iframes/comparateur',
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

module.exports = (phase) => {
  if (phase === PHASE_PRODUCTION_BUILD) {
    console.log('Current shortSha is: ', getShortSha(getLocalGitCommitHash()))
  }

  return withBundleAnalyzer(
    withSentryConfig(nextConfig, sentryWebpackPluginOptions, {
      // For all available options, see:
      // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

      // Upload a larger set of source maps for prettier stack traces (increases build time)
      widenClientFileUpload: true,

      // Transpiles SDK to be compatible with IE11 (increases bundle size)
      transpileClientSDK: true,

      // Routes browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers (increases server load)
      tunnelRoute: '/monitoring',

      // Hides source maps from generated client bundles
      hideSourceMaps: true,

      // Automatically tree-shake Sentry logger statements to reduce bundle size
      disableLogger: true,

      // Enables automatic instrumentation of Vercel Cron Monitors.
      // See the following for more information:
      // https://docs.sentry.io/product/crons/
      // https://vercel.com/docs/cron-jobs
      automaticVercelMonitors: true,
    })
  )
}
