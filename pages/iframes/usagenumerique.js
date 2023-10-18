import Iframe from "components/layout/Iframe";
import Category from "components/numerique/Category";
import { RulesProviderNumérique } from "components/numerique/RulesProviderNumérique";
import categories from "data/categories.json";
import React from "react";

export default function Numerique(props) {
  return (
    <Iframe url="usagenumerique">
      <RulesProviderNumérique>
        <Category category={props.category} />{" "}
      </RulesProviderNumérique>
    </Iframe>
  );
}
export async function getStaticProps() {
  return {
    props: {
      category: categories.find((item) => item.id === 10),
    },
  };
}
