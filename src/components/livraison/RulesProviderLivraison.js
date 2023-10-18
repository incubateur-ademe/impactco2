import rules from "@incubateur-ademe/publicodes-impact-livraison";
import useSituation from "hooks/useSituation";
import Engine from "publicodes";
import React, { useMemo } from "react";

const RulesContextLivraison = React.createContext({});

export function RulesProviderLivraison(props) {
  // eslint-disable-next-line react-hooks/exhaustive-deps

  // @Clemog: We make unit errors silent.
  const engine = useMemo(() => new Engine(rules, { logger: { log: () => {}, warn: () => {}, err: () => {} } }), []);

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
