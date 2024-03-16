import Head from 'next/head'
import { useRouter } from 'next/router'
import Script from 'next/script'
import React, { ReactNode, useEffect, useRef, useState } from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import { track } from 'utils/matomo'
import IframeFooter from './iframe/IframeFooter'

const IframeStyle = createGlobalStyle`
body {
  background-color: transparent;
}
`

const Wrapper = styled.div`
  padding: 1rem 0;
`
export default function Iframe({ children, noLogo }: { children: ReactNode; noLogo?: boolean }) {
  const router = useRouter()
  // inspired from https://usehooks-ts.com/react-hook/use-intersection-observer
  const ref = useRef<HTMLDivElement | null>(null)
  const [entry, setEntry] = useState<IntersectionObserverEntry>()
  const [observed, setObserved] = useState(false)

  useEffect(() => {
    const node = ref.current // DOM Ref
    const hasIOSupport = !!window.IntersectionObserver
    const frozen = entry?.isIntersecting || observed
    if (!hasIOSupport || frozen || !node) {
      return
    }

    const observer = new IntersectionObserver(([entry]) => setEntry(entry))
    observer.observe(node)
    return () => observer.disconnect()
  }, [ref, setEntry, entry, observed])

  useEffect(() => {
    if (!observed && entry && entry.isIntersecting) {
      setObserved(true)
      track('IFrame', window.location.href, router.asPath)
    }
  }, [entry, observed, router])

  return (
    <>
      <Wrapper>
        <Head>
          <meta name='robots' content='noindex' />
        </Head>
        <div ref={ref}>{children}</div>
        {!noLogo && <IframeFooter />}
      </Wrapper>
      <IframeStyle />
      <Script
        src='https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/4.3.2/iframeResizer.contentWindow.min.js'
        integrity='sha512-14SY6teTzhrLWeL55Q4uCyxr6GQOxF3pEoMxo2mBxXwPRikdMtzKMYWy2B5Lqjr6PHHoGOxZgPaxUYKQrSmu0A=='
        crossOrigin='anonymous'
        referrerPolicy='no-referrer'
      />
    </>
  )
}
