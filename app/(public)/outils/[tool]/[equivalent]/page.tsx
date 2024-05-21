import { Metadata, ResolvingMetadata } from 'next'
import { notFound } from 'next/navigation'
import React from 'react'
import { categories } from 'data/categories'
import Equivalent from 'components/outils/equivalents/EquivalentPage'
import formatName from 'utils/formatName'
import Suggestion from 'components/layout/Suggestion'

export async function generateStaticParams() {
  return categories.flatMap((category) =>
    category.equivalents
      ? category.equivalents.map((equivalent) => ({
          tool: category.slug,
          equivalent: equivalent.slug,
        }))
      : []
  )
}

type Props = { params: { tool: string; equivalent: string } }

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const category = categories.find((category) => category.slug === params.tool)

  if (!category || !category.equivalents) {
    return parent as Metadata
  }
  const equivalent = category.equivalents.find((equivalent) => equivalent.slug === params.equivalent)
  if (!equivalent) {
    return parent as Metadata
  }

  return {
    title: `${formatName(equivalent.name, 1, true)} | Impact CO₂`,
    description: category.description,
    openGraph: {
      creators: 'ADEME',
      images: `meta/${category.slug}.png`,
    },
  }
}

const EquivalentPage = ({ params }: Props) => {
  const category = categories.find((category) => category.slug === params.tool)
  if (!category || !category.equivalents) {
    return notFound()
  }
  const equivalent = category.equivalents.find((equivalent) => equivalent.slug === params.equivalent)
  if (!equivalent) {
    return notFound()
  }
  return (
    <>
      <Equivalent category={category} equivalent={equivalent} />
      <Suggestion
        from={equivalent.link}
        fromLabel={formatName(equivalent.name, 1, true)}
        simulatorName={`de l'objet ${category.name}`}
      />
    </>
  )
}

export default EquivalentPage
