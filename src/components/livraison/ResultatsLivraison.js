import ResultatLivraison from "./ResultatLivraison";
import LivraisonEq from "components/misc/tiles/LivraisonEq";
import DataContext from "components/providers/DataProvider";
import React, { useContext, useMemo } from "react";
import styled from "styled-components";
import useLocalStorage from "use-local-storage";

export default function ResultatsLivraison(props) {
  // eslint-disable-next-line no-unused-vars
  const { equivalents, whitelist } = useContext(DataContext);

  // eslint-disable-next-line no-unused-vars
  const [eqv1L] = useLocalStorage("eqv1L", "");
  const [eqv2L] = useLocalStorage("eqv2L", "");
  const [eqv3L] = useLocalStorage("eqv3L", "");

  const equivalentsToShow = useMemo(
    () =>
      equivalents.filter(
        (equivalent) => whitelist.includes(equivalent.slug)
        // trunk-ignore(eslint/react-hooks/exhaustive-deps)
      ),
    [whitelist]
  );

  // eslint-disable-next-line no-unused-vars
  const GetEq = (indx) => equivalents.find((e) => e.slug === whitelist[indx]);

  return (
    <Wrapper>
      <ResultatLivraison co2eq={props.co2eq} />
      <LivraisonEq slug={1} equivalent={equivalentsToShow[0]} weight={props.co2eq / 1000} />
      <LivraisonEq slug={2} equivalent={equivalentsToShow[1]} weight={props.co2eq / 1000} />
      <LivraisonEq slug={3} equivalent={equivalentsToShow[2]} weight={props.co2eq / 1000} />

      <div>{JSON.stringify(eqv1L, null, 2)}</div>
      <div>{JSON.stringify(eqv2L, null, 2)}</div>
      <div>{JSON.stringify(eqv3L, null, 2)}</div>
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
