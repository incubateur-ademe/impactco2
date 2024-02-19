import Link from 'next/link'
import styled from 'styled-components'
import { MEDIA } from 'utils/styles'
import { Section, SectionWideContent } from 'components/base/Section'
import Signature from 'components/screenshot/Signature'

const getOpenIcon = () => {
  return (
    <svg className='openLink' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'>
      <path
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
        d='M18 14v4.8a1.2 1.2 0 0 1-1.2 1.2H5.2A1.2 1.2 0 0 1 4 18.8V7.2A1.2 1.2 0 0 1 5.2 6h4.6m4.4-2H20v5.8m-7.9 2L20 4.2'
      />
    </svg>
  )
}

export default function Footer() {
  return (
    <Wrapper id='footer'>
      <Section $withoutPadding>
        <SectionWideContent>
          <Grid>
            <GridOne>
              <GridOneA>
                <Logos>
                  <Signature noMargin noLink color='var(--primary-70)' />
                </Logos>
              </GridOneA>
              <GridOneB>
                <FooterExplain>
                  <strong>
                    Impact CO<sub>2</sub>
                  </strong>
                  <p>Le site de ressources qui vulgarise et valorise les données environnementales de l'ADEME</p>
                  <FollowNews>
                    <Link
                      href='https://fr.linkedin.com/showcase/accelerateurdelatransitionecologique-ademe/'
                      title='LinkedIn'
                      rel='noreferrer noopener'
                      target='_blank'>
                      Suivre nos actualités sur LinkedIn
                    </Link>
                    {getOpenIcon()}
                  </FollowNews>
                </FooterExplain>
              </GridOneB>
            </GridOne>
            <GridTwo>
              <GridTwoA>
                <div>
                  <div>
                    <strong>Liens utiles</strong>
                  </div>
                  <LinkContainer>
                    <Link href='/stats' title='Statistiques'>
                      Statistiques
                    </Link>
                    <Link
                      href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL}`}
                      target='_blank'
                      rel='noreferrer noopener'
                      title='Nous contacter'>
                      Nous contacter
                    </Link>
                  </LinkContainer>
                </div>
              </GridTwoA>
              <GridTwoB>
                <div>
                  <div>
                    <strong>Ressources</strong>
                  </div>
                  <LinkContainer>
                    <Link
                      href='https://accelerateur-transition-ecologique-ademe.notion.site/Kit-de-diffusion-Impact-CO2-b9d08930a49a4346830b7a12fd7cb733?pvs=4'
                      title='Kit de diffusion'
                      rel='noreferrer noopener'
                      target='_blank'>
                      Kit de diffusion
                    </Link>
                    <Link href='/api-doc' title='API Impact CO2'>
                      API Impact CO2
                    </Link>
                  </LinkContainer>
                </div>
              </GridTwoB>
            </GridTwo>
          </Grid>

          <div className='gridlinks'>
            <FooterLink>
              <Link className='first' href='/plan-du-site' title='Plan du site'>
                Plan du site
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
            <FooterLink>
              <Link href='/accessibilite' title='Accessibilité (non conforme)'>
                Accessibilité : non conforme
              </Link>
            </FooterLink>
            <FooterLink>
              <Link href='https://beta.gouv.fr/' title='beta.gouv.fr' target='_blank'>
                beta.gouv.fr
                {getOpenIcon()}
              </Link>
            </FooterLink>
            <FooterLink>
              <Link
                className='last'
                href='https://github.com/incubateur-ademe/impactco2'
                title='Code source'
                target='_blank'>
                Code source
                {getOpenIcon()}
              </Link>
            </FooterLink>
          </div>
        </SectionWideContent>
      </Section>
    </Wrapper>
  )
}

const LinkContainer = styled.div`
  display: flex;
  flex-direction: column;
  a {
    color: var(--neutral-70);
    cursor: pointer;
    text-decoration: none;
    margin-top: 0.25rem;
  }
  a:hover {
    text-decoration: underline;
  }
`

const Grid = styled.div`
  border-top: 1px solid var(--neutral-20);
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  padding: 3rem 0 3rem 0;
  ${MEDIA.LT.XLARGE} {
    padding: 3rem 0 1rem 0;
  }
  ${MEDIA.LT.LARGE} {
    padding: 3rem 0 1rem 0;
  }
  ${MEDIA.LT.MEDIUM} {
    padding: 3rem 0 0rem 0;
  }
  ${MEDIA.LT.SMALL} {
    padding: 3rem 0 0rem 0;
  }
`
const GridOne = styled.div`
  display: grid;
  grid-column: span 4;
  ${MEDIA.LT.XLARGE} {
    grid-column: span 3;
  }
  ${MEDIA.LT.MEDIUM} {
    grid-column: span 6;
  }
  grid-template-columns: repeat(5, 1fr);
`
const GridOneA = styled.div`
  align-items: center;
  display: flex;
  grid-column: span 2;
  ${MEDIA.LT.XLARGE} {
    grid-column: span 5;
  }
`
const GridOneB = styled.div`
  align-items: center;
  display: flex;
  grid-column: span 3;
  ${MEDIA.LT.XLARGE} {
    grid-column: span 5;
    padding-bottom: 1.5rem;
    padding-top: 4rem;
  }
  ${MEDIA.LT.LARGE} {
    padding-bottom: 2rem;
  }
  ${MEDIA.LT.MEDIUM} {
    padding-top: 3rem;
    padding-bottom: 2rem;
  }
  ${MEDIA.LT.SMALL} {
    padding-bottom: 1rem;
    padding-top: 1rem;
  }
`
const GridTwoA = styled.div`
  align-items: center;
  display: flex;
  padding-left: 1rem;
  ${MEDIA.LT.XLARGE} {
    align-items: stretch;
  }
  ${MEDIA.LT.LARGE} {
    grid-column: span 2;
  }
  ${MEDIA.LT.MEDIUM} {
    grid-column: span 1;
    padding-left: 0;
  }
  ${MEDIA.LT.SMALL} {
    grid-column: span 2;
    margin-bottom: 2rem;
    margin-top: 2rem;
  }
`
const GridTwoB = styled.div`
  align-items: center;
  display: flex;
  padding-left: 1rem;
  ${MEDIA.LT.XLARGE} {
    align-items: stretch;
  }
  ${MEDIA.LT.LARGE} {
    grid-column: span 2;
  }
  ${MEDIA.LT.MEDIUM} {
    grid-column: span 1;
    padding-left: 0;
  }
  ${MEDIA.LT.SMALL} {
    grid-column: span 2;
    margin-bottom: 2rem;
  }
`

const GridTwo = styled.div`
  display: grid;
  grid-column: span 2;
  ${MEDIA.LT.XLARGE} {
    grid-column: span 2;
  }
  ${MEDIA.LT.MEDIUM} {
    border-top: 1px solid var(--neutral-20);
    grid-column: span 6;
    grid-template-columns: repeat(3, 1fr);
    padding-bottom: 2rem;
    padding-top: 2rem;
  }
  ${MEDIA.LT.SMALL} {
    padding-bottom: 0.5rem;
    padding-top: 0.5rem;
  }
  grid-template-columns: repeat(2, 1fr);
`

const Logos = styled.div`
  display: flex;
`

const FollowNews = styled.p`
  color: var(--neutral-70);
  font-weight: 500;
  margin-top: 1rem;
  .openLink {
    height: 18px;
    width: 18px;
    margin-left: 0.25rem;
  }
  a {
    color: var(--neutral-70);
    cursor: pointer;
    text-decoration: none;
    margin-top: 0.25rem;
  }
  a:hover {
    text-decoration: underline;
  }
`

const FooterExplain = styled.div`
  max-width: 25rem;
  p {
    margin-bottom: 0;
  }
  ${MEDIA.LT.SMALL} {
    margin: 1.5rem 0 1.5rem 0;
  }
`

const FooterLink = styled.div`
  a {
    display: flex;
    align-items: center;
    color: var(--neutral-80);
    cursor: pointer;
    font-size: 0.75rem;
    font-weight: 400;
    letter-spacing: 0em;
    text-decoration: none;
    padding-left: 1.5rem;
    ${MEDIA.LT.SMALL} {
      padding-left: 0;
    }
  }
  a.first {
    padding-left: 0;
  }
  .openLink {
    height: 12px;
    margin-left: 0.25rem;
    width: 12px;
  }
  margin-bottom: 0.5rem;
`

const Wrapper = styled.footer`
  margin-top: 0;
  .gridlinks {
    border-top: 1px solid var(--neutral-20);
    a {
      border-right: 1px solid var(--neutral-20);
      ${MEDIA.LT.SMALL} {
        border-right: none;
      }
      color: var(--neutral-50);
      padding-right: 1.5rem;
    }
    a.last {
      border: none;
    }
    a:hover {
      color: var(--neutral-80);
    }
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 1rem;
    ${MEDIA.LT.SMALL} {
      flex-direction: column;
    }
    padding-top: 1.5rem;
  }
`
