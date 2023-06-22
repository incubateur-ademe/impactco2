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

const BlueLink = styled.a`
  color: #457be7;
  > svg {
    margin-left: 0.25rem;
  }
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

export default function IntroLivraison() {
  return (
    <>
      <H1Title>
        Mesurer l'impact carbone de la <MainColorSpan>livraison de colis</MainColorSpan>
      </H1Title>
      <SmallText>
        <span> Source : </span>
        <BlueLink
          href="https://librairie.ademe.fr/mobilite-et-transport/6261-commerce-en-ligne-impacts-environnementaux-de-la-logistique-des-transports-et-des-deplacements.html"
          target="_blank"
          data-testid="lien-etude-ademe"
        >
          Commerce en ligne - Étude ADEME 2023{" "}
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path
              fillRule="evenodd"
              d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"
            />
            <path
              fillRule="evenodd"
              d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"
            />
          </svg>
        </BlueLink>
        <span> · </span>
        <span>Mise à jour le 26/05/2023 </span>
      </SmallText>
      <RegularParagraph data-testid="paragraph1">
        <strong>80 % des Français</strong> de 11 ans et plus font des achats en ligne.
      </RegularParagraph>
      <RegularParagraph>
        En moyenne, cela représente <strong>1 milliard de colis livrés par an</strong>, soit{" "}
        <strong>deux colis livrés par personne par mois</strong>.
      </RegularParagraph>
      <br />
      <RegularParagraph>
        Vous vous faites souvent livrer vos achats ? Estimez l'impact carbone de vos livraisons grâce à notre
        simulateur.
      </RegularParagraph>
      <Separator />
    </>
  );
}
