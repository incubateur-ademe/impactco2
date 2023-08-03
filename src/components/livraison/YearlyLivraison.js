import SelectFrequences from "./SelectFrequences";
import SelectNumber from "./SelectNumber";
import { frequences } from "./data.js";
import { convertGramsToKilograms } from "./utils";
import React, { useState } from "react";
import styled from "styled-components";

export default function YearlyLivraison(props) {
  const defaultFrequence = frequences.find((f) => f.isDefault);
  const [multiplicator, setMultiplicator] = useState(defaultFrequence.mult);
  const [uid, setUid] = useState(defaultFrequence.uid);
  const [number, setNumber] = useState(1);

  const changeFrequence = (e) => {
    window?.please?.track(["trackEvent", "Interaction", "Select", `livraison_Frequency_${e.uid}`]);
    setMultiplicator(e.mult);
    setUid(e.uid);
  };

  const changeNumber = (number) => {
    window?.please?.track(["trackEvent", "Interaction", "Select", `livraison_Number_${number}`]);
    setNumber(number);
  };

  return (
    <Wrapper>
      <FlexText>
        Si je commande&nbsp;
        <SelectNumber changeNumber={changeNumber} value={number}></SelectNumber>
        <strong>&nbsp;colis par &nbsp;</strong>
        <SelectFrequences changeFrequence={changeFrequence} value={uid}></SelectFrequences>
        <span>, alors cette livraison émets&nbsp;</span>
        <Color>
          {convertGramsToKilograms(props.co2eq * multiplicator * number)} kg CO<sub>2</sub>e*
        </Color>
        <strong>&nbsp;par an&nbsp;</strong>.
      </FlexText>
      <br />
    </Wrapper>
  );
}

const Wrapper = styled.div``;

const FlexText = styled.div`
  display: flex;
  font-size: 1rem;
  margin-top: 1rem;
  text-align: left;
  ${(props) => props.theme.mq.small} {
    font-size: 0.75rem;
  }
`;

const Color = styled.span`
  color: #457be7;
  font-weight: bold;
`;
