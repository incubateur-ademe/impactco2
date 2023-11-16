import Link from 'next/link'
import { useState } from 'react'
import styled from 'styled-components'
import Ademe from 'components/base/Ademe'
import Logo from 'components/base/Logo'
import Marianne from 'components/base/Marianne'
import { Section, SectionWideContent } from 'components/base/Section'
import NavSearchBar from 'components/misc/search/NavSearchBar'
import Hamburger from './Hamburger'
import MenuSweet from './nav/MenuSweet'

export default function HeaderSweet() {
  const [hamburgerOpened, setHamburgerOpened] = useState(false)

  const hamburgerClicked = () => {
    setHamburgerOpened(!hamburgerOpened)
  }

  return (
    <BoxedShadow>
      <Section $withoutPadding>
        <SectionWideContent>
          <Header aria-label='En-tête'>
            <LogoBar>
              <Logos>
                <Hideable>
                  <Link href='/'>
                    <Marianne />
                  </Link>
                </Hideable>
                <Hideable>
                  <Link href='/'>
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
      <NavBar>
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
                <Link href='/comparateur' title='Comparateur carbone'>
                  Comparateur carbone
                </Link>
              </NavLink>
              <NavLink>
                <Link
                  href='https://accelerateur-transition-ecologique-ademe.notion.site/Kit-de-diffusion-b9d08930a49a4346830b7a12fd7cb733?pvs=4'
                  title='Diffuser les ressources'
                  target='_blank'
                  rel='noreferrer noopener'>
                  Diffuser les ressources
                </Link>
              </NavLink>
              <NavLink>
                <Link href='/integration' title='Intégrer les ressources'>
                  Intégrer les ressources
                </Link>
              </NavLink>
              <NavLink>
                <Link href='/stats' title='Statistiques'>
                  Statistiques
                </Link>
              </NavLink>
            </NavLinksMobile>
            <NavLinksDesktop>
              <NavLink>
                <MenuSweet />
              </NavLink>
              <NavLink>
                <Link href='/comparateur' title='Comparateur carbone'>
                  Comparateur carbone
                </Link>
              </NavLink>
              <NavLink>
                <Link
                  href='https://accelerateur-transition-ecologique-ademe.notion.site/Kit-de-diffusion-b9d08930a49a4346830b7a12fd7cb733?pvs=4'
                  title='Diffuser les ressources'
                  target='_blank'
                  rel='noreferrer noopener'>
                  Diffuser les ressources
                </Link>
              </NavLink>
              <NavLink>
                <Link href='/integration' title='Intégrer les ressources'>
                  Intégrer les ressources
                </Link>
              </NavLink>
              <NavLink>
                <Link href='/stats' title='Statistiques'>
                  Statistiques
                </Link>
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
  ${(props) => props.theme.mq.small} {
    display: ${(props) => (props.$shouldDisplay ? 'flex' : 'none')};
    flex-direction: column;
  }
`
const NavLinksDesktop = styled.div`
  display: flex;
  ${(props) => props.theme.mq.small} {
    display: none;
  }
  margin: 0 -0.75rem;
`

const Header = styled.header`
  position: relative; // or box-shadow will not appear
`

const LogoBar = styled.div`
  display: flex;
  justify-content: space-between;
`

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
`
const Actions = styled.div`
  display: flex;
`

const ActionSearch = styled.div`
  position: relative;
  top: 25%;
  width: 282px;
  ${(props) => props.theme.mq.small} {
    width: 0px;
  }
`

const SmallActionSearch = styled.div`
  position: relative;
  top: 25%;
  width: 282px;
  ${(props) => props.theme.mq.small} {
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
    ${(props) => props.theme.mq.small} {
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
    ${(props) => props.theme.mq.medium} {
      font-size: 0.75rem;
    }
    ${(props) => props.theme.mq.small} {
      font-size: 0.875rem;
    }
    height: 100%;
    min-height: 2rem;
    padding: 1rem 0.75rem;
    ${(props) => props.theme.mq.medium} {
      margin-left: inherit;
    }
    text-decoration: none;

    &:hover {
      background-color: ${(props) => props.theme.colors.mainLight};
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
  ${(props) => props.theme.mq.medium} {
    display: none;
  }
`
const NonHideable = styled.div`
  align-items: center;
  display: flex;
  ${(props) => props.theme.mq.medium} {
    padding: 0.75em 0.75em 0.75em 0;
  }
`

const HamburgerContainer = styled.div`
  display: none;
  ${(props) => props.theme.mq.small} {
    align-items: center;
    display: flex;
  }
`
