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
import ModalContext from "components/providers/ModalProvider";
import React, { useContext, useMemo, useState } from "react";
import Switch from "react-switch";
import styled from "styled-components";
import { themes } from "utils/styles";

export default function CalculateurLivraison() {
  // trunk-ignore(eslint/no-unused-vars)
  const { engine } = useContext(RulesContextLivraison);
  const { setIfl } = useContext(ModalContext);

  const [cO2eq, setCO2eq] = useState(0);
  const [showOptional, setShowOptional] = useState(true);

  const [isHabit, setIsHabit] = useState(true);

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
      <Flex>
        <H2Title>Estimez l'impact de vos livraisons</H2Title>
        <ButtonChange onClick={() => setIfl(true)}>
          <svg width="16px" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 4 1 8l4 4m10-8 4 4-4 4M11 1 9 15"
            />
          </svg>
          &nbsp;Intégrer le simulateur
        </ButtonChange>
      </Flex>
      <DropList>
        <SelectProduits changeProduit={changeProduit} value={values.produit} />
        <SelectRetraits changeRetrait={changeRetrait} value={values.retrait} />
      </DropList>
      <ToggleContainer>
        <ToggleHabitContainer>
          <FlexHabit>
            <div className="item1">
              <Switch
                checked={isHabit}
                onChange={setIsHabit}
                offColor={themes.night.colors.background}
                onColor={themes.default.colors.background}
                offHandleColor={themes.default.colors.background}
                onHandleColor={themes.night.colors.background}
                aria-label="Changer de thème"
                uncheckedIcon={""}
                checkedIcon={""}
              />
            </div>
            <div className="item2">Le point relais est sur votre trajet habituel</div>
            <div className="item3">addendum</div>
          </FlexHabit>
        </ToggleHabitContainer>
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
        <TogglePlaneContainer></TogglePlaneContainer>
      </ToggleContainer>
      <ResultatsLivraison co2eq={cO2eq} />
      <YearlyLivraison co2eq={cO2eq} />
    </>
  );
}

const Optionals = styled.div`
  background-color: #f9f7f8;
  display: ${(props) => (props.show ? "grid" : "none")};
  grid-template-columns: 1fr 1fr 1fr;
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
  margin-bottom: 0;
  margin-top: 0;
`;

const DropList = styled.div`
  background-color: ${(props) => props.theme.colors.background};
  border: 1px solid #e2dce0;
  border-radius: 16px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-items: left;
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

const ButtonChange = styled.button`
  background-color: white;
  border-color: #b5abb2;
  border-radius: 8px;
  border-style: solid;
  border-width: 1px;
  color: #564d53;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0em;
  line-height: 24px;
  margin-left: 1rem;
  padding: 4px 12px 4px 12px;
  text-align: center;
`;

const Flex = styled.div`
  align-items: center;
  display: flex;
  margin-bottom: 1rem;
  ${(props) => props.theme.mq.large} {
    flex-direction: column;
  }
`;

const ToggleContainer = styled.div``;

const ToggleHabitContainer = styled.div``;

const TogglePlaneContainer = styled.div``;

const FlexHabit = styled.div`
  display: flex;
  > .item3 {
    margin-left: auto;
  }
`;
