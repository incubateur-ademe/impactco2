import SelectFrequences from "./SelectFrequences";
import { frequences } from "./data.js";
import { convertGramsToKilograms } from "./utils";
import React, { useState } from "react";
import styled from "styled-components";

export default function YearlyLivraison(props) {
  const defaultFrequence = frequences.find((f) => f.isDefault);
  const [multiplicator, setMultiplicator] = useState(defaultFrequence.mult);
  const [textual, setTextual] = useState(defaultFrequence.displayed);
  const [uid, setUid] = useState(defaultFrequence.uid);

  const changeFrequence = (e) => {
    setMultiplicator(e.mult);
    setTextual(e.displayed);
    setUid(e.uid);
  };

  return (
    <Wrapper>
      <FlexText>
        Vos usages émettent donc&nbsp;
        <Color>
          {convertGramsToKilograms(props.co2eq * multiplicator)} kg CO<sub>2</sub>e*
        </Color>
        <strong>&nbsp;par&nbsp;</strong>
        <SelectFrequences changeFrequence={changeFrequence} value={uid}></SelectFrequences>
      </FlexText>
      <SubText>
        *cette valeur se base sur les paramètres que vous avez saisis dans le simulateur pour une commande par {textual}
        .
      </SubText>
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

const SubText = styled.div`
  color: grey;
  font-size: 14px;
`;
