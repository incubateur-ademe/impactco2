import React from 'react'
import styled from 'styled-components'
import Section2 from 'components/base/Section2'
import ThemeCard from './ThemeCard'
import Header from './heading/Header'

export default function ByTheme() {
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
                  <div>
                    <ThemeCard slug='usagenumerique' />
                    <ThemeCard slug='chauffage' />
                    <ThemeCard slug='transport' />
                    <ThemeCard slug='repas' />
                    <ThemeCard slug='habillement' />
                    <ThemeCard slug='boisson' />
                  </div>
                  <div>
                    <ThemeCardBlue1>&nbsp;</ThemeCardBlue1>
                    <ThemeCard slug='mobilier' />
                    <ThemeCard slug='electromenager' />
                    <ThemeCard slug='livraison' />
                    <ThemeCardBlue2 />
                  </div>
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
    gap: 16px;
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
