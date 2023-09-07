import RulesContextLivraison from "components/livraison/RulesProviderLivraison";
import Head from "next/head";
import Link from "next/link";
import { RulePage } from "publicodes-react";
import React, { useContext } from "react";

export default function DocumentationLivraison(props) {
  console.log("props", props);
  const { engine } = useContext(RulesContextLivraison);
  console.log("engine", engine);

  return (
    <RulePage
      documentationPath="/documentation"
      rulePath={props.slug}
      engine={engine}
      language="fr"
      renderers={{
        Head,
        Link: ({ to, children }) => <Link href={to}>{children}</Link>,
      }}
    />
  );
}
