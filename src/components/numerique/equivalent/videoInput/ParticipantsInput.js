import React, { useContext } from 'react'

import RulesContext from 'components/numerique/RulesProvider'
import Slider from 'components/base/Slider'
import SliderWrapper from 'components/numerique/misc/SliderWrapper'

export default function ParticipantInput(props) {
  const { engine, setSituation } = useContext(RulesContext)

  return props.name === 'visio' ? (
    <SliderWrapper>
      <SliderWrapper.Label>Nombre de participants</SliderWrapper.Label>
      <SliderWrapper.Slider>
        <Slider
          value={engine.evaluate(`${props.name} . emplacements`).nodeValue}
          min={2}
          max={20}
          onChange={(value) =>
            setSituation({
              [`${props.name} . emplacements`]: value,
            })
          }
        />
        <SliderWrapper.Value>
          {engine.evaluate(`${props.name} . emplacements`).nodeValue}
        </SliderWrapper.Value>
      </SliderWrapper.Slider>
    </SliderWrapper>
  ) : null
}
