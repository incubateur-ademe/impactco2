import React from 'react'
import styled from 'styled-components'

import Section from 'components/base/Section'

const Wrapper = styled.div`
  margin-bottom: 2rem;
  font-size: 0.75rem;
  font-weight: 300;

  ${(props) => props.theme.mq.small} {
    display: none;
  }
`
export default function BreadCrumb(props) {
  return (
    <Section>
      <Section.Content>
        <Wrapper>BreadCrumb</Wrapper>
      </Section.Content>
    </Section>
  )
}
