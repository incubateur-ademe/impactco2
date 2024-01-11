import React from 'react'
import styled from 'styled-components'
import { MEDIA } from 'utils/styles'

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 0.125rem 0.5rem;
  margin-bottom: 0.125rem;
  position: relative;
`
const Title = styled.div`
  color: var(--neutral-70);
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 0.25rem;
  position: relative;

  ${MEDIA.LT.SMALL} {
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
      {props.children}
    </Wrapper>
  )
}
