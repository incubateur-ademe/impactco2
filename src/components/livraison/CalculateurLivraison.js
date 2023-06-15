import OptionalRelay from "./OptionalRelay";
import OptionalTraj from "./OptionalTraj";
import ResultatsLivraison from "./ResultatsLivraison";
import SelectProduits from "./SelectProduits";
import SelectRetraits from "./SelectRetraits";
import { calculateResultFunction } from "./calculateur_livraison_funtions.js";
import { produits, retraits } from "./data.js";
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
    traj: "ret_dom",
    km: "7",
  });

  const [diffs, setDiffs] = useState({
    diffKm0: 0,
  });

  const calculateResult = () => {
    calculateResultFunction(values, produits, retraits, engine, diffs, setDiffs, setCO2eq);
  };

  useMemo(() => {
    calculateResult();
    setShowOptional(values.retrait === "relais");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values]);

  const changeProduit = (produit) => setValues({ ...values, produit: produit.uid });

  const changeRetrait = (retrait) => {
    let localValues = clonedValues();
    localValues.retrait = retrait.uid;
    setValues(localValues);
  };

  const changeTraj = (traj) => {
    let localValues = clonedValues();
    localValues.traj = traj.uid;
    setValues(localValues);
  };

  const changeKm = (km) => {
    let localValues = clonedValues();
    localValues.km = km;
    setValues(localValues);
  };

  const clonedValues = () => {
    return JSON.parse(JSON.stringify(values));
  };

  return (
    <>
      <H2Title>Estimez l'impact de vos livraisons</H2Title>
      <Subtitle>En vous basant sur les commandes que vous effectuez le plus...</Subtitle>
      <DropList>
        <SelectProduits changeProduit={changeProduit} value={values.produit} />
        <SelectRetraits changeRetrait={changeRetrait} value={values.retrait} />
      </DropList>
      <Hideable></Hideable>
      <OptionalRelay show={showOptional}></OptionalRelay>
      <OptionalTraj
        show={showOptional}
        km={values.km}
        changeKm={changeKm}
        changeTraj={changeTraj}
        value={values.traj}
        diffKm0={diffs.diffKm0}
      ></OptionalTraj>
      <ResultatsLivraison co2eq={cO2eq} />
    </>
  );
}

const H2Title = styled.h2`
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 0.5rem;
  margin-top: 0;
`;

const Subtitle = styled.p`
  color: #564d53;
  font-size: 14px;
  font-weight: 400;
  line-height: 16px;
  margin-bottom: 2rem;
`;

const DropList = styled.div`
  background-color: ${(props) => props.theme.colors.background};
  border: 1px solid #e2dce0;
  border-radius: 16px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  position: relative;
  > div > label {
    color: #746770;
    font-size: 14px;
    margin-bottom: 0;
  }
  > div > select {
    width: 240px;
    color: #1c9b93;
    padding-left: 0;
    ${(props) => props.theme.mq.xsmall} {
      width: auto;
      font-size: 12px;
    }
  }
  ${(props) => props.theme.mq.xlarge} {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const Hideable = styled.div``;
