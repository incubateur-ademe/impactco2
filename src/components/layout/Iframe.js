import React, { useContext } from 'react'
import styled from 'styled-components'
import Script from 'next/script'

import ModalContext from 'components/providers/ModalProvider'
import useInteraction from 'hooks/useInteraction'
import ButtonLink from 'components/base/ButtonLink'
import IframeFooter from './iframe/IframeFooter'

const Wrapper = styled.div`
  padding: 1rem 0;
`
const StyledButtonLink = styled(ButtonLink)`
  display: block;
  margin: 0 auto;
  text-align: center;
`
export default function Iframe(props) {
  useInteraction()

  const { setCo2e, setSurvey } = useContext(ModalContext)

  return (
    <>
      <Wrapper>
        {props.children}
        <StyledButtonLink onClick={() => setSurvey(true)}>
          Répondez à notre enquête utilisateur !
        </StyledButtonLink>
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
