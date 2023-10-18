import Slider from "components/base/Slider";
import RulesContextNumérique from "components/numerique/RulesProviderNumérique";
import SliderWrapper from "components/numerique/misc/SliderWrapper";
import React, { useContext } from "react";

export default function DurationInput(props) {
  const { engine, setSituation } = useContext(RulesContextNumérique);

  return (
    <SliderWrapper>
      <SliderWrapper.Label>Poids de l'email</SliderWrapper.Label>
      <SliderWrapper.Slider>
        <Slider
          value={engine.evaluate(`${props.name} . taille`).nodeValue}
          min={0}
          max={10}
          step={0.1}
          onChange={(value) =>
            setSituation({
              [`${props.name} . taille`]: value,
            })
          }
        />
        <SliderWrapper.Value>{engine.evaluate(`${props.name} . taille`).nodeValue} Mo</SliderWrapper.Value>
      </SliderWrapper.Slider>
    </SliderWrapper>
  );
}
