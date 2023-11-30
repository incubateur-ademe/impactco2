export function buildCurrentUrlFor(path: string) {
  return `${process.env.NEXT_PUBLIC_URL}${path.startsWith('/') ? '' : '/'}${path}`
}
