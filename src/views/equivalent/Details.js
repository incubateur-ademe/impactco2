import React from 'react'
import styled from 'styled-components'

import { formatName } from 'utils/formatters'
import Section from 'components/base/Section'
import MagicLink from 'components/base/MagicLink'
import ShareButton from 'components/misc/ShareButton'
import Value from './details/Value'
import Visualization from './details/Visualization'

const Title = styled.h1``
const Subtitle = styled.span`
  font-size: 1.75rem;
  font-weight: 300;
  line-height: 0;
`
const Disclaimer = styled.p`
  max-width: 27.25rem;
  margin-bottom: 3.5rem;
  font-size: 0.875rem;
`
const StyledMagicLink = styled(MagicLink)`
  font-size: 0.875rem;
`
export default function Details(props) {
  return (
    <>
      <Section>
        <Section.Content flex>
          <Title>
            {props.category.multiplier !== 1 ? '1 ' : ''}
            {formatName(
              props.equivalent.name.fr,
              1,
              props.category.multiplier === 1
            )}{' '}
            {props.equivalent.subtitle && (
              <Subtitle>
                ({formatName(props.equivalent.subtitle.fr, 1)})
              </Subtitle>
            )}
          </Title>
          <ShareButton title />
        </Section.Content>
      </Section>
      <Value equivalent={props.equivalent} />
      <Section>
        <Section.Content flex>
          <Disclaimer>
            Valeurs exprimées en kg CO2e émis {props.category?.unit}.
          </Disclaimer>
          <StyledMagicLink to={props.equivalent.source}>Source</StyledMagicLink>
        </Section.Content>
      </Section>
      <Visualization equivalent={props.equivalent} />
    </>
  )
}
