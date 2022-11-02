import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import useAnimateNumber from 'use-animate-number'

import RulesContext from 'components/numerique/RulesProvider'
import Slider from 'components/base/Slider'
import ButtonLink from 'components/base/ButtonLink'
import ModalContext from 'components/providers/ModalProvider'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const Label = styled.label`
  margin-bottom: 0.5rem;
  font-size: 1.125rem;
  font-weight: bold;
  text-align: center;
`
const SliderWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  min-width: 19rem;
  margin-bottom: 1.5rem;
  padding: 0.5rem 0.75rem;
  border: 0.125rem solid ${(props) => props.theme.colors.main};
  border-radius: 0.5rem;
`
const Age = styled.div`
  width: 3.5rem;
  text-align: right;
`
const Text = styled.p`
  font-size: 0.875rem;
  text-align: center;
`
export default function DeviceInput(props) {
  const { engine, situation, setSituation } = useContext(RulesContext)

  const { setDevices } = useContext(ModalContext)

  const [age, setAge] = useAnimateNumber(1, {
    duration: 1000,
    enterance: false,
    decimals: 0,
  })
  const [prevAppareil, setPrevAppareil] = useState(
    engine.evaluate(props.name + ' . appareil').nodeValue
  )
  useEffect(() => {
    setAge(
      engine.evaluate(props.name + ' . appareil').nodeValue !== 'moyenne'
        ? engine.evaluate(
            `${props.name} . appareil . ${
              engine.evaluate(props.name + ' . appareil').nodeValue
            } . durée de vie`
          ).nodeValue
        : 1,
      prevAppareil === engine.evaluate(props.name + ' . appareil').nodeValue
    )
    setPrevAppareil(engine.evaluate(props.name + ' . appareil').nodeValue)
  }, [engine, situation])

  return (
    <Wrapper>
      {props.construction ? (
        <>
          {' '}
          {engine.evaluate(props.name + ' . appareil').nodeValue !==
          'moyenne' ? (
            <>
              <Label>Durée de vie du terminal</Label>
              <SliderWrapper>
                <Slider
                  value={age}
                  min={1}
                  max={20}
                  onChange={(value) =>
                    setSituation({
                      [`${props.name} . appareil . ${
                        engine.evaluate(props.name + ' . appareil').nodeValue
                      } . durée de vie`]: value,
                    })
                  }
                />
                <Age>{age} ans</Age>
              </SliderWrapper>
              <Text>
                L’impact de la construction de l’appareil est attribué au
                prorata de sa durée de vie totale.
              </Text>
            </>
          ) : (
            <>
              {' '}
              <Text>
                Nous utilisons pour la valeur par défaut{' '}
                <ButtonLink onClick={() => setDevices(true)}>
                  un agrégat de terminaux
                </ButtonLink>
                .
                <br />
                <br />
                L’impact de la construction de l’appareil est attribué au
                prorata de sa durée de vie totale.
              </Text>
            </>
          )}
        </>
      ) : (
        <Text>
          L'impact de la construction de l'appareil n'est pas affiché ici
        </Text>
      )}
      <ButtonLink
        onClick={() =>
          props.setConstruction((prevConstruction) => !prevConstruction)
        }
      >
        {props.construction ? 'Ne pas a' : 'A'}fficher l’impact de la
        construction
      </ButtonLink>
    </Wrapper>
  )
}
