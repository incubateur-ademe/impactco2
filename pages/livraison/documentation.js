import RulesContextLivraison from "components/livraison/RulesProviderLivraison";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { RulePage } from "publicodes-react";
import React, { useContext } from "react";

export default function Documentation() {
  const { slug } = useRouter().query;
  const { engine } = useContext(RulesContextLivraison);

  return (
    <RulePage
      engine={engine}
      documentationPath="/documentation"
      rulePath={slug.join("/")}
      language="fr"
      renderers={{
        Head,
        Link: ({ to, children }) => (
          <Link href={to}>
            <a>{children}</a>
          </Link>
        ),
      }}
    />
  );
}
