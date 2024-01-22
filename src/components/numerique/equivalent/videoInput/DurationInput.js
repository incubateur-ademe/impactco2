import Slider from 'components/base/Slider'
import {
  SliderWrapper,
  SliderWrapperLabel,
  SliderWrapperSlider,
  SliderWrapperValue,
} from 'components/numerique/misc/SliderWrapper'

export default function DurationInput(props) {
  return (
    <SliderWrapper>
      <SliderWrapperLabel>Durée de la {props.name === 'streaming' ? 'vidéo' : 'communication'}</SliderWrapperLabel>
      <SliderWrapperSlider>
        <Slider
          value={props.engine.evaluate(`${props.name} . durée`).nodeValue}
          min={1}
          max={600}
          onChange={(value) =>
            props.setSituation({
              [`${props.name} . durée`]: value,
            })
          }
        />
        <SliderWrapperValue>{props.engine.evaluate(`${props.name} . durée`).nodeValue} min</SliderWrapperValue>
      </SliderWrapperSlider>
    </SliderWrapper>
  )
}
