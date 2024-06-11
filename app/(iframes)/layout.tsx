import Script from 'next/script'
import React, { Suspense } from 'react'
import { ParamProvider } from 'src/providers/ParamProvider'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Script
        src='https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/4.3.2/iframeResizer.contentWindow.min.js'
        integrity='sha512-14SY6teTzhrLWeL55Q4uCyxr6GQOxF3pEoMxo2mBxXwPRikdMtzKMYWy2B5Lqjr6PHHoGOxZgPaxUYKQrSmu0A=='
        crossOrigin='anonymous'
        referrerPolicy='no-referrer'
      />
      <Suspense fallback={<div className='blank' />}>
        <ParamProvider>
          <main className='main-container'>
            <div className='main-iframe'>{children}</div>
          </main>
        </ParamProvider>
      </Suspense>
    </>
  )
}

export default Layout
