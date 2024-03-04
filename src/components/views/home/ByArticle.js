import React from 'react'
import styled from 'styled-components'
import reusecards from './data/reusecards.json'
import { track } from 'utils/matomo'
import { MEDIA } from 'utils/styles'
import { Section, SectionWideContent } from 'components/base/Section'
import Link from 'components/base/buttons/Link'
import Meeting from 'components/meeting/Meeting'
import Header from './heading/Header'
import ChtingLeft from './img/ChtingLeft'
import ChtingRight from './img/ChtingRight'

export default function ByArticle() {
  const buildReuseCardFor = (slug) => {
    let reuseCard = reusecards.find((e) => e.slug === slug)
    return (
      <ReuseCardWrapper>
        <ReuseCard>
          <a
            href={reuseCard.link}
            target='_blank'
            rel='noreferrer noopener'
            onClick={() => track('Click', `Vignette ${reuseCard.tagtext}`, `click_vignette_${reuseCard.tagtext}`)}>
            <ReuseCardImgContainer $color={reuseCard.color}>
              <ReuseCardImg $img={reuseCard.img}>
                <ReuseCardTag>{reuseCard.tagtext}</ReuseCardTag>
              </ReuseCardImg>
            </ReuseCardImgContainer>
            <ReuseCardTxt>
              <ReuseCardTitle>
                <strong>{reuseCard.title}</strong>
              </ReuseCardTitle>
              <ReuseCardParagraph>{reuseCard.paragraph}</ReuseCardParagraph>
            </ReuseCardTxt>
          </a>
        </ReuseCard>
      </ReuseCardWrapper>
    )
  }

  return (
    <Section $theme='color'>
      <SectionWideContent>
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
            <Box>
              <div>
                <H3Title>En toute autonomie</H3Title>
                <MiddleUl>
                  <MiddleLi>
                    Parcourir le{' '}
                    <Link
                      href='/guide-utilisation'
                      priority='secondary'
                      onClick={() => track('Click', 'Guide utilisation', 'click_guide_utilisation')}>
                      Guide d'uilisation
                    </Link>{' '}
                    pour vous épauler dans la rédaction de vos contenus.
                  </MiddleLi>
                  <MiddleLi>
                    Inspirez-vous d'
                    <Link
                      href='https://accelerateur-transition-ecologique-ademe.notion.site/2274283430e94d1db71eced54c338997?v=4638552e710e44339afbc9de1b83f785'
                      priority='secondary'
                      onClick={() => track('Click', 'Exemples concrets', 'click_exemples_concrets')}>
                      exemples concrets
                    </Link>{' '}
                    déjà créés par des médias, entreprises, associations...
                  </MiddleLi>
                </MiddleUl>
              </div>
              <MiddleCta>
                <Link
                  asButton
                  href='/guide-utilisation'
                  onClick={() =>
                    track('Click', 'Parcourir le Guide d’utilisation', 'click_parcourir_guide_utilisation')
                  }>
                  Parcourir le Guide d’utilisation
                </Link>
              </MiddleCta>
            </Box>
            <Box>
              <div>
                <H3Title2>Avec de l'aide</H3Title2>
                <MiddleUl>
                  <MiddleLi>
                    Consultez nos{' '}
                    <Link
                      href='/questions-frequentes'
                      priority='secondary'
                      data-testid='byArticleFaq'
                      onClick={() => track('Click', 'FAQ', 'click_faq')}>
                      Questions fréquentes
                    </Link>{' '}
                    pour trouver des éléments de réponse.
                  </MiddleLi>
                  <MiddleLi>
                    Échangez avec l’équipe sur vos <strong>besoins spécifiques d’intégration</strong>.
                  </MiddleLi>
                </MiddleUl>
              </div>
              <MiddleCta>
                <Meeting from='Accueil bis' />
              </MiddleCta>
            </Box>
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
      </SectionWideContent>
    </Section>
  )
}

const DownSide = styled.div`
  padding-top: 5rem;
`

const MiddleGrid = styled.div`
  display: grid;
  gap: 0 2rem;
  grid-template-columns: 1fr 1fr;
  ${MEDIA.LT.MEDIUM} {
    grid-template-columns: 1fr;
  }
`

const H3Title = styled.h3`
  color: #235dd2;
  font-weight: 700;
  letter-spacing: 0em;

  ${MEDIA.LT.LARGE} {
    font-size: 1.125rem;
  }
  ${MEDIA.LT.MEDIUM} {
    margin-bottom: 1rem;
  }
`

const H3Title2 = styled(H3Title)`
  ${MEDIA.LT.MEDIUM} {
    margin-top: 2.5rem;
  }
`

const MiddleUl = styled.ul`
  margin-bottom: 0;
  padding-left: 0;
  > li + li {
    margin-top: 1.25rem;
    ${MEDIA.LT.MEDIUM} {
      margin-top: 0.75rem;
    }
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
`

const MiddleCta = styled.div`
  width: 100%;
`

const ReuseGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  position: relative;
`

const ReuseCard = styled.div`
  background-color: var(--neutral-00);
  border-color: #ccdcfd;
  border-radius: 16px;
  border-style: solid;
  border-width: 1px 4px 4px 1px;
  display: block;
  height: 100%;
  margin-right: 1rem;
`
const ReuseCardImg = styled.div`
  background: url(${(props) => props.$img});
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
  padding: 1rem;
`

const ReuseCardTitle = styled.div`
  font-size: 1rem;
  line-height: 1.5;
  margin-bottom: 0.5rem;
`
const ReuseCardParagraph = styled.div`
  ${MEDIA.LT.SMALL} {
    font-size: 0.9rem;
  }
  color: #3a3a3a;
  line-height: 1.5;
  margin-bottom: 0.5rem;
`
const ReuseCardTag = styled.div`
  background-color: var(--neutral-00);
  border-radius: 4px;
  color: #a35b01;
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
  ${MEDIA.LT.LARGE} {
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
  ${MEDIA.LT.LARGE} {
    grid-column: span 3/4;
  }
  ${MEDIA.LT.SMALL} {
    grid-column: none;
  }
`

const ReuseCardImgContainer = styled.div`
  background-color: ${(props) => props.$color};
  border-top-left-radius: 13px;
  border-top-right-radius: 13px;
`

const WinkWink = styled.div`
  position: absolute;
  ${MEDIA.LT.LARGE} {
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

const Box = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.75rem;
  justify-content: space-between;
  ${MEDIA.LT.MEDIUM} {
    gap: 1.25rem;
  }
`
