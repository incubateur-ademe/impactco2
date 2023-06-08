import ResultatLivraison from "./ResultatLivraison";
import LivraisonEq from "components/misc/tiles/LivraisonEq";
import DataContext from "components/providers/DataProvider";
import React, { useContext, useMemo } from "react";
import styled from "styled-components";

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

export default function ResultatsLivraison(props) {
  const { equivalents } = useContext(DataContext);
  const equivalentsToShow = useMemo(
    () =>
      equivalents.filter((equivalent) =>
        ["voiturethermique", "repasavecduboeuf", "streamingvideo"].includes(equivalent.slug)
      ),
    [equivalents]
  );
  return (
    <Wrapper>
      <div className="item item1">
        <ResultatLivraison co2eq={props.co2eq} />
      </div>
      {equivalentsToShow
        .sort(function (a, b) {
          return a.category < b.category;
        })
        .map((equivalent) => (
          <LivraisonEq key={equivalent.slug} equivalent={equivalent} weight={(props.co2eq / 1000) * props.freqMultBy} />
        ))}
    </Wrapper>
  );
}
