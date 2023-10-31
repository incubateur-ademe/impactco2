import Link from 'next/link'
import React from 'react'
import styled from 'styled-components'
import categories from 'data/categories.json'
import Section2 from 'components/base/Section2'
import Header from './heading/Header'

export default function ByTheme() {
  const buildThemeCardFor = (slug) => {
    const item = categories.find((e) => e.slug === slug)
    return (
      <ThemeCard>
        <ThemeCardIcon>{item.emoji}</ThemeCardIcon>
        <ThemeCardLink>
          <Link href={'/' + item.slug}>{item.name}</Link>
        </ThemeCardLink>
      </ThemeCard>
    )
  }

  return (
    <Wrapper>
      <Section2>
        <Section2.WideContent>
          <Section2.InnerMargin>
            <Layout>
              <Header
                title={
                  <>
                    <span>
                      Identifier la <b>thématique environnementale&nbsp;</b>
                    </span>
                    <span>à aborder dans vos contenus</span>
                  </>
                }
                cta={{ to: '/categories', label: 'Explorer les thématiques' }}
              />
              <div>
                <ThemeCards>
                  <ThemeCardsLine1>
                    {buildThemeCardFor('usagenumerique')}
                    {buildThemeCardFor('chauffage')}
                    {buildThemeCardFor('transport')}
                    {buildThemeCardFor('repas')}
                    {buildThemeCardFor('habillement')}
                    {buildThemeCardFor('boisson')}
                  </ThemeCardsLine1>
                  <ThemeCardsLine2>
                    <ThemeCardBlue1>&nbsp;</ThemeCardBlue1>
                    {buildThemeCardFor('mobilier')}
                    {buildThemeCardFor('electromenager')}
                    {buildThemeCardFor('livraison')}
                    <ThemeCardBlue2 />
                  </ThemeCardsLine2>
                </ThemeCards>
              </div>
            </Layout>
          </Section2.InnerMargin>
        </Section2.WideContent>
      </Section2>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  background-color: #ebf2ff;
  padding: 6rem 0;
  ${(props) => props.theme.mq.large} {
    padding: 1rem 0;
  }
`

const Layout = styled.div`
  ${(props) => props.theme.mq.large} {
    margin-bottom: 2rem;
    margin-top: 2rem;
  }
`

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
`

const ThemeCardsLine1 = styled.div``
const ThemeCardsLine2 = styled.div``

const ThemeCard = styled.div`
  align-items: center;
  background-color: white;
  border-radius: 8px;
  display: flex;
  height: 2rem;
  padding: 1rem 1rem;
`

const ThemeCardIcon = styled.div`
  ${(props) => props.theme.mq.large} {
    margin-right: 0.5rem;
  }
`
const ThemeCardLink = styled.div`
  a {
    color: #235dd2;
    &:hover {
      color: #2e5199;
    }
    text-decoration: none;
  }
`

const ThemeCardBlue1 = styled.div`
  background: linear-gradient(90deg, #ebf2ff -0.22%, #ccdcfd 99.78%);
  border-radius: 8px;
  width: 150px;
  ${(props) => props.theme.mq.large} {
    display: none;
  }
`
const ThemeCardBlue2 = styled.div`
  background: linear-gradient(270deg, #ebf2ff -0.22%, #ccdcfd 99.78%);
  border-radius: 8px;
  width: 150px;
  ${(props) => props.theme.mq.large} {
    display: none;
  }
`
