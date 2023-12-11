import React, { useState } from 'react'
import styled from 'styled-components'
import useScreenshot from 'hooks/useScreenshot'
import Background from 'components/screenshot/Background'
import Buttons from 'components/screenshot/Buttons'
import Signature from 'components/screenshot/Signature'

const Wrapper = styled.div`
  background-color: ${(props) => props.theme.colors.background};
  height: 100%;
  position: relative;
`
const StyledButtons = styled(Buttons)`
  bottom: 1rem;
  position: absolute;
  right: 1rem;

  ${(props) => props.theme.mq.small} {
    bottom: 0.5rem;
    right: 50%;
    transform: translateX(50%);
  }
`
export default function ScreenshotWrapper(props) {
  const [hover, setHover] = useState(false)

  const { ref, takeScreenshot, isScreenshotting } = useScreenshot(props.equivalent?.slug || 'impactco2', props.tracking)

  return (
    <Wrapper className={props.className} ref={ref}>
      <Background className='noscreenshot' background={props.background} hover={hover}>
        {props.children}
      </Background>
      {isScreenshotting ? (
        <Signature />
      ) : (
        <StyledButtons
          takeScreenshot={takeScreenshot}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          slug={props.equivalent?.slug}
          tracking={`${props.equivalent?.slug}-${props.tracking}`}
        />
      )}
    </Wrapper>
  )
}
