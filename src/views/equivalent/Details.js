import React from 'react'
import styled from 'styled-components'

import Section from 'components/base/Section'
import Value from './details/Value'
import Visualization from './details/Visualization'

const Title = styled.h1``
const Disclaimer = styled.p`
  max-width: 27.25rem;
  margin-bottom: 3.5rem;
  font-size: 0.875rem;
`
export default function Details(props) {
  return (
    <>
      <Section>
        <Section.Content>
          <Title>
            1 {props.equivalent.name.fr.replaceAll('[s]', '').toLowerCase()}
          </Title>
        </Section.Content>
      </Section>
      <Value equivalent={props.equivalent} />
      <Section>
        <Section.Content>
          <Disclaimer>
            Valeurs exprimées en kg CO2e émis {props.category?.unit}.
          </Disclaimer>
        </Section.Content>
      </Section>
      <Visualization equivalent={props.equivalent} />
    </>
  )
}
