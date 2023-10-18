import Web from "components/layout/Web";
import Learning from "components/misc/Learning";
import Category from "components/numerique/Category";
import { RulesProviderNumérique } from "components/numerique/RulesProviderNumérique";
import categories from "data/categories.json";
import React from "react";

export default function Numerique(props) {
  return (
    <Web
      title={props.category.meta.title}
      description={props.category.meta.description}
      breadcrumb={{
        type: "equivalent",
        category: props.category,
      }}
    >
      <RulesProviderNumérique>
        <Category category={props.category} />
        <Learning category={props.category} />
      </RulesProviderNumérique>
    </Web>
  );
}
export async function getStaticProps() {
  return {
    props: {
      category: categories.find((item) => item.id === 10),
    },
  };
}
