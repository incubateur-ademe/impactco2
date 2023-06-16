import { convertGramsToKilograms } from "./utils";
import styled from "styled-components";

export default function YearlyLivraison(props) {
  return (
    <Wrapper>
      <br />
      <Text>
        Vos usages émettent{" "}
        <Big>
          {convertGramsToKilograms(props.co2eq)} kg CO<sub>2</sub>e <Color>par livraison</Color>
        </Big>{" "}
        <Disclaimer>
          Cette valeur est une estimation basée sur les paramètres fournis, ainsi que d'autres paramètres non
          représentés ici, mais dont la valeur est calculée sur les moyennes nationales.
        </Disclaimer>
      </Text>
      <Text>
        Soit{" "}
        <Big>
          {convertGramsToKilograms(props.co2eq * 12)} kg CO<sub>2</sub>e <Color>par an</Color>{" "}
        </Big>
        <div>Cette valeur se base sur la fréquence d'une commande par mois</div>
      </Text>
      <br />
    </Wrapper>
  );
}

const Wrapper = styled.div``;

const Text = styled.p`
  font-size: 1.125rem;
  text-align: left;

  ${(props) => props.theme.mq.small} {
    font-size: 0.875rem;
  }
`;
const Big = styled.span`
  font-size: 1.375rem;
  font-weight: bold;

  ${(props) => props.theme.mq.small} {
    display: block;
    font-size: 1.25rem;
  }
`;
const Color = styled.span`
  color: ${(props) => props.theme.colors.main};
`;
const Disclaimer = styled.span`
  display: block;
  font-size: 0.75rem;
  font-weight: 300;
`;
