import React from 'react'
import styled from 'styled-components'

import ademe from './footer/ademe.jpg'
import repufrancaise from './footer/repufrancaise.jpg'

import MagicLink from 'components/base/MagicLink'
import ThemeToggle from 'components/base/ThemeToggle'
import ContactPrompt from 'components/base/ContactPrompt'
import Button from 'components/base/Button'
import Logo from 'components/base/Logo'
import MobileButtons from './footer/MobileButtons'

const Wrapper = styled.div`
  position: relative;
  background-color: ${(props) =>
    props.theme.colors[props.background || 'second']};
  transition: all 600ms;
`
const Content = styled.div`
  max-width: ${(props) => props.width || '37rem'};
  margin: 0 auto;
  padding: 2rem 1rem 1rem;
`
const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 2rem;

  h2,
  h3 {
    font-size: 1.75rem;
  }
`
const CenterSection = styled(Section)`
  align-items: center;
`
const LogosWrapper = styled.div`
  display: flex;
  justify-content: center;
`
const Logos = styled(MagicLink)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  text-decoration: none;
  background-color: white;
`
const Institution = styled.img`
  display: block;
  height: 5.625em;
`
const StyledButton = styled(Button)`
  align-self: center;
`
export default function Footer(props) {
  return (
    <Wrapper background={props.background} id='about'>
      <Content>
        <MobileButtons />
        <CenterSection>
          <ThemeToggle mobile />
        </CenterSection>
        <Section>{props.children}</Section>
        <Section>
          <ContactPrompt />
        </Section>
        <Section>
          <h2>Qui sommes-nous ?</h2>
          <p>
            <MagicLink to='https://datagir.ademe.fr/'>
              <strong>Datagir</strong>
            </MagicLink>{' '}
            est un <strong>service public gratuit</strong>, porté par l’
            <MagicLink to='https://www.ademe.fr/'>ADEME</MagicLink> et
            l’incubateur de la DINUM{' '}
            <MagicLink to='https://beta.gouv.fr/'>beta.gouv.fr</MagicLink>.
          </p>
          <p>
            Notre mission est de{' '}
            <strong>
              diffuser les informations et données environnementales en
              open-data de l’ADEME
            </strong>{' '}
            pour encourager l’amélioration continue et l’innovation. Pour cela,{' '}
            <strong>
              nous accompagnons toutes les applications & services dans leur
              démarche responsable
            </strong>{' '}
            par l'appropriation et l’intégration de ces données afin d’apporter
            l’information au plus près des citoyens.
          </p>
          <StyledButton to='https://datagir.ademe.fr/#applications'>
            Voir tous nos simulateurs
          </StyledButton>
        </Section>
      </Content>
      <LogosWrapper>
        <Logos to='https://datagir.ademe.fr/'>
          <Institution src={repufrancaise} alt='République Française' />
          <Institution src={ademe} alt='ADEME' />
          <Logo />
        </Logos>
      </LogosWrapper>
    </Wrapper>
  )
}
