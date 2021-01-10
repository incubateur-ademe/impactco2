import React, { useContext } from 'react'
import styled from 'styled-components'

import StyleContext from 'utils/StyleContext'
import { mq } from 'utils/styles'

const Wrapper = styled.div`
  max-width: 45em;
  margin: 2em auto 3em;

  ${mq.small} {
    margin: 2em 3vw 3em;
  }
`
const Title = styled.h1`
  margin-bottom: 0;
  font-size: 3.1em;
  font-weight: 900;
  line-height: 1.2;

  ${mq.small} {
    font-size: 6.45vw;
  }
`
const Big = styled.span`
  font-size: 1.6em;
`
const Subtitle = styled.div`
  max-width: 30em;
  line-height: 1.5;
`
const Why = styled.div`
  text-align: right;
  margin: 0 1em 1em 0;

  a {
    color: ${(props) => props.theme.colors.text};
  }
`
const Sup = styled.sup`
  font-weight: 700;
  line-height: 0;

  a {
    color: ${(props) => props.theme.colors.text};
    text-decoration: none;
  }
`
export default function Header() {
  const { displayTitle } = useContext(StyleContext)
  return (
    <Wrapper>
      {displayTitle && (
        <>
          {' '}
          <Title>
            Perdre 1 tonne c’est bien, <Big>mais comment ?</Big>
          </Title>
          <Why>
            <a
              href='https://ecolab.ademe.fr/blog/carbone/historique-calculateur-carbone-nos-gestes-climat-micmac-coach-carbone.md'
              target='_blank'
              rel='noopener noreferrer'
            >
              Et pourquoi ?
            </a>
          </Why>
          <Subtitle>
            Voici quelques équivalents pour se figurer ce qu’un poids en CO2e
            <Sup>
              <a
                href='https://ecolab.gitbook.io/documentation-ecolab/lexique-environnemental-et-changement-climat#lequivalent-co2-ou-co2-equivalent-co-2-e'
                target='_blank'
                rel='noopener noreferrer'
              >
                ?
              </a>
            </Sup>{' '}
            représente en objet ou activité du quotidien...
          </Subtitle>
        </>
      )}
    </Wrapper>
  )
}
