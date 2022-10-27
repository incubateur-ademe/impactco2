import React, { useContext } from 'react'
import styled from 'styled-components'

import RulesContext from 'components/numerique/RulesProvider'
import Slider from 'components/base/Slider'
import MagicLink from 'components/base/MagicLink'

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
  const { engine, setSituation } = useContext(RulesContext)

  return (
    <Wrapper>
      {engine.evaluate(props.name + ' . appareil').nodeValue !== 'moyenne' ? (
        <>
          <Label>Durée de vie du terminal</Label>
          <SliderWrapper>
            <Slider
              value={
                engine.evaluate(
                  `${props.name} . appareil . ${
                    engine.evaluate(props.name + ' . appareil').nodeValue
                  } . durée de vie`
                ).nodeValue
              }
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
            <Age>
              {
                engine.evaluate(
                  `${props.name} . appareil . ${
                    engine.evaluate(props.name + ' . appareil').nodeValue
                  } . durée de vie`
                ).nodeValue
              }{' '}
              ans
            </Age>
          </SliderWrapper>
          <Text>
            L’impact de la construction de l’appareil est attribué au prorata de
            sa durée de vie totale.
          </Text>
        </>
      ) : (
        <Text>
          Nous utilisons pour la valeur par défaut{' '}
          <MagicLink to='https://www.arcep.fr/uploads/tx_gspublication/rapport-barometre-numerique-edition-2021.pdf'>
            un agrégat de terminaux
          </MagicLink>
          .
          <br />
          <br />
          L’impact de la construction de l’appareil est attribué au prorata de
          sa durée de vie totale.
        </Text>
      )}
    </Wrapper>
  )
}
