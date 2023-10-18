import Slider from "components/base/Slider";
import RulesContextNumérique from "components/numerique/RulesProviderNumérique";
import SliderWrapper from "components/numerique/misc/SliderWrapper";
import React, { useContext } from "react";

export default function DurationInput(props) {
  const { engine, setSituation } = useContext(RulesContextNumérique);

  return (
    <SliderWrapper>
      <SliderWrapper.Label>Durée de la {props.name === "streaming" ? "vidéo" : "communication"}</SliderWrapper.Label>
      <SliderWrapper.Slider>
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
        <SliderWrapper.Value>{engine.evaluate(`${props.name} . durée`).nodeValue} min</SliderWrapper.Value>
      </SliderWrapper.Slider>
    </SliderWrapper>
  );
}
