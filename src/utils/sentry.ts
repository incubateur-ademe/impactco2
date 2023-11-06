import * as Sentry from '@sentry/nextjs'

export const initializeSentry = () => {
  if (!process.env.NEXT_PUBLIC_SENTRY_DSN || process.env.NODE_ENV !== 'production') {
    return
  }

  Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
    environment: process.env.NEXT_PUBLIC_SENTRY_ENVIRONMENT,
    tracesSampleRate: 1,
  })
}
