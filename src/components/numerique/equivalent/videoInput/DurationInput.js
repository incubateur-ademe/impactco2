import React, { useContext } from 'react'

import RulesContext from 'components/numerique/RulesProvider'
import Slider from 'components/base/Slider'
import SliderWrapper from 'components/numerique/misc/SliderWrapper'

export default function DurationInput(props) {
  const { engine, setSituation } = useContext(RulesContext)

  return (
    <SliderWrapper>
      <SliderWrapper.Label>
        Durée de la {props.name === 'streaming' ? 'vidéo' : 'communication'}
      </SliderWrapper.Label>
      <SliderWrapper.Slider>
        <Slider
          value={engine.evaluate(`${props.name} . durée`).nodeValue}
          min={1}
          max={600}
          onChange={(value) =>
            setSituation({
              [`${props.name} . durée`]: value,
            })
          }
        />
        <SliderWrapper.Value>
          {engine.evaluate(`${props.name} . durée`).nodeValue} min
        </SliderWrapper.Value>
      </SliderWrapper.Slider>
    </SliderWrapper>
  )
}
