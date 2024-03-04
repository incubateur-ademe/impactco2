import Link from 'next/link'
import { useState } from 'react'
import styled from 'styled-components'
import { MEDIA } from 'utils/styles'
import Ademe from 'components/base/Ademe'
import Logo from 'components/base/Logo'
import Marianne from 'components/base/Marianne'
import { Section, SectionWideContent } from 'components/base/Section'
import NavSearchBar from 'components/misc/search/NavSearchBar'
import Hamburger from './Hamburger'
import SkipLinks from './SkipLinks'
import MenuSweet from './nav/MenuSweet'

export default function HeaderSweet() {
  const [hamburgerOpened, setHamburgerOpened] = useState(false)

  const hamburgerClicked = () => {
    setHamburgerOpened(!hamburgerOpened)
  }

  return (
    <BoxedShadow>
      <header aria-label='En-tête'>
        <SkipLinks />
        <Section $withoutPadding>
          <SectionWideContent>
            <Header>
              <LogoBar>
                <Logos>
                  <Hideable>
                    <Link href='/' aria-label="Logo Marianne, redirection vers l'accueil">
                      <Marianne />
                    </Link>
                  </Hideable>
                  <Hideable>
                    <Link href='/' aria-label="Logo ADEME, redirection vers l'accueil">
                      <Ademe />
                    </Link>
                  </Hideable>
                  <NonHideable>
                    <Logo />
                  </NonHideable>
                </Logos>
                <Actions>
                  <ActionSearch>
                    <NavSearchBar />
                  </ActionSearch>
                  <HamburgerContainer>
                    <Hamburger hamburgerOpened={hamburgerOpened} hamburgerClicked={hamburgerClicked} />
                  </HamburgerContainer>
                </Actions>
              </LogoBar>
            </Header>
          </SectionWideContent>
        </Section>
      </header>
      <NavBar id='header-navigation'>
        <Section $withoutPadding>
          <SectionWideContent>
            <NavLinksMobile $shouldDisplay={hamburgerOpened}>
              <NavLink>
                <SmallActionSearch>
                  <NavSearchBar />
                </SmallActionSearch>
              </NavLink>
              <NavLink>
                <MenuSweet />
              </NavLink>
              <NavLink>
                <Link href='/comparateur'>Comparateur carbone</Link>
              </NavLink>
              <NavLink>
                <Link href='/guide-utilisation'>Comment ça marche ?</Link>
              </NavLink>
              <NavLink>
                <Link href='/questions-frequentes'>Questions fréquentes</Link>
              </NavLink>
            </NavLinksMobile>
            <NavLinksDesktop>
              <NavLink>
                <MenuSweet />
              </NavLink>
              <NavLink>
                <Link href='/comparateur'>Comparateur carbone</Link>
              </NavLink>
              <NavLink>
                <Link href='/guide-utilisation'>Comment ça marche ?</Link>
              </NavLink>
              <NavLink>
                <Link href='/questions-frequentes'>Questions fréquentes</Link>
              </NavLink>
            </NavLinksDesktop>
          </SectionWideContent>
        </Section>
      </NavBar>
    </BoxedShadow>
  )
}

const NavLinksMobile = styled.div`
  display: none;
  padding: 0.5rem 0;
  ${MEDIA.LT.SMALL} {
    display: ${(props) => (props.$shouldDisplay ? 'flex' : 'none')};
    flex-direction: column;
  }
`
const NavLinksDesktop = styled.div`
  display: flex;
  ${MEDIA.LT.SMALL} {
    display: none;
  }
  margin: 0 -0.75rem;
`

const Header = styled.div`
  position: relative; // or box-shadow will not appear
`

const LogoBar = styled.div`
  display: flex;
  justify-content: space-between;
`

const Logos = styled.div`
  display: flex;
  gap: 16px;
  padding: 16px 0;
  ${MEDIA.LT.SMALL} {
    > svg {
      height: 2em;
    }
    > svg.svgademe {
      height: 4em;
    }
  }
`
const Actions = styled.div`
  display: flex;
`

const ActionSearch = styled.div`
  position: relative;
  top: 25%;
  width: 282px;
  ${MEDIA.LT.SMALL} {
    width: 0px;
  }
`

const SmallActionSearch = styled.div`
  position: relative;
  top: 25%;
  width: 282px;
  ${MEDIA.LT.SMALL} {
    width: auto;
  }
  .navSearch {
    display: flex;
    margin-top: 0.5rem;
  }
  .searchContainer {
    border-radius: 1rem;
    position: inherit;
    width: 230px;
    ${MEDIA.LT.SMALL} {
      width: 100%;
    }
  }
`

const NavBar = styled.nav`
  border-top: 1px solid #eae5e8;
`

const NavLink = styled.div`
  a {
    align-items: center;
    color: #161616;
    display: flex;
    font-size: 0.875rem;
    font-weight: 400;
    ${MEDIA.LT.MEDIUM} {
      font-size: 0.75rem;
    }
    ${MEDIA.LT.SMALL} {
      font-size: 0.875rem;
    }
    height: 100%;
    min-height: 2rem;
    padding: 1rem 0.75rem;
    ${MEDIA.LT.MEDIUM} {
      margin-left: inherit;
    }
    text-decoration: none;

    &:hover {
      background-color: var(--primary-10);
    }
  }
`

const BoxedShadow = styled.div`
  box-shadow: 0px 2px 6px #f3f6ff;
  position: relative;
`

const Hideable = styled.div`
  align-items: center;
  display: flex;
  ${MEDIA.LT.MEDIUM} {
    display: none;
  }
`
const NonHideable = styled.div`
  align-items: center;
  display: flex;
  ${MEDIA.LT.MEDIUM} {
    padding: 0.75em 0.75em 0.75em 0;
  }
`

const HamburgerContainer = styled.div`
  display: none;
  ${MEDIA.LT.SMALL} {
    align-items: center;
    display: flex;
  }
`
