import Slider from "components/base/Slider";
import RulesContextNumérique from "components/numerique/RulesProviderNumérique";
import SliderWrapper from "components/numerique/misc/SliderWrapper";
import React, { useContext } from "react";

export default function RecipientInput(props) {
  const { engine, setSituation } = useContext(RulesContextNumérique);

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
  );
}
