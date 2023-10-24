import Divider from "./img/Divider";
import Section2 from "components/base/Section2";
import categories from "data/categories.json";
import Link from "next/link";
import React from "react";
import styled from "styled-components";

export default function ByTheme() {
  const buildThemeCardFor = (slug) => {
    const item = categories.find((e) => e.slug === slug);
    return (
      <ThemeCard>
        <ThemeCardIcon>{item.emoji}</ThemeCardIcon>
        <ThemeCardLink>
          <Link href={"/" + item.slug}>{item.name}</Link>
        </ThemeCardLink>
      </ThemeCard>
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
                    <H2TitleLine1>
                      Identifier la <ColoredTitle>thématique environnementale&nbsp;</ColoredTitle>
                    </H2TitleLine1>
                    <H2TitleLine2>à aborder dans vos contenus</H2TitleLine2>
                  </H2Title>
                </TitleContainer>
                <CtaContainer>
                  <Link href="/categories">Explorer les thématiques</Link>
                </CtaContainer>
              </UpperSide>
              <Separator>
                <Divider />
              </Separator>
              <DownSide>
                <ThemeCards>
                  <ThemeCardsLine1>
                    {buildThemeCardFor("usagenumerique")}
                    {buildThemeCardFor("chauffage")}
                    {buildThemeCardFor("transport")}
                    {buildThemeCardFor("repas")}
                    {buildThemeCardFor("habillement")}
                    {buildThemeCardFor("boisson")}
                  </ThemeCardsLine1>
                  <ThemeCardsLine2>
                    <ThemeCardBlue1>&nbsp;</ThemeCardBlue1>
                    {buildThemeCardFor("mobilier")}
                    {buildThemeCardFor("electromenager")}
                    {buildThemeCardFor("livraison")}
                    <ThemeCardBlue2></ThemeCardBlue2>
                  </ThemeCardsLine2>
                </ThemeCards>
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
  margin-top: -25rem;
  padding: 6rem 0;
  ${(props) => props.theme.mq.large} {
    margin-top: -23rem;
    margin-top: 1rem;
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
const DownSide = styled.div``;

const TitleContainer = styled.div``;

const ColoredTitle = styled.span`
  color: ${(props) => props.theme.colors.main};
`;

const Separator = styled.div`
  margin: 1.5rem 0 2rem 0;
`;

const CtaContainer = styled.div`
  margin-left: auto;
  margin-right: 2rem;
  ${(props) => props.theme.mq.xlarge} {
    font-size: 0.875rem;
    margin-top: 1.5rem;
  }
  > a {
    background-color: ${(props) => props.theme.colors.main};
    border-radius: 8px;
    color: ${(props) => props.theme.colors.mainWhite};
    padding: 0.5rem 1rem;
    text-decoration: none;
  }
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

const ThemeCards = styled.div`
  > div {
    display: flex;
    justify-content: center;
    margin-top: 1rem;
    div + div {
      margin-left: 0.5rem;
    }
    ${(props) => props.theme.mq.large} {
      flex-direction: column;
      margin-top: 0;
      width: 200px;
      div + div {
        margin-left: 0;
      }
    }
    > div + div {
      ${(props) => props.theme.mq.large} {
        margin-top: 1rem;
      }
    }
  }
`;

const ThemeCardsLine1 = styled.div``;
const ThemeCardsLine2 = styled.div``;

const ThemeCard = styled.div`
  align-items: center;
  background-color: white;
  border-radius: 8px;
  display: flex;
  height: 2rem;
  padding: 1rem 1rem;
`;

const ThemeCardIcon = styled.div`
  ${(props) => props.theme.mq.large} {
    margin-right: 0.5rem;
  }
`;
const ThemeCardLink = styled.div`
  a {
    color: #235dd2;
    &:hover {
      color: #2e5199;
    }
    text-decoration: none;
  }
`;

const ThemeCardBlue1 = styled.div`
  background: linear-gradient(90deg, #ebf2ff -0.22%, #ccdcfd 99.78%);
  border-radius: 8px;
  width: 150px;
  ${(props) => props.theme.mq.large} {
    display: none;
  }
`;
const ThemeCardBlue2 = styled.div`
  background: linear-gradient(270deg, #ebf2ff -0.22%, #ccdcfd 99.78%);
  border-radius: 8px;
  width: 150px;
  ${(props) => props.theme.mq.large} {
    display: none;
  }
`;
