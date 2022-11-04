import React, { useContext } from 'react'

import RulesContext from 'components/numerique/RulesProvider'
import Slider from 'components/base/Slider'
import SliderWrapper from 'components/numerique/misc/SliderWrapper'

export default function DurationInput(props) {
  const { engine, setSituation } = useContext(RulesContext)

  return (
    <SliderWrapper>
      <SliderWrapper.Label>Taille de la pièce jointe</SliderWrapper.Label>
      <SliderWrapper.Slider>
        <Slider
          value={engine.evaluate(`${props.name} . taille`).nodeValue}
          min={0}
          max={25}
          onChange={(value) =>
            setSituation({
              [`${props.name} . taille`]: value,
            })
          }
        />
        <SliderWrapper.Value width={6}>
          {engine.evaluate(`${props.name} . taille`).nodeValue} Mo
        </SliderWrapper.Value>
      </SliderWrapper.Slider>
    </SliderWrapper>
  )
}
