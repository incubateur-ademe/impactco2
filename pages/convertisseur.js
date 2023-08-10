import Web from "components/layout/Web";
import Tiles from "components/misc/Tiles";
import React from "react";

export default function Convertisseur() {
  return (
    <Web
      title={"Convertisseur"}
      description={`Calculez l'équivalent de votre émission CO₂e grâce au convertisseur CO2 Datagir et mesurez votre impact sur le climat`}
    >
      <Tiles />
    </Web>
  );
}
