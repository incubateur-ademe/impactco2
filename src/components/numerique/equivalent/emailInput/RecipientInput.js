import Slider from 'components/base/Slider'
import {
  SliderWrapper,
  SliderWrapperLabel,
  SliderWrapperSlider,
  SliderWrapperValue,
} from 'components/numerique/misc/SliderWrapper'

export default function RecipientInput(props) {
  return (
    <SliderWrapper>
      <SliderWrapperLabel>Nombre de destinataires</SliderWrapperLabel>
      <SliderWrapperSlider>
        <Slider
          value={props.engine.evaluate(`${props.name} . destinataires`).nodeValue}
          min={1}
          max={50}
          onChange={(value) =>
            props.setSituation({
              [`${props.name} . destinataires`]: value,
            })
          }
        />
        <SliderWrapperValue>{props.engine.evaluate(`${props.name} . destinataires`).nodeValue}</SliderWrapperValue>
      </SliderWrapperSlider>
    </SliderWrapper>
  )
}
