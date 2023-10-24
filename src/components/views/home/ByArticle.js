import reusecards from "./data/reusecards.json";
import ChtingLeft from "./img/ChtingLeft";
import ChtingRight from "./img/ChtingRight";
import Divider from "./img/Divider";
import Section2 from "components/base/Section2";
import Link from "next/link";
import React from "react";
import styled from "styled-components";

export default function ByArticle() {
  const buildReuseCardFor = (slug) => {
    let reuseCard = reusecards.find((e) => e.slug === slug);
    return (
      <ReuseCardWrapper>
        <a href={reuseCard.link} target="_blank" rel="noreferrer noopener">
          <ReuseCard>
            <ReuseCardImgContainer color={reuseCard.color}>
              <ReuseCardImg img={reuseCard.img}>
                <ReuseCardTag>{reuseCard.tagtext}</ReuseCardTag>
              </ReuseCardImg>
            </ReuseCardImgContainer>
            <ReuseCardTxt>
              <ReuseCardTitle>
                <strong>{reuseCard.title}</strong>
              </ReuseCardTitle>
              <ReuseCardParagraph>{reuseCard.paragraph}</ReuseCardParagraph>
            </ReuseCardTxt>
          </ReuseCard>
        </a>
      </ReuseCardWrapper>
    );
  };

  return (
    <Wrapper>
      <Section2>
        <Section2.WideContent>
          <Section2.InnerMargin>
            <Layout>
              <UpperSide>
                <TitleContainer>
                  <H2Title>
                    <H2TitleLine1>Utiliser nos ressources&nbsp;</H2TitleLine1>
                    <H2TitleLine2>
                      dans des <ColoredTitle>&nbsp;articles, sites ou applications</ColoredTitle>
                    </H2TitleLine2>
                  </H2Title>
                </TitleContainer>
              </UpperSide>
              <Separator>
                <Divider />
              </Separator>
              <MiddleSide>
                <MiddleGrid>
                  <LeftMiddleGrid>
                    <H3Title>En toute autonomie</H3Title>
                    <MiddleUl>
                      <MiddleLi>
                        Appuyez-vous sur le{" "}
                        <Link
                          href="https://accelerateur-transition-ecologique-ademe.notion.site/Kit-de-diffusion-Impact-CO2-b9d08930a49a4346830b7a12fd7cb733?pvs=4"
                          target="_blank"
                          rel="noreferrer noopener"
                        >
                          kit de diffusion
                        </Link>
                        , pensé pour vous épauler dans la rédaction de vos contenusen lien avec l’impact carbone.
                      </MiddleLi>
                      <MiddleLi>
                        <Link href="/convertisseur">Configurez et personnalisez</Link> le simulateur de votre choix
                        grâce à une intégration
                      </MiddleLi>
                      <MiddleLi>
                        Inspirez-vous d'
                        <Link
                          href="https://accelerateur-transition-ecologique-ademe.notion.site/2274283430e94d1db71eced54c338997?v=4638552e710e44339afbc9de1b83f785"
                          target="_blank"
                          rel="noreferrer noopener"
                        >
                          exemples concrets
                        </Link>{" "}
                        déjà créés par des médias, entreprises, associations...
                      </MiddleLi>
                    </MiddleUl>
                    <MiddleLeftCta>
                      <Link
                        href="https://accelerateur-transition-ecologique-ademe.notion.site/Kit-de-diffusion-Impact-CO2-b9d08930a49a4346830b7a12fd7cb733?pvs=4"
                        target="_blank"
                        rel="noreferrer noopener"
                      >
                        Consulter le kit de diffusion
                      </Link>
                    </MiddleLeftCta>
                  </LeftMiddleGrid>
                  <RightMiddleGrid>
                    <H3Title2>Avec de l'aide</H3Title2>
                    <MiddleUl>
                      <MiddleLi>
                        Enrichissez vos contenus grâce à notre&nbsp;
                        <Link
                          href="https://accelerateur-transition-ecologique-ademe.notion.site/2274283430e94d1db71eced54c338997?v=4638552e710e44339afbc9de1b83f785"
                          target="_blank"
                          rel="noreferrer noopener"
                        >
                          Foire aux Questions
                        </Link>{" "}
                        pour trouver des éléments de réponse pertinents.
                      </MiddleLi>
                      <MiddleLi>Gagnez du temps et laissez-vous guider pour l’intégration de nos ressources.</MiddleLi>
                      <MiddleLi>Échangez avec l’équipe sur vos besoins spécifiques d’intégration.</MiddleLi>
                    </MiddleUl>
                    <MiddleRightCta>
                      <Link href="https://tally.so/r/nrOv5N" rel="noreferrer noopener">
                        Prendre rendez-vous avec l’équipe
                      </Link>
                    </MiddleRightCta>
                  </RightMiddleGrid>
                </MiddleGrid>
              </MiddleSide>
              <DownSide>
                <H3Title>Quelques exemples d’utilisation de nos ressources</H3Title>
                <ReuseGrid>
                  <WinkWinkLeft>
                    <ChtingLeft />
                  </WinkWinkLeft>
                  {buildReuseCardFor("twomorrow")}
                  {buildReuseCardFor("yami")}
                  {buildReuseCardFor("teamfortheplanet")}
                  {buildReuseCardFor("greengo")}
                  <WinkWinkRight>
                    <ChtingRight />
                  </WinkWinkRight>
                </ReuseGrid>
              </DownSide>
            </Layout>
          </Section2.InnerMargin>
        </Section2.WideContent>
      </Section2>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background-color: #ebf2ff;
  margin-top: -0.5rem;
  padding: 6rem 0;
  ${(props) => props.theme.mq.large} {
    margin-top: 2rem;
    padding: 1rem 0;
  }
`;

const Layout = styled.div`
  ${(props) => props.theme.mq.large} {
    margin-bottom: 2rem;
    margin-top: 2rem;
  }
`;

const UpperSide = styled.div`
  display: flex;
  ${(props) => props.theme.mq.large} {
    flex-direction: column;
  }
`;
const DownSide = styled.div`
  padding-top: 5rem;
`;

const TitleContainer = styled.div``;

const ColoredTitle = styled.span`
  color: ${(props) => props.theme.colors.main};
`;

const Separator = styled.div`
  margin: 1.5rem 0 2rem 0;
`;

const H2Title = styled.h2`
  font-size: 1.75rem;
  ${(props) => props.theme.mq.large} {
    font-size: 1.25rem;
  }
  margin-bottom: 0;
  > span {
    display: block;
    ${(props) => props.theme.mq.small} {
      display: inline;
    }
  }
`;
const H2TitleLine1 = styled.span``;
const H2TitleLine2 = styled.span``;

const MiddleSide = styled.div``;

const MiddleGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  ${(props) => props.theme.mq.medium} {
    grid-template-columns: 1fr;
  }
`;

const PartMiddleGrid = styled.div`
  padding-right: 1rem;
`;
const LeftMiddleGrid = styled(PartMiddleGrid)``;
const RightMiddleGrid = styled(PartMiddleGrid)``;

const H3Title = styled.h3`
  color: #235dd2;
  font-size: 1.375rem;
  font-weight: 700;
  letter-spacing: 0em;
  line-height: 2.5rem;
`;
const H3Title2 = styled(H3Title)`
  ${(props) => props.theme.mq.medium} {
    margin-top: 2rem;
  }
`;

const MiddleUl = styled.ul`
  height: 13rem;
  ${(props) => props.theme.mq.xxlarge} {
    height: 14rem;
  }
  ${(props) => props.theme.mq.large} {
    height: 18rem;
  }
  ${(props) => props.theme.mq.medium} {
    height: auto;
  }
  padding-left: 0;
  > li + li {
    margin-top: 1.25rem;
  }
`;
const MiddleLi = styled.li`
  background: url("/images/tik.svg") no-repeat;
  background-position: top 4px left;
  font-size: 1rem;
  font-weight: 400;
  letter-spacing: 0em;
  line-height: 1.5rem;
  list-style-type: none;
  padding: 0px 0 3px 24px;
  > a {
    color: #235dd2;
    font-weight: 700;
    text-underline-offset: 6px;
  }
`;

const MiddleCta = styled.div`
  a {
    background-color: ${(props) => props.theme.colors.main};
    border-radius: 8px;
    color: ${(props) => props.theme.colors.mainWhite};
    padding: 0.5rem 1rem;
    text-decoration: none;
    ${(props) => props.theme.mq.medium} {
      font-size: 0.85rem;
    }
  }
`;
const MiddleLeftCta = styled(MiddleCta)``;
const MiddleRightCta = styled(MiddleCta)``;

const ReuseGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  position: relative;
`;

const ReuseCard = styled.a`
  background-color: white;
  border-color: #ccdcfd;
  border-radius: 16px;
  border-style: solid;
  border-width: 1px 4px 4px 1px;
  display: block;
  margin-right: 1rem;
`;
const ReuseCardImg = styled.div`
  background: url(${(props) => props.img});
  background-position: center center;
  background-repeat: no-repeat;
  background-size: contain;
  border-top-left-radius: 13px;
  border-top-right-radius: 13px;
  height: 8rem;
  position: relative;
`;
const ReuseCardTxt = styled.div`
  font-size: 1rem;
  height: 14rem;
  ${(props) => props.theme.mq.xlarge} {
    height: 18rem;
  }
  ${(props) => props.theme.mq.large} {
    height: 23rem;
  }
  ${(props) => props.theme.mq.medium} {
    height: 10rem;
  }
  ${(props) => props.theme.mq.small} {
    height: 12rem;
  }
  ${(props) => props.theme.mq.xsmall} {
    height: 13rem;
  }
  padding: 1rem;
`;
const ReuseCardTitle = styled.div`
  font-size: 1rem;
  margin-top: 1rem;
`;
const ReuseCardParagraph = styled.div`
  ${(props) => props.theme.mq.small} {
    font-size: 0.9rem;
  }
  color: #3a3a3a;
  margin-bottom: 1rem;
  margin-top: 1rem;
`;
const ReuseCardTag = styled.div`
  background-color: white;
  border-radius: 4px;
  color: #d47909;
  font-size: 0.75rem;
  ${(props) => props.theme.mq.large} {
    font-size: 0.55rem;
  }
  ${(props) => props.theme.mq.medium} {
    font-size: 0.75rem;
  }
  font-weight: 700;
  left: 0.5rem;
  letter-spacing: 0em;
  line-height: 1.25rem;
  padding-left: 0.25rem;
  padding-right: 0.25rem;
  position: absolute;
  top: 0.5rem;
`;

const ReuseCardWrapper = styled.div`
  ${(props) => props.theme.mq.medium} {
    margin: 1rem;
  }
  a {
    text-decoration: none;
    strong {
      color: #161616;
    }
    &:hover {
      strong {
        text-decoration: underline;
      }
    }
  }
  ${(props) => props.theme.mq.medium} {
    grid-column: span 3/4;
  }
  ${(props) => props.theme.mq.xsmall} {
    grid-column: none;
  }
`;

const ReuseCardImgContainer = styled.div`
  background-color: ${(props) => props.color};
  border-top-left-radius: 13px;
  border-top-right-radius: 13px;
`;

const WinkWink = styled.div`
  position: absolute;
  ${(props) => props.theme.mq.medium} {
    display: none;
  }
`;

const WinkWinkLeft = styled(WinkWink)`
  left: -2.5rem;
  top: 40%;
`;
const WinkWinkRight = styled(WinkWink)`
  right: -1.5rem;
  top: 40%;
`;
