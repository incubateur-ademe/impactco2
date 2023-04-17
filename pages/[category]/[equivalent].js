import categories from 'data/categories.json'
import boisson from 'data/categories/boisson.json'
import chauffage from 'data/categories/chauffage.json'
import deplacement from 'data/categories/deplacement.json'
import divers from 'data/categories/divers.json'
import electromenager from 'data/categories/electromenager.json'
import fruitsetlegumes from 'data/categories/fruitsetlegumes.json'
import habillement from 'data/categories/habillement.json'
import mobilier from 'data/categories/mobilier.json'
import numerique from 'data/categories/numerique.json'
import repas from 'data/categories/repas.json'
import usagenumerique from 'data/categories/usagenumerique.json'
import React from 'react'

import Web from 'components/layout/Web'
import Details from 'components/views/equivalent/Details'
import Ecv from 'components/views/equivalent/Ecv'
import Text from 'components/views/equivalent/Text'
import VisualizationSlider from 'components/views/equivalent/VisualizationSlider'

const equivalents = [
  ...boisson,
  ...deplacement,
  ...electromenager,
  ...habillement,
  ...mobilier,
  ...numerique,
  ...usagenumerique,
  ...repas,
  ...chauffage,
  ...fruitsetlegumes,
  ...divers,
].map((equivalent) => ({ ...equivalent, id: equivalent.slug }))

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
      <Text equivalent={props.equivalent} />
    </Web>
  )
}

export async function getStaticPaths() {
  return {
    paths: equivalents
      .filter(
        (equivalent) =>
          ![
            'email',
            'visioconference',
            'audioconference',
            'rechercheweb',
            'streamingvideo',
          ].includes(equivalent.slug)
      )
      .map((equivalent) => ({
        params: {
          equivalent: equivalent.slug,
          category: categories.find(
            (category) => category.id === equivalent.category
          ).slug,
        },
      })),
    fallback: 'blocking',
  }
}
export async function getStaticProps({ params }) {
  return {
    props: {
      equivalent: equivalents.find(
        (equivalent) => equivalent.slug === params.equivalent
      ),
      category: categories.find(
        (category) => category.slug === params.category
      ),
    },
  }
}
