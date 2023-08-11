import Bottom from "./category/Bottom";
import CategoryLegend from "./category/CategoryLegend";
import Description from "./category/Description";
import Instruction from "./category/Instruction";
import List from "./category/List";
import Top from "./category/Top";
import Wrapper from "./category/Wrapper";
import Checkbox from "components/base/Checkbox";
import OutboundLink from "components/base/OutboundLink.js";
import Section from "components/base/Section";
import BarChart from "components/charts/BarChart";
import DataContext from "components/providers/DataProvider";
import React, { useContext, useMemo, useState } from "react";
import styled from "styled-components";
import { formatName, formatTotal, formatUsage } from "utils/formatters";

const SmallText = styled.div`
  font-size: 14px;
  font-weight: 400;
  margin-bottom: 2rem;
  text-align: right;
  ${(props) => props.theme.mq.medium} {
    margin-bottom: 1rem;
  }
  ${(props) => props.theme.mq.small} {
    margin-bottom: 0;
  }
`;

export default function CategoryList(props) {
  const { equivalents, categories } = useContext(DataContext);

  const [displayAll, setDisplayAll] = useState(false);

  const equivalentsOfCategory = useMemo(
    () =>
      props.category &&
      equivalents
        .filter((equivalent) => equivalent.category === props.category.id)
        .filter((equivalent) => equivalent.default || displayAll)
        .map((equivalent) => ({
          id: `${equivalent.slug}`,
          title: `${formatName(equivalent.name, 1, true)}`,
          subtitle: displayAll ? formatName(equivalent.subtitle) : null,
          emoji: equivalent.emoji,
          unit: equivalent.unit,
          value: formatTotal(equivalent),
          usage: formatUsage(equivalent),
          to: `/${categories.find((category) => category.id === equivalent.category).slug}/${equivalent.slug}`,
          onClick: () =>
            window?.please?.track(["trackEvent", "Interaction", "Navigation via graph categorie", equivalent.slug]),
        }))
        .sort((a, b) => (a.value > b.value ? 1 : -1)),

    [equivalents, categories, props.category, displayAll]
  );

  return (
    <Section>
      <Section.Content>
        {props?.category?.slug === "boisson" ? (
          <SmallText>
            <span> Source : </span>
            <OutboundLink title="Agribalyse 3.1.1" href="https://agribalyse.ademe.fr/app" data-testid="lien-agribalyse">
              Agribalyse 3.1.1{" "}
            </OutboundLink>
            <span> - </span>
            <span>Mise à jour le 10/10/2023 </span>
          </SmallText>
        ) : (
          <></>
        )}
        <Wrapper name={props.category.title || props.category.name} slug={props.category.slug}>
          <Description description={props.category.description} />
          <Top className="noscreenshot">
            <Instruction title={props.category.equivalent} gender={props.category.gender} />
            <Top.Checkboxes
              visible={
                equivalents
                  .filter((equivalent) => equivalent.category === props.category.id)
                  .find((equivalent) => !equivalent.default) && !props.category.list
              }
            >
              <Checkbox
                name="displayAll"
                checked={displayAll}
                onChange={() => {
                  setDisplayAll((prevDisplayAll) => !prevDisplayAll);
                  window?.please?.track([
                    "trackEvent",
                    "Interaction",
                    "Voir tous les équivalents",
                    props.category.name,
                  ]);
                }}
              >
                Voir {props.category.gender === "f" ? "toutes" : "tous"} les{" "}
                {formatName(props.category.equivalent, 2) || "équivalents"}
              </Checkbox>
            </Top.Checkboxes>
          </Top>
          {props.category.list ? (
            <List items={equivalentsOfCategory} max={equivalentsOfCategory[equivalentsOfCategory.length - 1]?.value} />
          ) : (
            <>
              <BarChart
                items={equivalentsOfCategory}
                max={equivalentsOfCategory[equivalentsOfCategory.length - 1]?.value}
              />
              {![2, 3].includes(props.category.id) && <CategoryLegend />}
            </>
          )}
          <Bottom category={props.category} />
        </Wrapper>
      </Section.Content>
    </Section>
  );
}
