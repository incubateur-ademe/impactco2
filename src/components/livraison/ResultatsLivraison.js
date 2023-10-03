import ResultatLivraison from "./ResultatLivraison";
import { default_eqs } from "components/livraison/data.js";
import LivraisonEq from "components/misc/tiles/LivraisonEq";
import DataContext from "components/providers/DataProvider";
import React, { useContext } from "react";
import styled from "styled-components";
import useLocalStorage from "use-local-storage";

export default function ResultatsLivraison(props) {
  const { equivalents } = useContext(DataContext);
  const [whitelist] = useLocalStorage("ico2_whitelist", default_eqs);

  const GetEq = (indx) => equivalents.find((e) => e.slug === whitelist[indx]);

  return (
    <Wrapper>
      <ResultatLivraison co2eq={props.co2eq} />
      <UpperEq>
        <LivraisonEq slug={1} equivalent={GetEq(0)} weight={props.co2eq / 1000} />
        <LivraisonEq slug={2} equivalent={GetEq(1)} weight={props.co2eq / 1000} />
        <LivraisonEq slug={3} equivalent={GetEq(2)} weight={props.co2eq / 1000} />
        <div></div>
        <div></div>
        <div>button...</div>
      </UpperEq>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  border: 1px solid #457be7;
  border-radius: 16px;
  display: grid;
  grid-template-columns: 280px repeat(1, 1fr);
  ${(props) => props.theme.mq.large} {
    grid-template-columns: 205px repeat(1, 1fr);
  }
  margin-top: 1rem;
  ${(props) => props.theme.mq.small} {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(4, 1fr);
  }
`;

const UpperEq = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 1fr 1fr;
`;
