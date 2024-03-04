import React, { useState } from 'react'
import styled from 'styled-components'
import { MEDIA } from 'utils/styles'
import useScreenshot from 'hooks/useScreenshot'
import Background from 'components/screenshot/Background'
import Buttons from 'components/screenshot/Buttons'
import Signature from 'components/screenshot/Signature'

const SizerWrapper = styled.div`
  ${MEDIA.LT.MEDIUM} {
    overflow: hidden;
  }
`
const Sizer = styled.div`
  margin: -1.5rem;
  position: relative;

  ${MEDIA.LT.MEDIUM} {
    margin: -0.75rem;
  }
`
const Content = styled.div`
  background-color: ${(props) => (props.$hover ? 'var(--neutral-00)' : 'transparent')};
`
const Header = styled.div`
  align-items: flex-start;
  display: flex;
  justify-content: space-between;
`
const StyledButtons = styled(Buttons)`
  margin-top: 0.5rem;
`
export default function Wrapper(props) {
  const [hover, setHover] = useState(false)

  const { ref, takeScreenshot, isScreenshotting } = useScreenshot(props.slug || 'impactco2', 'Usage numérique')

  return (
    <SizerWrapper>
      <Sizer className={props.className}>
        <Content ref={ref} $hover={hover}>
          <Background hover={hover}>
            <Header>
              <h1>{props.name}</h1>
              <StyledButtons
                takeScreenshot={takeScreenshot}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                tracking={props.name}
              />
            </Header>
            {props.children}
          </Background>
          {isScreenshotting && <Signature />}
        </Content>
      </Sizer>
    </SizerWrapper>
  )
}
