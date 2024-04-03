export function buildCurrentUrlFor(path: string) {
  try {
    return path.startsWith('http')
      ? path
      : `${process.env.NEXT_PUBLIC_URL || 'https://impactco2.fr'}${path.startsWith('/') ? '' : '/'}${path}`
  } catch {
    // in case process.env is not defined (in scripts for exemple...)
    return `https://impactco2.fr${path.startsWith('/') ? '' : '/'}${path}`
  }
}
