import Slider from 'components/base/Slider'
import {
  SliderWrapper,
  SliderWrapperLabel,
  SliderWrapperSlider,
  SliderWrapperValue,
} from 'components/numerique/misc/SliderWrapper'

export default function DailyUsageInput(props) {
  return (
    <SliderWrapper>
      <SliderWrapperLabel>Durée d'utilisation quotidienne</SliderWrapperLabel>
      <SliderWrapperSlider>
        <Slider
          value={props.engine.evaluate(`${props.device.name} . profil utilisation`).nodeValue}
          min={1}
          max={20}
          step={0.5}
          onChange={(value) =>
            props.setSituation({
              [`${props.device.name} . profil utilisation`]: value,
            })
          }
        />
        <SliderWrapperValue>
          {Math.floor(props.engine.evaluate(`${props.device.name} . profil utilisation`).nodeValue)}h
          {Math.round((props.engine.evaluate(`${props.device.name} . profil utilisation`).nodeValue * 60) % 60)}
        </SliderWrapperValue>
      </SliderWrapperSlider>
    </SliderWrapper>
  )
}
