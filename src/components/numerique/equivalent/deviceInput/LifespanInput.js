import Slider from 'components/base/Slider'
import {
  SliderWrapper,
  SliderWrapperLabel,
  SliderWrapperSlider,
  SliderWrapperValue,
} from 'components/numerique/misc/SliderWrapper'

export default function LifeSpanInput(props) {
  return (
    <SliderWrapper>
      <SliderWrapperLabel>Durée de vie totale du terminal</SliderWrapperLabel>
      <SliderWrapperSlider>
        <Slider
          value={props.engine.evaluate(`${props.device.name} . durée de vie`).nodeValue}
          min={1}
          max={20}
          onChange={(value) =>
            props.setSituation({
              [`${props.device.name} . durée de vie`]: value,
            })
          }
        />
        <SliderWrapperValue>
          {props.engine.evaluate(`${props.device.name} . durée de vie`).nodeValue} ans
        </SliderWrapperValue>
      </SliderWrapperSlider>
    </SliderWrapper>
  )
}
