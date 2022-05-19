import React from 'react'
import styled from 'styled-components'
import IframeResizer from 'iframe-resizer-react'

import Section from 'components/base/Section'
import Configurator from 'components/misc/Configurator'

const StyledIframeResizer = styled(IframeResizer)`
  width: 100%;
  border: 0.125rem solid ${(props) => props.theme.colors.second};
  border-radius: 1rem;
`
export default function Integration() {
  return (
    <Section>
      <Section.Content>
        <Configurator />
        <StyledIframeResizer
          src={'http://localhost:8000/iframes/tuiles'}
          allowfullscreen={true}
          webkitallowfullscreen={true}
          mozallowfullscreen={true}
        />
      </Section.Content>
    </Section>
  )
}
