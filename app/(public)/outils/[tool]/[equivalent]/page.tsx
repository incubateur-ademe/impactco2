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
      ? category.equivalents.flatMap((equivalent) =>
          equivalent.withCarpool
            ? [
                {
                  tool: category.slug,
                  equivalent: equivalent.slug,
                },
                ...Array.from({ length: 4 }).map((value, index) => ({
                  tool: category.slug,
                  equivalent: `${equivalent.slug}+${index + 1}`,
                  carpool: index + 1,
                })),
              ]
            : [
                {
                  tool: category.slug,
                  equivalent: equivalent.slug,
                },
              ]
        )
      : []
  )
}

type Props = {
  params: Promise<{ tool: string; equivalent: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata(props: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const searchParams = await props.searchParams
  const params = await props.params
  const category = categories.find((category) => category.slug === params.tool)

  if (!category || !category.equivalents) {
    return parent as Metadata
  }
  const fullSlug = decodeURIComponent(params.equivalent)
  const [slug] = fullSlug.split('+')
  const equivalent = category.equivalents.find((equivalent) => equivalent.slug === slug)
  if (!equivalent) {
    return parent as Metadata
  }

  const language = (searchParams.language as string) || 'fr'
  return {
    title: `${getName(language, equivalent)} | Impact CO₂`,
    description:
      language === 'en'
        ? `Discover the carbon impact of a ${getName(language, equivalent, true)} thanks to CO2 Impact and ADEME data`
        : language === 'es'
          ? `Décubre el impacto de carbono de ${getName(language, equivalent, true)} gracias a Impact CO2 y a los datos de la ADEME`
          : `Découvrir l'impact carbone d'un ${getName(language, equivalent, true)} grâce à Impact CO2 et aux données de l'ADEME`,
    openGraph: {
      creators: 'ADEME',
      images: `meta/${fullSlug}-${language}.png`,
    },
  }
}

const EquivalentPage = async (props: Props) => {
  const params = await props.params
  const category = categories.find((category) => category.slug === params.tool)
  if (!category || !category.equivalents) {
    return notFound()
  }
  const [slug, carpool] = decodeURIComponent(params.equivalent).split('+')
  const equivalent = category.equivalents.find((equivalent) => equivalent.slug === slug)
  if (!equivalent) {
    return notFound()
  }
  return (
    <>
      <Equivalent
        category={category}
        equivalent={
          carpool ? { ...equivalent, carpool: Number(carpool), link: `${equivalent.link}+${carpool}` } : equivalent
        }
        simulator={equivalentsSimulators[equivalent.slug]}
      />
      <Suggestion fromLabel={getName('fr', equivalent)} simulatorName={`de l'objet ${category.name}`} />
    </>
  )
}

export default EquivalentPage
