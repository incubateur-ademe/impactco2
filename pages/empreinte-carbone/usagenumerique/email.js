import React from 'react'

import usagenumerique from 'data/categories/usagenumerique.json'
import categories from 'data/categories.json'

import Web from 'components/layout/Web'
import Details from 'components/views/equivalent/Details'
import VisualizationSlider from 'components/views/equivalent/VisualizationSlider'
import Ecv from 'components/views/equivalent/Ecv'
import Text from 'components/views/equivalent/Text'
import Email from 'components/numerique/Email'

const equivalents = [...usagenumerique].map((equivalent) => ({
  ...equivalent,
  id: equivalent.slug,
}))

export default function Equivalent(props) {
  return (
    <Web
      title={props.equivalent.meta.title}
      description={props.equivalent.meta.description}
      breadcrumb={{
        type: 'equivalent',
        category: props.category,
        equivalent: props.equivalent,
      }}
    >
      <Details equivalent={props.equivalent} category={props.category} />
      <VisualizationSlider equivalent={props.equivalent} />
      <Ecv equivalent={props.equivalent} />
      <Email />
      <Text equivalent={props.equivalent} />
    </Web>
  )
}

export async function getStaticProps({ params }) {
  return {
    props: {
      equivalent: equivalents.find((equivalent) => equivalent.slug === 'email'),
      category: categories.find(
        (category) => category.slug === 'usagenumerique'
      ),
    },
  }
}
