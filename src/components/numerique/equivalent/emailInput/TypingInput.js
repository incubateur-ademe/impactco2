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
      <SliderWrapperLabel>Durée de rédaction</SliderWrapperLabel>
      <SliderWrapperSlider>
        <Slider
          value={engine.evaluate(`${props.name} . terminaux . temps écriture`).nodeValue}
          min={1}
          max={20}
          onChange={(value) =>
            setSituation({
              [`${props.name} . terminaux . temps écriture`]: value,
            })
          }
        />
        <SliderWrapperValue>
          {engine.evaluate(`${props.name} . terminaux . temps écriture`).nodeValue} min
        </SliderWrapperValue>
      </SliderWrapperSlider>
    </SliderWrapper>
  )
}
