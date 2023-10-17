import Hamburger from "./Hamburger";
import MenuSweet from "./nav/MenuSweet";
import Ademe from "components/base/Ademe";
import Logo from "components/base/Logo";
import Marianne from "components/base/Marianne";
import Section2 from "components/base/Section2";
import NavSearchBar from "components/misc/search/NavSearchBar";
import Link from "next/link";
import { useState } from "react";
import styled from "styled-components";

export default function HeaderSweet() {
  const [hamburgerOpened, setHamburgerOpened] = useState(false);

  const hamburgerClicked = () => {
    setHamburgerOpened(!hamburgerOpened);
  };

  return (
    <BoxedShadow>
      <Section2>
        <Section2.WideContent>
          <Header aria-label="En-tête">
            <Section2.InnerMargin>
              <LogoBar>
                <Logos>
                  <Hideable>
                    <Marianne />
                  </Hideable>
                  <Hideable>
                    <Ademe />
                  </Hideable>
                  <NonHideable>
                    <Logo />
                  </NonHideable>
                </Logos>
                <Actions>
                  <ActionSearch>
                    <NavSearchBar></NavSearchBar>
                  </ActionSearch>
                  <HamburgerContainer>
                    <Hamburger hamburgerOpened={hamburgerOpened} hamburgerClicked={hamburgerClicked}></Hamburger>
                  </HamburgerContainer>
                </Actions>
              </LogoBar>
            </Section2.InnerMargin>
          </Header>
          <NavBar>
            <Section2.InnerMargin>
              <NavLinks>
                <NavLink>
                  <MenuSweet />
                </NavLink>
                <NavLink>
                  <Link href="/convertisseur" title="Comparateur carbone">
                    Comparateur carbone
                  </Link>
                </NavLink>
                <NavLink>
                  <Link
                    href="https://accelerateur-transition-ecologique-ademe.notion.site/Kit-de-diffusion-b9d08930a49a4346830b7a12fd7cb733?pvs=4"
                    title="Diffuser les ressources"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    Diffuser les ressources
                  </Link>
                </NavLink>
                <NavLink>
                  <Link href="/integration" title="Intégrer les ressources">
                    Intégrer les ressources
                  </Link>
                </NavLink>
                <NavLink>
                  <Link href="/stats" title="Statistiques">
                    Statistiques
                  </Link>
                </NavLink>
              </NavLinks>
            </Section2.InnerMargin>
          </NavBar>
        </Section2.WideContent>
      </Section2>
    </BoxedShadow>
  );
}

const Header = styled.header`
  position: relative; // or box-shadow will not appear
`;

const LogoBar = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Logos = styled.div`
  display: flex;
  ${(props) => props.theme.mq.small} {
    > svg {
      height: 2em;
    }
    > svg.svgademe {
      height: 4em;
    }
  }
`;
const Actions = styled.div`
  display: flex;
`;

const ActionSearch = styled.div`
  position: relative;
  top: 25%;
  width: 282px;
`;

const NavBar = styled.nav`
  border-top: 1px solid #eae5e8;
  padding: 0.75rem 0;
  ${(props) => props.theme.mq.small} {
    padding: 0;
  }
`;

const NavLink = styled.div`
  a {
    align-items: center;
    color: #161616;
    display: flex;
    font-size: 0.875rem;
    ${(props) => props.theme.mq.medium} {
      font-size: 0.75rem;
    }
    font-weight: 400;
    height: 2rem;
    letter-spacing: 0em;
    margin-right: 1.5rem;
    ${(props) => props.theme.mq.medium} {
      margin-left: inherit;
    }
    text-decoration: none;
  }
`;

const BoxedShadow = styled.div`
  box-shadow: 0px 2px 6px #f3f6ff;
  position: relative;
`;

const NavLinks = styled.div`
  display: flex;
  ${(props) => props.theme.mq.small} {
    flex-direction: column;
  }
`;

const Hideable = styled.div`
  align-items: center;
  display: flex;
  ${(props) => props.theme.mq.small} {
    display: none;
  }
`;
const NonHideable = styled.div`
  align-items: center;
  display: flex;
  ${(props) => props.theme.mq.small} {
    padding: 0.75em 0.75em 0.75em 0;
  }
`;

const HamburgerContainer = styled.div`
  align-items: center;
  display: flex;
`;
