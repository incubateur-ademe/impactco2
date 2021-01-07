import React from 'react'
import styled from 'styled-components'

import ademe from 'assets/ademe.jpg'
import ecolab from 'assets/ecolab.png'
import { colors, mq } from 'utils/styles'

import Button from 'components/base/Button'

const Wrapper = styled.div`
  background-color: ${colors.text};
  color: ${colors.second};
`
const Content = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 45em;
  margin: 0 auto;
  padding: 2em 0;

  ${mq.small} {
    margin: 0 3vw;
  }
`
const Left = styled.div``
const Logos = styled.div`
  display: flex;
`
const Logo = styled.img``
const Source = styled.div``
const Title = styled.h4`
  margin: 0;
`
export default function Footer() {
  return (
    <Wrapper>
      <Content>
        <Left>
          <Logos>
            <Logo src={ecolab} />
            <Logo src={ademe} />
          </Logos>
          <Source>
            <Title>Sources des données :</Title>
            <a
              href='https://data.ademe.fr/datasets/base-carbone(r)'
              target='_blank'
              rel='noopener noreferrer'
            >
              Base carbone®
            </a>
          </Source>
        </Left>
        <Button>Je veux l'intégrer à mon site !</Button>
      </Content>
    </Wrapper>
  )
}
