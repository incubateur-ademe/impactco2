import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  position: relative;
  display: inline-block;
  margin-bottom: 0.125rem;
`
const Title = styled.div`
  position: relative;
  font-size: 0.875rem;
  color: ${(props) => props.theme.colors.text};

  ${(props) => props.theme.mq.small} {
    font-size: 0.75rem;
  }
`
const Subtitle = styled.span`
  font-weight: 300;
  line-height: 0;
`
export default function TitleComponent(props) {
  return (
    <Wrapper>
      <Title>
        {props.title}
        {props.subtitle && <Subtitle> {props.subtitle}</Subtitle>}
      </Title>
      {props.component}
    </Wrapper>
  )
}
