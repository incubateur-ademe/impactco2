import styled from 'styled-components'
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
            <Meeting fromLabel='Accueil' />
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
  ${(props) => props.theme.mq.xlarge} {
    background-position-x: 52vw;
    background-position-y: center;
    background-size: 56%;
  }
  ${(props) => props.theme.mq.large} {
    background-position-x: 82vw;
    background-position-y: center;
    background-size: 56%;
  }
  ${(props) => props.theme.mq.medium} {
    background-image: none;
  }
`

const H1Title = styled.h1`
  color: ${(props) => props.theme.colors.linkGrey};
  font-size: 2.25rem;
  ${(props) => props.theme.mq.xlarge} {
    font-size: 1.75rem;
  }
  ${(props) => props.theme.mq.small} {
    font-size: 1.5rem;
    line-height: 2.25rem;
  }
  font-weight: 800;
  letter-spacing: -0.01em;
  line-height: 2.75rem;
  text-align: left;
  > span {
    display: block;
    ${(props) => props.theme.mq.medium} {
      display: inline;
    }
  }
`

const H1Line1 = styled.span`
  color: ${(props) => props.theme.colors.main2};
`

const Layout = styled.div`
  display: grid;
  grid-template-columns: 39rem auto;
  overflow: hidden;
  ${(props) => props.theme.mq.xlarge} {
    grid-template-columns: 30rem auto;
  }
  ${(props) => props.theme.mq.large} {
    grid-template-columns: 39rem auto;
  }
  ${(props) => props.theme.mq.medium} {
    grid-template-columns: 30rem auto;
  }
  ${(props) => props.theme.mq.small} {
    grid-template-columns: 1fr;
  }
  padding: 6rem 0;
  ${(props) => props.theme.mq.large} {
    padding: 3rem 0;
  }
`

const Subtitle = styled.p`
  font-size: 1.125rem;
  ${(props) => props.theme.mq.xlarge} {
    font-size: 0.95rem;
  }
  ${(props) => props.theme.mq.large} {
    font-size: 1.125rem;
  }
  ${(props) => props.theme.mq.small} {
    font-size: 1rem;
  }
  margin-bottom: 1.5rem;
  margin-top: 1.5rem;
  > span {
    display: block;
    ${(props) => props.theme.mq.medium} {
      display: inline;
    }
  }
`

const HideAboveMedium = styled.span`
  display: none;
  ${(props) => props.theme.mq.medium} {
    display: inline-block;
  }
`
