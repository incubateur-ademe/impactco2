/* eslint-disable @typescript-eslint/no-var-requires */
const { withSentryConfig } = require('@sentry/nextjs')
const { execSync } = require('child_process')
const { readFileSync } = require('fs')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const getLocalGitCommitHash = function () {
  let res = ''
  try {
    res = execSync('git rev-parse HEAD').toString().trim()
  } catch (e) {
    console.log('Git is not executable here...')
  }
  return res
}

const getLastVersion = function () {
  let result = 'unknown'
  const data = readFileSync('./CHANGELOG.md', 'utf8')
  // Define the regular expression pattern to match version numbers
  const versionPattern = /^##\s\[?(\d+\.\d+\.\d+)\]?(?:.*?)$/m

  // Search for version numbers in the CHANGELOG
  const versions = data.match(versionPattern)

  if (versions && versions.length > 1) {
    // The latest version will be the second match
    result = versions[1]
  } else {
    result = 'No release versions found in the CHANGELOG.'
  }
  return result
}

const buildFullVersionNumber = function () {
  const semver = getLastVersion()
  console.log('Current semver version:', semver)
  return semver
}

const buildShortSha = function (scalingoLongSha) {
  const netlifySha = process.env.COMMIT_REF
  const shortSha = getShortSha(scalingoLongSha || netlifySha || getLocalGitCommitHash())
  console.log('Current shortSha is: ', shortSha)
  return shortSha
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
  i18n: {
    locales: ['fr'],
    defaultLocale: 'fr',
  },
  env: {
    thebuildid: buildFullVersionNumber() + '-' + buildShortSha(process.env.SOURCE_VERSION),
    websiteurl: process.env.WEBSITE_URL,
  },
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/
  sentry: {
    autoInstrumentServerFunctions: true,
    autoInstrumentMiddleware: true,
    widenClientFileUpload: true,
    hideSourceMaps: true,
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      Object.assign(config.resolve.alias, {
        react: 'preact/compat',
        'react-dom/test-utils': 'preact/test-utils',
        'react-dom': 'preact/compat',
      })
    }
    return config
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
    ]
  },
}

// For all available options, see:
// https://github.com/getsentry/sentry-webpack-plugin#options.
const sentryWebpackPluginOptions = {
  silent: true, // Suppresses all logs
}

module.exports = withBundleAnalyzer(withSentryConfig(nextConfig, sentryWebpackPluginOptions))
