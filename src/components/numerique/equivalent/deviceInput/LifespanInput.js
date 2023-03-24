import React, { useContext } from 'react'

import Slider from 'components/base/Slider'
import RulesContext from 'components/numerique/RulesProvider'
import SliderWrapper from 'components/numerique/misc/SliderWrapper'

export default function DeviceInput(props) {
  const { engine, setSituation } = useContext(RulesContext)

  return (
    <SliderWrapper>
      <SliderWrapper.Label>Durée de vie totale du terminal</SliderWrapper.Label>
      <SliderWrapper.Slider>
        <Slider
          value={
            engine.evaluate(`${props.device.name} . durée de vie`).nodeValue
          }
          min={1}
          max={20}
          onChange={(value) =>
            setSituation({
              [`${props.device.name} . durée de vie`]: value,
            })
          }
        />
        <SliderWrapper.Value>
          {engine.evaluate(`${props.device.name} . durée de vie`).nodeValue} ans
        </SliderWrapper.Value>
      </SliderWrapper.Slider>
    </SliderWrapper>
  )
}
