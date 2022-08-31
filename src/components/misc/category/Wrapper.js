import React, { useState } from 'react'
import styled from 'styled-components'

import useScreenshot from 'hooks/useScreenshot'
import Background from 'components/screenshot/Background'
import Buttons from 'components/screenshot/Buttons'
import Signature from 'components/screenshot/Signature'

const Wrapper = styled.div`
  position: relative;
  margin: -1.5rem;
  background-color: ${(props) => props.theme.colors.background};
`
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`
const Title = styled.h1``
const StyledButtons = styled(Buttons)`
  margin-top: 0.5rem;
`
export default function VisualizationWrapper(props) {
  const [hover, setHover] = useState(false)

  const { ref, takeScreenshot, isScreenshotting } = useScreenshot(
    props.slug || 'monconvertisseurco2'
  )

  return (
    <Wrapper className={props.className} ref={ref}>
      <Background hover={hover}>
        <Header>
          <Title>{props.name}</Title>
          <StyledButtons
            takeScreenshot={takeScreenshot}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            slug={`categories/${props.slug}`}
          />
        </Header>
        {props.children}
      </Background>
      {isScreenshotting && <Signature />}
    </Wrapper>
  )
}
