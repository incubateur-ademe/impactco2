import Link from 'next/link'
import React from 'react'
import styled from 'styled-components'
import reusecards from './data/reusecards.json'
import Button from 'components/base/Button'
import { Section2, Section2InnerMargin, Section2WideContent } from 'components/base/Section2'
import Meeting from 'components/meeting/Meeting'
import Header from './heading/Header'
import ChtingLeft from './img/ChtingLeft'
import ChtingRight from './img/ChtingRight'

export default function ByArticle() {
  const buildReuseCardFor = (slug) => {
    let reuseCard = reusecards.find((e) => e.slug === slug)
    return (
      <ReuseCardWrapper>
        <a href={reuseCard.link} target='_blank' rel='noreferrer noopener'>
          <ReuseCard>
            <ReuseCardImgContainer color={reuseCard.color}>
              <ReuseCardImg img={reuseCard.img}>
                <ReuseCardTag>{reuseCard.tagtext}</ReuseCardTag>
              </ReuseCardImg>
            </ReuseCardImgContainer>
            <ReuseCardTxt>
              <ReuseCardTitle>
                <strong>{reuseCard.title}</strong>
              </ReuseCardTitle>
              <ReuseCardParagraph>{reuseCard.paragraph}</ReuseCardParagraph>
            </ReuseCardTxt>
          </ReuseCard>
        </a>
      </ReuseCardWrapper>
    )
  }

  return (
    <Wrapper>
      <Section2>
        <Section2WideContent>
          <Section2InnerMargin>
            <Layout>
              <Header
                title={
                  <>
                    <span>Utiliser nos ressources&nbsp;</span>
                    <span>
                      dans des <b>articles, sites ou applications</b>
                    </span>
                  </>
                }
              />
              <div>
                <MiddleGrid>
                  <LeftMiddleGrid>
                    <H3Title>En toute autonomie</H3Title>
                    <MiddleUl>
                      <MiddleLi>
                        Appuyez-vous sur le{' '}
                        <Link
                          href='https://accelerateur-transition-ecologique-ademe.notion.site/Kit-de-diffusion-Impact-CO2-b9d08930a49a4346830b7a12fd7cb733?pvs=4'
                          target='_blank'
                          rel='noreferrer noopener'>
                          kit de diffusion
                        </Link>
                        , pensé pour vous épauler dans la rédaction de vos contenus en lien avec l’impact carbone.
                      </MiddleLi>
                      <MiddleLi>
                        <Link href='/integration'>Configurez et personnalisez</Link> le simulateur de votre choix grâce
                        à une intégration
                      </MiddleLi>
                      <MiddleLi>
                        Inspirez-vous d'
                        <Link
                          href='https://accelerateur-transition-ecologique-ademe.notion.site/2274283430e94d1db71eced54c338997?v=4638552e710e44339afbc9de1b83f785'
                          target='_blank'
                          rel='noreferrer noopener'>
                          exemples concrets
                        </Link>{' '}
                        déjà créés par des médias, entreprises, associations...
                      </MiddleLi>
                    </MiddleUl>
                    <MiddleCta>
                      <Button
                        to='https://accelerateur-transition-ecologique-ademe.notion.site/Kit-de-diffusion-Impact-CO2-b9d08930a49a4346830b7a12fd7cb733?pvs=4'
                        target='_blank'
                        rel='noreferrer noopener'>
                        Consulter le kit de diffusion
                      </Button>
                    </MiddleCta>
                  </LeftMiddleGrid>
                  <RightMiddleGrid>
                    <H3Title2>Avec de l'aide</H3Title2>
                    <MiddleUl>
                      <MiddleLi>
                        Enrichissez vos contenus grâce à notre&nbsp;
                        <Link
                          href='https://accelerateur-transition-ecologique-ademe.notion.site/2274283430e94d1db71eced54c338997?v=4638552e710e44339afbc9de1b83f785'
                          target='_blank'
                          rel='noreferrer noopener'>
                          Foire aux Questions
                        </Link>{' '}
                        pour trouver des éléments de réponse pertinents.
                      </MiddleLi>
                      <MiddleLi>
                        Gagnez du temps et laissez-vous guider pour <strong>l’intégration de nos ressources</strong>.
                      </MiddleLi>
                      <MiddleLi>
                        Échangez avec l’équipe sur vos <strong>besoins spécifiques d’intégration</strong>.
                      </MiddleLi>
                    </MiddleUl>
                    <Meeting />
                  </RightMiddleGrid>
                </MiddleGrid>
              </div>
              <DownSide>
                <H3Title>Quelques exemples d’utilisation de nos ressources</H3Title>
                <ReuseGrid>
                  <WinkWinkLeft>
                    <ChtingLeft />
                  </WinkWinkLeft>
                  {buildReuseCardFor('card_1')}
                  {buildReuseCardFor('card_2')}
                  {buildReuseCardFor('card_3')}
                  {buildReuseCardFor('card_4')}
                  <WinkWinkRight>
                    <ChtingRight />
                  </WinkWinkRight>
                </ReuseGrid>
              </DownSide>
            </Layout>
          </Section2InnerMargin>
        </Section2WideContent>
      </Section2>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  background-color: #ebf2ff;
  margin-top: -0.5rem;
  padding: 6rem 0;
  ${(props) => props.theme.mq.large} {
    margin-top: 2rem;
    padding: 1rem 0;
  }
`

const Layout = styled.div`
  ${(props) => props.theme.mq.large} {
    margin-bottom: 2rem;
    margin-top: 2rem;
  }
`

const DownSide = styled.div`
  padding-top: 5rem;
`

const MiddleGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  ${(props) => props.theme.mq.medium} {
    grid-template-columns: 1fr;
  }
`

const PartMiddleGrid = styled.div`
  padding-right: 1rem;
`
const LeftMiddleGrid = styled(PartMiddleGrid)``
const RightMiddleGrid = styled(PartMiddleGrid)``

const H3Title = styled.h3`
  color: #235dd2;
  font-size: 1.375rem;
  font-weight: 700;
  letter-spacing: 0em;
  line-height: 2.5rem;
`
const H3Title2 = styled(H3Title)`
  ${(props) => props.theme.mq.medium} {
    margin-top: 2rem;
  }
`

const MiddleUl = styled.ul`
  height: 13rem;
  ${(props) => props.theme.mq.xxlarge} {
    height: 14rem;
  }
  ${(props) => props.theme.mq.large} {
    height: 18rem;
  }
  ${(props) => props.theme.mq.medium} {
    height: auto;
  }
  padding-left: 0;
  > li + li {
    margin-top: 1.25rem;
  }
`
const MiddleLi = styled.li`
  background: url('/images/tik.svg') no-repeat;
  background-position: top 4px left;
  font-size: 1rem;
  font-weight: 400;
  letter-spacing: 0em;
  line-height: 1.5rem;
  list-style-type: none;
  padding: 0px 0 3px 24px;
  > a {
    color: #235dd2;
    font-weight: 700;
    text-underline-offset: 6px;
  }
`

const MiddleCta = styled.div`
  width: fit-content;
`

const ReuseGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  position: relative;
`

const ReuseCard = styled.div`
  background-color: white;
  border-color: #ccdcfd;
  border-radius: 16px;
  border-style: solid;
  border-width: 1px 4px 4px 1px;
  display: block;
  margin-right: 1rem;
`
const ReuseCardImg = styled.div`
  background: url(${(props) => props.img});
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  border-top-left-radius: 13px;
  border-top-right-radius: 13px;
  height: 8rem;
  position: relative;
`
const ReuseCardTxt = styled.div`
  font-size: 1rem;
  height: 20rem;
  ${(props) => props.theme.mq.xlarge} {
    height: 21rem;
  }
  ${(props) => props.theme.mq.large} {
    height: 11rem;
  }
  ${(props) => props.theme.mq.medium} {
    height: 12rem;
  }
  ${(props) => props.theme.mq.small} {
    height: 10rem;
  }
  ${(props) => props.theme.mq.xsmall} {
    height: 15rem;
  }
  padding: 1rem;
`
const ReuseCardTitle = styled.div`
  font-size: 1rem;
  height: 5.5rem;
  margin-top: 0.5rem;
  padding-bottom: 0.5rem;
  ${(props) => props.theme.mq.xlarge} {
    height: 5rem;
  }
  ${(props) => props.theme.mq.large} {
    height: 2.5rem;
  }
  ${(props) => props.theme.mq.xsmall} {
    height: 3.5rem;
  }
`
const ReuseCardParagraph = styled.div`
  ${(props) => props.theme.mq.small} {
    font-size: 0.9rem;
  }
  color: #3a3a3a;
  margin-bottom: 1rem;
  margin-top: 1rem;
`
const ReuseCardTag = styled.div`
  background-color: white;
  border-radius: 4px;
  color: #d47909;
  font-size: 0.8rem;
  font-weight: 700;
  left: 0.5rem;
  letter-spacing: 0em;
  line-height: 1.25rem;
  padding-left: 0.25rem;
  padding-right: 0.25rem;
  position: absolute;
  top: 0.5rem;
`

const ReuseCardWrapper = styled.div`
  ${(props) => props.theme.mq.large} {
    margin: 1rem;
  }
  a {
    text-decoration: none;
    strong {
      color: #161616;
    }
    &:hover {
      strong {
        text-decoration: underline;
      }
    }
  }
  ${(props) => props.theme.mq.large} {
    grid-column: span 3/4;
  }
  ${(props) => props.theme.mq.small} {
    grid-column: none;
  }
`

const ReuseCardImgContainer = styled.div`
  background-color: ${(props) => props.color};
  border-top-left-radius: 13px;
  border-top-right-radius: 13px;
`

const WinkWink = styled.div`
  position: absolute;
  ${(props) => props.theme.mq.large} {
    display: none;
  }
`

const WinkWinkLeft = styled(WinkWink)`
  left: -2.5rem;
  top: 40%;
`
const WinkWinkRight = styled(WinkWink)`
  right: -1.5rem;
  top: 40%;
`
