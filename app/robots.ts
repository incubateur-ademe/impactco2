import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return process.env.NO_IMAGE === 'true'
    ? {
        rules: {
          userAgent: '*',
          allow: '/',
        },
        sitemap: 'https://impactco2.fr/sitemap.xml',
      }
    : {
        rules: {
          userAgent: '*',
          disallow: '/',
        },
        sitemap: 'https://impactco2.fr/sitemap.xml',
      }
}
