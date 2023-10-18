import rules from "@incubateur-ademe/publicodes-negaoctet";
import useSituation from "hooks/useSituation";
import Engine from "publicodes";
import React, { useMemo } from "react";

const RulesContextNumérique = React.createContext({});

export function RulesProviderNumérique(props) {
  // eslint-disable-next-line react-hooks/exhaustive-deps

  // @Clemog: We make unit errors silent.
  const engine = useMemo(() => new Engine(rules, { logger: { log: () => {}, warn: () => {}, err: () => {} } }), []);

  const { situation, setSituation } = useSituation(engine);

  return (
    <RulesContextNumérique.Provider
      value={{
        engine,
        situation,
        setSituation,
      }}
    >
      {engine && props.children}
    </RulesContextNumérique.Provider>
  );
}

export default RulesContextNumérique;
