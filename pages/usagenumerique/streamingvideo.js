import Web from "components/layout/Web";
import Equivalent from "components/numerique/Equivalent";
import { RulesProviderNumérique } from "components/numerique/RulesProviderNumérique";
import Text from "components/views/equivalent/Text";
import categories from "data/categories.json";
import usagenumerique from "data/categories/usagenumerique.json";
import React from "react";

const equivalents = [...usagenumerique].map((equivalent) => ({
  ...equivalent,
  id: equivalent.slug,
}));

export default function StreamingVideoPage(props) {
  return (
    <Web
      title={props.equivalent.meta.title}
      description={props.equivalent.meta.description}
      breadcrumb={{
        type: "equivalent",
        category: props.category,
        equivalent: props.equivalent,
      }}
    >
      <RulesProviderNumérique>
        <Equivalent equivalent={props.equivalent} category={props.category} name="streaming" />
      </RulesProviderNumérique>
      <Text equivalent={props.equivalent} />
    </Web>
  );
}

export async function getStaticProps() {
  return {
    props: {
      equivalent: equivalents.find((equivalent) => equivalent.slug === "streamingvideo"),
      category: categories.find((category) => category.slug === "usagenumerique"),
    },
  };
}
