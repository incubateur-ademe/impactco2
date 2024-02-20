import React from 'react'
import { Category } from 'types/category'
import { Equivalent as EquivalentType } from 'types/equivalent'
import categories from 'data/categories.json'
import boisson from 'data/categories/boisson.json'
import chauffage from 'data/categories/chauffage.json'
import deplacement from 'data/categories/deplacement.json'
import electromenager from 'data/categories/electromenager.json'
import { flattenEquivalents } from 'data/categories/flattenEquivalents'
import fruitsetlegumes from 'data/categories/fruitsetlegumes.json'
import habillement from 'data/categories/habillement.json'
import mobilier from 'data/categories/mobilier.json'
import numerique from 'data/categories/numerique.json'
import repas from 'data/categories/repas.json'
import usagenumerique from 'data/categories/usagenumerique.json'
import Web from 'components/layout/Web'
import Details from 'components/views/equivalent/Details'
import Ecv from 'components/views/equivalent/Ecv'
import Text from 'components/views/equivalent/Text'
import VisualizationSlider from 'components/views/equivalent/VisualizationSlider'

const equivalents: EquivalentType[] = [
  ...boisson,
  ...flattenEquivalents(deplacement),
  ...electromenager,
  ...habillement,
  ...mobilier,
  ...numerique,
  ...usagenumerique,
  ...repas,
  ...chauffage,
  ...fruitsetlegumes,
]

export default function Equivalent({ category, equivalent }: { category: Category; equivalent: EquivalentType }) {
  return (
    <Web
      title={equivalent.meta.title}
      description={equivalent.meta.description}
      breadcrumb={{
        type: 'equivalent',
        category: category,
        equivalent: equivalent,
      }}>
      <Details equivalent={equivalent} category={category} />
      <VisualizationSlider equivalent={equivalent} category={category} />
      <Ecv equivalent={equivalent} category={category} />
      <Text equivalent={equivalent} />
    </Web>
  )
}

export async function getStaticPaths() {
  return {
    paths: equivalents
      .filter(
        (equivalent) =>
          !['email', 'visioconference', 'audioconference', 'rechercheweb', 'streamingvideo'].includes(equivalent.slug)
      )
      .map((equivalent) => ({
        equivalent: equivalent,
        category: categories.find((category) => category.id === equivalent.category),
      }))
      .filter((params) => params.equivalent && params.category)
      .map((params) => ({
        params: {
          equivalent: params.equivalent.slug,
          category: params.category?.slug,
        },
      })),
    fallback: 'blocking',
  }
}

export async function getStaticProps({ params }: { params: { category: string; equivalent: string } }) {
  const category = categories?.find((category) => category.slug === params.category)
  if (!category) {
    return { notFound: true }
  }
  const equivalent = equivalents.find((equivalent) => equivalent.slug === params.equivalent)
  if (!equivalent) {
    return { notFound: true }
  }
  return {
    props: {
      category,
      equivalent,
    },
  }
}
