import RulesContextLivraison from "components/livraison/RulesProviderLivraison";
import { RulesProviderLivraison } from "components/livraison/RulesProviderLivraison";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { useContext } from "react";

export default function Documentation() {
  const router = useRouter();
  const rootDoc = "livraison";
  const { engine } = useContext(RulesContextLivraison);
  console.log("engine", engine);

  const DocumentationLivraison = dynamic(() => import("components/base/DocumentationLivraison"), {
    ssr: false,
  });

  return (
    <>
      <RulesProviderLivraison>
        <DocumentationLivraison engine={engine} slug={router?.query?.slug?.join("/") || rootDoc} />
      </RulesProviderLivraison>
    </>
  );
}
