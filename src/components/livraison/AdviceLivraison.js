import AdviceLivraisonDetail from "./AdviceLivraisonDetail";
import ModalContext from "components/providers/ModalProvider";
import React, { useContext } from "react";
import styled from "styled-components";

export default function AdviceLivraison() {
  const { setReduire } = useContext(ModalContext);

  return (
    <>
      <Separator />
      <Flex>
        <H2Title id="ressource">Conseil pour réduire l’impact carbone de vos livraisons</H2Title>
        <div className="buttons">
          <ButtonChange onClick={() => setReduire(true)} className="noscreenshot">
            <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 -2 24 24">
              <path
                fill="#564d53"
                d="M24 0l-6 22-8.129-7.239 7.802-8.234-10.458 7.227-7.215-1.754 24-12zm-15 16.668v7.332l3.258-4.431-3.258-2.901z"
              />
            </svg>
            &nbsp;Partager
          </ButtonChange>
        </div>
      </Flex>

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

const Flex = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 1rem;
  > .buttons {
    display: flex;
    margin-left: auto;
    ${(props) => props.theme.mq.large} {
      margin-left: auto;
      margin-right: auto;
    }
    ${(props) => props.theme.mq.large} {
      flex-direction: column;
      margin-left: auto;
      margin-right: auto;
    }
    button {
      margin-top: 0.5rem;
    }
    button + button {
      margin-left: 0.5rem;
      ${(props) => props.theme.mq.large} {
        margin-left: auto;
      }
    }
  }
  ${(props) => props.theme.mq.large} {
    flex-direction: column;
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
  ${(props) => props.theme.mq.large} {
    margin-left: auto;
    margin-right: auto;
  }
  ${(props) => props.theme.mq.medium} {
    font-size: 12px;
  }
  padding: 4px 12px 4px 12px;
  text-align: center;
`;
