import OptionalRelay from "./OptionalRelay";
import OptionalTraj from "./OptionalTraj";
import ResultatsLivraison from "./ResultatsLivraison";
import SelectProduits from "./SelectProduits";
import SelectRetraits from "./SelectRetraits";
import YearlyLivraison from "./YearlyLivraison";
import { calculateResultFunction } from "./calculateur_livraison_funtions.js";
import { produits, retraits, relays } from "./data.js";
import RulesContextLivraison from "components/livraison/RulesProviderLivraison";
import React, { useContext, useMemo, useState } from "react";
import styled from "styled-components";

export default function CalculateurLivraison() {
  // trunk-ignore(eslint/no-unused-vars)
  const { engine } = useContext(RulesContextLivraison);

  const [cO2eq, setCO2eq] = useState(0);
  const [showOptional, setShowOptional] = useState(true);

  const [values, setValues] = useState({
    produit: "habillement",
    retrait: "relais",
    relay: "marche",
    km: "7",
    traj: "dom_tra",
  });

  const [diffs, setDiffs] = useState({
    diffKm0: 0,
    diffRelay: 0,
  });

  const calculateResult = () =>
    calculateResultFunction(values, produits, retraits, relays, engine, diffs, setDiffs, setCO2eq);

  useMemo(() => {
    calculateResult();
    setShowOptional(values.retrait === "relais");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values]);

  const changeProduit = (produit) => setValues({ ...values, produit: produit.uid });
  const changeRetrait = (retrait) => setValues({ ...values, retrait: retrait.uid });
  const changeRelay = (relay) => setValues({ ...values, relay: relay.uid });
  const changeTraj = (traj) => setValues({ ...values, traj: traj.uid });
  const changeKm = (km) => setValues({ ...values, km: km });

  return (
    <>
      <H2Title>Estimez l'impact de vos livraisons</H2Title>
      <DropList>
        <SelectProduits changeProduit={changeProduit} value={values.produit} />
        <SelectRetraits changeRetrait={changeRetrait} value={values.retrait} />
      </DropList>
      <OptionalRelay
        show={showOptional}
        changeRelay={changeRelay}
        value={values.relay}
        diffRelay={diffs.diffRelay}
      ></OptionalRelay>
      <OptionalTraj
        show={showOptional}
        km={values.km}
        changeKm={changeKm}
        changeTraj={changeTraj}
        value={values.traj}
        diffKm0={diffs.diffKm0}
      ></OptionalTraj>
      <ResultatsLivraison co2eq={cO2eq} />
      <YearlyLivraison co2eq={cO2eq} />
    </>
  );
}

const H2Title = styled.h2`
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 0.5rem;
  margin-top: 0;
`;

const DropList = styled.div`
  background-color: ${(props) => props.theme.colors.background};
  border: 1px solid #e2dce0;
  border-radius: 16px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-items: center;
  ${(props) => props.theme.mq.xlarge} {
    grid-template-columns: repeat(1, 1fr);
    justify-items: center;
  }
  ${(props) => props.theme.mq.small} {
    grid-template-columns: repeat(1, 1fr);
    justify-items: start;
  }
  position: relative;
  > div > label {
    color: #746770;
    font-size: 14px;
    margin-bottom: 0;
  }
  > div > select {
    color: #1c9b93;
    padding-left: 0;
    width: 240px;
    ${(props) => props.theme.mq.xsmall} {
      font-size: 12px;
      width: auto;
    }
  }
`;
