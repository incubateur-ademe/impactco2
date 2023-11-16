import Image from 'next/image'
import React from 'react'
import styled from 'styled-components'
import { Section, SectionWideContent } from 'components/base/Section'
import Meeting from 'components/meeting/Meeting'

export default function Hero() {
  return (
    <Section $withoutPadding>
      <SectionWideContent>
        <Layout>
          <div>
            <H1Title>
              <H1Line1>Informer, comparer, diffuser</H1Line1>
              <span>
                <HideAboveMedium>&nbsp;</HideAboveMedium>des ressources sur l’impact carbone
              </span>
              <sapn>
                <HideAboveMedium>&nbsp;</HideAboveMedium>des gestes et objets du quotidien
              </sapn>
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
                <strong>Vous souhaitez intégrer gratuitement nos ressources ?</strong>
              </MiniCardText>
              <p>Laissez-nous votre email, et nous vous recontacterons très prochainement pour échanger ensemble.</p>
              <Meeting />
            </MiniCard>
          </div>

          <PictureContainer>
            <Image width={560} height={976} src='/images/cards.svg' alt='' />
          </PictureContainer>
        </Layout>
      </SectionWideContent>
    </Section>
  )
}

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

const PictureContainer = styled.div`
  position: relative;
  ${(props) => props.theme.mq.large} {
    display: none;
  }
  > img {
    max-width: 100%;
    position: absolute;
    right: 0;
    top: -270px;
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

const HideAboveMedium = styled.span`
  display: none;
  ${(props) => props.theme.mq.medium} {
    display: inline-block;
  }
`
