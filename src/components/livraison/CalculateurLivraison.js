import OptionalRelay from "./OptionalRelay";
import OptionalTraj from "./OptionalTraj";
import ResultatsLivraison from "./ResultatsLivraison";
import SelectProduits from "./SelectProduits";
import SelectRetraits from "./SelectRetraits";
import YearlyLivraison from "./YearlyLivraison";
import { calculateResultFunction } from "./calculateur_livraison_functions.js";
import { produits, retraits, relays } from "./data.js";
import { convertGramsToKilograms } from "./utils";
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
    setShowOptional(values.retrait.amongst(["relais", "click", "magasin"]));
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
      <Optionals show={showOptional}>
        <div className="item1">
          <OptionalRelay changeRelay={changeRelay} value={values.relay} diffRelay={diffs.diffRelay}></OptionalRelay>
        </div>
        <div className="item2">
          <Addendum>
            <span className="plus">+</span>
            <span className="txt">{convertGramsToKilograms(diffs.diffKm0)} kg de CO2e</span>
          </Addendum>
        </div>
        <div className="item3">
          <OptionalTraj km={values.km} changeKm={changeKm} changeTraj={changeTraj} value={values.traj}></OptionalTraj>
        </div>
        <div className="item4"></div>
        <div className="item5"></div>
        <div className="item6"></div>
      </Optionals>
      <ResultatsLivraison co2eq={cO2eq} />
      <YearlyLivraison co2eq={cO2eq} />
    </>
  );
}

const Optionals = styled.div`
  background-color: #f9f7f8;
  display: ${(props) => (props.show ? "grid" : "none")};
  grid-template-columns: 1fr 1fr 1fr;
  margin-top: -10px;
  position: relative;

  ${(props) => props.theme.mq.small} {
    grid-template-columns: 1fr;
  }
  > .item1 {
    grid-column: span 2;
  }
  > .item2 {
    display: flex;
    justify-content: center;
    align-items: center;
    grid-row: span 2;
    ${(props) => props.theme.mq.small} {
      order: 1;
      grid-column: span 3;
      justify-content: flex-start;
      margin-left: 1rem;
      margin-bottom: 1rem;
    }
  }
  > .item3 {
    grid-column: span 2;
  }
`;

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
  z-index: 1;
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

const Addendum = styled.div`
  align-items: center;
  background-color: #ebf2ff;
  border: 1px solid #ccdcfd;
  border-radius: 8px;
  color: #235dd2;
  display: flex;
  font-size: 14px;
  font-weight: 400;
  justify-content: center;
  letter-spacing: 0em;
  line-height: 32px;
  ${(props) => props.theme.mq.large} {
    margin-right: 1rem;
  }
  padding: 0 0.75rem;
  > .plus {
    font-size: 28px;
    line-height: 32px;
    margin-right: 5px;
    margin-top: -8px;
  }
`;
