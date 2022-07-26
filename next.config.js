/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  i18n: {
    locales: ['fr'],
    defaultLocale: 'fr',
  },
}

module.exports = nextConfig
