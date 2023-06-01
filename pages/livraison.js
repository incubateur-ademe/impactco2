import categories from 'data/categories.json'

import Section2 from 'components/base/Section2'

export default function Livraison() {
  return (
    <Section2>
      <Section2.InnerMargin>
        <h1>
          Mesurer l'impact carbone de la <span>livraison de colis</span>
        </h1>
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
