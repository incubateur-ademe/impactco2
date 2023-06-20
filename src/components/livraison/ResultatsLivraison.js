import ResultatLivraison from "./ResultatLivraison";
import LivraisonEq from "components/misc/tiles/LivraisonEq";
import DataContext from "components/providers/DataProvider";
import useLocalStorage from "hooks/useLocalStorage";
import React, { useContext, useMemo } from "react";
import styled from "styled-components";

export default function ResultatsLivraison(props) {
  const { eqv1, eqv2, eqv3, equivalents, tiles } = useContext(DataContext);
  console.log("eqv3", eqv3);
  console.log("eqv2", eqv2);

  const [eqv1L, setEqv1L] = useLocalStorage("eqv1L", "voiturethermique");
  console.log("setEqv1L", setEqv1L);
  const [eqv2L, setEqv2L] = useLocalStorage("eqv2L", "repasavecduboeuf");
  console.log("setEqv2L", setEqv2L);
  const [eqv3L, setEqv3L] = useLocalStorage("eqv3L", "streamingvideo");
  console.log("setEqv3L", setEqv3L);

  const equivalentsToShow = useMemo(
    () => equivalents.filter((equivalent) => [eqv1L, eqv2L, eqv3L].includes(equivalent.slug)),
    [equivalents]
  );

  return (
    <Wrapper>
      <ResultatLivraison co2eq={props.co2eq} />
      {equivalentsToShow
        .sort(function (a, b) {
          return a.category < b.category;
        })
        .map((equivalent, indx) => (
          <LivraisonEq key={equivalent.slug} slug={indx + 1} equivalent={equivalent} weight={props.co2eq / 1000} />
        ))}
      <div>
        {JSON.stringify(eqv1, null, 2)}
        {JSON.stringify(
          tiles.map((t) => t.slug),
          null,
          2
        )}
      </div>
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
