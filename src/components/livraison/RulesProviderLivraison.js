import rules from "@incubateur-ademe/publicodes-impact-livraison";
import useSituation from "hooks/useSituation";
import Engine from "publicodes";
import React from "react";

const RulesContextLivraison = React.createContext({});

export function RulesProviderLivraison(props) {
  // eslint-disable-next-line react-hooks/exhaustive-deps

  const engine = new Engine(rules);

  const { situation, setSituation } = useSituation(engine);

  return (
    <RulesContextLivraison.Provider
      value={{
        engine,
        situation,
        setSituation,
      }}
    >
      {engine && props.children}
    </RulesContextLivraison.Provider>
  );
}

export default RulesContextLivraison;
