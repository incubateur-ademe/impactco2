import React from 'react'
import styled from 'styled-components'

import Section from 'components/base/Section'
import Boeuf from './visualization/Boeuf'
import Smartphone from './visualization/Smartphone'

const visualizations = {
  20689: <Boeuf />,
  27012: <Smartphone />,
}
const Wrapper = styled.div`
  margin-bottom: 4rem;
  padding: 1.5rem;
  background-color: ${(props) => props.theme.colors.secondLight};
  border-radius: 1rem;
`
export default function Visualization(props) {
  return visualizations[props.equivalent.id] ? (
    <Section>
      <Section.Content>
        <Wrapper>{visualizations[props.equivalent.id]}</Wrapper>
      </Section.Content>
    </Section>
  ) : null
}
