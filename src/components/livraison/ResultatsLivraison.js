import ResultatLivraison from "./ResultatLivraison";
import LivraisonEq from "components/misc/tiles/LivraisonEq";
import DataContext from "components/providers/DataProvider";
import React, { useContext } from "react";
import styled from "styled-components";

export default function ResultatsLivraison(props) {
  const { equivalents, whitelist } = useContext(DataContext);

  const GetEq = (indx) => equivalents.find((e) => e.slug === whitelist[indx]);

  return (
    <Wrapper>
      <ResultatLivraison co2eq={props.co2eq} />
      <LivraisonEq slug={1} equivalent={GetEq(0)} weight={props.co2eq / 1000} />
      <LivraisonEq slug={2} equivalent={GetEq(1)} weight={props.co2eq / 1000} />
      <LivraisonEq slug={3} equivalent={GetEq(2)} weight={props.co2eq / 1000} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  border: 1px solid #457be7;
  border-radius: 16px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  margin-top: 1rem;
  ${(props) => props.theme.mq.xlarge} {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(4, 1fr);
  }
`;
