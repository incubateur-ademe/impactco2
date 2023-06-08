import ResultatLivraison from "./ResultatLivraison";
import { Wrapper } from "./ResultatsLivraison.styles";
import LivraisonEq from "components/misc/tiles/LivraisonEq";
import DataContext from "components/providers/DataProvider";
import React, { useContext, useMemo } from "react";

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
