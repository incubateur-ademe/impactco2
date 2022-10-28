import React, { useEffect, useContext } from 'react'
import styled from 'styled-components'

import RulesContext from '../RulesProvider'
import Emoji from 'components/base/Emoji'
import Slider from 'components/base/Slider'
import ButtonLink from 'components/base/ButtonLink'

const Wrapper = styled.div`
  margin-bottom: 2rem;
  padding: 1.5rem;
  background-color: ${(props) => props.theme.colors.second};
  border: 0.0625rem solid ${(props) => props.theme.colors.second};
  border-radius: 1rem;
`
const Title = styled.h3`
  text-align: center;
`
const Text = styled.p`
  max-width: 24rem;
  margin: 0 auto 0.5rem;
  font-size: 0.875rem;
  text-align: center;
`
const StyledButtonLink = styled(ButtonLink)`
  display: block;
  margin: 0 auto 1.5rem;
  font-size: 0.875rem;
`
const Sliders = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.875rem;
  opacity: ${(props) => (props.construction ? 1 : 0.3)};
  pointer-events: ${(props) => (props.construction ? 'inherit' : 'none')};
`
const SliderWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: calc(33.333333% - 1.75rem);
  padding: 0.5rem 0.75rem;
  border: 0.125rem solid ${(props) => props.theme.colors.main};
  border-radius: 0.5rem;

  ${(props) => props.theme.mq.small} {
    width: 100%;
  }
`
const Age = styled.div`
  width: 3rem;
  font-size: 0.875rem;
  text-align: right;
`

const devices = [
  { name: 'smartphone', emoji: '📱' },
  { name: 'tablette', emoji: '📱' },
  { name: 'ordinateur portable', emoji: '💻' },
  { name: 'ordinateur et écran', emoji: '🖥' },
  { name: 'TV', emoji: '📺' },
]
export default function Search(props) {
  const { engine, setSituation } = useContext(RulesContext)

  return engine ? (
    <Wrapper>
      <Title>Durée de vie de mes appareils</Title>
      <Text>
        L’impact de la construction de vos appareils est attribué à vos usages
        au prorata de leur durée de vie totale.
      </Text>
      <StyledButtonLink
        onClick={() =>
          props.setConstruction((prevConstruction) => !prevConstruction)
        }
      >
        {props.construction ? 'Ne pas a' : 'A'}fficher l’impact de la
        construction
      </StyledButtonLink>
      <Sliders construction={props.construction}>
        {devices.map((device) => (
          <SliderWrapper>
            <Emoji>{device.emoji}</Emoji>
            <Slider
              value={
                engine.evaluate(`${device.name} . durée de vie par défaut`)
                  .nodeValue
              }
              min={1}
              max={20}
              onChange={(value) =>
                setSituation({
                  [`${device.name} . durée de vie par défaut`]: value,
                })
              }
            />
            <Age>
              {
                engine.evaluate(`${device.name} . durée de vie par défaut`)
                  .nodeValue
              }{' '}
              ans
            </Age>
          </SliderWrapper>
        ))}
      </Sliders>
    </Wrapper>
  ) : null
}
