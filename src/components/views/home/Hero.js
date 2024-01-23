import styled from 'styled-components'
import { MEDIA } from 'utils/styles'
import { Section, SectionWideContent } from 'components/base/Section'
import Meeting from 'components/meeting/Meeting'

export default function Hero() {
  return (
    <Section $withoutPadding>
      <HeroWideContent>
        <Layout>
          <div>
            <H1Title>
              <H1Line1>Informer, comparer, diffuser</H1Line1>
              <span>
                <HideAboveMedium>&nbsp;</HideAboveMedium>des ressources sur l’impact carbone
              </span>
              <span>
                <HideAboveMedium>&nbsp;</HideAboveMedium>des gestes et objets du quotidien
              </span>
            </H1Title>
            <Subtitle>
              <span>
                Sensibilisez votre communauté grâce à une<strong>&nbsp;information fiable&nbsp;</strong>
              </span>
              <span>
                <strong>et sourcée</strong>&nbsp;issue des données environnementales de l'ADEME.
              </span>
            </Subtitle>
            <MiniCard>
              <MiniCardText>
                <MiniCardEmoji>🤓</MiniCardEmoji>
                <strong>Vous souhaitez utiliser gratuitement nos ressources ?</strong>
              </MiniCardText>
              <p>Nous vous proposons un accompagnement adapté à vos besoins.</p>
              <Meeting from='Accueil' />
            </MiniCard>
          </div>
          <div />
        </Layout>
      </HeroWideContent>
    </Section>
  )
}

const HeroWideContent = styled(SectionWideContent)`
  background-image: url(/images/cards.svg);
  background-position: right;
  background-repeat: no-repeat;
  background-size: 40%;
  ${MEDIA.LT.XLARGE} {
    background-position-x: 52vw;
    background-position-y: center;
    background-size: 56%;
  }
  ${MEDIA.LT.LARGE} {
    background-position-x: 82vw;
    background-position-y: center;
    background-size: 56%;
  }
  ${MEDIA.LT.MEDIUM} {
    background-image: none;
  }
`

const H1Title = styled.h1`
  color: var(-neutral-50);
  font-size: 2.25rem;
  ${MEDIA.LT.XLARGE} {
    font-size: 1.75rem;
  }
  ${MEDIA.LT.SMALL} {
    font-size: 1.5rem;
    line-height: 2.25rem;
  }
  font-weight: 800;
  letter-spacing: -0.01em;
  line-height: 2.75rem;
  text-align: left;
  > span {
    display: block;
    ${MEDIA.LT.MEDIUM} {
      display: inline;
    }
  }
`

const H1Line1 = styled.span`
  color: var(--primary-50);
`

const Layout = styled.div`
  display: grid;
  grid-template-columns: 39rem auto;
  overflow: hidden;
  ${MEDIA.LT.XLARGE} {
    grid-template-columns: 30rem auto;
  }
  ${MEDIA.LT.LARGE} {
    grid-template-columns: 39rem auto;
  }
  ${MEDIA.LT.MEDIUM} {
    grid-template-columns: 30rem auto;
  }
  ${MEDIA.LT.SMALL} {
    grid-template-columns: 1fr;
  }
  padding: 6rem 0;
  ${MEDIA.LT.LARGE} {
    padding: 3rem 0;
  }
`

const Subtitle = styled.p`
  font-size: 1.125rem;
  ${MEDIA.LT.XLARGE} {
    font-size: 0.95rem;
  }
  ${MEDIA.LT.LARGE} {
    font-size: 1.125rem;
  }
  ${MEDIA.LT.SMALL} {
    font-size: 1rem;
  }
  margin-bottom: 1.5rem;
  margin-top: 1.5rem;
  > span {
    display: block;
    ${MEDIA.LT.MEDIUM} {
      display: inline;
    }
  }
`

const HideAboveMedium = styled.span`
  display: none;
  ${MEDIA.LT.MEDIUM} {
    display: inline-block;
  }
`

const MiniCard = styled.div`
  border-color: #ccdcfd;
  border-radius: 16px;
  border-style: solid;
  border-width: 1px 4px 4px 1px;
  gap: 2rem;
  justify-content: flex-start;
  padding: 1.5rem;
`

const MiniCardEmoji = styled.span`
  margin-right: 0.5rem;
`

const MiniCardText = styled.p`
  font-size: 1rem;
  margin-bottom: 0.5rem;
`
