import Head from 'next/head'
import Script from 'next/script'
import React, { ReactNode, useEffect } from 'react'
import styled from 'styled-components'
import IframeFooter from './iframe/IframeFooter'

const Wrapper = styled.div`
  padding: 1rem 0;
`
export default function Iframe({ children, noLogo }: { children: ReactNode; noLogo?: boolean }) {
  useEffect(() => {
    if (window) {
      console.log('Iframe')
      console.log(JSON.stringify(window.location))
    }
  }, [])

  return (
    <>
      <Wrapper>
        <Head>
          <meta name='robots' content='noindex' />
        </Head>
        {children}
        {!noLogo && <IframeFooter />}
      </Wrapper>
      <Script
        src='https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/4.3.2/iframeResizer.contentWindow.min.js'
        integrity='sha512-14SY6teTzhrLWeL55Q4uCyxr6GQOxF3pEoMxo2mBxXwPRikdMtzKMYWy2B5Lqjr6PHHoGOxZgPaxUYKQrSmu0A=='
        crossOrigin='anonymous'
        referrerPolicy='no-referrer'
      />
    </>
  )
}
