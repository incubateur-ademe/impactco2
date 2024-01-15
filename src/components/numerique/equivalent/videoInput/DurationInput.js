import Slider from 'components/base/Slider'
import useRulesContextNumerique from 'components/numerique/RulesProviderNumerique'
import {
  SliderWrapper,
  SliderWrapperLabel,
  SliderWrapperSlider,
  SliderWrapperValue,
} from 'components/numerique/misc/SliderWrapper'

export default function DurationInput(props) {
  const { engine, setSituation } = useRulesContextNumerique()

  return (
    <SliderWrapper>
      <SliderWrapperLabel>Durée de la {props.name === 'streaming' ? 'vidéo' : 'communication'}</SliderWrapperLabel>
      <SliderWrapperSlider>
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
        <SliderWrapperValue>{engine.evaluate(`${props.name} . durée`).nodeValue} min</SliderWrapperValue>
      </SliderWrapperSlider>
    </SliderWrapper>
  )
}
