import Ademe from "components/base/Ademe";
import Logo from "components/base/Logo";
import Marianne from "components/base/Marianne";
import Section2 from "components/base/Section2";
import NavSearchBar from "components/misc/search/NavSearchBar";
import Link from "next/link";
import styled from "styled-components";

export default function HeaderSweet() {
  return (
    <BoxedShadow>
      <Section2>
        <Section2.WideContent>
          <Header aria-label="En-tête">
            <Section2.InnerMargin>
              <LogoBar>
                <Logos>
                  <Marianne />
                  <Ademe />
                  <Logo />
                </Logos>
                <Actions>
                  <ActionSearch>
                    <NavSearchBar></NavSearchBar>
                  </ActionSearch>
                </Actions>
              </LogoBar>
            </Section2.InnerMargin>
          </Header>
          <NavBar>
            <Section2.InnerMargin>
              <NavLink>
                <Link href="/plan-du-site" title="Plan du site">
                  Plan du site
                </Link>
              </NavLink>
              <NavLink>
                <Link href="/accessibilite" title="Accessibilité (non conforme)">
                  Accessibilité
                </Link>
              </NavLink>
              <NavLink>
                <Link href="/mentions-legales" title="Mentions légales">
                  Mentions légales
                </Link>
              </NavLink>
              <NavLink>
                <Link href="/politique-de-confidentialite" title="Gestion des cookies">
                  Gestion des cookies
                </Link>
              </NavLink>
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
`;
const Actions = styled.div``;

const ActionSearch = styled.div`
  position: relative;
  top: 25%;
  width: 282px;
`;

const NavBar = styled.div`
  border-top: 1px solid #eae5e8;
  display: flex;
  padding: 1rem 0;
`;

const NavLink = styled.div`
  a {
    color: ${(props) => props.theme.colors.deepDarkReversible};
    font-size: 0.75rem;
    font-weight: 400;
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
`;
