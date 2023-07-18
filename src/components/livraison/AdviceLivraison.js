import AdviceLivraisonDetail from "./AdviceLivraisonDetail";
import React from "react";
import styled from "styled-components";

export default function AdviceLivraison() {
  return (
    <>
      <Separator />
      <H2Title>Conseils pour réduire l'impact carbone de vos livraisons</H2Title>
      <br />
      <AdviceLivraisonDetail
        title="Veiller au dernier km"
        line1Emoji="🚲"
        line1Text="Aller chercher son colis à pied ou à vélo."
        line1Subtext="... ou utiliser son trajet domicile-travail pour éviter un trajet spécifique en voiture."
        line2Emoji="🏠"
        line2Text="Se faire livrer à domicile uniquement lorsque l'on est présent•e"
        line2Subtext="a minima indiquer ses préférences de livraison en cas d'absence (laisser le colis à un endroit ou chez un voisin)"
      />
      <br />
      <AdviceLivraisonDetail title="Éviter les allers-retours de colis" />
    </>
  );
}

const Separator = styled.hr`
  background-color: #457be7;
  border: none;
  color: #457be7;
  height: 4px;
  margin-bottom: 2rem;
  margin-left: 0;
  margin-top: 1rem;
  width: 56px;
`;

const H2Title = styled.h2`
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 0;
  margin-top: 0;
`;
