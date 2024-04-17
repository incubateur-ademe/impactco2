import { Metadata, ResolvingMetadata } from 'next'
import { notFound } from 'next/navigation'
import React from 'react'
import { categories } from 'data/categories'
import Category from 'components/outils/CategoryPage'
import Outil from 'components/outils/Outil'
import { devTools, smallTools } from 'components/cards/tools'
import Suggestion from 'components/layout/web/Suggestion'

const tools = [...devTools, ...smallTools]
export async function generateStaticParams() {
  return [
    ...tools.map((tool) => ({
      tool: tool.slug,
    })),
    ...categories.map((category) => ({ slug: category.slug })),
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

const OutilPage = async ({ params }: Props) => {
  const tool = tools.find((tool) => tool.slug === params.tool)
  if (tool) {
    return (
      <>
        <Outil tool={tool} />
        <Suggestion from={`/outils/${tool.slug}`} fromLabel={tool.title} simulatorName={`de l'outil ${tool.title}`} />
      </>
    )
  }

  const category = categories.find((category) => category.slug === params.tool)
  if (category) {
    return (
      <>
        <Category category={category} />
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
