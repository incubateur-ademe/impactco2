import Engine, { ASTNode, PublicodesExpression } from 'publicodes'
import { Dispatch, SetStateAction } from 'react'
import Slider from 'components/base/Slider'
import {
  SliderWrapper,
  SliderWrapperHint,
  SliderWrapperLabel,
  SliderWrapperSlider,
  SliderWrapperValue,
} from 'components/numerique/misc/SliderWrapper'

export default function SizeInput({
  engine,
  setSituation,
}: {
  engine: Engine
  setSituation: Dispatch<SetStateAction<Partial<Record<string, PublicodesExpression | ASTNode>>>>
}) {
  return (
    <SliderWrapper>
      <SliderWrapperLabel>Poids de la pièce jointe</SliderWrapperLabel>
      <SliderWrapperSlider>
        <Slider
          value={(engine.evaluate('email . taille').nodeValue as number) - 0.075}
          min={0}
          max={10}
          step={0.1}
          onChange={(value: number) =>
            setSituation({
              ['email . taille']: value + 0.075,
            })
          }
        />
        <SliderWrapperValue>
          {((engine.evaluate('email . taille').nodeValue as number) - 0.075).toFixed(1)} Mo
        </SliderWrapperValue>
      </SliderWrapperSlider>
      <SliderWrapperHint>Par défaut un email sans pièce jointe pèse 75ko</SliderWrapperHint>
    </SliderWrapper>
  )
}
