import Slider from 'components/base/Slider'
import {
  SliderWrapper,
  SliderWrapperLabel,
  SliderWrapperSlider,
  SliderWrapperValue,
} from 'components/numerique/misc/SliderWrapper'

export default function TypingInput(props) {
  return (
    <SliderWrapper>
      <SliderWrapperLabel>Durée de rédaction</SliderWrapperLabel>
      <SliderWrapperSlider>
        <Slider
          value={props.engine.evaluate(`${props.name} . terminaux . temps écriture`).nodeValue}
          min={1}
          max={20}
          onChange={(value) =>
            props.setSituation({
              [`${props.name} . terminaux . temps écriture`]: value,
            })
          }
        />
        <SliderWrapperValue>
          {props.engine.evaluate(`${props.name} . terminaux . temps écriture`).nodeValue} min
        </SliderWrapperValue>
      </SliderWrapperSlider>
    </SliderWrapper>
  )
}
