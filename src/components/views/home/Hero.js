import Cards from "./img/Cards";
import Section2 from "components/base/Section2";
import Link from "next/link";
import React from "react";
import styled from "styled-components";

export default function Hero() {
  return (
    <Section2>
      <Section2.WideContent>
        <Section2.InnerMargin>
          <Layout>
            <TextContainer>
              <H1Title>
                <H1Line1>Informer, comparer, diffuser</H1Line1>
                <H1Line2>
                  <HideAboveMedium>&nbsp;</HideAboveMedium>des ressources sur l’impact carbone
                </H1Line2>
                <H1Line3>
                  <HideAboveMedium>&nbsp;</HideAboveMedium>des gestes et objets du quotidien
                </H1Line3>
              </H1Title>
              <Subtitle>
                <Subtitle1>
                  Sensibilisez votre communauté grâce à une<strong>&nbsp;information fiable&nbsp;</strong>
                </Subtitle1>
                <Subtitle2>
                  <strong>et sourcée</strong>&nbsp;issue des données environnementales de l'ADEME.
                </Subtitle2>
              </Subtitle>
              <MiniCard>
                <MiniCardEmoji>🤓</MiniCardEmoji>
                <MiniCardText>
                  <MiniCardText1>Vous souhaitez intégrer gratuitement</MiniCardText1>
                  <MiniCardText2>nos ressources ?</MiniCardText2>
                </MiniCardText>
                <MiniCardCta>
                  <div>
                    <Link href="https://tally.so/r/nrOv5N" rel="noreferrer noopener">
                      Prendre rendez-vous
                    </Link>
                  </div>
                </MiniCardCta>
              </MiniCard>
            </TextContainer>
            <PictureContainer>
              <Cards></Cards>
            </PictureContainer>
          </Layout>
        </Section2.InnerMargin>
      </Section2.WideContent>
    </Section2>
  );
}

const H1Title = styled.div`
  color: ${(props) => props.theme.colors.linkGrey};
  font-size: 2.25rem;
  ${(props) => props.theme.mq.xlarge} {
    font-size: 1.75rem;
  }
  ${(props) => props.theme.mq.large} {
    font-size: 2.25rem;
  }
  ${(props) => props.theme.mq.medium} {
    font-size: 1.75rem;
  }
  ${(props) => props.theme.mq.small} {
    font-size: 1.5rem;
    line-height: 2.25rem;
  }
  font-weight: 800;
  letter-spacing: -0.01em;
  line-height: 2.75rem;
  margin-top: 3rem;
  text-align: left;
  > span {
    display: block;
    ${(props) => props.theme.mq.medium} {
      display: inline;
    }
  }
`;

const H1Line1 = styled.span`
  color: ${(props) => props.theme.colors.main2};
`;

const H1Line2 = styled.span``;

const H1Line3 = styled.span``;

const Layout = styled.div`
  display: grid;
  grid-template-columns: 39rem auto;
  ${(props) => props.theme.mq.xlarge} {
    grid-template-columns: 30rem auto;
  }
  ${(props) => props.theme.mq.large} {
    grid-template-columns: 39rem auto;
  }
  ${(props) => props.theme.mq.medium} {
    grid-template-columns: 30rem auto;
  }
  ${(props) => props.theme.mq.small} {
    grid-template-columns: 1fr;
  }
  overflow: hidden;
  padding-top: 2rem;
`;

const PictureContainer = styled.div`
  text-align: right;
  > svg {
    margin-top: -12rem;
    width: 553px;
    ${(props) => props.theme.mq.xxlarge} {
      margin-top: -13rem;
      width: 386px;
    }
    ${(props) => props.theme.mq.xlarge} {
      margin-top: -11rem;
      width: 309px;
    }
  }
  ${(props) => props.theme.mq.large} {
    display: none;
  }
`;

const TextContainer = styled.div``;

const Subtitle = styled.p`
  font-size: 1.125rem;
  ${(props) => props.theme.mq.xlarge} {
    font-size: 0.95rem;
  }
  ${(props) => props.theme.mq.large} {
    font-size: 1.125rem;
  }
  ${(props) => props.theme.mq.small} {
    font-size: 1rem;
  }
  margin-bottom: 1.5rem;
  margin-top: 1.5rem;
  > span {
    display: block;
    ${(props) => props.theme.mq.medium} {
      display: inline;
    }
  }
`;

const Subtitle1 = styled.span``;

const Subtitle2 = styled.span``;

const MiniCard = styled.div`
  align-items: center;
  border-color: #ccdcfd;
  border-radius: 16px;
  border-style: solid;
  border-width: 1px 4px 4px 1px;
  display: flex;
  justify-content: flex-start;
  ${(props) => props.theme.mq.small} {
    align-items: flex-start;
    flex-direction: column;
  }
`;

const MiniCardEmoji = styled.div`
  margin-left: 1rem;
  ${(props) => props.theme.mq.xlarge} {
    margin-left: 0.5rem;
  }
  ${(props) => props.theme.mq.medium} {
    margin-top: 0rem;
  }
  ${(props) => props.theme.mq.small} {
    margin-top: 0.8rem;
  }
`;

const MiniCardCta = styled.div`
  display: flex;
  flex-grow: 1;
  margin-right: 1rem;
  ${(props) => props.theme.mq.xlarge} {
    font-size: 0.875rem;
    margin-right: 0.5rem;
  }
  ${(props) => props.theme.mq.large} {
    font-size: 1rem;
  }
  ${(props) => props.theme.mq.medium} {
    font-size: 0.875rem;
  }
  > div {
    margin-left: auto;
    ${(props) => props.theme.mq.small} {
      margin-bottom: 0.8rem;
    }
  }
  > div > a {
    background-color: ${(props) => props.theme.colors.main};
    border-radius: 8px;
    color: ${(props) => props.theme.colors.mainWhite};
    ${(props) => props.theme.mq.medium} {
      margin-left: 0.5rem;
    }
    padding: 0.5rem 1rem;
    ${(props) => props.theme.mq.medium} {
      display: block;
    }
    text-decoration: none;
  }
`;

const MiniCardText = styled.p`
  font-size: 1rem;
  margin: 1rem 0 1rem 1rem;
  ${(props) => props.theme.mq.xlarge} {
    font-size: 0.85rem;
    margin-left: 0.5rem;
  }
  ${(props) => props.theme.mq.large} {
    font-size: 1rem;
  }
  ${(props) => props.theme.mq.medium} {
    font-size: 0.85rem;
    margin: 0.75rem 0 0.75rem 0.75rem;
  }
`;

const MiniCardText1 = styled.strong`
  display: block;
`;

const MiniCardText2 = styled.strong`
  display: block;
`;

const HideAboveMedium = styled.span`
  display: none;
  ${(props) => props.theme.mq.medium} {
    display: inline-block;
  }
`;
