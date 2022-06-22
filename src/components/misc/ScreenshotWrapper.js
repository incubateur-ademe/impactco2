import React from 'react'
import styled from 'styled-components'

import useScreenshot from 'hooks/useScreenshot'
import Buttons from './screenshotWrapper/Buttons'
import Signature from './screenshotWrapper/Signature'

const Wrapper = styled.div`
  position: relative;
  height: 100%;
  background-color: ${(props) => props.theme.colors.background};
`
const Background = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${(props) => props.theme.colors.second};
  border-radius: 1rem;
`
const Content = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  padding: 1.5rem;
`
export default function VisualizationWrapper(props) {
  const { ref, takeScreenshot, isScreenshotting } = useScreenshot(
    props.equivalent.slug || 'monconvertisseurco2'
  )

  return (
    <Wrapper ref={ref}>
      <Background className='noscreenshot' />
      <Buttons takeScreenshot={takeScreenshot} />
      <Content>{props.children}</Content>
      {isScreenshotting && <Signature />}
    </Wrapper>
  )
}
