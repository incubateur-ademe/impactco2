import React, { useState } from 'react'
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
  const [theme, setTheme] = useState('default')
  return (
    <Section>
      <Section.Content>
        <Configurator theme={theme} setTheme={setTheme} />
        <StyledIframeResizer
          src={`${window.location.origin}/iframes/tuiles?theme=${theme}`}
          allowfullscreen={true}
          webkitallowfullscreen={true}
          mozallowfullscreen={true}
        />
      </Section.Content>
    </Section>
  )
}
