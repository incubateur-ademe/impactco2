import SelectFrequences from "./SelectFrequences";
import { convertGramsToKilograms } from "./utils";
import React, { useState } from "react";
import styled from "styled-components";

export default function YearlyLivraison(props) {
  const [multiplicator, setMultiplicator] = useState(1);

  const changeFrequence = (e) => {
    setMultiplicator(e.mult);
  };

  return (
    <Wrapper>
      <FlexText>
        Vos usages émettent donc&nbsp;
        <Color>
          {convertGramsToKilograms(props.co2eq * multiplicator)} kg CO<sub>2</sub>e
        </Color>
        <strong>&nbsp;par&nbsp;</strong>
        <SelectFrequences changeFrequence={changeFrequence}></SelectFrequences>
      </FlexText>
      <FlexText>
        <span> (cette valeur se base sur la fréquence d'une commande par mois).</span>
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
