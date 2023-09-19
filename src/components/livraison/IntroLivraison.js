import OutboundLink from "components/base/OutboundLink";
import Section2 from "components/base/Section2";
import styled from "styled-components";

const H1Title = styled.h1`
  margin-top: 0;
`;
const MainColorSpan = styled.span`
  color: ${(props) => props.theme.colors.main2};
`;

const SmallText = styled.div`
  font-size: 14px;
  font-weight: 400;
  margin-bottom: 2rem;
`;

const RegularParagraph = styled.p`
  margin: 0;
`;

const Separator = styled.hr`
  background-color: #457be7;
  border: none;
  color: #457be7;
  height: 4px;
  margin-bottom: 3rem;
  margin-left: 0;
  margin-top: 2rem;
  width: 56px;
`;

const UpdatedAt = styled.span`
  color: #564d53;
`;

export default function IntroLivraison() {
  const isIframe = typeof window !== "undefined" && window.self !== window.top;
  return (
    <>
      <Section2>
        <Section2.InnerMargin>
          <H1Title>
            Mesurer l'impact carbone de la <MainColorSpan>livraison de colis</MainColorSpan>
          </H1Title>
          <SmallText>
            <span> Source : </span>
            <OutboundLink
              title="Commerce en ligne - Étude ADEME 2023 - Nouvelle fenêtre"
              href="https://librairie.ademe.fr/mobilite-et-transport/6261-commerce-en-ligne-impacts-environnementaux-de-la-logistique-des-transports-et-des-deplacements.html"
              data-testid="lien-etude-ademe"
            >
              Commerce en ligne - Étude ADEME 2023{" "}
            </OutboundLink>
            <span> · </span>
            <UpdatedAt>Mise à jour le 26/05/2023 </UpdatedAt>
          </SmallText>
          {isIframe ? (
            <></>
          ) : (
            <>
              <RegularParagraph data-testid="paragraph1">
                <strong>80 % des Français</strong> de 11 ans et plus font des achats en ligne.
              </RegularParagraph>
              <RegularParagraph>
                En moyenne, cela représente <strong>1 milliard de colis livrés par an</strong>, soit{" "}
                <strong>deux colis livrés par personne par mois</strong>.
              </RegularParagraph>
              <br />
            </>
          )}

          <Separator />
        </Section2.InnerMargin>
      </Section2>
    </>
  );
}
