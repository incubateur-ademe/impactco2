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
    'https://stats.data.gouv.fr',
    'https://photon.komoot.io',
    'https://sentry.incubateur.net',
    'https://cdn.jsdelivr.net',
  ],
  'script-src': [
    "'self'",
    'https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/4.3.2/iframeResizer.contentWindow.min.js',
    'https://stats.data.gouv.fr/matomo.js',
  ],
}

if (process.env.UNSAFE_EVAL === 'true') {
  csp['script-src'].push("'unsafe-eval'")
}

const securityHeaders = [
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
  i18n: {
    locales: ['fr'],
    defaultLocale: 'fr',
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
        destination: '/iframes/convertisseur',
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
  silent: true, // Suppresses all logs
}

module.exports = (phase) => {
  if (phase === PHASE_PRODUCTION_BUILD) {
    console.log('Current shortSha is: ', getShortSha(getLocalGitCommitHash()))
  }

  return withBundleAnalyzer(withSentryConfig(nextConfig, sentryWebpackPluginOptions))
}
