import React, { useContext } from 'react'

import RulesContext from 'components/numerique/RulesProvider'
import Slider from 'components/base/Slider'
import SliderWrapper from 'components/numerique/misc/SliderWrapper'

export default function DurationInput(props) {
  const { engine, setSituation } = useContext(RulesContext)

  return (
    <SliderWrapper>
      <SliderWrapper.Label>Poids de l'email</SliderWrapper.Label>
      <SliderWrapper.Slider>
        <Slider
          value={engine.evaluate(`${props.name} . taille`).nodeValue}
          min={0}
          max={10}
          step={0.01}
          onChange={(value) =>
            setSituation({
              [`${props.name} . taille`]: value,
            })
          }
        />
        <SliderWrapper.Value>
          {Math.round(
            engine.evaluate(`${props.name} . taille`).nodeValue * 10
          ) / 10}{' '}
          Mo
        </SliderWrapper.Value>
      </SliderWrapper.Slider>
    </SliderWrapper>
  )
}
