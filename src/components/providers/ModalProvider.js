import Co2eModal2 from "components/modals/Co2eModal2";
import DetailLivraisonModal2 from "components/modals/DetailLivraisonModal2";
import DetailsUsagesNumModal from "components/modals/DetailsUsagesNumModal";
import DevicesModal from "components/modals/DevicesModal";
import EcvModal from "components/modals/EcvModal";
import EqModal3 from "components/modals/EqModal3";
import IFrameLivraisonModal3 from "components/modals/IFrameLivraisonModal3";
import ReduireModal3 from "components/modals/ReduireModal3";
import ShareModal from "components/modals/ShareModal";
import SocialModal3 from "components/modals/SocialModal3";
import TilesModal from "components/modals/TilesModal";
import React, { useState } from "react";

const ModalContext = React.createContext({});

export function ModalProvider(props) {
  const [Co2e, setCo2e] = useState(false);
  const [tiles, setTiles] = useState(false);
  const [share, setShare] = useState(false);
  const [social, setSocial] = useState(false);
  const [reduire, setReduire] = useState(false);
  const [ecv, setEcv] = useState(false);
  const [eqv, setEqv] = useState(false);
  const [ifl, setIfl] = useState(false); //Ifl == IFrameLivraison
  const [devices, setDevices] = useState(false);
  const [hypothesis, setHypothesis] = useState(false);
  const [hypothesisLivraison, setHypothesisLivraison] = useState(false);

  return (
    <ModalContext.Provider
      value={{
        Co2e,
        setCo2e: (value) => {
          window?.please?.track(["trackEvent", "Interaction", "Modal", "CO2e"]);
          setCo2e(value);
        },
        tiles,
        setTiles: (value) => {
          window?.please?.track(["trackEvent", "Interaction", "Modal", "Tuiles"]);
          setTiles(value);
        },
        share,
        setShare: (value) => {
          window?.please?.track(["trackEvent", "Interaction", "Modal", "Partage"]);
          setShare(value);
        },
        social,
        setSocial: (value) => {
          if (value === true) {
            window?.please?.track(["trackEvent", "Interaction", "Modal", "livraison_simulateur_share"]);
          }
          setSocial(value);
        },
        reduire,
        setReduire: (value) => {
          window?.please?.track(["trackEvent", "Interaction", "Modal", "livraison_ressource_share"]);
          setReduire(value);
        },
        ecv,
        setEcv: (value) => {
          window?.please?.track(["trackEvent", "Interaction", "Modal", "ECV"]);
          setEcv(value);
        },
        eqv,
        setEqv: (value) => {
          if (value === true) {
            window?.please?.track(["trackEvent", "Interaction", "Modal", "modal_livraison_EQV"]);
          }
          setEqv(value);
        },
        ifl,
        setIfl: (value) => {
          setIfl(value);
        },
        devices,
        setDevices: (value) => {
          window?.please?.track(["trackEvent", "Interaction", "Modal", "Devices"]);
          setDevices(value);
        },
        hypothesis,
        setHypothesis: (value) => {
          window?.please?.track(["trackEvent", "Interaction", "Modal", "Hypothèses usages numériques"]);
          setHypothesis(value);
        },
        hypothesisLivraison,
        setHypothesisLivraison: (value) => {
          if (value === true) {
            window?.please?.track(["trackEvent", "Interaction", "Modal", "modal_livraison_hypotheses"]);
          }
          setHypothesisLivraison(value);
        },
      }}
    >
      {props.children}
      <Co2eModal2 />
      <EqModal3 />
      <IFrameLivraisonModal3 />
      <SocialModal3 />
      <ReduireModal3 />
      <TilesModal />
      <ShareModal />
      <EcvModal />
      <DevicesModal />
      <DetailsUsagesNumModal />
      <DetailLivraisonModal2 />
    </ModalContext.Provider>
  );
}

export default ModalContext;
