import SelectFrequences from "./SelectFrequences";
import { convertGramsToKilograms } from "./utils";
import styled from "styled-components";

export default function YearlyLivraison(props) {
  return (
    <Wrapper>
      <Text>
        Vos usages émettent donc{" "}
        <Color>
          {convertGramsToKilograms(props.co2eq * 12)} kg CO<sub>2</sub>e
        </Color>{" "}
        <SelectFrequences></SelectFrequences>
        <strong>par an</strong>
        <span> (cette valeur se base sur la fréquence d'une commande par mois).</span>
      </Text>
      <br />
    </Wrapper>
  );
}

const Wrapper = styled.div``;

const Text = styled.div`
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
