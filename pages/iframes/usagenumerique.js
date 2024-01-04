import React from 'react'
import categories from 'data/categories.json'
import Iframe from 'components/layout/Iframe'
import Category from 'components/numerique/Category'
import { RulesProviderNumerique } from 'components/numerique/RulesProviderNumerique'

export default function Numerique(props) {
  return (
    <Iframe noLogo>
      <RulesProviderNumerique>
        <Category category={props.category} iframe />
      </RulesProviderNumerique>
    </Iframe>
  )
}
export async function getStaticProps() {
  return {
    props: {
      category: categories.find((item) => item.id === 10),
    },
  }
}
