import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  console.log(request.url)
  console.log(request.referrer)
  if (request.nextUrl.hostname.includes('monconvertisseurco2.fr')) {
    if (request.nextUrl.pathname === 'iframe.js') {
      return NextResponse.redirect('https://impactco2.fr/iframe.js')
    }
    return NextResponse.redirect('https://impactco2.fr/comparateur')
  }
}
