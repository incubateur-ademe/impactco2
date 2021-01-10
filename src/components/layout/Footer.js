import React, { useState } from 'react'
import styled from 'styled-components'

import ademe from 'assets/ademe.jpg'
import repufrancaise from 'assets/repufrancaise.jpg'
import ecolab from 'assets/ecolab.png'
import { mq } from 'utils/styles'

import Button from 'components/base/Button'

const Wrapper = styled.div`
  background-color: ${(props) => props.theme.colors.second};
  color: ${(props) => props.theme.colors.main};
  transition: all 600ms;
`
const Content = styled.div`
  max-width: 45em;
  margin: 0 auto;
  padding: 1em 0 0;

  ${mq.small} {
    margin: 0 3vw;
  }
`
const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2em;

  ${mq.small} {
    flex-direction: column;
    align-items: inherit;
  }
`
const Source = styled.div`
  ${mq.small} {
    margin-bottom: 1em;
  }
`
const Title = styled.h4`
  margin: 0;
`
const LogosWrapper = styled.div`
  display: flex;
  justify-content: center;
`
const Logos = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  background-color: white;
`
const Logo = styled.img`
  width: 7em;
`

export default function Footer() {
  const [open, setOpen] = useState(true)
  return (
    <Wrapper>
      <Content>
        <Flex>
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
          <Button disabled onClick={() => setOpen(true)}>
            Je veux l'intégrer à mon site !
          </Button>
        </Flex>
        <LogosWrapper>
          <Logos>
            <Logo src={repufrancaise} />
            <Logo src={ademe} />
            <Logo src={ecolab} />
          </Logos>
        </LogosWrapper>
      </Content>
    </Wrapper>
  )
}
