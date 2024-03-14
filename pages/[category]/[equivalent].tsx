import React from 'react'
import { Category } from 'types/category'
import { ComputedEquivalent } from 'types/equivalent'
import categories from 'data/categories.json'
import { computedEquivalents } from 'components/providers/equivalents'
import Web from 'components/layout/Web'
import Details from 'components/views/equivalent/Details'
import Ecv from 'components/views/equivalent/Ecv'
import Text from 'components/views/equivalent/Text'
import VisualizationSlider from 'components/views/equivalent/VisualizationSlider'

export default function Equivalent({ category, equivalent }: { category: Category; equivalent: ComputedEquivalent }) {
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
    paths: computedEquivalents
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
  const equivalent = computedEquivalents.find((equivalent) => equivalent.slug === params.equivalent)
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
