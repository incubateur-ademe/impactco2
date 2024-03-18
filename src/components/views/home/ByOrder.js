import React from 'react'
import styled from 'styled-components'
import minicards from './data/minicards.json'
import categories from 'data/categories.json'
import { MEDIA } from 'utils/styles'
import { computedEquivalents } from 'components/providers/equivalents'
import { Section, SectionWideContent } from 'components/base/Section'
import Link from 'components/base/buttons/Link'
import Header from './heading/Header'
import ArrowLeft from './img/ArrowLeft'
import ArrowRight from './img/ArrowRight'

export default function ByOrder() {
  const buildMinicardFor = (slug) => {
    let eq = computedEquivalents.find((eq) => eq.slug === slug)
    const cat = categories.find((cat) => cat.id === eq.category)
    const minicard = minicards.find((m) => m.slug === slug)
    return (
      <MiniCard>
        <MiniCardEmoji>{eq.emoji}</MiniCardEmoji>
        <MiniCardEq>
          <MiniCardNumber>{minicard.value}</MiniCardNumber>
          <MiniCardUnit>&nbsp;{minicard.unit}</MiniCardUnit>
        </MiniCardEq>
        <MiniCardWhat>{minicard.text}</MiniCardWhat>
        <MiniCardLink>
          <Link asButton priority='secondary' href={`/${cat.slug}/${eq.slug}`}>
            Visualiser
          </Link>
        </MiniCardLink>
      </MiniCard>
    )
  }

  return (
    <Section>
      <SectionWideContent>
        <Header
          title={
            <>
              <span>Comparer et communiquer facilement&nbsp;</span>
              <span>
                les bons<b>&nbsp;ordres de grandeur&nbsp;</b>
              </span>
            </>
          }
          cta={{ to: '/comparateur', label: 'Découvrir le comparateur carbone' }}
        />
        <div>
          <Grid>
            <GridItemTopEmpty />
            <GridItemTopArrow>
              <ArrowLeft />
            </GridItemTopArrow>
            <GridItemTopCard>{buildMinicardFor('smartphone')}</GridItemTopCard>
            <GridItemTopText>
              <p>
                C’est autant d’émissions que pour <strong>fabriquer</strong>, <strong>consommer</strong> ou{' '}
                <strong>parcourir</strong>...
              </p>
            </GridItemTopText>
            <GridItemTopArrow>
              <ArrowRight />
            </GridItemTopArrow>
            <GridItemTopEmpty />
            <GridItemSub1>{buildMinicardFor('voiturethermique')}</GridItemSub1>
            <GridItemSub2>{buildMinicardFor('velo')}</GridItemSub2>
            <GridItemSub3>{buildMinicardFor('chemiseencoton')}</GridItemSub3>
            <GridItemSub4>{buildMinicardFor('soda')}</GridItemSub4>
            <GridItemSub5>{buildMinicardFor('tomate')}</GridItemSub5>
          </Grid>
        </div>
      </SectionWideContent>
    </Section>
  )
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
`

const GridItemSub = styled.div`
  grid-column: span 2;
  ${MEDIA.LT.MEDIUM} {
    grid-column: span 5;
  }
  margin-left: 0.5rem;
  margin-top: 2rem;
`
const GridItemSub1 = styled(GridItemSub)`
  margin-left: 0;
`
const GridItemSub2 = styled(GridItemSub)``
const GridItemSub3 = styled(GridItemSub)``
const GridItemSub4 = styled(GridItemSub)``
const GridItemSub5 = styled(GridItemSub)`
  ${MEDIA.LT.MEDIUM} {
    grid-column: span 6/9;
  }
`

const GridItemTopEmpty = styled.div`
  display: inherit;
  grid-column: span 2;
  ${MEDIA.LT.MEDIUM} {
    display: none;
  }
`
const GridItemTopArrow = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  ${MEDIA.LT.MEDIUM} {
    display: none;
  }
`
const GridItemTopCard = styled.div`
  grid-column: span 2;
  ${MEDIA.LT.MEDIUM} {
    grid-column: span 6/9;
  }
`
const GridItemTopText = styled.div`
  align-items: center;
  display: flex;
  font-size: 1rem;
  grid-column: span 2;
  ${MEDIA.LT.MEDIUM} {
    font-size: 0.9rem;
    grid-column: span 6/9;
    margin-top: 0.5rem;
    text-align: center;
  }
  ${MEDIA.LT.SMALL} {
    grid-column: span 10;
  }
  > p {
    margin: 0;
    padding-left: 1rem;
  }
`

const MiniCard = styled.div`
  align-items: center;
  border-color: #ccdcfd;
  border-radius: 16px;
  border-style: solid;
  border-width: 1px 4px 4px 1px;
  display: flex;
  flex-direction: column;
  padding: 1rem 0;
`

const MiniCardEmoji = styled.div`
  font-size: 1.5rem;
`
const MiniCardWhat = styled.div`
  color: #746770;
  font-size: 0.75rem;
  ${MEDIA.LT.LARGE} {
    height: 2rem;
    max-width: 5rem;
  }
  ${MEDIA.LT.MEDIUM} {
    height: auto;
    max-width: none;
  }
  ${MEDIA.LT.XSMALL} {
    height: 2rem;
    max-width: 5rem;
  }
  text-align: center;
`
const MiniCardLink = styled.div`
  margin-top: 0.75rem;
`
const MiniCardEq = styled.div``
const MiniCardNumber = styled.span`
  color: #110d10;
  font-size: 1.75rem;
  font-weight: 800;
  letter-spacing: -0.01em;
  line-height: 2.5rem;
`
const MiniCardUnit = styled.span`
  color: #746770;
  font-size: 1rem;
`
