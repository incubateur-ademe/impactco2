import React from 'react'
import styled from 'styled-components'
import Head from 'next/head'
import Script from 'next/script'

import useInteraction from 'hooks/useInteraction'
import IframeFooter from './iframe/IframeFooter'

const Wrapper = styled.div`
  padding: 1rem 0;
`
export default function Iframe(props) {
  useInteraction()

  return (
    <>
      <Wrapper>
        <Head>
          <meta name='robots' content='noindex' />
        </Head>
        {props.children}
        <IframeFooter />
      </Wrapper>
      <Script
        src='https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/4.3.2/iframeResizer.contentWindow.min.js'
        integrity='sha512-14SY6teTzhrLWeL55Q4uCyxr6GQOxF3pEoMxo2mBxXwPRikdMtzKMYWy2B5Lqjr6PHHoGOxZgPaxUYKQrSmu0A=='
        crossOrigin='anonymous'
        referrerPolicy='no-referrer'
      ></Script>
    </>
  )
}
