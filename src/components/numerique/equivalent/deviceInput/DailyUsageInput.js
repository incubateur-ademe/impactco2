import Slider from "components/base/Slider";
import RulesContextNumérique from "components/numerique/RulesProviderNumérique";
import SliderWrapper from "components/numerique/misc/SliderWrapper";
import React, { useContext } from "react";

export default function DailyUsageInput(props) {
  const { engine, setSituation } = useContext(RulesContextNumérique);

  return (
    <SliderWrapper>
      <SliderWrapper.Label>Durée d'utilisation quotidienne</SliderWrapper.Label>
      <SliderWrapper.Slider>
        <Slider
          value={engine.evaluate(`${props.device.name} . profil utilisation`).nodeValue}
          min={1}
          max={20}
          step={0.5}
          onChange={(value) =>
            setSituation({
              [`${props.device.name} . profil utilisation`]: value,
            })
          }
        />
        <SliderWrapper.Value>
          {Math.floor(engine.evaluate(`${props.device.name} . profil utilisation`).nodeValue)}h
          {Math.round((engine.evaluate(`${props.device.name} . profil utilisation`).nodeValue * 60) % 60)}
        </SliderWrapper.Value>
      </SliderWrapper.Slider>
    </SliderWrapper>
  );
}
