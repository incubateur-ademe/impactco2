import categories from 'data/categories.json'
import styled from 'styled-components'

import Section2 from 'components/base/Section2'

const H1Title = styled.h1`
  margin-top: 0;
`
const MainColorSpan = styled.span`
  color: ${(props) => props.theme.colors.main};
`
const SmallText = styled.div`
  font-size: 14px;
  font-weight: 300;
`

const BlueLink = styled.a`
  color: #457be7;
`

export default function Livraison() {
  return (
    <Section2>
      <Section2.InnerMargin>
        <H1Title>
          Mesurer l'impact carbone de la{' '}
          <MainColorSpan>livraison de colis</MainColorSpan>
        </H1Title>
        <SmallText>
          <span> Source : </span>
          <BlueLink href='https://lequipe.fr' target='_blank'>
            Commerce en ligne – Étude ADEME 2023
          </BlueLink>
          <span> · </span>
          <span>Mise à jour le 26/05/2023 </span>
        </SmallText>
      </Section2.InnerMargin>
    </Section2>
  )
}
export async function getStaticProps() {
  return {
    props: {
      category: categories.find((item) => item.slug === 'impactlivraison'),
    },
  }
}
