var shell = require('shelljs')

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
    thebuildid: shell.exec('git describe --long  --abbrev=10 --tags'),
    customKey: 'my-value',
  },
}

module.exports = nextConfig
