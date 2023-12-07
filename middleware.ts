import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  let host = request.headers.get('host')
  console.log('middleware')
  console.log(host)
  console.log(request.headers.get('baseUrl'))
  console.log(request.headers.get('origin'))
  console.log(host)
  request.headers.forEach(console.log)
  let protocol = /^localhost(:\d+)?$/.test(host || '') ? 'http:' : 'https:'

  // If server sits behind reverse proxy/load balancer, get the "actual" host ...
  const forwardedHost = request.headers.get('x-forwarded-host')
  if (forwardedHost && typeof forwardedHost === 'string') {
    host = forwardedHost
  }

  // ... and protocol:
  const forwardedProtocol = request.headers.get('x-forwarded-proto')
  if (forwardedProtocol && typeof forwardedProtocol === 'string') {
    protocol = `${forwardedProtocol}:`
  }

  console.log(protocol + '//' + host)
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/(iframe|iframelivraiosn).js',
}
