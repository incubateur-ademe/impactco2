import React, { useState } from 'react'
import styled from 'styled-components'
import IframeResizer from 'iframe-resizer-react'

import Web from 'components/layout/Web'
import Section from 'components/base/Section'
import Configurator from 'components/views/integration/Configurator'

const StyledIframeResizer = styled(IframeResizer)`
  flex: 1;
  width: 100%;
  border: 0.125rem solid ${(props) => props.theme.colors.second};
  border-radius: 1rem;
`
const StyledSectionContent = styled(Section.Content)`
  align-items: flex-start;
  width: 75rem;
  max-width: 100vw;

  ${(props) => props.theme.mq.medium} {
    display: block;
  }
`
export default function Integration() {
  const [theme, setTheme] = useState('default')

  const [type, setType] = useState('tuiles')

  return (
    <Web>
      <Section>
        <StyledSectionContent flex>
          <Configurator
            theme={theme}
            setTheme={setTheme}
            type={type}
            setType={setType}
          />
          <StyledIframeResizer
            src={`/iframes/${type}?theme=${theme}`}
            allowfullscreen='true'
            webkitallowfullscreen='true'
            mozallowfullscreen='true'
          />
        </StyledSectionContent>
      </Section>
    </Web>
  )
}
