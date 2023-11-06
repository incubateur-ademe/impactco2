import React from 'react'
import categories from 'data/categories.json'
import Iframe from 'components/layout/Iframe'
import Category from 'components/numerique/Category'
import { RulesProvider } from 'components/numerique/RulesProvider'

export default function Numerique(props) {
  return (
    <Iframe url='usagenumerique'>
      <RulesProvider>
        <Category category={props.category} />{' '}
      </RulesProvider>
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
