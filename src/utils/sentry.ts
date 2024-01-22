import * as Sentry from '@sentry/nextjs'

export const initializeSentry = () => {
  if (!process.env.NEXT_PUBLIC_SENTRY_DNS || process.env.NODE_ENV !== 'production') {
    return
  }

  Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DNS,
    environment: process.env.NEXT_PUBLIC_SENTRY_ENVIRONMENT,
    tracesSampleRate: 0.01,
    ignoreTransactions: [/^middleware$/],
  })
}
