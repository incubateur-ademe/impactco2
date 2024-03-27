export function buildCurrentUrlFor(path: string) {
  return path.startsWith('http') ? path : `${process.env.NEXT_PUBLIC_URL}${path.startsWith('/') ? '' : '/'}${path}`
}
