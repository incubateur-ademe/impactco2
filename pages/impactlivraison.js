import categories from 'data/categories.json'

import Section2 from 'components/base/Section2'
import CalculateurLivraison from 'components/livraison/CalculateurLivraison'
import IntroLivraison from 'components/livraison/IntroLivraison'
import { RulesProviderLivraison } from 'components/livraison/RulesProviderLivraison'

export default function Impactlivraison() {
  return (
    <Section2>
      <Section2.InnerMargin>
        <RulesProviderLivraison>
          <IntroLivraison />
          <CalculateurLivraison />
        </RulesProviderLivraison>
      </Section2.InnerMargin>
    </Section2>
  )
}
export async function getStaticProps() {
  return {
    props: {
      category: categories.find((item) => item.slug === 'livraison'),
    },
  }
}
