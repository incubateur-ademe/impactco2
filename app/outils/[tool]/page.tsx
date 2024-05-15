import { Metadata, ResolvingMetadata } from 'next'
import { notFound } from 'next/navigation'
import React from 'react'
import { Category as CategoryType } from 'types/category'
import { categories } from 'data/categories'
import Category from 'components/outils/CategoryPage'
import Outil from 'components/outils/Outil'
import { getExamples } from 'utils/examples'
import { getFAQs } from 'utils/faq'
import { getNotionRevalidate } from 'components/Notion/utils'
import { devTools, smallTools } from 'components/cards/tools'
import Suggestion from 'components/layout/Suggestion'

const tools = [...devTools, ...smallTools]
export async function generateStaticParams() {
  return [
    ...tools.map((tool) => ({
      tool: tool.slug,
    })),
    ...categories.map((category) => ({ tool: category.slug })),
  ]
}

type Props = { params: { tool: string } }

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const tool = tools.find((tool) => tool.slug === params.tool)
  if (tool) {
    return {
      title: `${tool.title} | Impact CO₂`,
      description: tool.description,
    }
  }
  const category = categories.find((category) => category.slug === params.tool)
  if (category) {
    return {
      title: `${category.name} | Impact CO₂`,
      description: category.description,
      openGraph: {
        creators: 'ADEME',
        images: `meta/${category.slug}.png`,
      },
    }
  }

  return parent as Metadata
}
export const revalidate = getNotionRevalidate()

const OutilPage = async ({ params }: Props) => {
  const tool = tools.find((tool) => tool.slug === params.tool)
  const examples = await getExamples()
  const faqs = await getFAQs()

  if (tool) {
    return (
      <>
        <Outil tool={tool} examples={examples} faqs={faqs} />
        <Suggestion from={`/outils/${tool.slug}`} fromLabel={tool.title} simulatorName={`de l'outil ${tool.title}`} />
      </>
    )
  }
  const category =
    params.tool === 'teletravail'
      ? {
          ...(categories.find((category) => category.slug === 'transport') as CategoryType),
          name: 'Télétravail',
          slug: 'teletravail',
          description: 'Mesurer les économies de carbone réalisées grâce au télétravail',
        }
      : categories.find((category) => category.slug === params.tool)
  if (category) {
    return (
      <>
        <Category category={category} examples={examples} faqs={faqs} />
        <Suggestion
          from={`/outils/${category.slug}`}
          fromLabel={category.name}
          simulatorName={`de la thématique ${category.name}`}
        />
      </>
    )
  }

  return notFound()
}

export default OutilPage
