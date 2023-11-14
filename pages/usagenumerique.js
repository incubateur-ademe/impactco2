import React from 'react'
import categories from 'data/categories.json'
import Web from 'components/layout/Web'
import Learning from 'components/misc/Learning'
import Category from 'components/numerique/Category'
import { RulesProviderNumerique } from 'components/numerique/RulesProviderNumerique'

export default function Numerique(props) {
  return (
    <Web
      title={props.category.meta.title}
      description={props.category.meta.description}
      breadcrumb={{
        type: 'equivalent',
        category: props.category,
      }}>
      <RulesProviderNumerique>
        <Category category={props.category} />
        <Learning category={props.category} />
      </RulesProviderNumerique>
    </Web>
  )
}
export async function getStaticProps() {
  return {
    props: {
      category: categories.find((item) => item.id === 10),
    },
  }
}
