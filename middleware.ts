import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const host = request.headers.get('host')
  if (host === 'monconvertisseurco2.fr') {
    if (request.nextUrl.pathname === '/iframe.js') {
      return NextResponse.redirect('https://impactco2.fr/iframe.js')
    }
    return NextResponse.redirect('https://impactco2.fr/comparateur')
  }
}
