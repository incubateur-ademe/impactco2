export {}

declare global {
  interface Window {
    please: {
      track: (events: string[]) => void
    }
  }
}
