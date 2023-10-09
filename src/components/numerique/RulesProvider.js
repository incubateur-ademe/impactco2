import rules from "@incubateur-ademe/publicodes-negaoctet";
import useSituation from "hooks/useSituation";
import Engine from "publicodes";
import React from "react";

const RulesContext = React.createContext({});

export function RulesProvider(props) {
  // eslint-disable-next-line react-hooks/exhaustive-deps

  const engine = new Engine(rules);

  const { situation, setSituation } = useSituation(engine);

  return (
    <RulesContext.Provider
      value={{
        engine,
        situation,
        setSituation,
      }}
    >
      {engine && props.children}
    </RulesContext.Provider>
  );
}

export default RulesContext;
