import React, { useState } from 'react'
import styled from 'styled-components'

import useScreenshot from 'hooks/useScreenshot'
import Background from 'components/screenshot/Background'
import Buttons from 'components/screenshot/Buttons'
import Signature from 'components/screenshot/Signature'
import MonthSelector from './wrapper/MonthSelector'

const SizerWrapper = styled.div`
  ${(props) => props.theme.mq.medium} {
    overflow: hidden;
  }
`
const Sizer = styled.div`
  position: relative;
  margin: -1.5rem;
  background-color: ${(props) =>
    props.hover ? props.theme.colors.background : 'transparent'};
`
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`
const Title = styled.h1`
  letter-spacing: -0.1rem;
`
const StyledButtons = styled(Buttons)`
  margin-top: 0.5rem;

  ${(props) => props.theme.mq.small} {
    margin-top: 0;
  }
`
export default function Wrapper(props) {
  const [hover, setHover] = useState(false)

  const { ref, takeScreenshot, isScreenshotting } = useScreenshot(
    props.slug || 'monconvertisseurco2'
  )

  return (
    <SizerWrapper>
      <Sizer className={props.className} ref={ref} hover={hover}>
        <Background hover={hover}>
          <Header>
            <Title>
              Les fruits et légumes de <MonthSelector month={props.month} />
            </Title>
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
      </Sizer>
    </SizerWrapper>
  )
}
