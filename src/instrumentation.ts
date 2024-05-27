import { initializeSentry } from 'utils/sentry'

export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs' || process.env.NEXT_RUNTIME === 'edge') {
    initializeSentry()
  }
}
