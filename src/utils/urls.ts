export function buildCurrentUrlFor(path: string) {
  return path.startsWith('http')
    ? path
    : `${process?.env?.NEXT_PUBLIC_URL || 'https://impactco2.fr'}${path.startsWith('/') ? '' : '/'}${path}`
}
