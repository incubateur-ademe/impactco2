import Head from 'next/head'
import Link from 'next/link'
import { RulePage } from 'publicodes-react'
import { useContext } from 'react'
import styled from 'styled-components'
import { Section2, Section2InnerMargin } from 'components/base/Section2'
import BreadCrumb3 from 'components/layout/web/BreadCrumb3'
import Footer from 'components/layout/web/Footer'
import HeaderSweet from 'components/layout/web/HeaderSweet'
import Seo from 'components/layout/web/Seo'
import RulesContextLivraison from 'components/livraison/RulesProviderLivraison'
import Markdown from './Markdown'

export default function DocumentationLivraison(props) {
  const { engine } = useContext(RulesContextLivraison)

  return (
    <VerticalContainer className={props.theme === 'night' ? 'bl' : 'r'}>
      <Seo
        title={props.title}
        description={
          "Découvrez notre documentation et les hypothèses de calculs du simulateur d'impact carbone de la livraison"
        }
      />
      <HeaderSweet />
      <BreadCrumb3 />
      <Section2>
        <Section2InnerMargin>
          <DocWrapper>
            <RulePage
              documentationPath='/documentation'
              rulePath={props.slug}
              engine={engine}
              language='fr'
              renderers={{
                Head,
                Link: ({ to, children }) => <Link href={to}>{children}</Link>,
                Text: ({ children }) => <Markdown>{children}</Markdown>,
              }}
            />
          </DocWrapper>
        </Section2InnerMargin>
      </Section2>
      <br />
      <br />
      <br />
      <Footer />
    </VerticalContainer>
  )
}

const DocWrapper = styled.div`
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans',
    'Droid Sans', 'Helvetica Neue', sans-serif;
  margin: 0;
  * {
    --textColor: #2975d1;
    --darkerColor: #333350;
  }

  .App {
    padding: 0 0.6rem;
    margin-bottom: 1rem;
  }

  #documentation-rule-root > p:first-of-type {
    display: inline-block;
    background: var(--lighterColor);
    padding: 0.4rem 0.6rem 0.2rem;
  }

  header {
    color: var(--textColor);

    background: linear-gradient(60deg, var(--darkColor) 0%, var(--color) 100%);
    padding: 0.6rem 1rem;
    box-shadow:
      0 1px 3px rgba(var(--rgbColor), 0.12),
      0 1px 2px rgba(var(--rgbColor), 0.24);
    border-radius: 0.4rem;
  }
  small {
    color: inherit;
  }

  a {
    color: var(--textColor);
  }

  nav li:not(.active) a {
    font-weight: 200;
  }

  a:hover {
    color: var(--darkerColor);
  }

  h1 {
    color: inherit;
    margin-top: 0.6rem;
    margin-bottom: 0.6rem;
  }
  a {
    text-decoration: none;
  }
  button {
    color: inherit;
    cursor: pointer;
  }
  span {
    background: inherit;
  }
  small {
    background: none;
  }

  li &.active .content {
    background-color: transparent;
  }

  #documentation-rule-root > article {
    max-width: 800px;
  }
`

const VerticalContainer = styled.div``
