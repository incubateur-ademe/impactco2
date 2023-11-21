import { useContext } from 'react'
import Slider from 'components/base/Slider'
import RulesContextNumerique from 'components/numerique/RulesProviderNumerique'
import SliderWrapper from 'components/numerique/misc/SliderWrapper'

export default function RecipientInput(props) {
  const { engine, setSituation } = useContext(RulesContextNumerique)

  return (
    <SliderWrapper>
      <SliderWrapper.Label>Nombre de destinataires</SliderWrapper.Label>
      <SliderWrapper.Slider>
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
        <SliderWrapper.Value>{engine.evaluate(`${props.name} . destinataires`).nodeValue}</SliderWrapper.Value>
      </SliderWrapper.Slider>
    </SliderWrapper>
  )
}
