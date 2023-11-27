import React, { ReactNode, useState } from 'react'
import styled from 'styled-components'
import useScreenshot from 'hooks/useScreenshot'
import Background from 'components/screenshot/Background'
import Buttons from 'components/screenshot/Buttons'
import Signature from 'components/screenshot/Signature'

const Sizer = styled.div`
  position: relative;
`

const Content = styled.div<{ $hover?: boolean }>`
  background-color: ${({ $hover, theme }) => ($hover ? theme.colors.background : 'transparent')};
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
export default function Wrapper({ slug, name, children }: { slug: string; name: string; children: ReactNode }) {
  const [hover, setHover] = useState(false)

  const { ref, takeScreenshot, isScreenshotting } = useScreenshot(slug || 'impactco2')

  return (
    <Sizer>
      <Content ref={ref} $hover={hover}>
        <Background hover={hover}>
          <Header>
            <StyledButtons
              takeScreenshot={takeScreenshot}
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
              slug={`${slug}`}
            />
            <Title
              dangerouslySetInnerHTML={{
                __html: name,
              }}
            />
          </Header>
          {children}
          {isScreenshotting && <Signature />}
        </Background>
      </Content>
    </Sizer>
  )
}
