import React, { useState } from 'react'
import styled from 'styled-components'
import { MEDIA } from 'utils/styles'
import { Emojis } from 'components/visualizations/Visualization.styles'

export default function AdviceLivraisonDetail(props) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  const collapserClicked = () => {
    setIsCollapsed(!isCollapsed)
  }

  return (
    <>
      <Wrapper $collapsed={isCollapsed}>
        <Header $collapsed={isCollapsed}>
          <Collapser onClick={collapserClicked} $collapsed={isCollapsed}>
            {isCollapsed ? <>+</> : <>_</>}
          </Collapser>
          <H3Title>{props.title}</H3Title>
        </Header>
        <TextContent $collapsed={isCollapsed}>
          {props.line1Text ? (
            <>
              <Item>
                <Line>
                  <Icon>
                    <Emojis>{props.line1Emoji}</Emojis>
                  </Icon>
                  <Text>{props.line1Text}</Text>
                </Line>
                <Line>
                  <Icon />
                  <Subtext>{props.line1Subtext}</Subtext>
                </Line>
              </Item>
            </>
          ) : (
            <></>
          )}
          {props.line2Text ? (
            <>
              <Item>
                <Line>
                  <Icon>
                    <Emojis>{props.line2Emoji}</Emojis>
                  </Icon>
                  <Text>{props.line2Text}</Text>
                </Line>
                <Line>
                  <Icon />
                  <Subtext>{props.line2Subtext}</Subtext>
                </Line>
              </Item>
            </>
          ) : (
            <></>
          )}
          {props.line3Text ? (
            <>
              <Item>
                <Line>
                  <Icon>
                    <Emojis>{props.line3Emoji}</Emojis>
                  </Icon>
                  <Text>{props.line3Text}</Text>
                </Line>
                <Line>
                  <Icon />
                  <Subtext>{props.line3Subtext}</Subtext>
                </Line>
              </Item>
            </>
          ) : (
            <></>
          )}
        </TextContent>
      </Wrapper>
    </>
  )
}

const Wrapper = styled.section`
  background-color: var(--neutral-10);
  border-radius: 8px;
  padding: 1.5rem 1rem;
  padding: ${(props) => (!props.$collapsed ? '1.5rem 1rem 1.5rem 1rem' : '1.5rem 1rem 0 1rem')};
`

const H3Title = styled.h3`
  color: var(--primary-60);
  font-size: 1rem;
  ${MEDIA.LT.SMALL} {
    font-size: 0.875rem;
  }
  font-weight: 700;
  line-height: 24px;
  margin-left: 0.5rem;
`

const Header = styled.header`
  display: flex;
  padding-bottom: ${(props) => (!props.$collapsed ? '1rem' : '0.5rem')};
`

const Line = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-start;
`

const Icon = styled.div`
  margin-right: 0.5rem;
  min-width: 40px;
  > span {
    margin-bottom: 0;
  }
`

const Text = styled.div`
  color: var(--neutral-80);
  font-size: 1rem;
  ${MEDIA.LT.SMALL} {
    font-size: 0.875rem;
  }
  line-height: 24px;
`

const Subtext = styled.div`
  color: var(--neutral-50);
  font-size: 0.75rem;
  line-height: 16px;
`

const Item = styled.div`
  margin-bottom: 1rem;
`

const Collapser = styled.button`
  background: transparent;
  border: 0;
  cursor: pointer;
  font-size: '48px';
  height: 1.5rem;
  line-height: 1rem;
  margin-top: ${(props) => (!props.$collapsed ? '-8px' : '-2px')};
  padding: 0;
`

const TextContent = styled.div`
  display: ${(props) => (!props.$collapsed ? 'block' : 'none')};
`
