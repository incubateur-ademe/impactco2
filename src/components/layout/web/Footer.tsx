import Link from 'next/link'
import React from 'react'
import styled from 'styled-components'
import Ademe from 'components/base/Ademe'
import FooterLogo from 'components/base/FooterLogo'
import Marianne from 'components/base/Marianne'
import { Section, SectionWideContent } from 'components/base/Section'

export default function Footer() {
  return (
    <Wrapper>
      <LinearGradient>&nbsp;</LinearGradient>
      <Section>
        <SectionWideContent>
          <Grid>
            <div>
              <Logos>
                <Marianne />
                <Ademe />
                <FooterLogo />
              </Logos>
            </div>
            <div>
              <FooterExplain>
                <strong>Impact CO2</strong>
                <p>Le site de ressources qui vulgarise et valorise les données environnementales de l'ADEME</p>
              </FooterExplain>
            </div>
            <div className='gridlinks'>
              <FooterLink>
                <Link href='/plan-du-site' title='Plan du site'>
                  Plan du site
                </Link>
              </FooterLink>
              <FooterLink>
                <Link href='/accessibilite' title='Accessibilité (non conforme)'>
                  Accessibilité (non conforme)
                </Link>
              </FooterLink>
              <FooterLink>
                <Link href='/mentions-legales' title='Mentions légales'>
                  Mentions légales
                </Link>
              </FooterLink>
              <FooterLink>
                <Link href='/politique-de-confidentialite' title='Politique de confidentialité'>
                  Politique de confidentialité
                </Link>
              </FooterLink>
              <Version>Version : {process.env.thebuildid}</Version>
            </div>
          </Grid>
        </SectionWideContent>
      </Section>
    </Wrapper>
  )
}

const Logos = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-start;
  margin: 3rem 0 3rem 0;
  padding: 0 0.75rem;
  text-decoration: none;

  ${(props) => props.theme.mq.small} {
    font-size: 1rem;
    padding: 0 0.25rem;
  }
  ${(props) => props.theme.mq.medium} {
    margin: 1.5rem 0 0 0;
  }
`

const FooterExplain = styled.div`
  margin: 3rem 0 3rem 0;
  p {
    margin-bottom: 0;
  }
  ${(props) => props.theme.mq.medium} {
    margin: 1.5rem 0 1.5rem 0;
  }
`

const FooterLink = styled.div`
  a {
    color: ${(props) => props.theme.colors.deepDarkReversible};
    cursor: pointer;
    font-size: 0.75rem;
    font-weight: 400;
    letter-spacing: 0em;
    margin-left: 1.5rem;
    ${(props) => props.theme.mq.medium} {
      margin-left: inherit;
    }
    text-decoration: none;
  }
`

const Wrapper = styled.div`
  background-color: ${(props) => props.theme.colors.sky};
  margin-top: 0;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  ${(props) => props.theme.mq.medium} {
    grid-template-columns: repeat(1, 1fr);
  }
  > .gridlinks {
    display: flex;
    grid-column: span 2;
    ${(props) => props.theme.mq.medium} {
      flex-direction: column;
      grid-column: inherit;
    }
    margin-bottom: 1rem;
  }
`

const Version = styled.div`
  font-size: 0.75rem;
  font-weight: 300;
  margin-left: auto;
  margin-top: inherit;
  ${(props) => props.theme.mq.medium} {
    margin-left: inherit;
    margin-top: 1rem;
  }
`

const LinearGradient = styled.div`
  background: ${(props) => `linear-gradient(white, ${props.theme.colors.sky})`};
  height: 8rem;
`
