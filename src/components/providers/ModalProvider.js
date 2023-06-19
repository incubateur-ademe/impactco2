import Co2eModal2 from "components/modals/Co2eModal2";
import DetailsUsagesNumModal from "components/modals/DetailsUsagesNumModal";
import DevicesModal from "components/modals/DevicesModal";
import EcvModal from "components/modals/EcvModal";
import EqModal3 from "components/modals/EqModal3";
import ShareModal from "components/modals/ShareModal";
import TilesModal from "components/modals/TilesModal";
import React, { useState } from "react";

const ModalContext = React.createContext({});

export function ModalProvider(props) {
  const [Co2e, setCo2e] = useState(false);
  const [tiles, setTiles] = useState(false);
  const [share, setShare] = useState(false);
  const [ecv, setEcv] = useState(false);
  const [devices, setDevices] = useState(false);
  const [hypothesis, setHypothesis] = useState(false);

  return (
    <ModalContext.Provider
      value={{
        Co2e,
        setCo2e: (value) => {
          window?._paq?.push(["trackEvent", "Interaction", "Modal", "CO2e"]);
          setCo2e(value);
        },
        tiles,
        setTiles: (value) => {
          window?._paq?.push(["trackEvent", "Interaction", "Modal", "Tuiles"]);
          setTiles(value);
        },
        share,
        setShare: (value) => {
          window?._paq?.push(["trackEvent", "Interaction", "Modal", "Partage"]);
          setShare(value);
        },

        ecv,
        setEcv: (value) => {
          window?._paq?.push(["trackEvent", "Interaction", "Modal", "ECV"]);
          setEcv(value);
        },
        devices,
        setDevices: (value) => {
          window?._paq?.push(["trackEvent", "Interaction", "Modal", "Devices"]);
          setDevices(value);
        },
        hypothesis,
        setHypothesis: (value) => {
          window?._paq?.push(["trackEvent", "Interaction", "Modal", "Hypothèses usages numériques"]);
          setHypothesis(value);
        },
      }}
    >
      {props.children}
      <Co2eModal2 />
      <EqModal3 />
      <TilesModal />
      <ShareModal />
      <EcvModal />
      <DevicesModal />
      <DetailsUsagesNumModal />
    </ModalContext.Provider>
  );
}

export default ModalContext;
