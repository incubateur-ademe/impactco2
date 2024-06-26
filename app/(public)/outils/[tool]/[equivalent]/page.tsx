import { Metadata, ResolvingMetadata } from 'next'
import { notFound } from 'next/navigation'
import React from 'react'
import { categories } from 'data/categories'
import Equivalent from 'components/outils/equivalents/EquivalentPage'
import { equivalentsSimulators } from 'components/outils/equivalents/simulators/equivalentsSimulators'
import { getName } from 'utils/Equivalent/equivalent'
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

type Props = {
  params: { tool: string; equivalent: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata({ params, searchParams }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const category = categories.find((category) => category.slug === params.tool)

  if (!category || !category.equivalents) {
    return parent as Metadata
  }
  const equivalent = category.equivalents.find((equivalent) => equivalent.slug === params.equivalent)
  if (!equivalent) {
    return parent as Metadata
  }

  const language = (searchParams.language as string) || 'fr'
  return {
    title: `${getName(language, equivalent)} | Impact CO₂`,
    description:
      language === 'en'
        ? `Discover the carbon impact of a ${getName(language, equivalent, true).toLowerCase()} thanks to CO2 Impact and ADEME data`
        : `Découvrir l'impact carbone d'un ${getName(language, equivalent, true).toLowerCase()} grâce à Impact CO2 et aux données de l'ADEME`,
    openGraph: {
      creators: 'ADEME',
      images: `meta/${equivalent.slug}-${language}.png`,
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
      <Equivalent category={category} equivalent={equivalent} simulator={equivalentsSimulators[equivalent.slug]} />
      <Suggestion
        from={equivalent.link}
        fromLabel={getName('fr', equivalent)}
        simulatorName={`de l'objet ${category.name}`}
      />
    </>
  )
}

export default EquivalentPage
