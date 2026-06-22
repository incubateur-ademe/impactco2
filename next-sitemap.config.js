/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_URL || 'https://impactco2.fr',
  exclude: ['/iframes/**', '/suggestion/**', '/rendez-vous/**'],
}
