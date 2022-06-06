import React from 'react'
import styled from 'styled-components'

import useScreenshot from 'hooks/useScreenshot'
import Buttons from './Buttons'
import Signature from './Signature'

const Wrapper = styled.div`
  position: relative;
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
  min-height: ${(props) => (props.fixed ? '21rem' : 'none')};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1.5rem;
`
export default function VisualizationWrapper(props) {
  const { ref, takeScreenshot, isScreenshotting } = useScreenshot(
    props.equivalent.slug
  )

  return (
    <Wrapper ref={ref}>
      <Background className='noscreenshot' />
      <Content fixed={props.fixed}>{props.children}</Content>
      <Buttons takeScreenshot={takeScreenshot} />
      {isScreenshotting && <Signature />}
    </Wrapper>
  )
}
