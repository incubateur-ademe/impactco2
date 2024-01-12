import Slider from 'components/base/Slider'
import useRulesContextNumerique from 'components/numerique/RulesProviderNumerique'
import {
  SliderWrapper,
  SliderWrapperLabel,
  SliderWrapperSlider,
  SliderWrapperValue,
} from 'components/numerique/misc/SliderWrapper'

export default function RecipientInput(props) {
  const { engine, setSituation } = useRulesContextNumerique()

  return (
    <SliderWrapper>
      <SliderWrapperLabel>Nombre de destinataires</SliderWrapperLabel>
      <SliderWrapperSlider>
        <Slider
          value={engine.evaluate(`${props.name} . destinataires`).nodeValue}
          min={1}
          max={50}
          onChange={(value) =>
            setSituation({
              [`${props.name} . destinataires`]: value,
            })
          }
        />
        <SliderWrapperValue>{engine.evaluate(`${props.name} . destinataires`).nodeValue}</SliderWrapperValue>
      </SliderWrapperSlider>
    </SliderWrapper>
  )
}
