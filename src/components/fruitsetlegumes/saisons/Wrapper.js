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
  margin: -1.5rem;
  position: relative;

  ${(props) => props.theme.mq.medium} {
    margin: -0.75rem;
  }
`
const Content = styled.div`
  background-color: ${(props) => (props.hover ? props.theme.colors.background : 'transparent')};
`
const Header = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`
const Title = styled.h1`
  font-size: 180%;
  margin-bottom: 1rem;
  text-align: center;
`
const StyledButtons = styled(Buttons)`
  margin: -1rem 0 0.5rem;

  ${(props) => props.theme.mq.small} {
    margin-top: 0;
  }
`
export default function Wrapper(props) {
  const [hover, setHover] = useState(false)

  const { ref, takeScreenshot, isScreenshotting } = useScreenshot(props.slug || 'impactco2')

  return (
    <SizerWrapper>
      <Sizer className={props.className}>
        <Content ref={ref} hover={hover}>
          <Background hover={hover}>
            <Header>
              <StyledButtons
                takeScreenshot={takeScreenshot}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                slug={`${props.slug}`}
              />
              <Title>
                Découvrez les fruits et légumes de <MonthSelector month={props.month} />
              </Title>
            </Header>
            {props.children}
          </Background>
          {isScreenshotting && <Signature />}
        </Content>
      </Sizer>
    </SizerWrapper>
  )
}
