import AdviceLivraisonDetail from "./AdviceLivraisonDetail";
import React from "react";
import styled from "styled-components";

export default function AdviceLivraison() {
  return (
    <>
      <Separator />
      <H2Title>Conseil pour réduire l’impact carbone de vos livraisons</H2Title>
      <br />
      <AdviceLivraisonDetail
        title="Veiller au dernier km"
        line1Emoji="🚲"
        line1Text="Aller chercher son colis à pied ou à vélo."
        line1Subtext="... ou utiliser son trajet domicile-travail pour éviter un trajet spécifique en voiture."
        line2Emoji="🏠"
        line2Text="Se faire livrer à domicile uniquement lorsque l'on est présent•e"
        line2Subtext="A minima indiquer ses préférences de livraison en cas d'absence (laisser le colis à un endroit ou chez un voisin)"
      />
      <br />
      <AdviceLivraisonDetail
        title="Éviter les allers-retours de colis"
        line1Emoji="📧"
        line1Text="Retourner un produit doit rester exceptionnel."
        line1Subtext="Cette pratique a pour effet de démultiplier les transports, même si, comme 32 % des e-acheteurs, on détient un abonnement incluant des offres de livraison gratuites et illimitées."
        line2Emoji="📦"
        line2Text="Une seule commande vaut mieux que plusieurs petites."
        line2Subtext="C’est moins de transport et moins d’emballages. D’ailleurs, pourquoi ne pas faire des achats groupés entre amis ou proches ?"
      />
      <br />
      <AdviceLivraisonDetail
        title="Limiter le suremballage"
        line1Emoji="💬"
        line1Text="Indiquer au vendeur que le produit était inutilement suremballé ou livré dans un trop un emballage trop grand."
        line1Subtext="Laisser un commentaire sur le site du vendeur pourra l’aider à progresser dans sa démarche."
        line2Emoji="🛍️"
        line2Text="Garder les emballages pour les réutiliser."
        line2Subtext="Vous en aurez certainement besoin si vous vendez également des objets sur des plateformes en ligne ou pour un éventuel déménagement."
        line3Emoji="♻️"
        line3Text="Déposer les emballages non réutilisables dans les bacs de tri."
        line3Subtext="Pour faciliter le recyclage des papiers, cartons et plastiques, respectez bien les consignes de la commune. Les emballages volumineux sont à déposer en déchèterie."
      />
    </>
  );
}

const Separator = styled.hr`
  background-color: #457be7;
  border: none;
  color: #457be7;
  height: 4px;
  margin-bottom: 2.5rem;
  margin-left: 0;
  margin-top: 0.5rem;
  width: 56px;
`;

const H2Title = styled.h2`
  font-size: 1.375rem; // 22px/16px
  font-weight: 700;
  margin-bottom: 0;
  margin-top: 0;
`;
