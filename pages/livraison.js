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
  margin-bottom: 2rem;
`

const BlueLink = styled.a`
  color: #457be7;
`

const RegularParagraph = styled.p`
  margin: 0;
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
        <RegularParagraph>
          <strong>80 % des Français</strong> de 11 ans et plus font des achats
          en ligne.
        </RegularParagraph>
        <RegularParagraph>
          En moyenne, cela représente{' '}
          <strong>1 milliard de colis par an</strong>, soit{' '}
          <strong>deux colis par personne par mois</strong>.
        </RegularParagraph>
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
