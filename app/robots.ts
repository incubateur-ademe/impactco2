import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return process.env.NO_IMAGE === 'true'
    ? {
        rules: {
          userAgent: '*',
          allow: '/',
        },
      }
    : {
        rules: {
          userAgent: '*',
          disallow: '/',
        },
      }
}
