import Slider from 'components/base/Slider'
import useRulesContextNumerique from 'components/numerique/RulesProviderNumerique'
import {
  SliderWrapper,
  SliderWrapperLabel,
  SliderWrapperSlider,
  SliderWrapperValue,
} from 'components/numerique/misc/SliderWrapper'

export default function DeviceInput(props) {
  const { engine, setSituation } = useRulesContextNumerique()

  return (
    <SliderWrapper>
      <SliderWrapperLabel>Durée de vie totale du terminal</SliderWrapperLabel>
      <SliderWrapperSlider>
        <Slider
          value={engine.evaluate(`${props.device.name} . durée de vie`).nodeValue}
          min={1}
          max={20}
          onChange={(value) =>
            setSituation({
              [`${props.device.name} . durée de vie`]: value,
            })
          }
        />
        <SliderWrapperValue>{engine.evaluate(`${props.device.name} . durée de vie`).nodeValue} ans</SliderWrapperValue>
      </SliderWrapperSlider>
    </SliderWrapper>
  )
}
