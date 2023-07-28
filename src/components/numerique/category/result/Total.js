import Tile from "components/misc/tiles/Tile";
import RulesContext from "components/numerique/RulesProvider";
import DataContext from "components/providers/DataProvider";
import React, { useContext, useMemo } from "react";
import styled from "styled-components";
import { formatNumber } from "utils/formatters";

const Wrapper = styled.div`
  margin: 0;
`;
const Text = styled.div`
  font-size: 1.125rem;
  text-align: center;

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
const Tiles = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-bottom: 2.5rem;

  ${(props) => props.theme.mq.medium} {
    gap: 0.75rem;
  }
`;

export default function Total(props) {
  const { engine, situation } = useContext(RulesContext);

  const { equivalents } = useContext(DataContext);

  const equivalentsToShow = useMemo(
    () =>
      equivalents.filter((equivalent) =>
        ["voiturethermique", "repasavecduboeuf", "tshirtencoton"].includes(equivalent.slug)
      ),
    [equivalents]
  );
  const total = useMemo(
    () =>
      engine.evaluate("email").nodeValue * props.numberEmails +
      (engine.evaluate("streaming . durée").nodeValue ? engine.evaluate("streaming").nodeValue : 0) +
      (engine.evaluate("visio . durée").nodeValue ? engine.evaluate("visio").nodeValue : 0),
    [engine, situation, props.numberEmails]
  );
  const construction = useMemo(
    () =>
      engine.evaluate("email . terminaux . construction").nodeValue * props.numberEmails +
      engine.evaluate("streaming . terminaux . construction").nodeValue +
      engine.evaluate("visio . terminaux . construction").nodeValue,
    [engine, situation, props.numberEmails]
  );
  const totalToUse = useMemo(() => (props.construction ? total : total - construction), [total, props.construction]);

  return engine ? (
    <Wrapper>
      <Text>
        Vos usages émettent{" "}
        <Big>
          {formatNumber(totalToUse / 1000)} kg CO<sub>2</sub>e <Color>par semaine</Color>
        </Big>{" "}
        <Disclaimer>
          Cette valeur comprend l’utilisation de vos appareils, la transmission de la donnée et la construction et
          l’usage des data-centers.
          <br />
          <strong>
            L’impact de la construction de vos appareils n’est pas incluse mais est abordée plus bas dans la page.{" "}
          </strong>
        </Disclaimer>
      </Text>
      <Text>
        Soit{" "}
        <Big>
          {formatNumber((totalToUse / 1000) * 52)} kg CO<sub>2</sub>e <Color>par an</Color>{" "}
        </Big>
        <div>ce qui représente autant d’émissions que pour fabriquer, consommer ou parcourir :</div>
      </Text>
      <Tiles>
        {equivalentsToShow.map((equivalent) => (
          <Tile
            key={equivalent.slug}
            equivalent={equivalent}
            weight={(totalToUse / 1000) * 52}
            equivalentPage
            reference
            noAnimation
          />
        ))}
      </Tiles>
    </Wrapper>
  ) : null;
}
