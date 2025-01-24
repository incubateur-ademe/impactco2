import { Metadata } from 'next'
import React from 'react'
import { Category as CategoryType } from 'types/category'
import { categories } from 'data/categories'
import Category from 'components/outils/CategoryPage'
import TransportSimulator from 'components/outils/TransportSimulator'
import { metaDescriptions, metaTitles } from 'utils/meta'
import Suggestion from 'components/layout/Suggestion'

const category = categories.find((category) => category.slug === 'transport') as CategoryType

export async function generateMetadata(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}): Promise<Metadata> {
  const searchParams = await props.searchParams
  const language = (searchParams.language as string) || 'fr'
  return {
    title: `${metaTitles.transport[language]} | Impact CO₂`,
    description: metaDescriptions.transport[language],
    openGraph: {
      creators: 'ADEME',
      images: `meta/transport-${language}.png`,
    },
  }
}

const page = () => {
  return (
    <>
      <Category category={category} simulator={<TransportSimulator />} />
      <Suggestion
        from={`/outils/${category.slug}`}
        fromLabel={category.name}
        simulatorName={`de la thématique ${category.name}`}
      />
    </>
  )
}

export default page
