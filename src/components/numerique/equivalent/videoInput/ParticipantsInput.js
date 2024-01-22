import React from 'react'
import Slider from 'components/base/Slider'
import {
  SliderWrapper,
  SliderWrapperLabel,
  SliderWrapperSlider,
  SliderWrapperValue,
} from 'components/numerique/misc/SliderWrapper'

export default function ParticipantInput(props) {
  return props.name === 'visio' ? (
    <SliderWrapper>
      <SliderWrapperLabel>Nombre de participants</SliderWrapperLabel>
      <SliderWrapperSlider>
        <Slider
          value={props.engine.evaluate(`${props.name} . emplacements`).nodeValue}
          min={2}
          max={20}
          onChange={(value) =>
            props.setSituation({
              [`${props.name} . emplacements`]: value,
            })
          }
        />
        <SliderWrapperValue>{props.engine.evaluate(`${props.name} . emplacements`).nodeValue}</SliderWrapperValue>
      </SliderWrapperSlider>
    </SliderWrapper>
  ) : null
}
