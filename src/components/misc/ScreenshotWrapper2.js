import React from 'react'
import styled from 'styled-components'
import Background from 'components/screenshot/Background'
import Signature from 'components/screenshot/Signature'

const Wrapper = styled.div`
  background-color: var(--neutral-00);
  height: 100%;
  position: relative;
  > div + div {
    padding: 0;
  }
`

export default function ScreenshotWrapper2(props) {
  return (
    <Wrapper className={props.className} ref={props.innerRef}>
      <Background className='noscreenshot' background={props.background}>
        <DynamicBackgroundPadding $isScreenshotting={props.isScreenshotting}>{props.children}</DynamicBackgroundPadding>
      </Background>

      {props.isScreenshotting && (
        <>
          <br />
          <Signature />
          <br />
        </>
      )}
    </Wrapper>
  )
}

const DynamicBackgroundPadding = styled.div`
  padding: ${({ $isScreenshotting }) => ($isScreenshotting ? '1rem' : '0')};
`
