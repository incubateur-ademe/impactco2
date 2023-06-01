import categories from 'data/categories.json'
import styled from 'styled-components'

import Section2 from 'components/base/Section2'

const H1Title = styled.h1`
  margin-top: 0;
`
const MainColorSpan = styled.span`
  color: ${(props) => props.theme.colors.main};
`

export default function Livraison() {
  return (
    <Section2>
      <Section2.InnerMargin>
        <H1Title>
          Mesurer l'impact carbone de la{' '}
          <MainColorSpan>livraison de colis</MainColorSpan>
        </H1Title>
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
