import { Metadata, ResolvingMetadata } from 'next'
import { notFound } from 'next/navigation'
import { categories } from 'data/categories'
import Category from 'components/outils/CategoryPage'
import Outil from 'components/outils/Outil'
import { extraSimulators, simulators } from 'components/outils/simulators'
import { getCategory } from 'utils/category'
import { metaDescriptions, metaTitles } from 'utils/meta'
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

type Props = {
  params: Promise<{ tool: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata(props: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const searchParams = await props.searchParams
  const params = await props.params
  const tool = tools.find((tool) => tool.slug === params.tool)
  if (tool) {
    return {
      title: `${tool.title} | Impact CO₂`,
      description: tool.meta || tool.description,
      openGraph: {
        creators: 'ADEME',
        images: `meta/${tool.slug}.png`,
      },
    }
  }

  const language = (searchParams.language as string) || 'fr'
  const category = getCategory(params.tool)
  if (category) {
    return {
      title: `${metaTitles[category.slug][language]} | Impact CO₂`,
      description: metaDescriptions[category.slug][language],
      openGraph: {
        creators: 'ADEME',
        images: `meta/${category.slug}-${language}.png`,
      },
    }
  }

  return parent as Metadata
}

const OutilPage = async (props: Props) => {
  const params = await props.params
  const tool = tools.find((tool) => tool.slug === params.tool)

  if (tool) {
    return (
      <>
        <Outil tool={tool} />
        <Suggestion from={`/outils/${tool.slug}`} fromLabel={tool.title} simulatorName={`de l'outil ${tool.title}`} />
      </>
    )
  }
  const category = getCategory(params.tool)
  if (category) {
    return (
      <>
        <Category
          category={category}
          simulator={simulators[params.tool]}
          extraSimulator={extraSimulators[params.tool]}
        />
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
